# SCR-07 — Chi tiết tour

- **Route**: `/tour/:slug`
- **UC liên quan**: UC-TOUR-007, UC-TOUR-008, UC-TOUR-009, UC-TOUR-010, UC-TOUR-011, UC-TOUR-012, UC-TOUR-013, UC-CHATBOT-010
- **Hiện trạng**: Chưa triển khai.
- **Lưu ý scope v0.2**: KHÔNG có lead form. Chỉ có CTA chuyển hướng kênh ngoài (mailto / tel / Zalo / Messenger / website đối tác).

## 1. Layout regions

| Vùng | Mô tả |
|------|-------|
| R1 — Hero | Ảnh + tên tour + breadcrumb + giá / thời lượng tóm tắt |
| R2 — Itinerary | Lịch trình theo timeline / step (kèm ảnh, mô tả mỗi điểm dừng) |
| R3 — Highlights | Các món ăn / nhà hàng nổi bật trong tour |
| R4 — Partner info | Tên đối tác, mô tả, liên hệ (email, phone, Zalo, Messenger, website) |
| R5 — Contact CTA | Nhóm nút liên hệ trực tiếp (kênh ngoài) |
| R6 — Related tours | Tour gợi ý cùng thành phố / chủ đề |
| R7 — Share bar | FB / X / copy link |
| R8 — Floating Chatbot | Context = tour này |

## 2. Interactive Elements

| Mã EVT | Vùng | Element / Trigger | Event | Behavior | Target | UC |
|--------|------|-------------------|-------|----------|--------|----|
| EVT-07-01 | R1 | Breadcrumb | Click | Navigate Home / Tour list | SCR-01/06 | — |
| EVT-07-02 | R2 | Step trong itinerary | Click | Toggle expand/collapse mô tả chi tiết | self | UC-TOUR-008 |
| EVT-07-03 | R3 | Món ăn highlight | Click | Navigate `/mon-an/:slug` | SCR-05 | UC-DISH-006 |
| EVT-07-04 | R4 | Tên đối tác | Click | Navigate website đối tác (mở tab mới) | external | UC-TOUR-009 |
| EVT-07-05 | R5 | Nút "Email đối tác" | Click | `mailto:partner@...?subject=Hỏi tour [Tên]` | external | UC-TOUR-010 |
| EVT-07-06 | R5 | Nút "Gọi điện" | Click | `tel:+84...` | external | UC-TOUR-010 |
| EVT-07-07 | R5 | Nút "Chat Zalo" | Click | Mở deep link Zalo | external | UC-TOUR-010 |
| EVT-07-08 | R5 | Nút "Messenger" | Click | Mở `m.me/...` | external | UC-TOUR-010 |
| EVT-07-09 | R5 | Nút "Website đối tác" | Click | Mở tab mới | external | UC-TOUR-010 |
| EVT-07-10 | R6 | `TourCard` gợi ý | Click | Navigate `/tour/:slug` | SCR-07 (re-load) | UC-TOUR-012 |
| EVT-07-11 | R6 | Nút "So sánh" trên card (Could) | Click | Thêm tour vào danh sách compare (`localStorage`) | self | UC-TOUR-013 |
| EVT-07-12 | R7 | FB / X share | Click | Popup share | external | UC-TOUR-011 |
| EVT-07-13 | R7 | Copy link | Click | clipboard + toast | self | — |
| EVT-07-14 | R8 | Floating chatbot | Click | Mở chat với context = tour | SCR-G3 | UC-CHATBOT-010 |
| EVT-07-15 | URL | Slug invalid | Load | Redirect SCR-09 | SCR-09 | — |

## 3. States

| State | UI |
|-------|-----|
| Loading | Skeleton |
| Slug invalid | SCR-09 |
| Partner data missing | Ẩn R4/R5; chỉ hiện thông tin tour |
| Success | Render đầy đủ |

## 4. Navigation

```
SCR-07 Tour detail
  ├─ EVT-07-03 → SCR-05 Dish detail
  ├─ EVT-07-04..09 → external (kênh liên hệ đối tác — KHÔNG thu thập dữ liệu)
  ├─ EVT-07-10 → SCR-07 (tour khác)
  └─ EVT-07-14 → SCR-G3 Chatbot
```
