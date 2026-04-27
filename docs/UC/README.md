# Use Case List — Tinh hoa Hương vị Việt

> Bóc tách từ `docs/project-vision.md` và hiện trạng codebase, đã **cập nhật theo scope mới (v0.2)**.
> Quy ước mã UC: `UC-[MODULE]-[STT]`. Mức độ ưu tiên MoSCoW: **Must / Should / Could / Won't**.

---

## 0. Phạm vi đã chốt (Scope v0.2)

Hệ thống mục tiêu là **một website FE-only mang tính chất quảng bá**:

- **Không có Backend riêng**, không Auth, không tài khoản người dùng.
- **Nguồn dữ liệu**: file **JSON / Markdown** trong `public/data/` hoặc `content/`, FE fetch lúc runtime. Cập nhật bằng cách commit + redeploy.
- **Chatbot**: FE **gọi thẳng LLM API** (OpenAI/Gemini...) — không có server trung gian. Cần chú ý bảo mật API key (ưu tiên proxy/edge function của hosting nếu có).
- **Lead form**: KHÔNG triển khai. Trang tour chỉ hiển thị thông tin liên hệ đối tác để khách tự liên hệ ngoài hệ thống.
- **I18N**: Bắt buộc cho MVP — VI / EN.
- **Bỏ khỏi UC list (so với v0.1)**: Auth, User/Account, CMS app, Partner portal, Analytics, Feedback (sẽ cân nhắc lại ở roadmap sau).

---

## 1. Actor List

| Actor | Loại | Mô tả |
|-------|------|-------|
| Khách (Guest / Visitor) | Primary | Người dùng ẩn danh truy cập website. Không cần đăng nhập. |
| Du khách quốc tế (Inbound Traveler) | Primary | Tập con của Guest, ưu tiên tiếng Anh. |
| Trợ lý ảo (Chatbot / LLM provider) | System | LLM bên thứ 3 (OpenAI/Gemini...) FE gọi trực tiếp. |
| Search Engine (SEO crawler) | Secondary/System | Index nội dung phục vụ organic traffic. |
| Biên tập viên (Content Editor) | Off-system | Người cập nhật nội dung **qua Git** (commit JSON/Markdown), không có app riêng. Không xuất hiện trong UC chạy runtime. |

---

## 2. Module Map (đã thu gọn)

| Module | File | Mô tả ngắn |
|--------|------|------------|
| EXPLORE | [`uc-explore.md`](./uc-explore.md) | Trang chủ, khám phá thành phố / vùng miền |
| DISH | [`uc-dish.md`](./uc-dish.md) | Khám phá & xem chi tiết món ăn |
| TOUR | [`uc-tour.md`](./uc-tour.md) | Khám phá tour ẩm thực (chỉ hiển thị, không có lead form) |
| SEARCH | [`uc-search.md`](./uc-search.md) | Tìm kiếm & lọc nội dung |
| CHATBOT | [`uc-chatbot.md`](./uc-chatbot.md) | Trợ lý ảo gọi LLM API trực tiếp từ FE |
| I18N | [`uc-i18n.md`](./uc-i18n.md) | Đa ngôn ngữ VI / EN |
| SEO | [`uc-seo.md`](./uc-seo.md) | Tối ưu hoá tìm kiếm & chia sẻ mạng xã hội |

---

## 3. Quy ước

- **Must**: bắt buộc cho MVP.
- **Should**: quan trọng, đưa vào ngay sau MVP.
- **Could**: nếu có nguồn lực; thuộc roadmap trung hạn.
- **Won't (now)**: out-of-scope theo `project-vision.md` §8 hoặc theo scope v0.2 ở trên.
- Cột **Hiện trạng**: Đã có / Một phần / Chưa có — đối chiếu thực tế với `src/`.

---

## 4. Tài liệu liên quan

- **Project Vision** — `docs/project-vision.md`.
- **Screen Interaction Flow** — `docs/screens/` — mô tả màn hình, event UI, navigation. UC nói **WHAT**, screens nói **HOW**.
- **Dev Agent Implementation Guide** — `docs/dev-agent-guide.md` — playbook 10 phase cho AI dev agent triển khai toàn bộ tính năng.

## 5. Ghi chú về các module đã bỏ

> Tài liệu phiên bản trước (v0.1) có các module **AUTH, USER, CMS, PARTNER, ANALYTICS, FEEDBACK**. Chúng đã được loại khỏi UC list v0.2 vì yêu cầu Backend / tài khoản. Một số nhu cầu phái sinh được hấp thụ vào module còn lại:

- **Cá nhân hoá nhẹ** (giữ ngôn ngữ, lịch sử chat trong phiên) → dùng `localStorage`, mô tả trong `uc-i18n.md` & `uc-chatbot.md`.
- **Quản trị nội dung** → quy ước biên tập trong repo (Git workflow), không phải UC runtime.
- **Đối tác** → chỉ là trường dữ liệu hiển thị trong tour/dish, không có UC tương tác.
- **Lead / Liên hệ** → thay bằng hiển thị thông tin liên hệ trực tiếp của đối tác (email / phone / website / Zalo / Messenger link).
