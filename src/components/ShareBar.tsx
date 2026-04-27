import { useState } from "react";
import { Facebook, Twitter, Link2, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ShareBarProps {
  title?: string;
}

const ShareBar = ({ title = "" }: ShareBarProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const url = typeof window !== "undefined" ? window.location.href : "";
  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast({ title: "Đã sao chép liên kết" });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: "Không thể sao chép", variant: "destructive" });
    }
  };

  const shareButtons = [
    {
      label: "Chia sẻ Facebook",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`,
      className: "hover:bg-blue-600 hover:text-white",
    },
    {
      label: "Chia sẻ X (Twitter)",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encoded}&text=${encodedTitle}`,
      className: "hover:bg-sky-500 hover:text-white",
    },
  ];

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider mr-1">
        Chia sẻ:
      </span>
      {shareButtons.map(({ label, icon: Icon, href, className }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={`h-9 w-9 rounded-full border border-border flex items-center justify-center text-muted-foreground transition-smooth ${className}`}
        >
          <Icon className="h-4 w-4" />
        </a>
      ))}
      <button
        onClick={copyLink}
        aria-label="Sao chép liên kết"
        className="h-9 w-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-smooth"
      >
        {copied ? <Check className="h-4 w-4 text-green-600" /> : <Link2 className="h-4 w-4" />}
      </button>
    </div>
  );
};

export default ShareBar;
