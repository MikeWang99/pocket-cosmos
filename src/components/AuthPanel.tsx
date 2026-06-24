import React, { useState } from 'react';
import { LogIn, LogOut, Mail, ShieldCheck } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { useLanguage } from '../LanguageContext';

export const AuthPanel: React.FC = () => {
  const { t } = useLanguage();
  const {
    authEnabled,
    user,
    profile,
    isAdmin,
    loading,
    authMessage,
    signInWithEmail,
    signInWithGoogle,
    signOut,
  } = useAuth();
  const [email, setEmail] = useState('');
  const [emailBusy, setEmailBusy] = useState(false);

  const submitEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    setEmailBusy(true);
    await signInWithEmail(email.trim());
    setEmailBusy(false);
  };

  if (!authEnabled) {
    return (
      <div className="rounded-lg border border-amber-500/20 bg-amber-500/8 p-4 text-sm text-amber-800">
        <div className="font-semibold">{t.auth.offlineTitle}</div>
        <p className="mt-1 leading-relaxed">{t.auth.offlineText}</p>
      </div>
    );
  }

  if (loading) {
    return <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4 text-sm text-slate-500">{t.auth.loading}</div>;
  }

  if (user) {
    return (
      <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-slate-500">{t.auth.signedInAs}</div>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-800">
              {profile?.display_name || user.email}
              {isAdmin && (
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-[10px] uppercase tracking-widest text-emerald-700">
                  <ShieldCheck className="h-3 w-3" />
                  {t.auth.adminBadge}
                </span>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={signOut}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-slate-600 transition-colors hover:border-nebula/40 hover:text-nebula"
          >
            <LogOut className="h-4 w-4" />
            {t.auth.signOut}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-nebula">
        <LogIn className="h-4 w-4" />
        {t.auth.loginTitle}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">{t.auth.loginText}</p>

      <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_auto]">
        <form onSubmit={submitEmail} className="flex min-w-0 gap-2">
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={t.auth.emailPlaceholder}
            className="min-w-0 flex-1 rounded-full border border-white/10 bg-slate-50 px-4 py-2 text-sm outline-none transition-colors focus:border-nebula/60"
          />
          <button
            type="submit"
            disabled={emailBusy || !email.trim()}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white transition-colors hover:bg-nebula disabled:opacity-30"
            title={t.auth.emailLogin}
          >
            <Mail className="h-4 w-4" />
          </button>
        </form>

        <button
          type="button"
          disabled
          onClick={signInWithGoogle}
          className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-slate-400 opacity-60"
          title={t.auth.googleNote}
        >
          {t.auth.googleLogin}
        </button>

        <button
          type="button"
          disabled
          className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-slate-400 opacity-60"
          title={t.auth.wechatNote}
        >
          {t.auth.wechatLogin}
        </button>
      </div>

      {authMessage && <div className="mt-3 text-xs leading-relaxed text-slate-500">{authMessage}</div>}
    </div>
  );
};
