import React, { useState } from 'react';
import { LogOut, ShieldCheck, UserRound } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { useLanguage } from '../LanguageContext';

interface AuthStatusButtonProps {
  onSignIn: () => void;
}

export const AuthStatusButton: React.FC<AuthStatusButtonProps> = ({ onSignIn }) => {
  const { t } = useLanguage();
  const { authEnabled, user, profile, isAdmin, loading, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  if (!authEnabled) return null;

  if (loading) {
    return (
      <div className="h-10 rounded-full border border-white/10 px-4 text-xs font-semibold text-slate-400 grid place-items-center">
        {t.auth.loadingShort}
      </div>
    );
  }

  if (!user) {
    return (
      <button
        type="button"
        onClick={onSignIn}
        className="inline-flex h-10 items-center justify-center rounded-full bg-slate-900 px-5 text-xs font-bold tracking-widest text-white transition-colors hover:bg-nebula"
      >
        {t.auth.signIn}
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setMenuOpen((value) => !value)}
        className="inline-flex h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 text-xs font-semibold text-slate-700 transition-colors hover:border-nebula/40 hover:text-nebula"
      >
        <UserRound className="h-4 w-4" />
        <span className="hidden max-w-[150px] truncate sm:inline">{profile?.display_name || user.email}</span>
        {isAdmin && <ShieldCheck className="h-4 w-4 text-emerald-600" />}
      </button>

      {menuOpen && (
        <div className="absolute right-0 z-50 mt-2 w-72 rounded-lg border border-white/10 bg-white p-4 text-sm shadow-xl">
          <div className="text-[10px] uppercase tracking-widest text-slate-500">{t.auth.signedInAs}</div>
          <div className="mt-1 truncate font-semibold text-slate-900">{profile?.display_name || user.email}</div>
          {isAdmin && (
            <div className="mt-3 inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-emerald-700">
              <ShieldCheck className="h-3 w-3" />
              {t.auth.adminBadge}
            </div>
          )}
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              signOut();
            }}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-slate-600 transition-colors hover:border-nebula/40 hover:text-nebula"
          >
            <LogOut className="h-4 w-4" />
            {t.auth.signOut}
          </button>
        </div>
      )}
    </div>
  );
};
