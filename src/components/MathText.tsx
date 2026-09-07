import React from 'react';
import katex from 'katex';
import { repairLatexExpression } from '../utils/latexRepair';

const renderMath = (value: string) =>
  katex.renderToString(repairLatexExpression(value), {
    throwOnError: false,
    strict: false,
  });

const normalizePlainMath = (value: string) => value
  .replace(/\bTangent\s+Theta\b/gi, '\\tan\\theta')
  .replace(/\bSine\s+Theta\b/gi, '\\sin\\theta')
  .replace(/\bCosine\s+Theta\b/gi, '\\cos\\theta')
  .replace(/\bTheta\b/g, '\\theta');

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
        const isRawMath = !dollar && !paren && parts.length === 1 && looksLikeStandaloneMath(part);
        if (!dollar && !paren && !isRawMath) {
          return <React.Fragment key={`${part}-${index}`}>{part}</React.Fragment>;
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
