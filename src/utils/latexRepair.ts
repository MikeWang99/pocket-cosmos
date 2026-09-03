/**
 * Repairs common LaTeX commands that were accidentally written with a single
 * backslash inside a JavaScript string. JavaScript consumes that backslash for
 * commands such as `\rho` and `\mathrm`, which otherwise makes KaTeX render
 * literal fragments such as "mathrm{m/s^2}". Already-valid LaTeX is left
 * unchanged.
 */
const COMMANDS = [
  'mathrm', 'mathbf', 'mathit', 'text', 'frac', 'tfrac', 'dfrac', 'sqrt',
  'exp', 'sin', 'cos', 'tan', 'log', 'ln', 'cdot', 'times', 'leq', 'geq',
  'neq', 'approx', 'propto', 'infty', 'rho', 'varepsilon', 'epsilon', 'lambda',
  'mu', 'theta', 'omega', 'Delta', 'vec', 'hat', 'pi', 'int', 'sum', 'partial',
  'left', 'right', 'quad', 'qquad', 'ell', 'alpha', 'beta', 'gamma', 'phi',
  'tau', 'nabla', 'pm', 'textbf',
];

const UNESCAPED_COMMAND = new RegExp(`(^|[^A-Za-z\\\\])(${COMMANDS.join('|')})(?![A-Za-z])`, 'g');

export const repairLatexExpression = (value: string): string => value
  // JavaScript control-character escapes produced by \rho, \tfrac, \frac,
  // \vec and \beta when their source backslash was not doubled.
  .replace(/\rho(?![A-Za-z])/g, '\\rho')
  .replace(/\tfrac(?![A-Za-z])/g, '\\tfrac')
  .replace(/\times(?![A-Za-z])/g, '\\times')
  .replace(/\text(?![A-Za-z])/g, '\\text')
  .replace(/\frac(?![A-Za-z])/g, '\\frac')
  .replace(/\vec(?![A-Za-z])/g, '\\vec')
  .replace(/\x08eta(?![A-Za-z])/g, '\\beta')
  .replace(UNESCAPED_COMMAND, '$1\\$2');
