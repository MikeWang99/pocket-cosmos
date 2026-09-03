import React from 'react';
import katex from 'katex';
import { repairLatexExpression } from '../utils/latexRepair';

const renderMath = (value: string) =>
  katex.renderToString(repairLatexExpression(value), { throwOnError: false, strict: false });

const MathText: React.FC<{ children: string }> = ({ children }) => {
  const parts = children.split(/(\$[^$]+\$|\\\([^)]+\\\))/g).filter(Boolean);
  return (
    <>
      {parts.map((part, index) => {
        const dollar = part.startsWith('$') && part.endsWith('$');
        const paren = part.startsWith('\\(') && part.endsWith('\\)');
        if (!dollar && !paren) return <React.Fragment key={`${part}-${index}`}>{part}</React.Fragment>;
        const expression = dollar ? part.slice(1, -1) : part.slice(2, -2);
        return (
          <span
            key={`${part}-${index}`}
            className="math-inline"
            dangerouslySetInnerHTML={{ __html: renderMath(expression) }}
          />
        );
      })}
    </>
  );
};

// 行首的分问标记："(a)"、"(ii)"、"a."、"1." 等
const SUBPART_MARKER = /^\s*(\((?:[a-j]|[ivx]{1,4})\)|[a-j]\.|\d{1,2}\.)\s+/;

interface PromptBlock {
  marker?: string;
  body: string;
}

const normalizePrompt = (prompt: string) =>
  // 有些题干（尤其 AI 生成）把多个分问挤在同一行，
  // 在句末标点 / 括号之后出现的分问标记前补一个换行，避免误拆 "Fig. 3.2 (a)" 这类引用。
  prompt
    .replace(/([.!?\]:])\s+(?=\((?:[a-j]|[ivx]{1,4})\)\s)/g, '$1\n')
    .replace(/([.!?\]:])\s+(?=[a-j]\.\s)/g, '$1\n');

const parsePromptBlocks = (prompt: string): PromptBlock[] => {
  const lines = normalizePrompt(prompt).split(/\r?\n/);
  const blocks: PromptBlock[] = [];
  for (const line of lines) {
    if (!line.trim()) continue;
    const match = line.match(SUBPART_MARKER);
    if (match) {
      blocks.push({ marker: match[1], body: line.slice(match[0].length).trim() });
    } else if (blocks.length) {
      blocks[blocks.length - 1].body += `\n${line.trim()}`;
    } else {
      blocks.push({ body: line.trim() });
    }
  }
  return blocks.filter((block) => block.marker || block.body.trim());
};

interface QuestionPromptProps {
  prompt: string;
  className?: string;
}

export const QuestionPrompt: React.FC<QuestionPromptProps> = ({ prompt, className }) => {
  const blocks = React.useMemo(() => parsePromptBlocks(prompt), [prompt]);

  if (blocks.length <= 1) {
    return (
      <div className={`whitespace-pre-line ${className ?? ''}`}>
        <MathText>{prompt}</MathText>
      </div>
    );
  }

  return (
    <div className={className}>
      {blocks.map((block, index) => (
        <div key={index} className={index ? 'mt-3 border-t border-line pt-3' : ''}>
          {block.marker ? (
            <span className="mr-2 font-semibold text-nebula">{block.marker}</span>
          ) : null}
          <span className="whitespace-pre-line">
            <MathText>{block.body}</MathText>
          </span>
        </div>
      ))}
    </div>
  );
};
