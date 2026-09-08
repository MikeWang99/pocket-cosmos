import React from 'react';
import katex from 'katex';
import { repairLatexExpression } from '../utils/latexRepair';

const normalizeFormulaExpression = (value: string) => repairLatexExpression(value)
  .replace(/\b([A-Za-z])(\d)\b/g, '$1_{$2}')
  .replace(/(^|[^A-Za-z])([0-9]+)\s*\/\s*([0-9]+)(?=[^A-Za-z]|$)/g, '$1\\frac{$2}{$3}');

const renderMath = (value: string) =>
  katex.renderToString(normalizeFormulaExpression(value), {
    throwOnError: false,
    strict: false,
  });

const normalizePlainMath = (value: string) => value
  .replace(/\bTangent\s+Theta\b/gi, '\\tan\\theta')
  .replace(/\bSine\s+Theta\b/gi, '\\sin\\theta')
  .replace(/\bCosine\s+Theta\b/gi, '\\cos\\theta')
  .replace(/\bTheta\b/g, '\\theta');

const INLINE_MATH_RE = /(?:\b(?:g|I\d?|R|M|m|v|a|F|T|P|E|L|h|r)\s*=\s*[^,.;!?]+?(?=\s+(?:throughout|and|or|where|with|for|from|about|the|a|an|of|to|as|in|on|is|was|what|which|that)\b|[,.!?;:]|$))|(?:\\(?:sin|cos|tan|cot|log|ln)\s*\\?(?:theta|[A-Za-z]+))|(?:\b(?:sin|cos|tan|cot|log|ln)\s+(?:\\?theta|θ|[A-Za-z]))|(?:\b\d+(?:\.\d+)?\s*(?:N\/kg|m\/s(?:\^2|²)?|kg|N|J|W|Hz|rad\/s)\b)|(?:\b[A-Za-z]{1,4}\s*\^\s*[A-Za-z0-9²³]+)|(?:\b[A-Za-z]{1,4}\d+\b)/gi;

const FORMULA_ONLY_RE = /^[\sA-Za-z0-9\\{}()[\].,*/^_=+\-μθωαβγΔπ²³]+$/;
const COMMON_PROSE_WORD_RE = /\b(?:use|throughout|contest|uniform|disk|has|which|what|the|and|with|from|about|this|that|shown|below|figure|mass|radius|plane|hole|resulting|object)\b/i;

const splitInlineMath = (value: string): Array<{ value: string; math: boolean }> => {
  const normalized = normalizePlainMath(value);
  const result: Array<{ value: string; math: boolean }> = [];
  let cursor = 0;
  for (const match of normalized.matchAll(INLINE_MATH_RE)) {
    const index = match.index ?? 0;
    if (index > cursor) result.push({ value: normalized.slice(cursor, index), math: false });
    result.push({ value: match[0].trim(), math: true });
    cursor = index + match[0].length;
  }
  if (cursor < normalized.length) result.push({ value: normalized.slice(cursor), math: false });
  return result.length ? result : [{ value: normalized, math: false }];
};

const looksLikeStandaloneMath = (value: string) => {
  const normalized = normalizePlainMath(value.trim());
  if (!normalized || normalized.length > 160) return false;
  return Boolean(
    /\\(?:frac|tfrac|dfrac|sqrt|mathrm|mathbf|sin|cos|tan|cot|log|ln|exp|mu|theta|omega|alpha|beta|gamma|Delta|pi|vec|cdot|times)\b/.test(normalized) ||
      /[=^_≤≥±∫√θμωαβγΔπ]/.test(normalized) ||
      /\b(?:sin|cos|tan|cot|log|ln)\b/.test(normalized) ||
      /^\s*[+-]?(?:\d+(?:\.\d+)?\s*[A-Za-zμΩ]+|\d+\s*\/\s*\d+)\s*$/.test(normalized),
  );
};

export const MathText: React.FC<{ children: string; className?: string }> = ({ children, className }) => {
  const normalized = normalizePlainMath(children);
  const parts = normalized.split(/(\$[^$]+\$|\\\(.+?\\\))/g).filter(Boolean);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        const dollar = part.startsWith('$') && part.endsWith('$');
        const paren = part.startsWith('\\(') && part.endsWith('\\)');
        const inlineChunks = !dollar && !paren ? splitInlineMath(part) : [];
        const formulaLike = FORMULA_ONLY_RE.test(part.trim()) && !COMMON_PROSE_WORD_RE.test(part);
        const isRawMath = !dollar && !paren && parts.length === 1 && looksLikeStandaloneMath(part) && (inlineChunks.every((chunk) => chunk.math) || formulaLike);
        if (!dollar && !paren && !isRawMath) {
          return (
            <React.Fragment key={`${part}-${index}`}>
              {inlineChunks.map((chunk, chunkIndex) => chunk.math ? (
                <span
                  key={`${part}-${index}-math-${chunkIndex}`}
                  className="math-inline"
                  dangerouslySetInnerHTML={{ __html: renderMath(chunk.value) }}
                />
              ) : (
                <React.Fragment key={`${part}-${index}-text-${chunkIndex}`}>{chunk.value}</React.Fragment>
              ))}
            </React.Fragment>
          );
        }
        const expression = dollar
          ? part.slice(1, -1)
          : paren
            ? part.slice(2, -2)
            : part;
        return (
          <span
            key={`${part}-${index}`}
            className="math-inline"
            dangerouslySetInnerHTML={{ __html: renderMath(expression) }}
          />
        );
      })}
    </span>
  );
};

export const isLongChoice = (text?: string | null) => {
  if (!text) return false;
  const normalized = normalizePlainMath(text).trim();
  return normalized.length > 34 || normalized.includes('\n') || normalized.split(/\s+/).length > 7;
};
