# SCR-05 — Chi tiết món ăn

- **Route**: `/mon-an/:slug`
- **UC liên quan**: UC-DISH-006, UC-DISH-007, UC-DISH-008, UC-DISH-009, UC-DISH-010, UC-DISH-011, UC-CHATBOT-010
- **Hiện trạng**: Chưa triển khai.

## 1. Layout regions

| Vùng | Mô tả |
|------|-------|
| R1 — Hero | Ảnh đại diện món + tên + tag (vùng miền, khẩu vị) + breadcrumb |
| R2 — Story | Lịch sử / câu chuyện món ăn (Markdown) |
| R3 — Ingredients & taste | Thành phần, hương vị đặc trưng |
| R4 — Found in cities | Grid `CityCard` các thành phố có món này |
| R5 — Related tours | Grid `TourCard` tour có món này |
| R6 — Related dishes | Carousel món tương tự (cùng vùng / cùng khẩu vị) |
| R7 — Share bar | FB / X / copy link |
| R8 — Floating Chatbot | Context = món ăn này |

## 2. Interactive Elements

| Mã EVT | Vùng | Element / Trigger | Event | Behavior | Target | UC |
|--------|------|-------------------|-------|----------|--------|----|
| EVT-05-01 | R1 | Breadcrumb | Click | Navigate Home / Dish list | SCR-01/04 | — |
| EVT-05-02 | R1 | Tag vùng miền | Click | Navigate `/mon-an?region=...` | SCR-04 | UC-DISH-003 |
| EVT-05-03 | R1 | Tag khẩu vị | Click | Navigate `/mon-an?taste=...` | SCR-04 | UC-DISH-005 |
| EVT-05-04 | R4 | `CityCard` | Click | Navigate `/thanh-pho/:slug` | SCR-03 | UC-DISH-008 |
| EVT-05-05 | R5 | `TourCard` | Click | Navigate `/tour/:slug` | SCR-07 | UC-DISH-009 |
| EVT-05-06 | R6 | `FoodCard` món liên quan | Click | Navigate `/mon-an/:slug` (re-load) | SCR-05 | UC-DISH-011 |
| EVT-05-07 | R7 | FB / X share | Click | Mở popup share | external | UC-DISH-010 |
| EVT-05-08 | R7 | Copy link | Click | `clipboard.writeText` + toast | self | — |
| EVT-05-09 | R8 | Floating chatbot | Click | Mở chat với context = món này | SCR-G3 | UC-CHATBOT-010 |
| EVT-05-10 | URL | Slug invalid | Load | Redirect SCR-09 | SCR-09 | — |

## 3. States

Tương tự SCR-03 (Loading skeleton, slug invalid → 404, error → alert, success).

## 4. Navigation

```
SCR-05 Dish detail
  ├─ EVT-05-02/03 → SCR-04 Dish list (filter)
  ├─ EVT-05-04 → SCR-03 City detail
  ├─ EVT-05-05 → SCR-07 Tour detail
  ├─ EVT-05-06 → SCR-05 (món khác)
  └─ EVT-05-09 → SCR-G3 Chatbot
```
