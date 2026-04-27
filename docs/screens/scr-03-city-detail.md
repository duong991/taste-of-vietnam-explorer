# SCR-03 — Chi tiết thành phố

- **Route**: `/thanh-pho/:slug`
- **UC liên quan**: UC-EXPLORE-004, UC-EXPLORE-005, UC-EXPLORE-006, UC-EXPLORE-007, UC-EXPLORE-008, UC-EXPLORE-009, UC-EXPLORE-010, UC-EXPLORE-011, UC-EXPLORE-012, UC-CHATBOT-010
- **Hiện trạng**: Đã có route, cần mở rộng đầy đủ regions.

## 1. Layout regions

| Vùng | Mô tả |
|------|-------|
| R1 — Hero | Ảnh đại diện thành phố + tên + breadcrumb (Home / Thành phố / [Tên]) |
| R2 — Story | Câu chuyện văn hoá / bối cảnh vùng miền (Markdown rendered) |
| R3 — Featured dishes | Grid món ăn đặc trưng |
| R4 — Featured tours | Grid tour của thành phố |
| R5 — Gallery | Lightbox gallery hình ảnh |
| R6 — Map (Could) | Embed map vị trí thành phố |
| R7 — Related cities | Carousel "thành phố cùng vùng miền" |
| R8 — Share bar | Nút chia sẻ Facebook / X / copy link |
| R9 — Floating Chatbot | Đã preload context = thành phố này |

## 2. Interactive Elements

| Mã EVT | Vùng | Element / Trigger | Event | Behavior | Target | UC |
|--------|------|-------------------|-------|----------|--------|----|
| EVT-03-01 | R1 | Breadcrumb | Click | Navigate về Home / City list | SCR-01 / SCR-02 | — |
| EVT-03-02 | R3 | `FoodCard` | Click | Navigate `/mon-an/:slug` | SCR-05 | UC-DISH-006, UC-EXPLORE-005 |
| EVT-03-03 | R4 | `TourCard` | Click | Navigate `/tour/:slug` | SCR-07 | UC-TOUR-007, UC-EXPLORE-006 |
| EVT-03-04 | R5 | Ảnh trong gallery | Click | Mở lightbox modal | self (modal) | UC-EXPLORE-011 |
| EVT-03-05 | R5 (modal) | Phím `Esc` / nút X | Key / Click | Đóng lightbox | self | — |
| EVT-03-06 | R5 (modal) | Phím `←` / `→` | KeyDown | Chuyển ảnh trước/sau | self | — |
| EVT-03-07 | R6 | Pin trên map | Click | Mở popup info ngắn | self | UC-EXPLORE-010 |
| EVT-03-08 | R7 | `CityCard` thành phố liên quan | Click | Navigate `/thanh-pho/:slug` | SCR-03 (re-load) | UC-EXPLORE-008 |
| EVT-03-09 | R8 | Nút Facebook share | Click | Mở popup `facebook.com/sharer/sharer.php?u=...` | external | UC-EXPLORE-009 |
| EVT-03-10 | R8 | Nút X share | Click | Mở `twitter.com/intent/tweet?url=...` | external | UC-EXPLORE-009 |
| EVT-03-11 | R8 | Nút "Copy link" | Click | `navigator.clipboard.writeText(location.href)` + toast "Đã sao chép" | self | — |
| EVT-03-12 | R9 | Floating chatbot button | Click | Mở Chatbot overlay với system prompt = "Bạn đang xem thành phố [Tên]" | SCR-G3 | UC-EXPLORE-012, UC-CHATBOT-010 |
| EVT-03-13 | URL | Slug không tồn tại | Page load | Redirect SCR-09 (404) | SCR-09 | — |

## 3. States

| State | UI |
|-------|-----|
| Loading | Skeleton hero + skeleton sections |
| Slug invalid | Redirect/render SCR-09 với thông điệp "Không tìm thấy thành phố" |
| Error fetch | `Alert` + nút "Thử lại" |
| Success | Render đầy đủ |

## 4. Navigation

```
SCR-03 City detail
  ├─ EVT-03-02 → SCR-05 Dish detail
  ├─ EVT-03-03 → SCR-07 Tour detail
  ├─ EVT-03-04 → Lightbox modal (in-place)
  ├─ EVT-03-08 → SCR-03 (city khác)
  ├─ EVT-03-09/10 → external (FB/X)
  └─ EVT-03-12 → SCR-G3 Chatbot (with city context)
```
