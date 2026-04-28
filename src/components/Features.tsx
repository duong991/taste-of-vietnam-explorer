import { Sparkles, Leaf, ShieldCheck, Headphones } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";

const Features = () => {
  const { t } = useLocale();

  const features = [
    { icon: Sparkles, title: t("features.f1_title"), desc: t("features.f1_desc") },
    { icon: Leaf,     title: t("features.f2_title"), desc: t("features.f2_desc") },
    { icon: ShieldCheck, title: t("features.f3_title"), desc: t("features.f3_desc") },
    { icon: Headphones,  title: t("features.f4_title"), desc: t("features.f4_desc") },
  ];

  return (
    <section className="container py-16">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 rounded-2xl bg-card border border-border shadow-soft p-6 md:p-8">
        {features.map((f) => (
          <div key={f.title} className="flex flex-col items-start gap-3">
            <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <f.icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-base font-semibold text-foreground mb-1">
                {f.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
