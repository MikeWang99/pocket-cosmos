import React, { useEffect, useState } from 'react';
import { Mail, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useAuth } from '../AuthContext';
import { useLanguage } from '../LanguageContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const { authEnabled, user, authMessage, signInWithEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (isOpen) setEmail('');
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && user) onClose();
  }, [isOpen, user, onClose]);

  const submitEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    setBusy(true);
    await signInWithEmail(email.trim());
    setBusy(false);
  };

  const readableMessage = authMessage === 'AUTH_LINK_SENT' ? t.auth.linkSent : authMessage;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-slate-950/35 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-modal-title"
            className="w-full max-w-md rounded-lg border border-white/10 bg-white p-6 shadow-2xl"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.18 }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-widest text-nebula">{t.auth.accountAccess}</div>
                <h2 id="auth-modal-title" className="mt-2 font-serif text-3xl text-slate-950">
                  {t.auth.loginTitle}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{t.auth.loginText}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 text-slate-500 transition-colors hover:border-nebula/40 hover:text-nebula"
                title={t.auth.close}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {!authEnabled ? (
              <div className="mt-6 rounded-lg border border-amber-500/20 bg-amber-500/8 p-4 text-sm text-amber-800">
                <div className="font-semibold">{t.auth.offlineTitle}</div>
                <p className="mt-1 leading-relaxed">{t.auth.offlineText}</p>
              </div>
            ) : (
              <form onSubmit={submitEmail} className="mt-6 space-y-4">
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">{t.auth.emailLabel}</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder={t.auth.emailPlaceholder}
                    className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition-colors focus:border-nebula/70"
                    autoComplete="email"
                  />
                </label>
                <button
                  type="submit"
                  disabled={busy || !email.trim()}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-5 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-nebula disabled:opacity-30"
                >
                  <Mail className="h-4 w-4" />
                  {busy ? t.auth.sendingLink : t.auth.emailLogin}
                </button>
              </form>
            )}

            {readableMessage && <div className="mt-4 rounded-lg bg-slate-50 p-3 text-xs leading-relaxed text-slate-500">{readableMessage}</div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
