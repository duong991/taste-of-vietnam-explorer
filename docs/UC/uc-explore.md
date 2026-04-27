# UC — Module EXPLORE (Khám phá thành phố & vùng miền)

> Luồng cốt lõi "Khám phá thành phố" (Vision §10). Codebase đã có `Hero`, `CityCard`, route `/thanh-pho/:slug`.
> Dữ liệu lấy từ JSON/Markdown trong `public/data/` (theo scope v0.2).

## Use Case List

| Mã UC | Tên Use Case | Actor chính | Ưu tiên | Hiện trạng | Ghi chú |
|-------|--------------|-------------|---------|------------|---------|
| UC-EXPLORE-001 | Xem trang chủ | Guest | Must | Đã có | Hero, CTA, các section nổi bật |
| UC-EXPLORE-002 | Xem danh sách thành phố nổi bật trên trang chủ | Guest | Must | Đã có | Carousel/Grid `CityCard` |
| UC-EXPLORE-003 | Xem toàn bộ thành phố theo vùng miền (Bắc/Trung/Nam) | Guest | Should | Chưa có | Trang `/thanh-pho` với filter vùng miền |
| UC-EXPLORE-004 | Xem chi tiết một thành phố | Guest | Must | Đã có | Route `/thanh-pho/:slug` |
| UC-EXPLORE-005 | Xem các món ăn đặc trưng của thành phố | Guest | Must | Một phần | Trong trang chi tiết thành phố |
| UC-EXPLORE-006 | Xem các tour ẩm thực của thành phố | Guest | Must | Một phần | Trong trang chi tiết thành phố |
| UC-EXPLORE-007 | Xem câu chuyện văn hoá / bối cảnh vùng miền | Guest | Should | Chưa có | Khác biệt cốt lõi (Vision §5) |
| UC-EXPLORE-008 | Điều hướng tới các thành phố cùng vùng miền / liên quan | Guest | Should | Chưa có | "Thành phố lân cận" |
| UC-EXPLORE-009 | Chia sẻ trang thành phố qua mạng xã hội | Guest | Should | Chưa có | `<<extend>>` UC-SEO-003 |
| UC-EXPLORE-010 | Xem bản đồ vị trí thành phố | Guest | Could | Chưa có | Embed map (Google/Mapbox) |
| UC-EXPLORE-011 | Xem gallery hình ảnh thành phố | Guest | Should | Chưa có | Hỗ trợ cảm xúc thương hiệu |
| UC-EXPLORE-012 | Mở Chatbot từ trang thành phố với ngữ cảnh thành phố hiện tại | Guest | Should | Một phần | `<<include>>` UC-CHATBOT-001 |

## Quan hệ

- UC-EXPLORE-004 `<<include>>` UC-EXPLORE-005, UC-EXPLORE-006, UC-EXPLORE-011.
- UC-EXPLORE-012 `<<include>>` UC-CHATBOT-001.
- UC-EXPLORE-009 `<<extend>>` UC-SEO-003 (Open Graph metadata).
