import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, KeyRound, Lock, LogIn, Mail, RefreshCcw, ShieldCheck, X } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { useLanguage } from '../LanguageContext';

type AuthMode = 'login' | 'signup-email' | 'signup-code' | 'signup-password' | 'reset-request' | 'reset-password';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const normalizeEmail = (email: string) => email.trim().toLowerCase();

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const {
    authEnabled,
    configured,
    passwordRecovery,
    passwordSetupRequired,
    user,
    clearPasswordRecovery,
    sendEmailSignUpCode,
    sendPasswordReset,
    setPassword,
    signInWithEmailPassword,
    signInWithGoogle,
    signOut,
    verifyEmailCode,
  } = useAuth();

  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPasswordInput] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const readableFeedback = useMemo(() => {
    if (!feedback) return null;
    const messages = t.auth.messages as Record<string, string>;
    return messages[feedback] ?? feedback;
  }, [feedback, t.auth.messages]);

  const isPasswordReady = password.length >= 8 && password === confirmPassword;

  useEffect(() => {
    if (!isOpen) return;
    setMode(passwordRecovery ? 'reset-password' : passwordSetupRequired ? 'signup-password' : 'login');
    setCode('');
    setPasswordInput('');
    setConfirmPassword('');
    setFeedback(null);
    if (passwordRecovery && user?.email) setEmail(user.email);
  }, [isOpen, passwordRecovery, passwordSetupRequired, user?.email]);

  useEffect(() => {
    if (!isOpen) return;
    if (passwordRecovery) {
      setMode('reset-password');
      return;
    }
    if (passwordSetupRequired) {
      setMode('signup-password');
    }
  }, [isOpen, passwordRecovery, passwordSetupRequired]);

  const closeModal = ({ keepSession = false }: { keepSession?: boolean } = {}) => {
    clearPasswordRecovery();
    if (!keepSession && (passwordRecovery || passwordSetupRequired)) {
      void signOut();
    }
    onClose();
  };

  const submitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    const result = await signInWithEmailPassword(normalizeEmail(email), password);
    setBusy(false);

    if (!result.ok) {
      setFeedback(result.message ?? 'AUTH_LOGIN_FAILED');
      return;
    }

    closeModal();
  };

  const submitEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    const result = await sendEmailSignUpCode(normalizeEmail(email));
    setBusy(false);

    if (!result.ok) {
      setFeedback(result.message ?? 'AUTH_CODE_FAILED');
      return;
    }

    setFeedback(result.message ?? 'AUTH_CODE_SENT');
    setMode('signup-code');
  };

  const submitCode = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    const result = await verifyEmailCode(normalizeEmail(email), code.trim());
    setBusy(false);

    if (!result.ok) {
      setFeedback(result.message ?? 'AUTH_CODE_INVALID');
      return;
    }

    setFeedback(result.message ?? 'AUTH_EMAIL_VERIFIED');
    setMode('signup-password');
  };

  const submitNewPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isPasswordReady) {
      setFeedback(password.length < 8 ? 'AUTH_PASSWORD_TOO_SHORT' : 'AUTH_PASSWORD_MISMATCH');
      return;
    }

    setBusy(true);
    const result = await setPassword(password);
    setBusy(false);

    if (!result.ok) {
      setFeedback(result.message ?? 'AUTH_PASSWORD_FAILED');
      return;
    }

    setFeedback(result.message ?? 'AUTH_PASSWORD_SET');
    window.setTimeout(() => closeModal({ keepSession: true }), 700);
  };

  const submitResetRequest = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    const result = await sendPasswordReset(normalizeEmail(email));
    setBusy(false);
    setFeedback(result.message ?? (result.ok ? 'AUTH_RESET_SENT' : 'AUTH_RESET_FAILED'));
  };

  const resendCode = async () => {
    if (!email.trim()) return;
    setBusy(true);
    const result = await sendEmailSignUpCode(normalizeEmail(email));
    setBusy(false);
    setFeedback(result.message ?? (result.ok ? 'AUTH_CODE_SENT' : 'AUTH_CODE_FAILED'));
  };

  const startGoogle = async () => {
    setBusy(true);
    await signInWithGoogle();
    setBusy(false);
  };

  const switchMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    setFeedback(null);
    setCode('');
    setPasswordInput('');
    setConfirmPassword('');
  };

  const renderPrimaryButton = (label: string, icon: React.ReactNode, disabled = false) => (
    <button
      type="submit"
      disabled={busy || disabled}
      className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-5 text-xs font-bold uppercase text-[#ffffff] transition-colors hover:bg-nebula disabled:opacity-35"
    >
      {icon}
      {busy ? t.auth.working : label}
    </button>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[120] grid place-items-center bg-slate-950/40 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label={t.auth.close}
            className="absolute inset-0 h-full w-full cursor-default"
            onClick={() => closeModal()}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-modal-title"
            className="relative w-full max-w-[520px] overflow-hidden rounded-lg border border-slate-200 bg-[#ffffff] shadow-2xl"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.18 }}
          >
            <div className="border-b border-slate-200 px-6 pb-5 pt-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[10px] font-semibold uppercase text-nebula">{t.auth.accountAccess}</div>
                  <h2 id="auth-modal-title" className="mt-2 font-serif text-3xl text-slate-950">
                    {mode === 'reset-password' ? t.auth.resetPasswordTitle : t.auth.modalTitle}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => closeModal()}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-nebula/40 hover:text-nebula"
                  title={t.auth.close}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {mode !== 'reset-password' && (
                <div className="mt-5 grid grid-cols-2 rounded-lg border border-slate-200 bg-slate-50 p-1">
                  <button
                    type="button"
                    onClick={() => switchMode('login')}
                    className={`h-10 rounded-md text-xs font-semibold transition-colors ${
                      mode === 'login' || mode === 'reset-request' ? 'bg-[#ffffff] text-slate-950 shadow-sm' : 'text-slate-500 hover:text-slate-950'
                    }`}
                  >
                    {t.auth.loginTab}
                  </button>
                  <button
                    type="button"
                    onClick={() => switchMode('signup-email')}
                    className={`h-10 rounded-md text-xs font-semibold transition-colors ${
                      mode.startsWith('signup') ? 'bg-[#ffffff] text-slate-950 shadow-sm' : 'text-slate-500 hover:text-slate-950'
                    }`}
                  >
                    {t.auth.signupTab}
                  </button>
                </div>
              )}

              {mode.startsWith('signup') && (
                <div className="mt-5 grid grid-cols-3 gap-2 text-[11px] font-semibold text-slate-500">
                  {[t.auth.stepEmail, t.auth.stepVerify, t.auth.stepPassword].map((step, index) => {
                    const activeIndex = mode === 'signup-email' ? 0 : mode === 'signup-code' ? 1 : 2;
                    return (
                      <div
                        key={step}
                        className={`rounded-full border px-3 py-2 text-center ${
                          index <= activeIndex ? 'border-nebula/30 bg-nebula/8 text-nebula' : 'border-slate-200 bg-slate-50'
                        }`}
                      >
                        {step}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="px-6 py-6">
              {!authEnabled || !configured ? (
                <div className="rounded-lg border border-amber-500/20 bg-amber-500/10 p-4 text-sm leading-relaxed text-amber-800">
                  {t.auth.previewConfig}
                </div>
              ) : (
                <>
                  {mode === 'login' && (
                    <form onSubmit={submitLogin} className="space-y-4">
                      <label className="block">
                        <span className="text-xs font-semibold uppercase text-slate-500">{t.auth.emailLabel}</span>
                        <input
                          type="email"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          placeholder={t.auth.emailPlaceholder}
                          className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition-colors focus:border-nebula/70"
                          autoComplete="email"
                          required
                        />
                      </label>
                      <label className="block">
                        <span className="text-xs font-semibold uppercase text-slate-500">{t.auth.passwordLabel}</span>
                        <input
                          type="password"
                          value={password}
                          onChange={(event) => setPasswordInput(event.target.value)}
                          placeholder={t.auth.passwordPlaceholder}
                          className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition-colors focus:border-nebula/70"
                          autoComplete="current-password"
                          required
                        />
                      </label>
                      {renderPrimaryButton(t.auth.loginAction, <LogIn className="h-4 w-4" />, !email.trim() || !password)}
                      <button
                        type="button"
                        onClick={() => switchMode('reset-request')}
                        className="text-sm font-semibold text-nebula transition-colors hover:text-quantum"
                      >
                        {t.auth.forgotPassword}
                      </button>
                    </form>
                  )}

                  {mode === 'signup-email' && (
                    <form onSubmit={submitEmail} className="space-y-4">
                      <label className="block">
                        <span className="text-xs font-semibold uppercase text-slate-500">{t.auth.emailLabel}</span>
                        <input
                          type="email"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          placeholder={t.auth.emailPlaceholder}
                          className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition-colors focus:border-nebula/70"
                          autoComplete="email"
                          required
                        />
                      </label>
                      {renderPrimaryButton(t.auth.sendCode, <Mail className="h-4 w-4" />, !email.trim())}
                    </form>
                  )}

                  {mode === 'signup-code' && (
                    <form onSubmit={submitCode} className="space-y-4">
                      <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
                        {t.auth.codeSentTo} <span className="font-semibold text-slate-950">{normalizeEmail(email)}</span>
                      </div>
                      <div className="rounded-lg border border-nebula/20 bg-nebula/8 p-3 text-sm leading-relaxed text-slate-600">
                        {t.auth.emailLinkFallback}
                      </div>
                      <label className="block">
                        <span className="text-xs font-semibold uppercase text-slate-500">{t.auth.codeLabel}</span>
                        <input
                          type="text"
                          value={code}
                          onChange={(event) => setCode(event.target.value)}
                          placeholder={t.auth.codePlaceholder}
                          className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-center text-lg font-semibold tracking-[0.4em] outline-none transition-colors focus:border-nebula/70"
                          autoComplete="one-time-code"
                          inputMode="numeric"
                          required
                        />
                      </label>
                      {renderPrimaryButton(t.auth.verifyCode, <ShieldCheck className="h-4 w-4" />, code.trim().length < 6)}
                      <button
                        type="button"
                        onClick={resendCode}
                        disabled={busy}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-nebula transition-colors hover:text-quantum disabled:opacity-40"
                      >
                        <RefreshCcw className="h-4 w-4" />
                        {t.auth.resendCode}
                      </button>
                    </form>
                  )}

                  {(mode === 'signup-password' || mode === 'reset-password') && (
                    <form onSubmit={submitNewPassword} className="space-y-4">
                      <label className="block">
                        <span className="text-xs font-semibold uppercase text-slate-500">{t.auth.newPasswordLabel}</span>
                        <input
                          type="password"
                          value={password}
                          onChange={(event) => setPasswordInput(event.target.value)}
                          placeholder={t.auth.newPasswordPlaceholder}
                          className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition-colors focus:border-nebula/70"
                          autoComplete="new-password"
                          required
                        />
                      </label>
                      <label className="block">
                        <span className="text-xs font-semibold uppercase text-slate-500">{t.auth.confirmPasswordLabel}</span>
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(event) => setConfirmPassword(event.target.value)}
                          placeholder={t.auth.confirmPasswordPlaceholder}
                          className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition-colors focus:border-nebula/70"
                          autoComplete="new-password"
                          required
                        />
                      </label>
                      {renderPrimaryButton(t.auth.setPasswordAction, <Lock className="h-4 w-4" />, !isPasswordReady)}
                    </form>
                  )}

                  {mode === 'reset-request' && (
                    <form onSubmit={submitResetRequest} className="space-y-4">
                      <label className="block">
                        <span className="text-xs font-semibold uppercase text-slate-500">{t.auth.emailLabel}</span>
                        <input
                          type="email"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          placeholder={t.auth.emailPlaceholder}
                          className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition-colors focus:border-nebula/70"
                          autoComplete="email"
                          required
                        />
                      </label>
                      {renderPrimaryButton(t.auth.sendResetLink, <KeyRound className="h-4 w-4" />, !email.trim())}
                      <button
                        type="button"
                        onClick={() => switchMode('login')}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-nebula transition-colors hover:text-quantum"
                      >
                        <ArrowRight className="h-4 w-4 rotate-180" />
                        {t.auth.backToLogin}
                      </button>
                    </form>
                  )}

                  {mode !== 'reset-password' && (
                    <div className="mt-6">
                      <div className="mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase text-slate-400">
                        <span className="h-px flex-1 bg-slate-200" />
                        {t.auth.or}
                        <span className="h-px flex-1 bg-slate-200" />
                      </div>
                      <button
                        type="button"
                        onClick={startGoogle}
                        disabled={busy}
                        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-[#ffffff] px-5 text-xs font-bold uppercase text-slate-950 transition-colors hover:border-nebula/40 hover:text-nebula disabled:opacity-35"
                      >
                        <LogIn className="h-4 w-4" />
                        {t.auth.signInWithGoogle}
                      </button>
                    </div>
                  )}

                  {readableFeedback && (
                    <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm leading-relaxed text-slate-600">
                      {readableFeedback}
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
