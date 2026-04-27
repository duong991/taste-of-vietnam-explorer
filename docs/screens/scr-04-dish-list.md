# SCR-04 — Danh sách món ăn

- **Route**: `/mon-an`
- **UC liên quan**: UC-DISH-002, UC-DISH-003, UC-DISH-004, UC-DISH-005, UC-DISH-006, UC-SEARCH-005, UC-SEARCH-006
- **Hiện trạng**: Chưa triển khai.

## 1. Layout regions

| Vùng | Mô tả |
|------|-------|
| R1 — Page header | Tiêu đề + breadcrumb |
| R2 — Filter sidebar/bar | Filter theo: vùng miền, thành phố, loại (mặn/chay/đường phố/cao cấp), khẩu vị (cay/ngọt/chua) |
| R3 — Sort dropdown | A-Z, mới nhất, phổ biến |
| R4 — Grid kết quả | `FoodCard` |
| R5 — Pagination / Load more | |
| R6 — Empty / Error | |

## 2. Interactive Elements

| Mã EVT | Vùng | Element / Trigger | Event | Behavior | Target | UC |
|--------|------|-------------------|-------|----------|--------|----|
| EVT-04-01 | R2 | Checkbox vùng miền | Change | Filter `dishes` theo region, sync query `?region=` | self | UC-DISH-003 |
| EVT-04-02 | R2 | Select thành phố | Change | Filter theo city slug, sync `?city=` | self | UC-DISH-003 |
| EVT-04-03 | R2 | Checkbox loại món | Change | Filter `?type=` | self | UC-DISH-004 |
| EVT-04-04 | R2 | Checkbox khẩu vị | Change | Filter `?taste=` | self | UC-DISH-005 |
| EVT-04-05 | R2 | Nút "Xoá tất cả filter" | Click | Reset query về `/mon-an` | self | — |
| EVT-04-06 | R3 | Sort dropdown | Change | Re-sort | self | UC-SEARCH-005 |
| EVT-04-07 | R4 | `FoodCard` | Click | Navigate `/mon-an/:slug` | SCR-05 | UC-DISH-006 |
| EVT-04-08 | R5 | "Xem thêm" | Click | Tăng `pageSize` | self | UC-SEARCH-006 |
| EVT-04-09 | URL | Page load có query | Load | Khôi phục filter từ URL | self | — |

## 3. States

| State | UI |
|-------|-----|
| Loading | Skeleton grid |
| Empty | "Không có món ăn phù hợp" + gợi ý xoá filter |
| Error | `Alert` |
| Success | Grid |

## 4. Navigation

```
SCR-04 Dish list
  └─ EVT-04-07 → SCR-05 Dish detail
```
