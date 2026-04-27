# SCR-G3 — Chatbot Overlay (Global)

- **Phạm vi**: floating button hiển thị trên mọi màn hình; overlay panel mở chồng trên màn hiện tại.
- **UC liên quan**: UC-CHATBOT-001..019, UC-I18N-001
- **Components**: `Chatbot`
- **Lưu ý scope v0.2**: FE gọi thẳng LLM API (qua proxy edge function nếu có). Lịch sử lưu `localStorage`.

## 1. Layout regions

| Vùng | Mô tả |
|------|-------|
| R1 — Floating button | Ở góc dưới-phải, luôn hiển thị |
| R2 — Header panel | Tiêu đề "Trợ lý ẩm thực", nút thu nhỏ, nút đóng, nút xoá lịch sử |
| R3 — Message list | Scrollable; bubble user/bot; bot có thể chứa `card` city/dish/tour |
| R4 — Suggested prompts | Chip các câu hỏi mẫu (chỉ hiện khi list rỗng) |
| R5 — Input area | Textarea + nút gửi + indicator typing/streaming |
| R6 — Error banner | Khi LLM API lỗi |

## 2. Interactive Elements

| Mã EVT | Vùng | Element / Trigger | Event | Behavior | Target | UC |
|--------|------|-------------------|-------|----------|--------|----|
| EVT-G3-01 | R1 | Floating button | Click | Toggle overlay open/close | self | UC-CHATBOT-001 |
| EVT-G3-02 | R2 | Nút "—" thu nhỏ | Click | Thu gọn về floating button | self | UC-CHATBOT-011 |
| EVT-G3-03 | R2 | Nút "X" đóng | Click | Đóng overlay (giữ history) | self | UC-CHATBOT-011 |
| EVT-G3-04 | R2 | Nút "Xoá lịch sử" | Click | Confirm → xoá messages + clear `localStorage.chatHistory` | self | UC-CHATBOT-014 |
| EVT-G3-05 | R3 | Bot message — card city/dish/tour | Click | Navigate tới detail tương ứng | SCR-03/05/07 | UC-CHATBOT-017 |
| EVT-G3-06 | R3 | Bot message — thumbs up/down | Click | Lưu rating local (Could) | self | UC-CHATBOT-015 |
| EVT-G3-07 | R3 | Auto-scroll | New message | Scroll tới cuối | self | — |
| EVT-G3-08 | R4 | Suggested prompt chip | Click | Điền vào input + auto-submit | self | UC-CHATBOT-003 |
| EVT-G3-09 | R5 | Textarea | KeyDown `Enter` (no Shift) | Submit message | self | UC-CHATBOT-002 |
| EVT-G3-10 | R5 | Textarea | KeyDown `Shift+Enter` | Newline | self | — |
| EVT-G3-11 | R5 | Nút Gửi | Click | Submit message | self | UC-CHATBOT-002 |
| EVT-G3-12 | R5 | (system) Submit message | — | (1) Push user message → state; (2) Lấy context route hiện tại + locale; (3) Gọi LLM API có streaming; (4) Append bot message dần | self | UC-CHATBOT-004, UC-CHATBOT-005, UC-CHATBOT-010, UC-CHATBOT-016 |
| EVT-G3-13 | R5 | Throttle / disable Send | Sau khi gửi liên tiếp | Disable Send n giây để tránh spam | self | UC-CHATBOT-019 |
| EVT-G3-14 | R6 | Lỗi API (rate limit / network / 401) | API error | Hiển thị banner đỏ + nút "Thử lại" | self | UC-CHATBOT-018 |
| EVT-G3-15 | window | Page load | Mount | Khôi phục `chatHistory` từ `localStorage` | self | UC-CHATBOT-013 |
| EVT-G3-16 | window | Đổi ngôn ngữ (EVT-G1-07) | i18n change | Cập nhật system prompt sang locale mới (cho lượt tiếp theo) | self | UC-CHATBOT-016 |

## 3. States

| State | UI |
|-------|-----|
| Closed | Chỉ hiện R1 floating button |
| Open — empty | Hiện R4 suggested prompts, R3 trống |
| Open — chatting | R3 messages, R5 input |
| Streaming response | Bot bubble với ký tự đang được append + nhấp nháy caret |
| API error | R6 banner; input vẫn dùng được nhưng Send disabled tạm thời |
| Quota exceeded | R6 thông báo "Hết lượt hôm nay" + gợi ý liên hệ |

## 4. Notes về context injection (cho FE/SA)

Mỗi lần gọi LLM API, FE đính kèm:

- `locale` hiện tại từ i18n.
- Đoạn ngắn mô tả màn hình đang xem (`/thanh-pho/hoi-an` → "User đang xem thành phố Hội An, vùng Trung").
- Một subset dữ liệu liên quan (top dishes / top tours của entity hiện tại) để LLM "biết kho dữ liệu" — tránh hallucinate.
- System prompt cố định định hình tone "tinh tế — vùng miền — cảm xúc" (Vision §5).
