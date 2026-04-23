import { Sparkles, Leaf, ShieldCheck, Headphones } from "lucide-react";

const features = [
  { icon: Sparkles, title: "Ẩm thực đặc sắc", desc: "Tuyển chọn những món ngon nổi tiếng khắp Việt Nam" },
  { icon: Leaf, title: "Trải nghiệm địa phương", desc: "Kết nối với người bản địa và văn hóa bản địa" },
  { icon: ShieldCheck, title: "Chất lượng đảm bảo", desc: "Dịch vụ uy tín, an toàn, được đánh giá cao" },
  { icon: Headphones, title: "Hỗ trợ 24/7", desc: "Đội ngũ hỗ trợ nhiệt tình mọi lúc mọi nơi" },
];

const Features = () => (
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

export default Features;
