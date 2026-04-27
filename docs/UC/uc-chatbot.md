# UC — Module CHATBOT (Trợ lý ảo)

> Một trong 3 luồng cốt lõi (Vision §10).
> **Theo scope v0.2**: FE **gọi thẳng LLM API** (OpenAI/Gemini...). Lịch sử hội thoại lưu `localStorage`. Không có user account → không cá nhân hoá xuyên thiết bị.

## Use Case List

| Mã UC | Tên Use Case | Actor chính | Ưu tiên | Hiện trạng | Ghi chú |
|-------|--------------|-------------|---------|------------|---------|
| UC-CHATBOT-001 | Mở phiên chat với trợ lý ảo | Guest | Must | Đã có | Floating button |
| UC-CHATBOT-002 | Gửi tin nhắn dạng văn bản | Guest | Must | Đã có | |
| UC-CHATBOT-003 | Nhận gợi ý nhanh (suggested prompts) | Guest | Must | Đã có | |
| UC-CHATBOT-004 | Gọi LLM API và stream phản hồi | Guest | Must | Chưa có | Thay thế rule-based bằng LLM |
| UC-CHATBOT-005 | Đính kèm ngữ cảnh dữ liệu (city/dish/tour) vào prompt | Guest | Must | Chưa có | System prompt + context injection |
| UC-CHATBOT-006 | Nhận gợi ý thành phố theo nhu cầu | Guest | Must | Một phần | Qua LLM |
| UC-CHATBOT-007 | Nhận gợi ý món ăn theo khẩu vị | Guest | Must | Một phần | |
| UC-CHATBOT-008 | Nhận gợi ý tour theo ngân sách / thời gian | Guest | Should | Chưa có | KPI Personalization (Vision §7) |
| UC-CHATBOT-009 | Hiển thị card kết quả (city/dish/tour) trong cửa sổ chat | Guest | Should | Một phần | Rich response |
| UC-CHATBOT-010 | Chuyển ngữ cảnh từ trang đang xem vào phiên chat | Guest | Should | Chưa có | Đang ở `/thanh-pho/hoi-an` → bot biết context |
| UC-CHATBOT-011 | Đóng / thu nhỏ cửa sổ chat | Guest | Must | Đã có | |
| UC-CHATBOT-012 | Lưu lịch sử hội thoại trong phiên (session) | Guest | Must | Đã có | React state |
| UC-CHATBOT-013 | Khôi phục lịch sử hội thoại sau reload | Guest | Should | Chưa có | `localStorage` |
| UC-CHATBOT-014 | Xoá lịch sử hội thoại | Guest | Should | Chưa có | Reset `localStorage` |
| UC-CHATBOT-015 | Đánh giá nhanh câu trả lời (thumbs up/down) | Guest | Could | Chưa có | Lưu local; không gửi BE |
| UC-CHATBOT-016 | Chuyển ngôn ngữ phiên chat (theo i18n đã chọn) | Guest | Must | Chưa có | `<<include>>` UC-I18N-001 |
| UC-CHATBOT-017 | Chuyển hướng người dùng tới trang chi tiết từ gợi ý | Guest | Must | Một phần | Click card → `/thanh-pho/...` |
| UC-CHATBOT-018 | Xử lý lỗi LLM API (rate limit / network / key invalid) | Guest | Must | Chưa có | Hiển thị fallback message |
| UC-CHATBOT-019 | Giới hạn tốc độ gửi tin nhắn (client-side throttle) | Guest | Should | Chưa có | Tránh lạm dụng API |

## Quan hệ

- UC-CHATBOT-006/007/008 `<<extend>>` UC-CHATBOT-002 (qua LLM).
- UC-CHATBOT-010 `<<include>>` UC-EXPLORE-012 / UC-DISH-006 / UC-TOUR-007.
- UC-CHATBOT-016 `<<include>>` UC-I18N-001.

## Lưu ý kỹ thuật & rủi ro (cho SA)

> FE gọi thẳng LLM API có rủi ro **lộ API key**. Khuyến nghị (không phải UC):
> - Dùng **edge function / serverless proxy** của hosting (Vercel / Netlify / Cloudflare) như một lớp mỏng forward request, giấu key. Vẫn KHÔNG phải BE quản lý dữ liệu/người dùng.
> - Nếu chấp nhận key public: bật **domain restriction**, **usage quota**, **rate limit** tại provider.
> - UC-CHATBOT-018 và UC-CHATBOT-019 là biện pháp giảm thiểu ở phía client.
