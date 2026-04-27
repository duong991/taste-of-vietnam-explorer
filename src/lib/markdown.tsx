import type { ReactNode } from "react";

const INLINE_RULES: [RegExp, (match: string, inner: string, idx: number) => ReactNode][] = [
  [/\*\*(.+?)\*\*/g, (_, inner, idx) => <strong key={idx}>{inner}</strong>],
  [/\*(.+?)\*/g, (_, inner, idx) => <em key={idx}>{inner}</em>],
  [/`(.+?)`/g, (_, inner, idx) => <code key={idx} className="px-1 py-0.5 rounded bg-muted text-xs font-mono">{inner}</code>],
  [/\[(.+?)\]\((.+?)\)/g, () => null],
];

function parseInline(text: string): ReactNode[] {
  const tokens: ReactNode[] = [];
  let remaining = text;
  let idx = 0;

  while (remaining.length > 0) {
    let earliest: { start: number; end: number; node: ReactNode } | null = null;

    for (const [regex, renderer] of INLINE_RULES) {
      regex.lastIndex = 0;
      const match = regex.exec(remaining);
      if (match && (earliest === null || match.index < earliest.start)) {
        earliest = {
          start: match.index,
          end: match.index + match[0].length,
          node: renderer(match[0], match[1], idx++),
        };
      }
    }

    if (!earliest) {
      tokens.push(remaining);
      break;
    }

    if (earliest.start > 0) {
      tokens.push(remaining.slice(0, earliest.start));
    }

    if (earliest.node !== null) tokens.push(earliest.node);
    remaining = remaining.slice(earliest.end);
  }

  return tokens;
}

function parseLine(line: string, idx: number): ReactNode {
  const h6 = line.match(/^######\s+(.*)/);
  const h5 = line.match(/^#####\s+(.*)/);
  const h4 = line.match(/^####\s+(.*)/);
  const h3 = line.match(/^###\s+(.*)/);
  const h2 = line.match(/^##\s+(.*)/);
  const h1 = line.match(/^#\s+(.*)/);
  const bq = line.match(/^>\s+(.*)/);
  const li = line.match(/^[-*]\s+(.*)/);

  if (h6) return <h6 key={idx} className="font-display font-semibold text-sm mt-3 mb-1">{parseInline(h6[1])}</h6>;
  if (h5) return <h5 key={idx} className="font-display font-semibold text-base mt-3 mb-1">{parseInline(h5[1])}</h5>;
  if (h4) return <h4 key={idx} className="font-display font-semibold text-lg mt-4 mb-1">{parseInline(h4[1])}</h4>;
  if (h3) return <h3 key={idx} className="font-display font-semibold text-xl mt-5 mb-2">{parseInline(h3[1])}</h3>;
  if (h2) return <h2 key={idx} className="font-display font-semibold text-2xl mt-6 mb-2">{parseInline(h2[1])}</h2>;
  if (h1) return <h1 key={idx} className="font-display font-bold text-3xl mt-6 mb-3">{parseInline(h1[1])}</h1>;
  if (bq) return <blockquote key={idx} className="border-l-4 border-primary/40 pl-4 italic text-muted-foreground my-3">{parseInline(bq[1])}</blockquote>;
  if (li) return <li key={idx} className="ml-4 list-disc">{parseInline(li[1])}</li>;
  return <p key={idx} className="text-foreground/80 leading-relaxed mb-4">{parseInline(line)}</p>;
}

function groupBlocks(lines: string[]): ReactNode[] {
  const nodes: ReactNode[] = [];
  let listBuf: string[] = [];
  let idx = 0;

  const flushList = () => {
    if (listBuf.length) {
      nodes.push(
        <ul key={`ul-${idx++}`} className="my-3 space-y-1">
          {listBuf.map((l, i) => parseLine(l, i))}
        </ul>
      );
      listBuf = [];
    }
  };

  for (const line of lines) {
    if (/^[-*]\s+/.test(line)) {
      listBuf.push(line);
    } else {
      flushList();
      if (line.trim() !== "") {
        nodes.push(parseLine(line, idx++));
      }
    }
  }

  flushList();
  return nodes;
}

export interface MarkdownProps {
  children: string;
  className?: string;
}

export function Markdown({ children, className }: MarkdownProps) {
  const paragraphs = children.split(/\n{2,}/);
  const nodes: ReactNode[] = paragraphs.flatMap((block) => {
    const lines = block.split("\n");
    return groupBlocks(lines);
  });

  return <div className={className}>{nodes}</div>;
}
