import React, { useEffect, useMemo, useState } from 'react';
import { BarChart3, KeyRound, RefreshCcw, ShieldCheck, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../AuthContext';
import { useLanguage } from '../LanguageContext';
import { supabase, type PracticeSubmissionRow } from '../lib/supabase';

const formatDateTime = (value: string) =>
  new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));

interface AdminSectionProps {
  onAuthRequired: () => void;
}

export const AdminSection: React.FC<AdminSectionProps> = ({ onAuthRequired }) => {
  const { t } = useLanguage();
  const { authEnabled, user, isAdmin, redeemAdminCode, authMessage } = useAuth();
  const [adminCode, setAdminCode] = useState('');
  const [codeBusy, setCodeBusy] = useState(false);
  const [submissions, setSubmissions] = useState<PracticeSubmissionRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [dataError, setDataError] = useState<string | null>(null);

  const summary = useMemo(() => {
    const studentIds = new Set(submissions.map((submission) => submission.student_id));
    const completed = submissions.length;
    const correct = submissions.filter((submission) => submission.is_correct).length;
    const average = completed
      ? Math.round((submissions.reduce((sum, submission) => sum + submission.score / submission.max_score, 0) / completed) * 100)
      : 0;
    return { studentCount: studentIds.size, completed, correct, average };
  }, [submissions]);

  const studentRows = useMemo(() => {
    const grouped = new Map<string, PracticeSubmissionRow[]>();
    submissions.forEach((submission) => {
      const key = submission.student_id;
      grouped.set(key, [...(grouped.get(key) ?? []), submission]);
    });

    return Array.from(grouped.entries()).map(([studentId, rows]) => {
      const latest = rows[0];
      const totalScore = rows.reduce((sum, row) => sum + row.score, 0);
      const totalPossible = rows.reduce((sum, row) => sum + row.max_score, 0);
      return {
        studentId,
        name: latest.display_name || latest.student_email || t.admin.unknownStudent,
        email: latest.student_email,
        count: rows.length,
        accuracy: totalPossible ? Math.round((totalScore / totalPossible) * 100) : 0,
        latest: latest.created_at,
      };
    });
  }, [submissions, t.admin.unknownStudent]);

  const fetchSubmissions = async () => {
    if (!supabase || !isAdmin) return;
    setLoading(true);
    setDataError(null);
    const { data, error } = await supabase
      .from('practice_submissions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200);
    setLoading(false);
    if (error) {
      setDataError(error.message);
      return;
    }
    setSubmissions(data ?? []);
  };

  useEffect(() => {
    fetchSubmissions();
  }, [isAdmin]);

  const submitAdminCode = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!adminCode.trim()) return;
    setCodeBusy(true);
    const success = await redeemAdminCode(adminCode);
    setCodeBusy(false);
    if (success) setAdminCode('');
  };

  const readableAuthMessage =
    authMessage === 'ADMIN_ACCESS_ENABLED'
      ? t.admin.accessEnabled
      : authMessage === 'ADMIN_CODE_INVALID'
        ? t.admin.invalidCode
        : authMessage;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-6xl"
    >
      <div className="mb-10">
        <div className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-nebula">
          <ShieldCheck className="h-4 w-4" />
          {t.admin.eyebrow}
        </div>
        <h1 className="font-serif text-4xl font-light leading-tight text-white md:text-6xl">{t.admin.title}</h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-slate-400">{t.admin.description}</p>
      </div>

      {!authEnabled && (
        <div className="glass-panel rounded-lg p-6">
          <h2 className="text-xl font-serif text-white">{t.admin.setupRequiredTitle}</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">{t.admin.setupRequiredText}</p>
        </div>
      )}

      {authEnabled && !user && (
        <div className="glass-panel rounded-lg p-8">
          <h2 className="text-2xl font-serif text-white">{t.admin.signInTitle}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-500">{t.admin.signInText}</p>
          <button
            type="button"
            onClick={onAuthRequired}
            className="mt-6 inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-nebula"
          >
            {t.auth.signIn}
          </button>
        </div>
      )}

      {authEnabled && user && !isAdmin && (
        <div className="glass-panel rounded-lg p-6">
          <h2 className="text-xl font-serif text-white">{t.admin.lockedTitle}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500">{t.admin.lockedText}</p>
          <form onSubmit={submitAdminCode} className="mt-5 flex max-w-xl flex-col gap-3 sm:flex-row">
            <input
              type="password"
              value={adminCode}
              onChange={(event) => setAdminCode(event.target.value)}
              placeholder={t.admin.codePlaceholder}
              className="min-w-0 flex-1 rounded-full border border-white/10 bg-slate-50 px-4 py-3 text-sm outline-none transition-colors focus:border-nebula/60"
            />
            <button
              type="submit"
              disabled={codeBusy || !adminCode.trim()}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-nebula disabled:opacity-30"
            >
              <KeyRound className="h-4 w-4" />
              {t.admin.redeemCode}
            </button>
          </form>
          {readableAuthMessage && <div className="mt-3 text-xs text-slate-500">{readableAuthMessage}</div>}
        </div>
      )}

      {authEnabled && user && isAdmin && (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="glass-panel rounded-lg p-5">
              <Users className="mb-3 h-5 w-5 text-nebula" />
              <div className="text-[10px] uppercase tracking-widest text-slate-500">{t.admin.students}</div>
              <div className="mt-1 text-3xl font-semibold">{summary.studentCount}</div>
            </div>
            <div className="glass-panel rounded-lg p-5">
              <BarChart3 className="mb-3 h-5 w-5 text-nebula" />
              <div className="text-[10px] uppercase tracking-widest text-slate-500">{t.admin.submissions}</div>
              <div className="mt-1 text-3xl font-semibold">{summary.completed}</div>
            </div>
            <div className="glass-panel rounded-lg p-5">
              <ShieldCheck className="mb-3 h-5 w-5 text-nebula" />
              <div className="text-[10px] uppercase tracking-widest text-slate-500">{t.admin.correct}</div>
              <div className="mt-1 text-3xl font-semibold">{summary.correct}</div>
            </div>
            <button
              type="button"
              onClick={fetchSubmissions}
              className="glass-panel rounded-lg p-5 text-left transition-colors hover:border-nebula/40"
            >
              <RefreshCcw className={`mb-3 h-5 w-5 text-nebula ${loading ? 'animate-spin' : ''}`} />
              <div className="text-[10px] uppercase tracking-widest text-slate-500">{t.admin.average}</div>
              <div className="mt-1 text-3xl font-semibold">{summary.average}%</div>
            </button>
          </div>

          {dataError && <div className="rounded-lg border border-rose-500/20 bg-rose-500/8 p-4 text-sm text-rose-700">{dataError}</div>}

          <div className="glass-panel overflow-hidden rounded-lg">
            <div className="border-b border-white/10 p-5">
              <div className="text-[10px] uppercase tracking-widest text-slate-500">{t.admin.studentOverview}</div>
              <h2 className="mt-1 text-2xl font-serif text-white">{t.admin.recentStudents}</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-white/10 text-[10px] uppercase tracking-widest text-slate-500">
                  <tr>
                    <th className="px-5 py-3">{t.admin.student}</th>
                    <th className="px-5 py-3">{t.admin.done}</th>
                    <th className="px-5 py-3">{t.admin.accuracy}</th>
                    <th className="px-5 py-3">{t.admin.latest}</th>
                  </tr>
                </thead>
                <tbody>
                  {studentRows.length ? (
                    studentRows.map((row) => (
                      <tr key={row.studentId} className="border-b border-white/5 last:border-0">
                        <td className="px-5 py-4">
                          <div className="font-semibold text-slate-800">{row.name}</div>
                          <div className="mt-1 text-xs text-slate-500">{row.email}</div>
                        </td>
                        <td className="px-5 py-4">{row.count}</td>
                        <td className="px-5 py-4">{row.accuracy}%</td>
                        <td className="px-5 py-4">{formatDateTime(row.latest)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="px-5 py-8 text-slate-500" colSpan={4}>
                        {loading ? t.admin.loadingData : t.admin.noData}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="glass-panel overflow-hidden rounded-lg">
            <div className="border-b border-white/10 p-5">
              <div className="text-[10px] uppercase tracking-widest text-slate-500">{t.admin.latestSubmissions}</div>
              <h2 className="mt-1 text-2xl font-serif text-white">{t.admin.answerStream}</h2>
            </div>
            <div className="divide-y divide-white/10">
              {submissions.slice(0, 20).map((submission) => (
                <div key={submission.id} className="grid gap-3 p-5 lg:grid-cols-[1fr_120px]">
                  <div>
                    <div className="text-xs text-slate-500">{submission.practice_set_title}</div>
                    <div className="mt-1 font-semibold text-slate-800">{submission.question_title}</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {submission.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-nebula/20 bg-nebula/8 px-2 py-1 text-[10px] text-slate-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 text-xs text-slate-500">
                      {submission.display_name || submission.student_email} · {formatDateTime(submission.created_at)}
                    </div>
                  </div>
                  <div className="self-center rounded-lg border border-white/10 bg-white/[0.04] p-4 text-center">
                    <div className="text-2xl font-semibold">{submission.score}/{submission.max_score}</div>
                    <div className="mt-1 text-[10px] uppercase tracking-widest text-slate-500">
                      {submission.is_correct ? t.admin.correctShort : t.admin.reviewShort}
                    </div>
                  </div>
                </div>
              ))}
              {!submissions.length && <div className="p-8 text-sm text-slate-500">{loading ? t.admin.loadingData : t.admin.noData}</div>}
            </div>
          </div>
        </div>
      )}
    </motion.section>
  );
};
