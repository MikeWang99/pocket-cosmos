import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const sourceRoot = path.join(root, 'src');
const sourceExtensions = new Set(['.css', '.ts', '.tsx']);

const forbiddenPatterns = [
  {
    pattern: /\btext-(?:white|black|slate-(?:100|200|300|400)|emerald-300|amber-(?:200|300)|rose-(?:200|300)|cyan-100)(?![\w-])/,
    reason: 'Use an explicit semantic foreground such as text-ink, text-ink-soft, text-ink-muted, or text-on-accent.',
  },
  {
    pattern: /\bbg-(?:white|black)(?=$|[\s'"`/\[])/,
    reason: 'Use bg-surface, bg-surface-muted, bg-surface-tint, or an explicit accent surface.',
  },
  {
    pattern: /\bborder-white(?=$|[\s'"`/\[])/,
    reason: 'Use border-line or border-line-strong.',
  },
  {
    pattern: /\bbg-slate-950(?![\w-])/,
    reason: 'Use bg-surface for light-theme controls.',
  },
  {
    pattern: /\b(?:text|bg)-\[#(?:fff|ffffff)\]/i,
    reason: 'Use text-on-accent or bg-surface so the foreground/background role stays explicit.',
  },
];

const palette = {
  ink: '#0f172a',
  inkSoft: '#334155',
  inkMuted: '#64748b',
  surface: '#ffffff',
  surfaceMuted: '#f8fafc',
  surfaceTint: '#f3f4ff',
  nebula: '#4f46e5',
  slate900: '#0f172a',
  emerald700: '#047857',
  rose600: '#e11d48',
};

const checks = [
  ['ink / surface', palette.ink, palette.surface],
  ['ink-soft / surface', palette.inkSoft, palette.surface],
  ['ink-muted / surface', palette.inkMuted, palette.surface],
  ['ink / surface tint', palette.ink, palette.surfaceTint],
  ['on-accent / nebula', palette.surface, palette.nebula],
  ['on-accent / slate-900', palette.surface, palette.slate900],
  ['on-accent / emerald-700', palette.surface, palette.emerald700],
  ['on-accent / rose-600', palette.surface, palette.rose600],
];

const luminance = (hex) => {
  const channels = hex
    .slice(1)
    .match(/.{2}/g)
    .map((channel) => parseInt(channel, 16) / 255)
    .map((value) => (value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4));
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
};

const contrast = (foreground, background) => {
  const light = Math.max(luminance(foreground), luminance(background));
  const dark = Math.min(luminance(foreground), luminance(background));
  return (light + 0.05) / (dark + 0.05);
};

const collectFiles = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) return collectFiles(target);
    return sourceExtensions.has(path.extname(entry.name)) ? [target] : [];
  }));
  return nested.flat();
};

const failures = [];
for (const file of await collectFiles(sourceRoot)) {
  const lines = (await readFile(file, 'utf8')).split('\n');
  lines.forEach((line, index) => {
    for (const rule of forbiddenPatterns) {
      if (rule.pattern.test(line)) {
        failures.push(`${path.relative(root, file)}:${index + 1} ${rule.reason}`);
      }
    }
  });
}

for (const [label, foreground, background] of checks) {
  const ratio = contrast(foreground, background);
  if (ratio < 4.5) failures.push(`${label} has insufficient contrast: ${ratio.toFixed(2)}:1`);
}

if (failures.length) {
  console.error('Color contract check failed:\n');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Color contract passed (${checks.length} contrast pairs; no ambiguous legacy utilities).`);
