import Logo from "./Logo";
import { Facebook, Instagram, Youtube } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-background/80">
    <div className="container py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
      <div className="col-span-2 md:col-span-1">
        <Logo className="[&_*]:!text-background" />
        <p className="mt-4 text-sm leading-relaxed text-background/70 max-w-xs">
          Hành trình khám phá tinh hoa ẩm thực và văn hóa Việt Nam.
        </p>
        <div className="flex gap-3 mt-5">
          {[Facebook, Instagram, Youtube].map((Icon, i) => (
            <a key={i} href="#" className="h-9 w-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-smooth">
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>

      {[
        { title: "Khám phá", links: ["Thành phố", "Món ăn", "Tour ẩm thực", "Blog"] },
        { title: "Hỗ trợ", links: ["Liên hệ", "Câu hỏi thường gặp", "Chính sách", "Điều khoản"] },
        { title: "Về chúng tôi", links: ["Câu chuyện", "Đối tác", "Tuyển dụng", "Báo chí"] },
      ].map((c) => (
        <div key={c.title}>
          <h4 className="font-display text-base font-semibold text-background mb-4">{c.title}</h4>
          <ul className="space-y-2.5 text-sm">
            {c.links.map((l) => (
              <li key={l}><a href="#" className="hover:text-primary transition-smooth">{l}</a></li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div className="border-t border-background/10">
      <div className="container py-5 text-xs text-background/60 text-center">
        © {new Date().getFullYear()} Tinh hoa Hương vị Việt. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
