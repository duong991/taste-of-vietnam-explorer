# UC — Module SEO (Tối ưu tìm kiếm & chia sẻ)

> Phục vụ KPI Brand — Organic traffic & Backlink (Vision §7).
> Lưu ý: dự án là SPA (Vite + React); để SEO hiệu quả cần cân nhắc **SSG/SSR** (Vite SSG, Astro, Next.js) — quyết định kiến trúc thuộc SA. UC dưới đây trung lập về cách triển khai.

## Use Case List

| Mã UC | Tên Use Case | Actor chính | Ưu tiên | Hiện trạng | Ghi chú |
|-------|--------------|-------------|---------|------------|---------|
| UC-SEO-001 | Render meta tags động theo trang (title, description) | Search Engine | Must | Chưa có | `react-helmet-async` hoặc SSG |
| UC-SEO-002 | Hreflang cho phiên bản đa ngôn ngữ | Search Engine | Should | Chưa có | `<<include>>` UC-I18N-006 |
| UC-SEO-003 | Open Graph / Twitter Card cho chia sẻ mạng xã hội | Search Engine / Social | Must | Chưa có | Liên quan UC-EXPLORE-009, UC-DISH-010, UC-TOUR-011 |
| UC-SEO-004 | Sitemap.xml tự sinh từ dữ liệu JSON | Search Engine | Must | Chưa có | Build-time generation |
| UC-SEO-005 | Robots.txt | Search Engine | Must | Một phần | File có sẵn `public/robots.txt` |
| UC-SEO-006 | Structured data (JSON-LD) cho City / Dish / Tour | Search Engine | Should | Chưa có | Schema.org `Recipe`, `TouristAttraction`, `TouristTrip` |
| UC-SEO-007 | URL slug thân thiện | Search Engine | Must | Một phần | Đã có cho `/thanh-pho/:slug` |
| UC-SEO-008 | Canonical URL | Search Engine | Should | Chưa có | Tránh duplicate content đa ngôn ngữ |
| UC-SEO-009 | Tối ưu Core Web Vitals (LCP, CLS, INP) | Guest / Search Engine | Should | Một phần | Cần audit |
| UC-SEO-010 | Breadcrumb có structured data | Search Engine | Could | Chưa có | |

## Quan hệ

- UC-SEO-* đọc dữ liệu trực tiếp từ JSON/Markdown trong `public/data/`.
- UC-SEO-002 `<<include>>` UC-I18N-005, UC-I18N-006.
