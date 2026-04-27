import { Link } from "react-router-dom";
import Logo from "./Logo";
import { Facebook, Instagram, Youtube } from "lucide-react";

const NAV_GROUPS = [
  {
    title: "Khám phá",
    links: [
      { label: "Thành phố", to: "/thanh-pho" },
      { label: "Món ăn", to: "/mon-an" },
      { label: "Tour ẩm thực", to: "/tour" },
      { label: "Tìm kiếm", to: "/tim-kiem" },
    ],
  },
  {
    title: "Hỗ trợ",
    links: [
      { label: "Liên hệ", to: "#" },
      { label: "Câu hỏi thường gặp", to: "#" },
      { label: "Chính sách bảo mật", to: "#" },
      { label: "Điều khoản sử dụng", to: "#" },
    ],
  },
  {
    title: "Về chúng tôi",
    links: [
      { label: "Câu chuyện", to: "#" },
      { label: "Đối tác", to: "#" },
      { label: "Tuyển dụng", to: "#" },
      { label: "Báo chí", to: "#" },
    ],
  },
];

const SOCIAL = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

const Footer = () => (
  <footer className="bg-foreground text-background/80">
    <div className="container py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
      <div className="col-span-2 md:col-span-1">
        <Link to="/" aria-label="Về trang chủ">
          <Logo className="[&_*]:!text-background" />
        </Link>
        <p className="mt-4 text-sm leading-relaxed text-background/70 max-w-xs">
          Hành trình khám phá tinh hoa ẩm thực và văn hóa Việt Nam.
        </p>
        <div className="flex gap-3 mt-5">
          {SOCIAL.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 w-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-smooth"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>

      {NAV_GROUPS.map((group) => (
        <div key={group.title}>
          <h4 className="font-display text-base font-semibold text-background mb-4">
            {group.title}
          </h4>
          <ul className="space-y-2.5 text-sm">
            {group.links.map(({ label, to }) => (
              <li key={label}>
                <Link to={to} className="hover:text-primary transition-smooth">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <div className="border-t border-background/10">
      <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-background/60">
        <span>© {new Date().getFullYear()} Tinh hoa Hương vị Việt. All rights reserved.</span>
        <div className="flex gap-4">
          <Link to="#" className="hover:text-primary transition-smooth">Chính sách</Link>
          <Link to="#" className="hover:text-primary transition-smooth">Điều khoản</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
