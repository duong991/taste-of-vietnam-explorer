import { Link } from "react-router-dom";
import Logo from "./Logo";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";

const SOCIAL = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

const Footer = () => {
  const { t, path } = useLocale();

  const NAV_GROUPS = [
    {
      title: t("footer.explore"),
      links: [
        { label: t("nav.cities"), to: path.cityList },
        { label: t("nav.dishes"), to: path.dishList },
        { label: t("nav.tours"), to: path.tourList },
        { label: t("footer.search"), to: path.search },
      ],
    },
    {
      title: t("footer.support"),
      links: [
        { label: t("footer.link_contact"), to: "#" },
        { label: t("footer.link_faq"), to: "#" },
        { label: t("footer.link_privacy"), to: "#" },
        { label: t("footer.link_terms"), to: "#" },
      ],
    },
    {
      title: t("footer.about"),
      links: [
        { label: t("footer.link_story"), to: "#" },
        { label: t("footer.link_partners"), to: "#" },
        { label: t("footer.link_jobs"), to: "#" },
        { label: t("footer.link_press"), to: "#" },
      ],
    },
  ];

  return (
  <footer className="bg-foreground text-background/80">
    <div className="container py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
      <div className="col-span-2 md:col-span-1">
        <Link to="/" aria-label={t("nav.logo_label")}>
          <Logo className="[&_*]:!text-background" />
        </Link>
        <p className="mt-4 text-sm leading-relaxed text-background/70 max-w-xs">
          {t("footer.tagline")}
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
        <span>{t("footer.copyright", { year: new Date().getFullYear() })}</span>
        <div className="flex gap-4">
          <Link to="#" className="hover:text-primary transition-smooth">{t("footer.policy")}</Link>
          <Link to="#" className="hover:text-primary transition-smooth">{t("footer.terms")}</Link>
        </div>
      </div>
    </div>
  </footer>
  );
};

export default Footer;
