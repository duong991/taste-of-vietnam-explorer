import { Mail, Phone, Globe, MessageCircle } from "lucide-react";
import type { Partner } from "@/types/content";

interface PartnerContactBarProps {
  partner: Partner;
}

const PartnerContactBar = ({ partner }: PartnerContactBarProps) => {
  const contacts = [
    partner.email && {
      label: "Email đối tác",
      icon: Mail,
      href: `mailto:${partner.email}?subject=Hỏi thông tin tour`,
      text: partner.email,
      className: "hover:bg-amber-50 hover:border-amber-400 hover:text-amber-700",
    },
    partner.phone && {
      label: "Gọi điện",
      icon: Phone,
      href: `tel:${partner.phone}`,
      text: partner.phone,
      className: "hover:bg-green-50 hover:border-green-500 hover:text-green-700",
    },
    partner.zaloUrl && {
      label: "Chat Zalo",
      icon: MessageCircle,
      href: partner.zaloUrl,
      text: "Zalo",
      className: "hover:bg-blue-50 hover:border-blue-500 hover:text-blue-700",
    },
    partner.messengerUrl && {
      label: "Messenger",
      icon: MessageCircle,
      href: partner.messengerUrl,
      text: "Messenger",
      className: "hover:bg-indigo-50 hover:border-indigo-500 hover:text-indigo-700",
    },
    partner.website && {
      label: "Website đối tác",
      icon: Globe,
      href: partner.website,
      text: "Website",
      className: "hover:bg-primary/5 hover:border-primary hover:text-primary",
    },
  ].filter(Boolean) as { label: string; icon: typeof Mail; href: string; text: string; className: string }[];

  return (
    <div className="flex flex-wrap gap-3">
      {contacts.map(({ label, icon: Icon, href, text, className }) => (
        <a
          key={href}
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          aria-label={label}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border text-sm font-medium text-foreground transition-smooth ${className}`}
        >
          <Icon className="h-4 w-4 shrink-0" />
          <span>{text}</span>
        </a>
      ))}
    </div>
  );
};

export default PartnerContactBar;
