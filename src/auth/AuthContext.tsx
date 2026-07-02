'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { authFeatureEnabled, getSupabaseClient, supabaseConfigured } from '../lib/supabaseClient';

export interface AuthActionResult {
  ok: boolean;
  message?: string;
}

interface AuthContextValue {
  authEnabled: boolean;
  configured: boolean;
  loading: boolean;
  message: string | null;
  passwordRecovery: boolean;
  passwordSetupRequired: boolean;
  session: Session | null;
  user: User | null;
  clearMessage: () => void;
  clearPasswordRecovery: () => void;
  sendEmailSignUpCode: (email: string) => Promise<AuthActionResult>;
  sendPasswordReset: (email: string) => Promise<AuthActionResult>;
  setPassword: (password: string) => Promise<AuthActionResult>;
  signInWithEmailPassword: (email: string, password: string) => Promise<AuthActionResult>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  verifyEmailCode: (email: string, token: string) => Promise<AuthActionResult>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const PASSWORD_SETUP_STORAGE_KEY = 'pocket-cosmos-email-password-setup';

const authError = (error: { message?: string } | null | undefined): AuthActionResult => ({
  ok: false,
  message: error?.message ?? 'AUTH_UNKNOWN_ERROR',
});

const authSuccess = (message?: string): AuthActionResult => ({ ok: true, message });

const passwordSetupPending = () => {
  if (typeof window === 'undefined') return false;
  return window.sessionStorage.getItem(PASSWORD_SETUP_STORAGE_KEY) === 'true';
};

const markPasswordSetupPending = () => {
  if (typeof window === 'undefined') return;
  window.sessionStorage.setItem(PASSWORD_SETUP_STORAGE_KEY, 'true');
};

const clearPasswordSetupPending = () => {
  if (typeof window === 'undefined') return;
  window.sessionStorage.removeItem(PASSWORD_SETUP_STORAGE_KEY);
};

const userNeedsPasswordSetup = (user: User | null | undefined) => {
  const metadata = user?.user_metadata as Record<string, unknown> | undefined;
  return metadata?.password_setup_required === true && metadata?.password_set !== true;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const supabase = getSupabaseClient();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(Boolean(supabase));
  const [message, setMessage] = useState<string | null>(null);
  const [passwordRecovery, setPasswordRecovery] = useState(false);
  const [passwordSetupRequired, setPasswordSetupRequired] = useState(false);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return undefined;
    }

    let mounted = true;

    supabase.auth.getSession().then(({ data, error }) => {
      if (!mounted) return;
      if (error) setMessage(error.message);
      const currentSession = data.session ?? null;
      setSession(currentSession);
      if (currentSession?.user && (passwordSetupPending() || userNeedsPasswordSetup(currentSession.user))) {
        setPasswordSetupRequired(true);
      }
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, nextSession) => {
      setSession(nextSession);
      setLoading(false);
      setMessage(null);
      if (event === 'PASSWORD_RECOVERY') {
        setPasswordRecovery(true);
      }
      if (event === 'SIGNED_IN' && nextSession?.user && (passwordSetupPending() || userNeedsPasswordSetup(nextSession.user))) {
        setPasswordSetupRequired(true);
      }
      if (event === 'SIGNED_OUT') {
        setPasswordRecovery(false);
        setPasswordSetupRequired(false);
        clearPasswordSetupPending();
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  const clearMessage = useCallback(() => {
    setMessage(null);
  }, []);

  const clearPasswordRecovery = useCallback(() => {
    setPasswordRecovery(false);
  }, []);

  const signInWithEmailPassword = useCallback(
    async (email: string, password: string) => {
      if (!supabase) {
        setMessage('AUTH_NOT_CONFIGURED');
        return authError({ message: 'AUTH_NOT_CONFIGURED' });
      }

      setMessage(null);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage(error.message);
        return authError(error);
      }

      setPasswordRecovery(false);
      setPasswordSetupRequired(false);
      clearPasswordSetupPending();
      return authSuccess('AUTH_SIGNED_IN');
    },
    [supabase],
  );

  const sendEmailSignUpCode = useCallback(
    async (email: string) => {
      if (!supabase) {
        setMessage('AUTH_NOT_CONFIGURED');
        return authError({ message: 'AUTH_NOT_CONFIGURED' });
      }

      setMessage(null);
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          shouldCreateUser: true,
          data: {
            password_setup_required: true,
            password_set: false,
          },
        },
      });

      if (error) {
        setMessage(error.message);
        return authError(error);
      }

      markPasswordSetupPending();
      return authSuccess('AUTH_CODE_SENT');
    },
    [supabase],
  );

  const verifyEmailCode = useCallback(
    async (email: string, token: string) => {
      if (!supabase) {
        setMessage('AUTH_NOT_CONFIGURED');
        return authError({ message: 'AUTH_NOT_CONFIGURED' });
      }

      setMessage(null);
      const { error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'email',
      });

      if (error) {
        setMessage(error.message);
        return authError(error);
      }

      markPasswordSetupPending();
      setPasswordSetupRequired(true);
      return authSuccess('AUTH_EMAIL_VERIFIED');
    },
    [supabase],
  );

  const setPassword = useCallback(
    async (password: string) => {
      if (!supabase) {
        setMessage('AUTH_NOT_CONFIGURED');
        return authError({ message: 'AUTH_NOT_CONFIGURED' });
      }

      setMessage(null);
      const metadata = (session?.user.user_metadata ?? {}) as Record<string, unknown>;
      const { error } = await supabase.auth.updateUser({
        password,
        data: {
          ...metadata,
          password_setup_required: false,
          password_set: true,
        },
      });

      if (error) {
        setMessage(error.message);
        return authError(error);
      }

      setPasswordRecovery(false);
      setPasswordSetupRequired(false);
      clearPasswordSetupPending();
      return authSuccess('AUTH_PASSWORD_SET');
    },
    [session, supabase],
  );

  const sendPasswordReset = useCallback(
    async (email: string) => {
      if (!supabase) {
        setMessage('AUTH_NOT_CONFIGURED');
        return authError({ message: 'AUTH_NOT_CONFIGURED' });
      }

      setMessage(null);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/`,
      });

      if (error) {
        setMessage(error.message);
        return authError(error);
      }

      return authSuccess('AUTH_RESET_SENT');
    },
    [supabase],
  );

  const signInWithGoogle = useCallback(async () => {
    if (!supabase) {
      setMessage('AUTH_NOT_CONFIGURED');
      return;
    }

    setPasswordRecovery(false);
    setPasswordSetupRequired(false);
    clearPasswordSetupPending();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`,
        skipBrowserRedirect: true,
      },
    });

    if (error) setMessage(error.message);
    if (data?.url) window.location.assign(data.url);
  }, [supabase]);

  const signOut = useCallback(async () => {
    if (!supabase) return;
    const { error } = await supabase.auth.signOut();
    if (error) setMessage(error.message);
  }, [supabase]);

  const value = useMemo<AuthContextValue>(
    () => ({
      authEnabled: authFeatureEnabled,
      configured: supabaseConfigured,
      loading,
      message,
      passwordRecovery,
      passwordSetupRequired,
      session,
      user: session?.user ?? null,
      clearMessage,
      clearPasswordRecovery,
      sendEmailSignUpCode,
      sendPasswordReset,
      setPassword,
      signInWithEmailPassword,
      signInWithGoogle,
      signOut,
      verifyEmailCode,
    }),
    [
      clearMessage,
      clearPasswordRecovery,
      loading,
      message,
      passwordRecovery,
      passwordSetupRequired,
      sendEmailSignUpCode,
      sendPasswordReset,
      session,
      setPassword,
      signInWithEmailPassword,
      signInWithGoogle,
      signOut,
      verifyEmailCode,
    ],
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
