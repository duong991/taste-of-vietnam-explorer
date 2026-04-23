import { useState } from "react";
import { MessageCircle, X, Send, Minus } from "lucide-react";
import phoImg from "@/assets/food-pho.jpg";
import bunchaImg from "@/assets/food-buncha.jpg";
import bunboImg from "@/assets/food-bunbo.jpg";

const suggestions = [
  "Gợi ý món ăn ngon ở Hà Nội",
  "Tour ẩm thực đáng trải nghiệm",
  "Món ăn theo vùng miền",
  "Thông tin về ẩm thực Việt",
];

interface Msg {
  role: "bot" | "user";
  text?: string;
  cards?: { img: string; name: string; desc: string }[];
}

const initialMessages: Msg[] = [
  {
    role: "bot",
    text: "Xin chào! 👋\nTôi là Tinh – trợ lý ảo của Tinh hoa Hương vị Việt. Tôi có thể giúp gì cho bạn hôm nay?",
  },
];

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Msg[]>(initialMessages);
  const [input, setInput] = useState("");

  const send = (text: string) => {
    if (!text.trim()) return;
    const newMessages: Msg[] = [...messages, { role: "user", text }];

    if (text.toLowerCase().includes("hà nội") || text.toLowerCase().includes("món")) {
      newMessages.push({
        role: "bot",
        text: "Dưới đây là một số món ăn ngon không thể bỏ lỡ ở Hà Nội:",
        cards: [
          { img: phoImg, name: "Phở Hà Nội", desc: "Tinh hoa ẩm thực đất Kinh kỳ." },
          { img: bunchaImg, name: "Bún chả Hà Nội", desc: "Thịt nướng thơm lừng, ăn kèm bún và nước chấm." },
          { img: bunboImg, name: "Chả cá Lã Vọng", desc: "Cá tươi tẩm nghệ, ăn kèm bún, rau thơm." },
        ],
      });
    } else {
      newMessages.push({
        role: "bot",
        text: "Cảm ơn bạn! Tôi sẽ tìm thông tin phù hợp và gợi ý ngay nhé.",
      });
    }
    setMessages(newMessages);
    setInput("");
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
      <div className="rounded-2xl bg-background shadow-float border border-border overflow-hidden flex flex-col" style={{ height: minimized ? "auto" : "560px" }}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <span className="text-sm">🌿</span>
            </div>
            <span className="font-display text-sm font-semibold">Tinh hoa Hương vị Việt</span>
          </div>
          <div className="flex gap-1">
            <button onClick={() => setMinimized((v) => !v)} className="p-1 hover:bg-primary-foreground/10 rounded">
              <Minus className="h-4 w-4" />
            </button>
            <button onClick={() => setOpen(false)} className="p-1 hover:bg-primary-foreground/10 rounded">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {!minimized && (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-secondary/30">
              {messages.map((m, i) => (
                <div key={i} className={m.role === "user" ? "flex justify-end" : ""}>
                  {m.role === "bot" ? (
                    <div className="flex gap-2 max-w-[88%]">
                      <div className="h-7 w-7 shrink-0 rounded-full bg-primary/15 flex items-center justify-center text-xs">🌿</div>
                      <div className="space-y-2">
                        {m.text && (
                          <div className="bg-card px-3.5 py-2.5 rounded-2xl rounded-tl-sm text-sm text-foreground whitespace-pre-line shadow-soft">
                            {m.text}
                          </div>
                        )}
                        {m.cards && (
                          <div className="bg-card rounded-2xl p-2 shadow-soft space-y-1.5">
                            {m.cards.map((c) => (
                              <a key={c.name} href="#" className="flex gap-3 p-1.5 rounded-lg hover:bg-secondary transition-smooth">
                                <img src={c.img} alt={c.name} className="h-12 w-12 rounded-md object-cover" />
                                <div className="min-w-0">
                                  <p className="text-sm font-semibold text-foreground truncate">{c.name}</p>
                                  <p className="text-xs text-muted-foreground line-clamp-2">{c.desc}</p>
                                </div>
                              </a>
                            ))}
                            <button className="w-full text-xs font-medium text-primary py-2 border border-border rounded-lg hover:bg-secondary transition-smooth">
                              Xem thêm món ăn Hà Nội
                            </button>
                          </div>
                        )}
                        {i === 0 && (
                          <div className="flex flex-col gap-1.5 pt-1">
                            {suggestions.map((s) => (
                              <button
                                key={s}
                                onClick={() => send(s)}
                                className="text-xs text-foreground bg-card border border-border rounded-full px-3 py-1.5 self-start hover:border-primary hover:text-primary transition-smooth"
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-primary text-primary-foreground px-3.5 py-2.5 rounded-2xl rounded-tr-sm text-sm max-w-[80%]">
                      {m.text}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); send(input); }}
              className="flex items-center gap-2 p-3 border-t border-border bg-background"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Nhập tin nhắn của bạn…"
                className="flex-1 bg-secondary rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
              />
              <button type="submit" aria-label="Gửi" className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary-glow transition-smooth">
                <Send className="h-4 w-4" />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
