import { useState, useEffect, useRef, useCallback } from "react";
import { MessageCircle, X, Send, Minus, Trash2, RefreshCw, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { callLLM, LLMError, type LLMMessage } from "@/lib/llm";
import { SYSTEM_PROMPT, parseResponse, type ChatSuggestion } from "@/lib/chatPrompt";
import { Markdown } from "@/lib/markdown";

const SESSION_KEY = "chatbot_history";

function loadHistory(): ChatMsg[] {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as ChatMsg[]) : [WELCOME];
  } catch {
    return [WELCOME];
  }
}

const RATE_LIMIT_MS = 2000;
const QUICK_PROMPTS = [
  "Gợi ý món ăn ngon ở Hà Nội",
  "Tour ẩm thực đáng trải nghiệm",
  "Món ăn miền Trung nổi tiếng",
  "Tour nào phù hợp cho gia đình?",
];

interface ChatMsg {
  id: string;
  role: "bot" | "user";
  text: string;
  suggestions?: ChatSuggestion[];
  isError?: boolean;
}

const WELCOME: ChatMsg = {
  id: "welcome",
  role: "bot",
  text: "Xin chào! 👋\nTôi là Tinh – trợ lý ẩm thực của Tinh hoa Hương vị Việt.\nTôi có thể gợi ý món ăn, tour khám phá, và điểm đến cho bạn. Hỏi tôi bất cứ điều gì!",
};

function toAPIMessages(msgs: ChatMsg[]): LLMMessage[] {
  return msgs
    .filter((m) => m.id !== "welcome" && !m.isError)
    .map((m) => ({
      role: m.role === "user" ? "user" : "assistant",
      content: m.text,
    }));
}

function suggestionPath(s: ChatSuggestion): string {
  if (s.type === "dish") return `/mon-an/${s.slug}`;
  if (s.type === "tour") return `/tour/${s.slug}`;
  return `/thanh-pho/${s.slug}`;
}

const TypingIndicator = () => (
  <div className="flex gap-2 max-w-[88%]">
    <div className="h-7 w-7 shrink-0 rounded-full bg-primary/15 flex items-center justify-center text-xs">🌿</div>
    <div className="bg-card px-4 py-3 rounded-2xl rounded-tl-sm shadow-soft flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-bounce"
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}
    </div>
  </div>
);

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>(loadHistory);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastSentAt, setLastSentAt] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(messages)); } catch { /* ignore */ }
  }, [messages]);

  useEffect(() => {
    if (open && !minimized) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading, open, minimized]);

  useEffect(() => {
    if (open && !minimized) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open, minimized]);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      const now = Date.now();
      if (now - lastSentAt < RATE_LIMIT_MS) return;
      setLastSentAt(now);

      const userMsg: ChatMsg = { id: crypto.randomUUID(), role: "user", text: trimmed };
      const nextMessages = [...messages, userMsg];
      setMessages(nextMessages);
      setInput("");
      setLoading(true);

      try {
        const apiHistory = toAPIMessages(nextMessages);
        const raw = await callLLM(
          [{ role: "system", content: SYSTEM_PROMPT }, ...apiHistory],
        );
        const { text: botText, suggestions } = parseResponse(raw);
        setMessages((prev) => [
          ...prev,
          { id: crypto.randomUUID(), role: "bot", text: botText, suggestions },
        ]);
      } catch (err) {
        const msg =
          err instanceof LLMError
            ? err.message
            : "Đã có lỗi xảy ra. Vui lòng thử lại.";
        setMessages((prev) => [
          ...prev,
          { id: crypto.randomUUID(), role: "bot", text: msg, isError: true },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [messages, loading, lastSentAt],
  );

  const clearHistory = () => {
    setMessages([WELCOME]);
    sessionStorage.removeItem(SESSION_KEY);
  };

  if (!open) {
    return (
      <button
        onClick={() => { setOpen(true); setMinimized(false); }}
        aria-label="Mở chatbot"
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-float flex items-center justify-center hover:scale-105 transition-smooth animate-pop-in"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] sm:w-[400px] animate-pop-in">
      <div
        className="rounded-2xl bg-background shadow-float border border-border overflow-hidden flex flex-col"
        style={{ height: minimized ? "auto" : "560px" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="h-8 w-8 shrink-0 rounded-full bg-primary-foreground/20 flex items-center justify-center text-sm">
              🌿
            </div>
            <div>
              <p className="font-display text-sm font-semibold leading-none">Tinh</p>
              <p className="text-[10px] text-primary-foreground/70 mt-0.5">Trợ lý ẩm thực Việt Nam</p>
            </div>
          </div>
          <div className="flex gap-1">
            <button
              onClick={clearHistory}
              title="Xoá lịch sử"
              className="p-1.5 hover:bg-primary-foreground/10 rounded transition-smooth"
              aria-label="Xoá lịch sử hội thoại"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setMinimized((v) => !v)}
              className="p-1.5 hover:bg-primary-foreground/10 rounded transition-smooth"
              aria-label={minimized ? "Mở rộng" : "Thu nhỏ"}
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setOpen(false)}
              className="p-1.5 hover:bg-primary-foreground/10 rounded transition-smooth"
              aria-label="Đóng chatbot"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {!minimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-secondary/30">
              {messages.map((m, i) => (
                <div key={m.id} className={m.role === "user" ? "flex justify-end" : ""}>
                  {m.role === "bot" ? (
                    <div className="flex gap-2 max-w-[88%]">
                      <div className="h-7 w-7 shrink-0 rounded-full bg-primary/15 flex items-center justify-center text-xs">
                        🌿
                      </div>
                      <div className="space-y-2 min-w-0">
                        {m.isError ? (
                          <div className="bg-destructive/10 border border-destructive/20 px-3.5 py-2.5 rounded-2xl rounded-tl-sm text-sm text-destructive flex items-start gap-2">
                            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                            <span>{m.text}</span>
                          </div>
                        ) : (
                          <div className="bg-card px-3.5 py-2.5 rounded-2xl rounded-tl-sm shadow-soft">
                            <Markdown className="text-sm text-foreground [&_p]:mb-1.5 [&_p]:leading-relaxed [&_p:last-child]:mb-0 [&_ul]:my-1.5 [&_ul]:space-y-0.5 [&_li]:text-sm [&_li]:ml-3 [&_blockquote]:my-2 [&_blockquote]:text-xs [&_strong]:font-semibold [&_em]:italic">
                              {m.text}
                            </Markdown>
                          </div>
                        )}

                        {m.suggestions && m.suggestions.length > 0 && (
                          <div className="bg-card rounded-2xl p-2 shadow-soft space-y-1">
                            {m.suggestions.map((s) => (
                              <Link
                                key={s.slug}
                                to={suggestionPath(s)}
                                onClick={() => setOpen(false)}
                                className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-secondary transition-smooth group"
                              >
                                <span className="text-base">
                                  {s.type === "dish" ? "🍜" : s.type === "tour" ? "🗺️" : "🏙️"}
                                </span>
                                <div className="min-w-0 flex-1">
                                  <p className="text-xs font-semibold text-foreground group-hover:text-primary transition-smooth truncate">
                                    {s.name}
                                  </p>
                                  <p className="text-[10px] text-muted-foreground capitalize">
                                    {s.type === "dish" ? "Món ăn" : s.type === "tour" ? "Tour ẩm thực" : "Thành phố"}
                                  </p>
                                </div>
                                <span className="text-muted-foreground group-hover:text-primary text-xs transition-smooth">→</span>
                              </Link>
                            ))}
                          </div>
                        )}

                        {i === 0 && (
                          <div className="flex flex-col gap-1.5 pt-1">
                            {QUICK_PROMPTS.map((s) => (
                              <button
                                key={s}
                                onClick={() => send(s)}
                                disabled={loading}
                                className="text-xs text-foreground bg-card border border-border rounded-full px-3 py-1.5 self-start hover:border-primary hover:text-primary transition-smooth disabled:opacity-50"
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-primary text-primary-foreground px-3.5 py-2.5 rounded-2xl rounded-tr-sm text-sm max-w-[80%] whitespace-pre-line">
                      {m.text}
                    </div>
                  )}
                </div>
              ))}

              {loading && <TypingIndicator />}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => { e.preventDefault(); send(input); }}
              className="flex items-center gap-2 p-3 border-t border-border bg-background shrink-0"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Hỏi về món ăn, tour, thành phố…"
                disabled={loading}
                className="flex-1 bg-secondary rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50"
              />
              <button
                type="submit"
                aria-label="Gửi"
                disabled={loading || !input.trim()}
                className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-smooth disabled:opacity-40"
              >
                {loading ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
