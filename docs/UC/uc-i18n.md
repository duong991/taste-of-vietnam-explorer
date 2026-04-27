# UC — Module I18N (Đa ngôn ngữ)

> **Must cho MVP** (theo scope v0.2). Phục vụ G5 — VI / EN tối thiểu (Vision §6).
> Hiện codebase chỉ có tiếng Việt. Tích hợp `i18next` / `react-i18next` thuần FE; bản dịch nội dung lưu trong JSON cùng với dữ liệu.

## Use Case List

| Mã UC | Tên Use Case | Actor chính | Ưu tiên | Hiện trạng | Ghi chú |
|-------|--------------|-------------|---------|------------|---------|
| UC-I18N-001 | Chuyển đổi ngôn ngữ giao diện (VI / EN) | Guest | Must | Chưa có | Switcher trong Header |
| UC-I18N-002 | Hiển thị nội dung theo ngôn ngữ đã chọn | Guest | Must | Chưa có | Fallback khi thiếu bản dịch |
| UC-I18N-003 | Tự động phát hiện ngôn ngữ từ trình duyệt | Guest | Should | Chưa có | `navigator.language` |
| UC-I18N-004 | Lưu ngôn ngữ ưu tiên trên thiết bị | Guest | Must | Chưa có | `localStorage` (không cần account) |
| UC-I18N-005 | URL tách theo locale | Guest / SEO crawler | Should | Chưa có | `/en/...` & `/vi/...` |
| UC-I18N-006 | Hreflang cho SEO | SEO crawler | Should | Chưa có | `<<include>>` UC-SEO-002 |
| UC-I18N-007 | Định dạng ngày / số / tiền tệ theo locale | Guest | Should | Chưa có | `Intl.*` |
| UC-I18N-008 | Hỗ trợ ngôn ngữ thứ 3 (JP / KR / FR...) | Guest | Won't (now) | Chưa có | Theo nhu cầu thực tế (Vision §9) |

## Quan hệ

- UC-I18N-001 ảnh hưởng toàn bộ UC EXPLORE / DISH / TOUR / SEARCH / CHATBOT.
- UC-I18N-002 `<<include>>` mọi UC hiển thị nội dung.
- UC-CHATBOT-016 `<<include>>` UC-I18N-001 (truyền ngôn ngữ vào prompt LLM).

## Cấu trúc dữ liệu đa ngôn ngữ (gợi ý cho SA)

> Mỗi entity (city/dish/tour) trong `public/data/*.json` có các trường `name_vi`, `name_en`, `description_vi`, `description_en`... hoặc nhóm theo locale `{ vi: {...}, en: {...} }`. Quyết định thuộc về SA.
