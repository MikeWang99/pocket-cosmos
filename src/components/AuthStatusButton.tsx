import { LogIn, LogOut, ShieldAlert, UserCircle2 } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { useLanguage } from '../LanguageContext';

export const AuthStatusButton: React.FC = () => {
  const { t } = useLanguage();
  const { authEnabled, configured, loading, message, user, signInWithGoogle, signOut } = useAuth();

  if (!authEnabled) return null;

  if (!configured) {
    return (
      <div
        className="inline-flex h-10 items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 text-xs font-semibold text-amber-700"
        title={t.auth.previewConfigTitle}
      >
        <ShieldAlert className="h-4 w-4" />
        {t.auth.previewConfig}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="inline-flex h-10 items-center rounded-full border border-white/10 bg-white/[0.04] px-4 text-xs font-semibold text-slate-500">
        {t.auth.loading}
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex max-w-full flex-wrap items-center gap-2">
        <div className="inline-flex h-10 min-w-0 items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-4 text-xs font-semibold text-emerald-700">
          <UserCircle2 className="h-4 w-4 shrink-0" />
          <span className="truncate max-w-[210px]">{user.email ?? t.auth.signedIn}</span>
        </div>
        <button
          type="button"
          onClick={() => void signOut()}
          className="inline-flex h-10 items-center gap-2 rounded-full border border-white/10 px-4 text-xs font-semibold text-slate-500 transition-colors hover:border-nebula/50 hover:text-nebula"
        >
          <LogOut className="h-4 w-4" />
          {t.auth.signOut}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-2 md:items-end">
      <button
        type="button"
        onClick={() => void signInWithGoogle()}
        className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-white px-5 text-xs font-bold uppercase tracking-widest text-black transition-colors hover:bg-nebula hover:text-white"
      >
        <LogIn className="h-4 w-4" />
        {t.auth.signInWithGoogle}
      </button>
      {message && <div className="max-w-[260px] text-xs leading-relaxed text-rose-600">{message}</div>}
    </div>
  );
};
