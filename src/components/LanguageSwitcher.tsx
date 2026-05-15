import { Globe } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";

interface Props {
  className?: string;
}

const LanguageSwitcher = ({ className }: Props) => {
  const { t, i18n, locale } = useLocale();
  const nextLocale = locale === "vi" ? "en" : "vi";
  const currentLocaleLabel = locale.toUpperCase();

  const toggle = () => {
    i18n.changeLanguage(nextLocale);
  };

  return (
    <button
      onClick={toggle}
      aria-label={t("nav.lang_switch")}
      className={
        className ??
        "flex items-center gap-1.5 rounded-full border border-input px-3 py-1.5 text-xs font-medium text-foreground transition-smooth hover:border-primary hover:text-primary"
      }
    >
      <Globe className="h-3.5 w-3.5" />
      {currentLocaleLabel}
    </button>
  );
};

export default LanguageSwitcher;
