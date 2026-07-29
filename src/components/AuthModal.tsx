import React, { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { KeyRound, Lock, LogIn, Mail, UserPlus, X } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { useLanguage } from '../LanguageContext';

type AuthMode = 'login' | 'signup' | 'confirm-email' | 'reset-request' | 'reset-password';

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
    user,
    clearPasswordRecovery,
    resendConfirmationEmail,
    sendPasswordReset,
    signInWithEmailPassword,
    signInWithGoogle,
    signUpWithEmailPassword,
    signOut,
  } = useAuth();

  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPasswordInput] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState<'error' | 'success'>('error');

  const readableFeedback = useMemo(() => {
    if (!feedback) return null;
    const messages = t.auth.messages as Record<string, string>;
    return messages[feedback] ?? feedback;
  }, [feedback, t.auth.messages]);

  const isPasswordValid = password.length >= 8;
  const passwordsMatch = password === confirmPassword;

  useEffect(() => {
    if (!isOpen) return;
    setMode(passwordRecovery ? 'reset-password' : 'login');
    setPasswordInput('');
    setConfirmPassword('');
    setFeedback(null);
    if (passwordRecovery && user?.email) setEmail(user.email);
  }, [isOpen, passwordRecovery, user?.email]);

  const closeModal = ({ keepSession = false }: { keepSession?: boolean } = {}) => {
    clearPasswordRecovery();
    if (!keepSession && passwordRecovery) {
      void signOut();
    }
    onClose();
  };

  const submitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setFeedback(null);
    const result = await signInWithEmailPassword(normalizeEmail(email), password);
    setBusy(false);

    if (!result.ok) {
      setFeedback(result.message ?? 'AUTH_LOGIN_FAILED');
      setFeedbackType('error');
      return;
    }

    closeModal();
  };

  const startGoogleSignIn = async () => {
    setBusy(true);
    setFeedback(null);
    const result = await signInWithGoogle();

    if (!result.ok) {
      setBusy(false);
      setFeedback(result.message ?? 'AUTH_GOOGLE_FAILED');
      setFeedbackType('error');
    }
  };

  const submitSignup = async () => {
    if (!isPasswordValid) {
      setFeedback('AUTH_PASSWORD_TOO_SHORT');
      setFeedbackType('error');
      return;
    }
    if (!passwordsMatch) {
      setFeedback('AUTH_PASSWORD_MISMATCH');
      setFeedbackType('error');
      return;
    }

    setBusy(true);
    setFeedback(null);
    const result = await signUpWithEmailPassword(normalizeEmail(email), password);
    setBusy(false);

    if (!result.ok) {
      setFeedback(result.message ?? 'AUTH_SIGNUP_FAILED');
      setFeedbackType('error');
      return;
    }

    setFeedback('AUTH_SIGNUP_SUCCESS');
    setFeedbackType('success');
    // 注册成功后切换到确认邮件提示模式
    setMode('confirm-email');
  };

  const submitResendConfirmation = async () => {
    setBusy(true);
    setFeedback(null);
    const result = await resendConfirmationEmail(normalizeEmail(email));
    setBusy(false);
    setFeedback(result.message ?? (result.ok ? 'AUTH_CONFIRMATION_RESENT' : 'AUTH_SIGNUP_FAILED'));
    setFeedbackType(result.ok ? 'success' : 'error');
  };

  const submitResetRequest = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setFeedback(null);
    const result = await sendPasswordReset(normalizeEmail(email));
    setBusy(false);
    setFeedback(result.message ?? (result.ok ? 'AUTH_RESET_SENT' : 'AUTH_RESET_FAILED'));
    setFeedbackType(result.ok ? 'success' : 'error');
  };

  const switchMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    setFeedback(null);
    setPasswordInput('');
    setConfirmPassword('');
  };

  const renderGoogleButton = () => (
    <button
      type="button"
      onClick={() => void startGoogleSignIn()}
      disabled={busy}
      className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-[#d1d5db] bg-[#ffffff] px-5 text-sm font-semibold text-[#1f2937] shadow-sm transition-colors hover:border-nebula/40 hover:bg-[#f9fafb] disabled:cursor-not-allowed disabled:opacity-50"
    >
      <span className="grid h-5 w-5 place-items-center rounded-full bg-[#ffffff] text-base font-bold text-[#4285f4]">
        G
      </span>
      {busy ? t.auth.working : t.auth.googleAction}
    </button>
  );

  const renderAuthDivider = () => (
    <div className="flex items-center gap-3 py-1 text-xs font-medium text-gray-400">
      <span className="h-px flex-1 bg-gray-200" />
      {t.auth.or}
      <span className="h-px flex-1 bg-gray-200" />
    </div>
  );

  const renderPrimaryButton = (label: string, icon: React.ReactNode, disabled = false) => (
    <button
      type="submit"
      disabled={busy || disabled}
      className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-nebula px-5 text-sm font-semibold text-[#ffffff] transition-colors hover:bg-nebula/90 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {icon}
      {busy ? t.auth.working : label}
    </button>
  );

  const modal = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[120] grid place-items-end bg-[rgba(15,23,42,0.42)] p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-sm sm:place-items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => closeModal()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-modal-title"
            className="relative max-h-[calc(100dvh-1.5rem)] w-full max-w-md overflow-y-auto rounded-2xl bg-[#ffffff] shadow-2xl sm:max-h-[calc(100dvh-2rem)]"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="border-b border-[#e5e7eb] px-5 pb-4 pt-5 sm:px-6 sm:pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 id="auth-modal-title" className="text-xl font-bold text-[#111827] sm:text-2xl">
                    {mode === 'reset-password' ? t.auth.resetPasswordTitle : mode === 'signup' ? t.auth.signupTab : t.auth.loginTab}
                  </h2>
                  <p className="mt-1 text-sm text-[#6b7280]">
                    {mode === 'login' && t.auth.loginSubtitle}
                    {mode === 'signup' && t.auth.signupSubtitle}
                    {mode === 'reset-request' && t.auth.resetRequestSubtitle}
                    {mode === 'reset-password' && t.auth.resetPasswordSubtitle}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => closeModal()}
                  className="rounded-full p-2 text-[#9ca3af] transition-colors hover:bg-[#f3f4f6] hover:text-[#4b5563]"
                  title={t.auth.close}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="px-5 py-5 sm:px-6 sm:py-6">
              {!authEnabled || !configured ? (
                <div className="rounded-lg border border-amber-500/20 bg-amber-50 p-4 text-sm text-amber-800">
                  {t.auth.previewConfig}
                </div>
              ) : (
                <>
                  {/* Feedback Message */}
                  {readableFeedback && (
                    <div
                      className={`mb-4 rounded-lg p-3 text-sm ${
                        feedbackType === 'success'
                          ? 'bg-green-50 text-green-800 border border-green-200'
                          : 'bg-red-50 text-red-800 border border-red-200'
                      }`}
                    >
                      {readableFeedback}
                    </div>
                  )}

                  {/* Login Mode */}
                  {mode === 'login' && (
                    <form onSubmit={submitLogin} className="space-y-4">
                      {renderGoogleButton()}
                      {renderAuthDivider()}
                      <div>
                        <label className="mb-1 block text-sm font-medium text-[#374151]">
                          {t.auth.emailLabel}
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          placeholder={t.auth.emailPlaceholder}
                          className="w-full rounded-lg border border-[#d1d5db] bg-[#ffffff] px-4 py-2.5 text-sm text-[#111827] outline-none transition-colors placeholder:text-[#9ca3af] focus:border-nebula focus:ring-2 focus:ring-nebula/20"
                          autoComplete="email"
                          required
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-[#374151]">
                          {t.auth.passwordLabel}
                        </label>
                        <input
                          type="password"
                          value={password}
                          onChange={(event) => setPasswordInput(event.target.value)}
                          placeholder={t.auth.passwordPlaceholder}
                          className="w-full rounded-lg border border-[#d1d5db] bg-[#ffffff] px-4 py-2.5 text-sm text-[#111827] outline-none transition-colors placeholder:text-[#9ca3af] focus:border-nebula focus:ring-2 focus:ring-nebula/20"
                          autoComplete="current-password"
                          required
                        />
                      </div>
                      {renderPrimaryButton(t.auth.loginAction, <LogIn className="h-4 w-4" />, !email.trim() || !password)}
                      
                      <div className="flex items-center justify-between text-sm">
                        <button
                          type="button"
                          onClick={() => switchMode('reset-request')}
                          className="text-nebula hover:text-nebula/80 font-medium"
                        >
                          {t.auth.forgotPassword}
                        </button>
                        <button
                          type="button"
                          onClick={() => switchMode('signup')}
                          className="text-nebula hover:text-nebula/80 font-medium"
                        >
                          {t.auth.signupTab}
                        </button>
                      </div>

                      {feedback === 'AUTH_EMAIL_NOT_CONFIRMED' && (
                        <button
                          type="button"
                          onClick={() => void submitResendConfirmation()}
                          disabled={busy}
                          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-nebula/30 bg-[#ffffff] px-4 text-xs font-semibold text-nebula transition-colors hover:bg-nebula/5 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Mail className="h-3.5 w-3.5" />
                          {busy ? t.auth.working : (t.auth.messages as Record<string, string>)['AUTH_RESEND_CONFIRMATION']}
                        </button>
                      )}

                    </form>
                  )}

                  {/* Signup Mode */}
                  {mode === 'signup' && (
                    <div className="space-y-4">
                      {renderGoogleButton()}
                      {renderAuthDivider()}
                      <div>
                        <label className="mb-1 block text-sm font-medium text-[#374151]">
                          {t.auth.emailLabel}
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          placeholder={t.auth.emailPlaceholder}
                          className="w-full rounded-lg border border-[#d1d5db] bg-[#ffffff] px-4 py-2.5 text-sm text-[#111827] outline-none transition-colors placeholder:text-[#9ca3af] focus:border-nebula focus:ring-2 focus:ring-nebula/20"
                          autoComplete="off"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-[#374151]">
                          {t.auth.newPasswordLabel}
                        </label>
                        <input
                          type="password"
                          value={password}
                          onChange={(event) => setPasswordInput(event.target.value)}
                          placeholder={t.auth.newPasswordPlaceholder}
                          className="w-full rounded-lg border border-[#d1d5db] bg-[#ffffff] px-4 py-2.5 text-sm text-[#111827] outline-none transition-colors placeholder:text-[#9ca3af] focus:border-nebula focus:ring-2 focus:ring-nebula/20"
                          autoComplete="off"
                        />
                        {password && !isPasswordValid && (
                          <p className="mt-1 text-xs text-red-600">密码至少需要 8 个字符</p>
                        )}
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-[#374151]">
                          {t.auth.confirmPasswordLabel}
                        </label>
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(event) => setConfirmPassword(event.target.value)}
                          placeholder={t.auth.confirmPasswordPlaceholder}
                          className="w-full rounded-lg border border-[#d1d5db] bg-[#ffffff] px-4 py-2.5 text-sm text-[#111827] outline-none transition-colors placeholder:text-[#9ca3af] focus:border-nebula focus:ring-2 focus:ring-nebula/20"
                          autoComplete="off"
                        />
                        {confirmPassword && !passwordsMatch && (
                          <p className="mt-1 text-xs text-red-600">两次输入的密码不一致</p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => void submitSignup()}
                        disabled={busy || !email.trim() || !isPasswordValid || !passwordsMatch}
                        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-nebula px-5 text-sm font-semibold text-[#ffffff] transition-colors hover:bg-nebula/90 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <UserPlus className="h-4 w-4" />
                        {busy ? t.auth.working : t.auth.signupTab}
                      </button>

                      <div className="text-center text-sm">
                        <button
                          type="button"
                          onClick={() => switchMode('login')}
                          className="text-nebula hover:text-nebula/80 font-medium"
                        >
                          已有账号？登录
                        </button>
                      </div>

                    </div>
                  )}

                  {/* Confirm Email Mode */}
                  {mode === 'confirm-email' && (
                    <div className="space-y-4">
                      <div className="rounded-lg bg-blue-50 border border-blue-200 p-4 text-sm text-blue-800">
                        <Mail className="mb-2 h-5 w-5" />
                        {readableFeedback ?? (t.auth.messages as Record<string, string>)['AUTH_SIGNUP_SUCCESS']}
                      </div>
                      <button
                        type="button"
                        onClick={() => void submitResendConfirmation()}
                        disabled={busy}
                        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-nebula/30 bg-[#ffffff] px-5 text-sm font-semibold text-nebula transition-colors hover:bg-nebula/5 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Mail className="h-4 w-4" />
                        {busy ? t.auth.working : (t.auth.messages as Record<string, string>)['AUTH_RESEND_CONFIRMATION']}
                      </button>
                      <div className="text-center text-sm">
                        <button
                          type="button"
                          onClick={() => switchMode('login')}
                          className="text-nebula hover:text-nebula/80 font-medium"
                        >
                          {t.auth.backToLogin}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Reset Request Mode */}
                  {mode === 'reset-request' && (
                    <form onSubmit={submitResetRequest} className="space-y-4">
                      <div>
                        <label className="mb-1 block text-sm font-medium text-[#374151]">
                          {t.auth.emailLabel}
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          placeholder={t.auth.emailPlaceholder}
                          className="w-full rounded-lg border border-[#d1d5db] bg-[#ffffff] px-4 py-2.5 text-sm text-[#111827] outline-none transition-colors placeholder:text-[#9ca3af] focus:border-nebula focus:ring-2 focus:ring-nebula/20"
                          autoComplete="email"
                          required
                        />
                      </div>
                      {renderPrimaryButton('发送重置链接', <Mail className="h-4 w-4" />, !email.trim())}
                      <div className="text-center text-sm">
                        <button
                          type="button"
                          onClick={() => switchMode('login')}
                          className="text-nebula hover:text-nebula/80 font-medium"
                        >
                          返回登录
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Reset Password Mode */}
                  {mode === 'reset-password' && (
                    <form onSubmit={submitResetRequest} className="space-y-4">
                      <div className="rounded-lg bg-blue-50 p-3 text-sm text-blue-800">
                        重置链接已发送到您的邮箱，请查收并按照邮件中的指示设置新密码。
                      </div>
                      <div className="text-center text-sm">
                        <button
                          type="button"
                          onClick={() => switchMode('login')}
                          className="text-nebula hover:text-nebula/80 font-medium"
                        >
                          返回登录
                        </button>
                      </div>
                    </form>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Render into document.body so the modal escapes <main>'s stacking
  // context (relative z-10) and always paints above the fixed bottom nav.
  if (typeof document === 'undefined') return modal;
  return createPortal(modal, document.body);
};
