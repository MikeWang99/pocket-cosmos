import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { KeyRound, Lock, LogIn, Mail, UserPlus, X } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { useLanguage } from '../LanguageContext';

type AuthMode = 'login' | 'signup' | 'reset-request' | 'reset-password';

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
    sendPasswordReset,
    signInWithEmailPassword,
    signUpWithEmailPassword,
    signInWithGoogle,
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

  const submitSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
    // 注册成功后自动切换到登录模式
    setTimeout(() => {
      switchMode('login');
    }, 2000);
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

  const startGoogle = async () => {
    setBusy(true);
    await signInWithGoogle();
    setBusy(false);
  };

  const switchMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    setFeedback(null);
    setPasswordInput('');
    setConfirmPassword('');
  };

  const renderPrimaryButton = (label: string, icon: React.ReactNode, disabled = false) => (
    <button
      type="submit"
      disabled={busy || disabled}
      className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-nebula px-5 text-sm font-semibold text-white transition-colors hover:bg-nebula/90 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {icon}
      {busy ? t.auth.working : label}
    </button>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[120] grid place-items-center bg-black/50 p-4 backdrop-blur-sm"
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
            className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="border-b border-gray-200 px-6 pb-4 pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 id="auth-modal-title" className="text-2xl font-bold text-gray-900">
                    {mode === 'reset-password' ? t.auth.resetPasswordTitle : mode === 'signup' ? t.auth.signupTab : t.auth.loginTab}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    {mode === 'login' && '欢迎回来，请登录您的账号'}
                    {mode === 'signup' && '创建新账号，开始您的学习之旅'}
                    {mode === 'reset-request' && '输入邮箱，我们将发送重置链接'}
                    {mode === 'reset-password' && '设置新密码'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => closeModal()}
                  className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                  title={t.auth.close}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 py-6">
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
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t.auth.emailLabel}
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          placeholder={t.auth.emailPlaceholder}
                          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-nebula focus:ring-2 focus:ring-nebula/20"
                          autoComplete="email"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t.auth.passwordLabel}
                        </label>
                        <input
                          type="password"
                          value={password}
                          onChange={(event) => setPasswordInput(event.target.value)}
                          placeholder={t.auth.passwordPlaceholder}
                          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-nebula focus:ring-2 focus:ring-nebula/20"
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

                      <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="bg-white px-2 text-gray-500">或</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={startGoogle}
                        disabled={busy}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
                      >
                        <svg className="h-5 w-5" viewBox="0 0 24 24">
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                        使用 Google 账号登录
                      </button>
                    </form>
                  )}

                  {/* Signup Mode */}
                  {mode === 'signup' && (
                    <form onSubmit={submitSignup} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t.auth.emailLabel}
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          placeholder={t.auth.emailPlaceholder}
                          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-nebula focus:ring-2 focus:ring-nebula/20"
                          autoComplete="email"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t.auth.newPasswordLabel}
                        </label>
                        <input
                          type="password"
                          value={password}
                          onChange={(event) => setPasswordInput(event.target.value)}
                          placeholder={t.auth.newPasswordPlaceholder}
                          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-nebula focus:ring-2 focus:ring-nebula/20"
                          autoComplete="new-password"
                          required
                        />
                        {password && !isPasswordValid && (
                          <p className="mt-1 text-xs text-red-600">密码至少需要 8 个字符</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t.auth.confirmPasswordLabel}
                        </label>
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(event) => setConfirmPassword(event.target.value)}
                          placeholder={t.auth.confirmPasswordPlaceholder}
                          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-nebula focus:ring-2 focus:ring-nebula/20"
                          autoComplete="new-password"
                          required
                        />
                        {confirmPassword && !passwordsMatch && (
                          <p className="mt-1 text-xs text-red-600">两次输入的密码不一致</p>
                        )}
                      </div>
                      {renderPrimaryButton(
                        t.auth.signupTab,
                        <UserPlus className="h-4 w-4" />,
                        !email.trim() || !isPasswordValid || !passwordsMatch
                      )}

                      <div className="text-center text-sm">
                        <button
                          type="button"
                          onClick={() => switchMode('login')}
                          className="text-nebula hover:text-nebula/80 font-medium"
                        >
                          已有账号？登录
                        </button>
                      </div>

                      <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="bg-white px-2 text-gray-500">或</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={startGoogle}
                        disabled={busy}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
                      >
                        <svg className="h-5 w-5" viewBox="0 0 24 24">
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                        使用 Google 账号注册
                      </button>
                    </form>
                  )}

                  {/* Reset Request Mode */}
                  {mode === 'reset-request' && (
                    <form onSubmit={submitResetRequest} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t.auth.emailLabel}
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          placeholder={t.auth.emailPlaceholder}
                          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-nebula focus:ring-2 focus:ring-nebula/20"
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
};
