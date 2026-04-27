# SCR-09 — 404 Not Found

- **Route**: catch-all `*`
- **UC liên quan**: — (UX fallback)
- **Hiện trạng**: Chưa triển khai.

## 1. Layout regions

| Vùng | Mô tả |
|------|-------|
| R1 — Hero | Hình minh hoạ + thông điệp "Không tìm thấy trang" (đa ngôn ngữ) |
| R2 — Actions | Các CTA điều hướng |
| R3 — Suggestions | Gợi ý các trang phổ biến (Top thành phố / Top tour) |

## 2. Interactive Elements

| Mã EVT | Vùng | Element / Trigger | Event | Behavior | Target | UC |
|--------|------|-------------------|-------|----------|--------|----|
| EVT-09-01 | R2 | Nút "Về trang chủ" | Click | Navigate `/` | SCR-01 | — |
| EVT-09-02 | R2 | Nút "Tìm kiếm" | Click | Focus vào ô search header | SCR-G1 | UC-SEARCH-001 |
| EVT-09-03 | R2 | Nút "Hỏi trợ lý ảo" | Click | Mở chatbot overlay | SCR-G3 | UC-CHATBOT-001 |
| EVT-09-04 | R3 | Card thành phố/tour gợi ý | Click | Navigate detail | SCR-03/07 | — |

## 3. States

Static (không có loading).
