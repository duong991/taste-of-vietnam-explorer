# SCR-01 — Trang chủ

- **Route**: `/`
- **UC liên quan**: UC-EXPLORE-001, UC-EXPLORE-002, UC-DISH-001, UC-TOUR-001, UC-CHATBOT-001, UC-SEARCH-001
- **Components hiện tại**: `Hero`, `Features`, `Carousel`, `CityCard`, `FoodCard`, `TourCard`, `CTABanner`, `SectionHeader`, `Footer`, `Chatbot`

## 1. Layout regions

| Vùng | Mô tả | Components |
|------|-------|------------|
| R1 — Header | Global navigation | `Header`, `Logo`, `NavLink` |
| R2 — Hero | Banner mở đầu + CTA chính + thanh search nổi bật | `Hero` |
| R3 — Features | 3-4 điểm nổi bật của sản phẩm | `Features` |
| R4 — Cities section | Carousel/Grid thành phố nổi bật | `Carousel`, `CityCard` |
| R5 — Dishes section | Grid món ăn nổi bật | `FoodCard` |
| R6 — Tours section | Grid tour nổi bật | `TourCard` |
| R7 — CTA Banner | Mời mở Chatbot / khám phá thêm | `CTABanner` |
| R8 — Footer | Global footer | `Footer` |
| R9 — Chatbot overlay | Floating button → cửa sổ chat | `Chatbot` (xem `SCR-G3`) |

## 2. Interactive Elements

| Mã EVT | Vùng | Element / Trigger | Event | Behavior | Target | UC |
|--------|------|-------------------|-------|----------|--------|----|
| EVT-01-01 | R2 | Nút CTA "Khám phá ngay" | Click | Smooth scroll tới R4 (Cities) | self | UC-EXPLORE-002 |
| EVT-01-02 | R2 | Input tìm kiếm trên Hero | KeyDown `Enter` / Submit | Navigate `/tim-kiem?q={value}` | SCR-08 | UC-SEARCH-001 |
| EVT-01-03 | R2 | Input tìm kiếm trên Hero | Input change | (Should) hiện autosuggest dropdown | self | UC-SEARCH-002 |
| EVT-01-04 | R4 | `CityCard` (toàn card) | Click | Navigate `/thanh-pho/:slug` | SCR-03 | UC-EXPLORE-004 |
| EVT-01-05 | R4 | Carousel arrows / dots | Click | Cuộn carousel sang slide kế | self | — |
| EVT-01-06 | R4 | "Xem tất cả thành phố" | Click | Navigate `/thanh-pho` | SCR-02 | UC-EXPLORE-003 |
| EVT-01-07 | R5 | `FoodCard` | Click | Navigate `/mon-an/:slug` | SCR-05 | UC-DISH-006 |
| EVT-01-08 | R5 | "Xem tất cả món ăn" | Click | Navigate `/mon-an` | SCR-04 | UC-DISH-002 |
| EVT-01-09 | R6 | `TourCard` | Click | Navigate `/tour/:slug` | SCR-07 | UC-TOUR-007 |
| EVT-01-10 | R6 | "Xem tất cả tour" | Click | Navigate `/tour` | SCR-06 | UC-TOUR-002 |
| EVT-01-11 | R7 | CTA "Hỏi trợ lý ảo" | Click | Mở Chatbot overlay | SCR-G3 | UC-CHATBOT-001 |
| EVT-01-12 | R9 | Floating chatbot button | Click | Toggle Chatbot overlay | SCR-G3 | UC-CHATBOT-001 |
| EVT-01-13 | R1/R8 | Xem `SCR-G1`, `SCR-G2` | — | — | — | — |

## 3. States

| State | Khi nào | UI |
|-------|---------|-----|
| Loading | Lần đầu fetch `cities.json`, `dishes.json`, `tours.json` | Skeleton card cho mỗi section |
| Empty | Một section không có dữ liệu (vd `tours.json` rỗng) | Ẩn section đó (không hiện section trống) |
| Error | Fetch JSON lỗi | Hiện `Alert` "Không tải được nội dung. Tải lại trang." trong section bị lỗi, các section khác vẫn render bình thường |
| Success | Có dữ liệu | Render đầy đủ |

## 4. Navigation

```
SCR-01 Home
  ├─ EVT-01-02 → SCR-08 Search
  ├─ EVT-01-04 → SCR-03 City detail
  ├─ EVT-01-06 → SCR-02 City list
  ├─ EVT-01-07 → SCR-05 Dish detail
  ├─ EVT-01-08 → SCR-04 Dish list
  ├─ EVT-01-09 → SCR-07 Tour detail
  ├─ EVT-01-10 → SCR-06 Tour list
  └─ EVT-01-11/12 → SCR-G3 Chatbot overlay (in-place)
```
