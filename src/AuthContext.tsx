import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { authEnabled, supabase, type ProfileRow } from './lib/supabase';

interface AuthContextType {
  authEnabled: boolean;
  user: User | null;
  profile: ProfileRow | null;
  isAdmin: boolean;
  loading: boolean;
  authMessage: string | null;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  redeemAdminCode: (code: string) => Promise<boolean>;
  refreshAdminStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getDisplayName = (user: User) => {
  const metadataName = user.user_metadata?.full_name || user.user_metadata?.name;
  return typeof metadataName === 'string' && metadataName.trim() ? metadataName.trim() : user.email ?? null;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(authEnabled);
  const [authMessage, setAuthMessage] = useState<string | null>(null);

  const syncProfile = async (currentUser: User | null) => {
    if (!supabase || !currentUser) {
      setProfile(null);
      setIsAdmin(false);
      return;
    }

    const profileData = {
      user_id: currentUser.id,
      email: currentUser.email ?? null,
      display_name: getDisplayName(currentUser),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('profiles')
      .upsert(profileData, { onConflict: 'user_id' })
      .select('user_id,email,display_name,created_at,updated_at')
      .single();

    if (!error) setProfile(data);

    await supabase.rpc('bootstrap_admin');

    const { data: adminData } = await supabase
      .from('admin_users')
      .select('user_id')
      .eq('user_id', currentUser.id)
      .maybeSingle();

    setIsAdmin(Boolean(adminData));
  };

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    let mounted = true;

    supabase.auth.getSession().then(async ({ data }) => {
      if (!mounted) return;
      const currentUser = data.session?.user ?? null;
      setUser(currentUser);
      await syncProfile(currentUser);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      syncProfile(currentUser);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    if (!supabase) return;
    setAuthMessage(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) setAuthMessage(error.message);
  };

  const signInWithEmail = async (email: string) => {
    if (!supabase) return;
    setAuthMessage(null);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });
    setAuthMessage(error ? error.message : 'Check your inbox for the login link.');
  };

  const signOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setIsAdmin(false);
  };

  const refreshAdminStatus = async () => {
    await syncProfile(user);
  };

  const redeemAdminCode = async (code: string) => {
    if (!supabase || !user || !code.trim()) return false;
    setAuthMessage(null);
    const { data, error } = await supabase.rpc('redeem_admin_code', {
      raw_code: code.trim(),
    });
    if (error) {
      setAuthMessage(error.message);
      return false;
    }
    const success = Boolean(data);
    if (success) {
      await refreshAdminStatus();
      setAuthMessage('Admin access enabled.');
    } else {
      setAuthMessage('Invalid or expired admin code.');
    }
    return success;
  };

  const value = useMemo<AuthContextType>(
    () => ({
      authEnabled,
      user,
      profile,
      isAdmin,
      loading,
      authMessage,
      signInWithGoogle,
      signInWithEmail,
      signOut,
      redeemAdminCode,
      refreshAdminStatus,
    }),
    [user, profile, isAdmin, loading, authMessage],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
