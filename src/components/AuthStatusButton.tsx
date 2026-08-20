import { useEffect, useState, type FC } from 'react';
import { CheckCircle2, LogIn, LogOut, ShieldAlert, UserCircle2, X } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { useLanguage } from '../LanguageContext';
import { AuthModal } from './AuthModal';

interface AuthStatusButtonProps {
  compact?: boolean;
}

export const AuthStatusButton: FC<AuthStatusButtonProps> = ({ compact = false }) => {
  const { t } = useLanguage();
  const { authEnabled, configured, loading, emailJustConfirmed, clearEmailJustConfirmed, passwordRecovery, passwordSetupRequired, user, signOut } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    if (passwordRecovery || passwordSetupRequired) setAuthModalOpen(true);
  }, [passwordRecovery, passwordSetupRequired]);

  if (!authEnabled) return null;

  if (!configured) {
    return (
      <div
        className={`${compact ? 'inline-flex min-h-11 w-full flex-col items-center justify-center rounded-2xl px-2 py-2 text-center leading-tight' : 'inline-flex h-10 rounded-full px-4'} gap-1.5 border border-amber-500/30 bg-amber-500/10 text-xs font-semibold text-amber-700`}
        title={t.auth.previewConfigTitle}
      >
        <ShieldAlert className="h-4 w-4" />
        <span className={compact ? 'text-[10px]' : ''}>{compact ? 'Setup' : t.auth.previewConfig}</span>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={`${compact ? 'inline-flex min-h-11 w-full flex-col items-center justify-center rounded-2xl px-2 py-2 text-center leading-tight' : 'inline-flex h-10 rounded-full px-4'} border border-[rgba(15,23,42,0.1)] bg-[rgba(21,94,117,0.06)] text-xs font-semibold text-slate-500`}>
        {compact ? '...' : t.auth.loading}
      </div>
    );
  }

  if (user) {
    return (
      <>
        {emailJustConfirmed && (
          <div className="mb-2 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-800">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
            <span>{(t.auth.messages as Record<string, string>)['AUTH_EMAIL_CONFIRMED']}</span>
            <button
              type="button"
              onClick={clearEmailJustConfirmed}
              className="ml-auto rounded p-0.5 text-emerald-700 transition-colors hover:text-emerald-700"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
        {compact ? (
          <div className="flex w-full flex-col gap-2">
            <button
              type="button"
              onClick={() => setAuthModalOpen(true)}
              className="inline-flex min-h-11 w-full flex-col items-center justify-center gap-1 rounded-2xl border border-emerald-500/25 bg-emerald-500/10 px-2 py-2 text-[10px] font-semibold text-emerald-700 transition-colors hover:border-emerald-500/40 hover:bg-emerald-500/14"
              title={user.email ?? t.auth.signedIn}
            >
              <UserCircle2 className="h-4 w-4 shrink-0" />
              <span className="leading-none">{t.auth.accountAccess}</span>
            </button>
            <button
              type="button"
              onClick={() => void signOut()}
              className="inline-flex min-h-11 w-full flex-col items-center justify-center gap-1 rounded-2xl border border-[rgba(15,23,42,0.1)] bg-surface px-2 py-2 text-[10px] font-semibold text-slate-500 transition-colors hover:border-nebula/50 hover:text-nebula"
            >
              <LogOut className="h-4 w-4" />
              <span className="leading-none">{t.auth.signOut}</span>
            </button>
          </div>
        ) : (
          <div className="flex max-w-full flex-wrap items-center gap-2">
            <div className="inline-flex h-10 min-w-0 items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-4 text-xs font-semibold text-emerald-700">
              <UserCircle2 className="h-4 w-4 shrink-0" />
              <span className="truncate max-w-[210px]">{user.email ?? t.auth.signedIn}</span>
            </div>
            <button
              type="button"
              onClick={() => void signOut()}
              className="inline-flex h-10 items-center gap-2 rounded-full border border-[rgba(15,23,42,0.1)] px-4 text-xs font-semibold text-slate-500 transition-colors hover:border-nebula/50 hover:text-nebula"
            >
              <LogOut className="h-4 w-4" />
              {t.auth.signOut}
            </button>
          </div>
        )}
        <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      </>
    );
  }

  return (
    <div className={`flex ${compact ? 'w-full' : 'flex-col items-start gap-2 md:items-end'}`}>
      <button
        type="button"
        onClick={() => setAuthModalOpen(true)}
        className={`${compact ? 'min-h-11 w-full flex-col rounded-2xl px-2 py-2 text-[10px]' : 'h-10 rounded-full px-4 text-sm'} inline-flex items-center justify-center gap-1.5 border border-nebula/25 bg-surface font-semibold text-nebula shadow-sm transition-colors hover:border-nebula/45 hover:bg-nebula hover:text-on-accent`}
      >
        <LogIn className="h-4 w-4" />
        <span className="leading-none">{compact ? t.auth.loginTab : t.auth.openAuth}</span>
      </button>
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
};
