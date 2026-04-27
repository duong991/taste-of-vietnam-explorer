# Dev Agent Implementation Guide

> Hướng dẫn cho **AI dev agent** (Cascade / Cursor / Copilot Workspace...) implement toàn bộ tính năng của **Taste of Vietnam Explorer** theo scope v0.2 (FE-only, không BE, không account).
> Đây là **playbook tuần tự** — mỗi phase có: mục tiêu, tài liệu cần đọc, file cần tạo/sửa, tiêu chí chấp nhận. Hãy hoàn thành từng phase trước khi chuyển phase tiếp.

---

## 0. Trước khi bắt đầu — bắt buộc đọc

Theo thứ tự:

1. `docs/project-vision.md` — hiểu lý do tồn tại, target users, KPI, out-of-scope.
2. `docs/UC/README.md` — scope v0.2, danh sách module, quy ước MoSCoW.
3. `docs/screens/README.md` — Screen Map + Global Navigation Graph + quy ước `SCR-XX` / `EVT-XX-YY`.
4. `docs/rule/design.md` — design language (nếu có).
5. Toàn bộ `docs/UC/uc-*.md` và `docs/screens/scr-*.md` (đọc theo nhu cầu trong từng phase).

### Nguyên tắc làm việc

- **Một phase = một PR**. Không nhảy phase. Phase sau phụ thuộc phase trước.
- **Không thêm BE / auth / account / lead form** — vi phạm scope v0.2.
- Mọi UC có cột **Hiện trạng = Đã có** → tôn trọng code hiện tại, chỉ refactor khi thật cần.
- **Tech stack đã chốt**: React 18 + TS + Vite + TailwindCSS + shadcn/ui + React Router v6 + TanStack Query (đã có trong `package.json`).
- **Type-safe**: mọi entity (City / Dish / Tour / Partner) phải có TS type ở `src/types/`.
- **i18n**: mọi string user-facing phải đi qua `t('...')`, không hardcode (từ Phase 6 trở đi).
- **Test**: thêm unit test cho hooks/utils mới (`vitest` đã có sẵn). UI test ở mức smoke render.

### Tech stack bổ sung sẽ thêm theo phase

| Phase | Package | Mục đích |
|-------|---------|----------|
| 1 | (đã có) | — |
| 6 | `i18next`, `react-i18next`, `i18next-browser-languagedetector` | I18N |
| 7 | (provider SDK) `openai` hoặc `@google/generative-ai` | Chatbot LLM |
| 9 | `react-helmet-async` | SEO meta tags động |
| 9 | (build script) | sitemap.xml generator |

---

## 1. Bản đồ phụ thuộc giữa các phase

```
Phase 0  Setup (data schema, types, routing)
   │
   ├──► Phase 1  Global UI (Header / Footer / Layout polish)
   │       │
   │       ├──► Phase 2  Home polish
   │       ├──► Phase 3  City flow (list + detail)
   │       ├──► Phase 4  Dish flow (list + detail)
   │       ├──► Phase 5  Tour flow (list + detail)  ⚠ KHÔNG có lead form
   │       └──► Phase 6  Search
   │
   ├──► Phase 7  I18N (chèn vào toàn bộ phase 1-6 đã làm)
   ├──► Phase 8  Chatbot LLM upgrade
   ├──► Phase 9  SEO (meta, sitemap, JSON-LD)
   └──► Phase 10 404 polish + audit cuối
```

> **Phase 7 (I18N) có thể bắt đầu song song từ Phase 1** nếu agent thoải mái. Nếu không, để cuối cùng và refactor toàn bộ string.

---

## 2. Phase 0 — Setup nền tảng

**Mục tiêu**: chuẩn hoá cấu trúc dữ liệu + skeleton routing trước khi build từng màn.

### Đọc

- `docs/UC/README.md`
- `docs/screens/README.md`

### Tạo

| File | Nội dung |
|------|----------|
| `src/types/content.ts` | Type `City`, `Dish`, `Tour`, `Partner`, `Region`, `Locale` |
| `src/lib/content.ts` | Hàm `loadCities()`, `loadDishes()`, `loadTours()` dùng `fetch('/data/*.json')` + cache qua TanStack Query |
| `src/hooks/useCities.ts`, `useCity.ts`, `useDishes.ts`, `useDish.ts`, `useTours.ts`, `useTour.ts` | TanStack Query hooks |
| `public/data/cities.json` | Mảng `City[]`, ban đầu copy từ dữ liệu hardcoded hiện tại trong components |
| `public/data/dishes.json` | Mảng `Dish[]` |
| `public/data/tours.json` | Mảng `Tour[]` |
| `public/data/partners.json` | Mảng `Partner[]` |

### Sửa

| File | Thay đổi |
|------|----------|
| `src/App.tsx` | Thêm route placeholder `/thanh-pho`, `/mon-an`, `/mon-an/:slug`, `/tour`, `/tour/:slug`, `/tim-kiem` (mỗi route trỏ tới một page stub) |
| `src/pages/` | Thêm stub: `CityListPage.tsx`, `DishListPage.tsx`, `DishDetailPage.tsx`, `TourListPage.tsx`, `TourDetailPage.tsx`, `SearchPage.tsx` |

### Schema gợi ý

```ts
export type Region = 'bac' | 'trung' | 'nam';
export type Locale = 'vi' | 'en';

export interface LocalizedText { vi: string; en: string; }

export interface City {
  slug: string;
  name: LocalizedText;
  region: Region;
  shortDescription: LocalizedText;
  story: LocalizedText;          // markdown
  heroImage: string;
  gallery: string[];
  featuredDishSlugs: string[];
  featuredTourSlugs: string[];
  geo?: { lat: number; lng: number };
}

export interface Dish {
  slug: string;
  name: LocalizedText;
  citySlug: string;
  region: Region;
  type: ('savory'|'vegetarian'|'street'|'fine-dining')[];
  taste: ('spicy'|'sweet'|'sour'|'salty'|'umami')[];
  story: LocalizedText;
  ingredients: LocalizedText;
  image: string;
}

export interface Tour {
  slug: string;
  name: LocalizedText;
  citySlug: string;
  partnerId: string;
  durationHours: number;
  priceVnd: number;
  themes: string[];
  itinerary: { time: string; title: LocalizedText; description: LocalizedText; image?: string }[];
  highlightDishSlugs: string[];
  image: string;
}

export interface Partner {
  id: string;
  name: string;
  description: LocalizedText;
  email?: string;
  phone?: string;
  website?: string;
  zaloUrl?: string;
  messengerUrl?: string;
}
```

### Acceptance

- [ ] Mở các route mới không 404 (hiện stub).
- [ ] `loadCities()` đọc được từ `/public/data/cities.json` và cache qua TanStack Query.
- [ ] Type-check pass (`tsc --noEmit`).
- [ ] Test smoke: render từng page stub không crash.

---

## 3. Phase 1 — Global UI (Header / Footer / Layout)

**Mục tiêu**: hoàn thiện Header (nav, search, language placeholder, mobile menu), Footer.

### Đọc

- `docs/screens/scr-g1-header.md`
- `docs/screens/scr-g2-footer.md`

### Sửa / tạo

| File | Thay đổi |
|------|----------|
| `src/components/Header.tsx` | Triển khai EVT-G1-01..11 |
| `src/components/Footer.tsx` | Triển khai EVT-G2-01..05 |
| `src/components/SearchInput.tsx` (mới) | Component dùng chung cho Header + Hero |

### Acceptance

- [ ] Click logo → `/`.
- [ ] Nav links hiển thị đúng active state.
- [ ] Search submit → `/tim-kiem?q=...` (kết quả tạm rỗng cũng được).
- [ ] Hamburger trên mobile mở/đóng được.
- [ ] Header sticky shrink khi scroll.

---

## 4. Phase 2 — Home Screen polish

**Mục tiêu**: hoàn thiện toàn bộ event của `SCR-01`.

### Đọc

- `docs/screens/scr-01-home.md`
- `docs/UC/uc-explore.md`, `uc-dish.md`, `uc-tour.md` (UC-001/002 các module)

### Sửa

| File | Thay đổi |
|------|----------|
| `src/pages/Index.tsx` | Render đầy đủ R2..R7, lấy data từ hooks Phase 0 |
| `src/components/Hero.tsx` | Thêm CTA + search input → EVT-01-01/02 |
| `src/components/CityCard.tsx`, `FoodCard.tsx`, `TourCard.tsx` | Click navigate, hover effect |
| `src/components/Carousel.tsx` | Arrows + dots navigation |

### Acceptance

- [ ] Mọi EVT-01-* hoạt động đúng behavior.
- [ ] Loading hiển thị skeleton.
- [ ] Khi data section rỗng → ẩn section.

---

## 5. Phase 3 — City flow

**Mục tiêu**: City list + City detail đầy đủ.

### Đọc

- `docs/screens/scr-02-city-list.md`, `scr-03-city-detail.md`
- `docs/UC/uc-explore.md`

### Tạo / sửa

| File | Nội dung |
|------|----------|
| `src/pages/CityListPage.tsx` | Triển khai `SCR-02` đầy đủ |
| `src/pages/CityPage.tsx` | Mở rộng để có đủ R1..R8 (hero, story, dishes, tours, gallery, related cities, share) |
| `src/components/RegionFilter.tsx` (mới) | Tab Bắc/Trung/Nam, sync URL `?region=` |
| `src/components/Gallery.tsx` (mới) | Lightbox dùng `Dialog` của shadcn + keyboard nav |
| `src/components/ShareBar.tsx` (mới) | FB/X/copy link |
| `src/lib/markdown.tsx` (mới) | Render `story` markdown — dùng `react-markdown` (cài thêm) |

### Acceptance

- [ ] Mọi EVT-02-* và EVT-03-* hoạt động.
- [ ] Slug invalid → render `NotFound`.
- [ ] Gallery: phím `Esc`, `←`, `→` hoạt động.
- [ ] Copy link toast hiển thị.
- [ ] Filter URL `?region=bac` reload lại vẫn nhớ.

---

## 6. Phase 4 — Dish flow

**Mục tiêu**: Dish list + Dish detail.

### Đọc

- `docs/screens/scr-04-dish-list.md`, `scr-05-dish-detail.md`
- `docs/UC/uc-dish.md`

### Tạo

| File | Nội dung |
|------|----------|
| `src/pages/DishListPage.tsx` | `SCR-04` |
| `src/pages/DishDetailPage.tsx` | `SCR-05` |
| `src/components/FilterSidebar.tsx` (mới) | Component dùng chung Dish + Tour list |
| `src/components/SortDropdown.tsx` (mới) | Reuse |
| `src/lib/filter.ts` (mới) | Hàm `applyFilters(items, query)` thuần — testable |

### Acceptance

- [ ] Mọi EVT-04-*, EVT-05-* hoạt động.
- [ ] Filter combine multi-criteria + sync URL.
- [ ] "Xoá filter" reset URL.
- [ ] Tag click → list filtered đúng.
- [ ] Test unit cho `applyFilters`.

---

## 7. Phase 5 — Tour flow

**⚠ Quan trọng**: theo scope v0.2 — KHÔNG có lead form. Chỉ CTA chuyển hướng kênh ngoài.

### Đọc

- `docs/screens/scr-06-tour-list.md`, `scr-07-tour-detail.md`
- `docs/UC/uc-tour.md` (đặc biệt mục "Ghi chú scope v0.2")

### Tạo

| File | Nội dung |
|------|----------|
| `src/pages/TourListPage.tsx` | `SCR-06`. Reuse `FilterSidebar`, `SortDropdown` |
| `src/pages/TourDetailPage.tsx` | `SCR-07` |
| `src/components/Itinerary.tsx` (mới) | Timeline có toggle expand từng step |
| `src/components/PartnerContactBar.tsx` (mới) | Render các CTA `mailto:`, `tel:`, Zalo, Messenger, website từ `Partner` |
| `src/components/PriceRangeSlider.tsx` (mới) | Dùng `Slider` shadcn, debounce 300ms |

### Acceptance

- [ ] Mọi EVT-06-*, EVT-07-* hoạt động.
- [ ] **Không tồn tại form gửi lead nào trong code.** Tìm `<form` trong `TourDetailPage.tsx` phải = 0.
- [ ] Nút contact mở đúng `mailto:`, `tel:`, deep link Zalo/Messenger.
- [ ] Filter ngân sách debounce, không re-render quá nhiều.

---

## 8. Phase 6 — Search

**Mục tiêu**: tìm kiếm hợp nhất client-side.

### Đọc

- `docs/screens/scr-08-search.md`
- `docs/UC/uc-search.md`

### Tạo

| File | Nội dung |
|------|----------|
| `src/pages/SearchPage.tsx` | `SCR-08` |
| `src/lib/search.ts` (mới) | Hàm `searchAll(query, locale)` chạy fuzzy match. Có thể dùng `fuse.js` (cài thêm) |
| `src/hooks/useRecentSearches.ts` (mới) | Lưu/đọc `localStorage.recentSearches` |

### Acceptance

- [ ] Submit từ Header search → `/tim-kiem?q=...`.
- [ ] Tab All / City / Dish / Tour filter đúng.
- [ ] Empty state hiển thị gợi ý.
- [ ] `useRecentSearches` test pass.

---

## 9. Phase 7 — I18N (VI / EN)

**Mục tiêu**: đa ngôn ngữ Must cho MVP.

### Đọc

- `docs/UC/uc-i18n.md`
- `docs/screens/scr-g1-header.md` (EVT-G1-07)

### Tạo / sửa

| File | Nội dung |
|------|----------|
| (deps) `i18next`, `react-i18next`, `i18next-browser-languagedetector` | Cài thêm |
| `src/i18n/index.ts` (mới) | Init i18next, detector, fallback `vi` |
| `src/i18n/locales/vi.json`, `en.json` | Strings UI (không phải nội dung dữ liệu) |
| `src/main.tsx` | Import `./i18n` |
| `src/components/LanguageSwitcher.tsx` (mới) | Dropdown VI/EN, lưu `localStorage('locale')` |
| Toàn bộ component đã làm | Refactor string → `t('key')` |
| `src/lib/content.ts` | Helper `pickLocale(text: LocalizedText, locale)` |

### Decision: URL strategy

- **Khuyến nghị**: prefix `/en/...`, mặc định không prefix = VI. Cần update `App.tsx` routes.
- Nếu muốn nhanh, có thể bỏ qua URL prefix ở phase này, chỉ đổi ngôn ngữ runtime — đẩy URL prefix sang Phase 9 (cùng SEO hreflang).

### Acceptance

- [ ] Switcher đổi ngôn ngữ → toàn bộ UI đổi.
- [ ] Reload giữ nguyên ngôn ngữ.
- [ ] Mọi entity hiển thị `name`/`description` đúng locale; thiếu bản dịch → fallback VI.
- [ ] `localStorage('locale')` được set.

---

## 10. Phase 8 — Chatbot LLM upgrade

**Mục tiêu**: nâng cấp `Chatbot.tsx` từ rule-based sang gọi LLM API thật.

### Đọc

- `docs/UC/uc-chatbot.md`
- `docs/screens/scr-g3-chatbot.md` (đặc biệt mục "Notes về context injection")

### Bảo mật API key

> **Không commit key vào repo.** Triển khai theo lựa chọn:
>
> - **A. Edge function proxy** (khuyến nghị): tạo `api/chat.ts` (Vercel) hoặc `netlify/functions/chat.ts`. FE gọi cùng origin `/api/chat`. Key đặt trong env hosting. Đây là exception về "không có BE" — chỉ là 1 proxy mỏng forward request, không lưu state, không quản lý user.
> - **B. Key public tại provider**: bật domain restriction + quota tại provider. Đặt trong `VITE_OPENAI_API_KEY`. Rủi ro cao hơn — chỉ chấp nhận nếu A không khả thi.

### Sửa / tạo

| File | Nội dung |
|------|----------|
| `src/lib/llm.ts` (mới) | `streamChat({ messages, locale, context })` trả async iterator/stream |
| `src/lib/chatContext.ts` (mới) | `buildContext(routePath, locale, data)` — lấy entity hiện tại + subset dữ liệu |
| `src/hooks/useChatHistory.ts` (mới) | Persist `localStorage.chatHistory` |
| `src/components/Chatbot.tsx` | Refactor: gọi `streamChat`, append streaming tokens, error banner, throttle |
| `src/components/ChatMessageCard.tsx` (mới) | Render rich card city/dish/tour bot trả về (JSON tool call hoặc parse markdown link) |
| `api/chat.ts` (option A) | Vercel/Netlify function proxy LLM provider |
| `.env.example` | Document biến môi trường |

### Acceptance

- [ ] Gửi tin nhắn → bot stream phản hồi.
- [ ] Đổi route → context tự cập nhật cho lượt sau.
- [ ] Đổi ngôn ngữ → bot trả lời theo locale.
- [ ] Lỗi network → banner đỏ, Send disabled, "Thử lại" hoạt động.
- [ ] Reload → khôi phục lịch sử.
- [ ] "Xoá lịch sử" có confirm.
- [ ] Throttle: spam Send n giây → bị disable.
- [ ] Click card trong response → navigate đúng detail.

---

## 11. Phase 9 — SEO

**Mục tiêu**: meta động + sitemap + structured data.

### Đọc

- `docs/UC/uc-seo.md`

### Cài + tạo

| File | Nội dung |
|------|----------|
| (deps) `react-helmet-async` | Cài |
| `src/main.tsx` | Wrap `HelmetProvider` |
| `src/components/Seo.tsx` (mới) | Component nhận `title`, `description`, `image`, `url`, `type`; render `<title>`, OG, Twitter, canonical, hreflang |
| Mọi page | Bọc `<Seo .../>` ở đầu |
| `src/lib/jsonld.ts` (mới) | Hàm sinh JSON-LD cho City (`TouristAttraction`), Dish (`Recipe`/`Food`), Tour (`TouristTrip`) |
| `scripts/generate-sitemap.mjs` (mới) | Đọc `public/data/*.json` → ghi `public/sitemap.xml` |
| `package.json` | Thêm script `"prebuild": "node scripts/generate-sitemap.mjs"` |
| `public/robots.txt` | Thêm dòng `Sitemap: https://<domain>/sitemap.xml` |

### Cảnh báo SSR

> SPA Vite render meta tags ở client → một số crawler không đọc được. Nếu bạn (hoặc team) cần SEO mạnh, cân nhắc chuyển sang **vite-ssg** hoặc **Astro** — đây là quyết định kiến trúc, KHÔNG nằm trong phase này. Phase 9 chỉ làm tốt nhất trong giới hạn SPA + Helmet.

### Acceptance

- [ ] View source mỗi trang detail → `<title>`, `description`, OG đúng.
- [ ] `sitemap.xml` được sinh khi build, có URL của mọi city/dish/tour.
- [ ] JSON-LD validate qua Google Rich Results Test (kiểm tra thủ công).
- [ ] Hreflang `vi` / `en` đúng nếu Phase 7 đã làm URL prefix.

---

## 12. Phase 10 — 404 + audit cuối

### Đọc

- `docs/screens/scr-09-not-found.md`

### Sửa / tạo

| File | Nội dung |
|------|----------|
| `src/pages/NotFound.tsx` | Mở rộng theo `SCR-09`: hero + 3 action + suggestions |

### Audit checklist (chạy trước khi đóng dự án)

- [ ] Lighthouse Performance ≥ 85, Accessibility ≥ 95, SEO ≥ 95.
- [ ] Không còn `console.log` lạc.
- [ ] Không còn TODO chưa giải quyết trong code.
- [ ] Mọi link external có `rel="noopener noreferrer"`, `target="_blank"`.
- [ ] Mọi ảnh có `alt`.
- [ ] Mọi page có `<Seo />`.
- [ ] Test suite pass.
- [ ] Search "form action" / "submit lead" trong code = 0 (đảm bảo không vô tình thêm BE form).

---

## 13. Quy ước commit & PR

- Commit prefix theo phase: `phase-3: implement city detail gallery`.
- PR mô tả: link tới UC + Screen file, checklist Acceptance đã tick.
- Mỗi PR ≤ 1 phase. Phase lớn có thể chia thành nhiều PR theo screen.

---

## 14. Bảng tra nhanh: file → phase

| File / khu vực | Phase |
|----------------|-------|
| `src/types/`, `src/lib/content.ts`, `public/data/*.json` | 0 |
| `Header`, `Footer`, `SearchInput` | 1 |
| `pages/Index.tsx`, `Hero`, `CityCard`, `FoodCard`, `TourCard`, `Carousel` | 2 |
| `CityListPage`, `CityPage`, `Gallery`, `ShareBar`, `RegionFilter` | 3 |
| `DishListPage`, `DishDetailPage`, `FilterSidebar`, `SortDropdown`, `lib/filter.ts` | 4 |
| `TourListPage`, `TourDetailPage`, `Itinerary`, `PartnerContactBar` | 5 |
| `SearchPage`, `lib/search.ts`, `useRecentSearches` | 6 |
| `i18n/`, `LanguageSwitcher`, refactor strings | 7 |
| `Chatbot.tsx`, `lib/llm.ts`, `lib/chatContext.ts`, `api/chat.ts` | 8 |
| `Seo`, `lib/jsonld.ts`, `scripts/generate-sitemap.mjs` | 9 |
| `NotFound.tsx`, audit | 10 |

---

## 15. Khi mơ hồ

Theo thứ tự ưu tiên:

1. Re-đọc `docs/UC/<module>.md` + `docs/screens/scr-*.md` của màn liên quan.
2. Tham chiếu `docs/project-vision.md` mục §5 (giá trị cốt lõi) và §8 (out-of-scope).
3. Nếu vẫn không rõ → **dừng và hỏi**, KHÔNG tự thêm tính năng vi phạm scope (đặc biệt: BE, account, lead form, payment).
