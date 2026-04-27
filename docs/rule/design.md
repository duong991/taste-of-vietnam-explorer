# Design Language System — Tinh hoa Hương vị Việt

> Tài liệu thống nhất phong cách thiết kế (visual + interaction) cho toàn bộ website **Taste of Vietnam Explorer**.
> Phạm vi: web SPA (React + Tailwind + shadcn/ui).
> Mục tiêu: mọi page/feature mới đều **nhìn-cảm-tương tác** đồng nhất, phản ánh đúng vision *"tinh tế — vùng miền — cảm xúc"*.
> Tài liệu này là **single source of truth** về design language. Các `*.design.md` của từng feature phải tham chiếu file này thay vì tự định nghĩa lại token.

---

## 1. Design Principles (5 nguyên tắc cốt lõi)

| # | Nguyên tắc | Diễn giải | Hệ quả thiết kế |
|---|------------|-----------|------------------|
| P1 | **Editorial, không phải marketplace** | Trang trông như tạp chí du lịch — ẩm thực biên tập, không như OTA liệt kê | Typography lớn, ảnh full-bleed, khoảng trắng rộng, không nhồi badge/promo |
| P2 | **Cảm xúc vùng miền** | Mỗi thành phố/món ăn gợi được "khí chất" địa phương | Ảnh chụp thật làm chủ đạo, overlay gradient ấm, accent màu nóng có kiểm soát |
| P3 | **Tinh tế, không phô trương** | Sang nhưng không "xa xỉ rỗng" | Palette giới hạn, gold/michelin chỉ làm điểm nhấn, không gradient sặc sỡ |
| P4 | **Hành trình khám phá** | UI dẫn dắt user đi sâu: City → Dish → Tour | Card-driven layout, hover reveal nội dung, breadcrumb rõ ràng |
| P5 | **Đa ngôn ngữ-ready** | Mọi block phải chịu được giãn 30–40% text khi sang EN | Không fix width theo VI, ưu tiên `min-h` thay vì `h`, không text trong ảnh |

**Anti-patterns (cấm):**
- ❌ Gradient cầu vồng, neon, glassmorphism nặng.
- ❌ Icon flat-color rời rạc làm chủ đạo (ưu tiên ảnh thật + Lucide outline).
- ❌ Card có > 2 màu accent cùng lúc.
- ❌ Text đặt trực tiếp lên ảnh không có overlay (vi phạm contrast).
- ❌ Auto-playing video/audio, popup chặn nội dung khi vào trang.

---

## 2. Brand Mood

- **Tone of voice (visual):** ấm áp, chậm rãi, có chiều sâu — như một cuốn travel essay.
- **Key adjectives:** *điềm tĩnh, ấm, mộc, tinh, gợi mở*.
- **Cảm hứng tham khảo:** Airbnb Magazine, Cereal Magazine, Apple Travel guides, Michelin Guide editorial.
- **Tránh:** Booking.com / Agoda style (mật độ thông tin cao, CTA đỏ rực, badge khuyến mãi).

---

## 3. Color System

### 3.1 Token nguồn (đã định nghĩa trong `src/index.css`)

Toàn bộ màu phải dùng qua **CSS variable + Tailwind token**, **KHÔNG** hardcode hex trong component.

| Token | Light (HSL) | Hex tham chiếu | Vai trò |
|-------|-------------|----------------|---------|
| `--background` | `40 33% 96%` | `#F7F3ED` Warm Beige | Nền chủ đạo, gợi giấy cũ / vải mộc |
| `--foreground` | `220 18% 16%` | `#1F2937` | Text chính |
| `--primary` | `150 39% 30%` | `#2F6B4F` Forest Green | Thương hiệu, CTA chính, link active |
| `--primary-glow` | `150 35% 42%` | — | Cuối gradient primary |
| `--accent` | `28 80% 52%` | `#E67E22` Orange | Rating, highlight nhỏ, không dùng làm CTA chính |
| `--michelin` | `357 70% 50%` | `#D62828` | **Chỉ** dùng cho badge Michelin / chứng nhận đặc biệt |
| `--gold` | `38 92% 55%` | — | Star rating, huy hiệu featured |
| `--muted` | `40 20% 90%` | — | Nền section phụ, divider mềm |
| `--card` | `0 0% 100%` | — | Nền card nổi |
| `--border` | `40 18% 86%` | — | Border mặc định |
| `--destructive` | `0 75% 50%` | — | Lỗi, xoá |

### 3.2 Quy tắc sử dụng

- **60 / 30 / 10 rule** trên mỗi viewport:
  - 60% `background` + `card` (trung tính ấm)
  - 30% ảnh nội dung
  - 10% `primary` + 1 trong các accent (`accent` / `gold` / `michelin`) — **không bao giờ dùng cả 3 cùng lúc**.
- **CTA chính** = `primary` (solid), **CTA phụ** = outline `primary` hoặc ghost.
- **`michelin`** chỉ xuất hiện khi entity thật sự được gắn nhãn Michelin/ngôi sao.
- **Dark mode** đã có token sẵn — mọi component **phải** test cả 2 mode (light là mặc định).

### 3.3 Ví dụ đúng / sai

✅ `className="bg-primary text-primary-foreground hover:bg-primary/90"`
❌ `className="bg-[#2F6B4F] text-white"` *(hardcode, không theo dark mode)*
❌ `className="bg-michelin text-white"` cho nút "Đăng ký nhận tin" *(lạm dụng michelin token)*

---

## 4. Typography

### 4.1 Font stack

| Vai trò | Font | Tailwind | Khi dùng |
|---------|------|----------|----------|
| Display / Heading | **Playfair Display** (500–800) | `font-display` hoặc tag `h1–h5` | Tiêu đề page, tên thành phố, tên món, hero |
| Body / UI | **Inter** (400–700) | mặc định | Toàn bộ text còn lại, UI, form, button |

> Heading **không** dùng Inter. Body **không** dùng Playfair (gây loãng nhịp đọc).

### 4.2 Type scale (desktop ≥ `lg`)

| Cấp | Class gợi ý | Use case |
|-----|-------------|----------|
| Display XL | `text-6xl md:text-7xl font-display font-semibold tracking-tight` | Hero headline |
| Display L | `text-4xl md:text-5xl font-display font-semibold` | Page title |
| H1 | `text-3xl md:text-4xl font-display font-semibold` | Section header lớn |
| H2 | `text-2xl md:text-3xl font-display font-semibold` | Section header thường |
| H3 | `text-xl font-display font-medium` | Card title nổi bật |
| Body L | `text-lg leading-relaxed` | Paragraph editorial |
| Body | `text-base leading-relaxed` | Paragraph mặc định |
| Body S | `text-sm` | Meta, caption |
| Caption | `text-xs uppercase tracking-wider text-muted-foreground` | Eyebrow, label section |

### 4.3 Quy tắc

- **Tracking:** heading luôn `tracking-tight`; eyebrow/label `tracking-wider uppercase`.
- **Line-height:** body editorial `leading-relaxed` (1.625) trở lên — tăng cảm giác đọc tạp chí.
- **Line-length:** đoạn văn dài giới hạn `max-w-prose` (~65ch). Không bao giờ để paragraph chạy full-width màn hình.
- **Số ký tự heading:** H1 ≤ 60, H2 ≤ 80, card title ≤ 48 (tránh wrap xấu khi sang EN).

---

## 5. Spacing, Layout & Grid

### 5.1 Spacing scale
- Chỉ dùng scale Tailwind mặc định (`4 / 6 / 8 / 12 / 16 / 20 / 24 / 32`). **Không** dùng số lẻ (`p-7`, `m-13`).
- **Section vertical padding:** `py-16 md:py-24` (mood "thoáng, tạp chí").
- **Card inner padding:** `p-5` (compact) hoặc `p-6 md:p-8` (editorial).

### 5.2 Container & Grid
- Container: dùng `container mx-auto` (đã set `padding: 2rem`, max `1400px` ở `2xl`).
- Grid breakpoint chuẩn:
  - Mobile: 1 cột
  - `md` (≥ 768px): 2 cột
  - `lg` (≥ 1024px): 3 cột (city / food / tour cards)
  - `xl` (≥ 1280px): 4 cột chỉ khi mật độ cao (food grid trang chi tiết)
- **Gap:** `gap-6` (mobile) → `gap-8` (desktop). Không dưới `gap-4`.

### 5.3 Border radius
- `--radius: 0.875rem` (~14px) → Tailwind `rounded-lg`.
- Chuẩn: card / image / button = `rounded-lg`. Pill / badge = `rounded-full`. Input = `rounded-md`.
- **Không** dùng `rounded-none` cho card (mất chất editorial mềm).

### 5.4 Elevation (shadow)
| Token utility | Use case |
|---------------|----------|
| `shadow-soft` | Card thường ở rest |
| `shadow-card` | Card hover, modal nhỏ |
| `shadow-elegant` | Featured card, dialog |
| `shadow-float` | Floating element (chatbot, sticky CTA) |

→ Không dùng shadow Tailwind mặc định (`shadow-md`, `shadow-xl`) trừ khi không có lựa chọn.

---

## 6. Imagery

- **Tỉ lệ chuẩn:**
  - Hero: `16/9` hoặc full-bleed `100vw × 80vh`.
  - City card: `4/5` (portrait, gợi tạp chí).
  - Food card: `1/1`.
  - Tour card: `3/2`.
- **Treatment:**
  - Luôn có overlay gradient khi đặt text lên ảnh: dùng `gradient-card-overlay` hoặc `gradient-hero-overlay`.
  - Ảnh chụp thật, tông ấm, độ bão hoà vừa — **không** filter HDR rực.
  - Subject (món ăn / cảnh quan) chiếm ≥ 60% khung.
- **Loading:** mọi `<img>` dùng `loading="lazy"` trừ ảnh hero LCP. Có placeholder skeleton (`bg-muted animate-pulse`).
- **Bản quyền:** không dùng ảnh stock generic; ưu tiên ảnh đối tác/biên tập (theo Risk #6 vision).

---

## 7. Iconography

- Bộ icon duy nhất: **Lucide React** (đã có sẵn trong stack).
- Style: outline, `stroke-width: 1.75`, size mặc định `w-5 h-5` trong UI, `w-6 h-6` trong heading inline.
- Màu: kế thừa `currentColor` — không tô màu đặc biệt trừ khi icon mang nghĩa trạng thái (success/error).
- **Không** mix Lucide với bộ icon khác (Heroicons, Feather…) trong cùng page.

---

## 8. Component Patterns

> Component hiện hữu: `Header`, `Hero`, `Features`, `CityCard`, `FoodCard`, `TourCard`, `Carousel`, `CTABanner`, `Chatbot`, `Footer`, `SectionHeader`, `Logo`, `NavLink`, cùng 49 primitive `ui/*` (shadcn).
> **Quy tắc bao trùm:** ưu tiên `ui/*` (shadcn) làm nền, **bọc** lại thay vì viết primitive mới. Mỗi component custom phải có 1 và chỉ 1 trách nhiệm.

### 8.1 Button
| Variant | Khi dùng | Class chuẩn |
|---------|----------|-------------|
| `default` (primary) | CTA chính / đặt tour / xem tất cả | `bg-primary text-primary-foreground hover:bg-primary/90` |
| `outline` | CTA phụ trong cùng section | `border border-primary text-primary hover:bg-primary/10` |
| `ghost` | Action trong toolbar / nav | mặc định shadcn |
| `link` | Inline trong paragraph | underline khi hover |
| `destructive` | Xoá / huỷ | dùng `--destructive` |

- Size: `sm` (32px) / `default` (40px) / `lg` (48px). Hero CTA = `lg`.
- **Không** có > 1 button `default` (primary) cùng cấp trong 1 section.

### 8.2 Card
- Cấu trúc: `image → eyebrow (caption uppercase) → title (font-display) → description (≤ 2 dòng, line-clamp) → meta row (icon + text)`.
- Hover: `transition-smooth`, scale ảnh 1.03, shadow nâng từ `shadow-soft` → `shadow-card`.
- **Không** gắn nhiều badge một lúc — tối đa 1 badge nổi (Michelin / Featured).

### 8.3 Section Header (`SectionHeader`)
- Bố cục: eyebrow caption + heading display + description ≤ 160 ký tự.
- Căn trái (editorial) cho landing; căn giữa cho khối CTA.

### 8.4 Form
- Dùng `Input`, `Textarea`, `Select` của shadcn.
- Label luôn ở **trên** input (không float, không placeholder-as-label).
- Error: text `text-destructive text-sm` ngay dưới input + border `border-destructive`.

### 8.5 Chatbot
- Floating bottom-right, `shadow-float`, `rounded-lg`.
- Avatar bot: dùng `Logo` thu nhỏ — không dùng emoji robot.
- Bubble user = `bg-primary text-primary-foreground`; bubble bot = `bg-muted text-foreground`.

### 8.6 Empty / Loading / Error
- **Loading:** skeleton `bg-muted animate-pulse` — **không** dùng spinner toàn trang.
- **Empty:** illustration nhẹ + heading H3 + 1 CTA. Tránh text "No data".
- **Error:** icon `AlertTriangle` (Lucide) + message + nút retry.

---

## 9. Motion & Interaction

- **Easing chuẩn:** `cubic-bezier(0.4, 0, 0.2, 1)` (đã expose qua `transition-smooth`, 350ms).
- **Animation library:** chỉ dùng `tailwindcss-animate` + 2 keyframe sẵn có (`fade-up`, `pop-in`). Không thêm Framer Motion trừ khi feature thực sự cần (carousel phức tạp, drag).
- **Quy tắc:**
  - Hover trên card / button: 150–250ms.
  - Page transition: fade-up 400–600ms cho section khi vào viewport.
  - **Không** parallax mạnh, không animation > 800ms cho thao tác thường.
- **Reduced motion:** mọi animation phải tự tắt khi `prefers-reduced-motion: reduce` (Tailwind hỗ trợ qua `motion-safe:` / `motion-reduce:`).

---

## 10. Accessibility (A11y) — Bắt buộc

- **Contrast:** body ≥ 4.5:1, large text ≥ 3:1. Test mọi màu accent trên nền `background` và `card`.
- **Focus visible:** giữ nguyên ring shadcn (`ring-2 ring-ring ring-offset-2`). **Không** xoá outline.
- **Keyboard:** mọi card clickable phải là `<a>` hoặc `<button>`, có Tab order tự nhiên.
- **Alt text:** ảnh nội dung bắt buộc có `alt` mô tả ngắn (≤ 120 ký tự). Ảnh decor: `alt=""`.
- **Heading hierarchy:** mỗi page có **đúng 1** `<h1>`. Không skip cấp (h2 → h4).
- **Language:** `<html lang="vi">` mặc định, đổi theo i18n.

---

## 11. Responsive Strategy

- **Mobile-first.** Viết style mobile trước, dùng `md:` / `lg:` để mở rộng.
- **Breakpoint chuẩn:** `sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1400`.
- **Touch target:** ≥ 44 × 44px (button `default` đã đạt; icon-only button dùng `size-10` tối thiểu).
- **Hero mobile:** giảm tỉ lệ ảnh xuống `4/5`, headline `text-4xl`, không hiển thị ≥ 3 CTA.
- **Carousel:** swipe-friendly, ẩn scrollbar (`scrollbar-hide`), tối thiểu 1.1 card peek ở mobile để gợi vuốt.

---

## 12. Content Voice (chạm tới design)

> Voice ảnh hưởng layout (độ dài câu, eyebrow, microcopy nút).

- Eyebrow ngắn 2–4 từ, có dấu, dùng `tracking-wider uppercase` (vd: "Vùng miền", "Tour ẩm thực").
- Microcopy nút: động từ + đối tượng — "Khám phá Hà Nội", "Đặt tour", **không** dùng "Click here" / "Xem thêm" trống nghĩa.
- Tiêu đề món/thành phố: ưu tiên tên gốc tiếng Việt có dấu; phụ đề tiếng Anh nhỏ ở dưới (cho inbound).

---

## 13. Tokens & File Reference

| Asset | Đường dẫn | Vai trò |
|-------|-----------|---------|
| Color + radius + shadow tokens | `src/index.css` | Source of truth — sửa ở đây, không override ad-hoc |
| Tailwind mapping | `tailwind.config.ts` | Map token → class. Thêm token mới phải update đồng bộ 2 file |
| UI primitives | `src/components/ui/*` | shadcn — **không** sửa trực tiếp; wrap nếu cần biến thể |
| Custom components | `src/components/*.tsx` | Tuân thủ DLS này |
| Fonts | Google Fonts CDN (Playfair Display, Inter) — import trong `index.css` | — |

---

## 14. Governance

- File `design.md` của từng feature **phải** tham chiếu tài liệu này, **không** redefine màu/typography.
- Khi cần token mới (ví dụ thêm 1 màu vùng miền): mở PR cập nhật `index.css` + `tailwind.config.ts` + section §3 ở đây.
- Mọi PR FE phải tự kiểm tra checklist §15 trước khi review.
- Owner: **FE Architecture Governor** (xem `docs/actor/fea.md`).

---

## 15. Review Checklist (dán vào PR mô tả)

**Color**
- [ ] Không có hex/rgb hardcode; chỉ dùng token.
- [ ] Không dùng > 1 accent color trong cùng viewport.
- [ ] `michelin` chỉ dùng cho badge Michelin thật.

**Typography**
- [ ] Heading dùng `font-display`, body dùng Inter.
- [ ] Có đúng 1 `<h1>` mỗi page.
- [ ] Paragraph dài có `max-w-prose`.

**Layout**
- [ ] Section padding `py-16 md:py-24`.
- [ ] Radius dùng `rounded-lg` cho card; không `rounded-none`.
- [ ] Shadow dùng utility custom (`shadow-soft/card/elegant/float`).

**Component**
- [ ] Tái dùng `ui/*` shadcn trước khi tự viết.
- [ ] Tối đa 1 CTA `default` mỗi section.
- [ ] Card có hover state + focus visible.

**Imagery**
- [ ] Có `alt`; ảnh nội dung lazy-load.
- [ ] Text trên ảnh có overlay gradient.

**Motion**
- [ ] Animation ≤ 600ms; honor `prefers-reduced-motion`.

**A11y**
- [ ] Contrast pass 4.5:1.
- [ ] Tab order tự nhiên, focus ring không bị ẩn.

**Responsive**
- [ ] Test ở `sm / md / lg / xl`.
- [ ] Touch target ≥ 44px.

**i18n**
- [ ] Layout không vỡ khi text dài thêm 40%.
- [ ] Không có text nằm trong ảnh.

---

*Phiên bản v0.1 — sẽ tiến hoá cùng codebase. Mọi đề xuất thay đổi gửi qua PR vào file này.*
