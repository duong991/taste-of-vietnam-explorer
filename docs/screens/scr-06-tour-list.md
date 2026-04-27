# SCR-06 — Danh sách tour

- **Route**: `/tour`
- **UC liên quan**: UC-TOUR-002, UC-TOUR-003, UC-TOUR-004, UC-TOUR-005, UC-TOUR-006, UC-TOUR-007
- **Hiện trạng**: Chưa triển khai.

## 1. Layout regions

| Vùng | Mô tả |
|------|-------|
| R1 — Page header | Tiêu đề + breadcrumb |
| R2 — Filter bar | Filter: thành phố, ngân sách (range), thời lượng, chủ đề |
| R3 — Sort | Giá tăng/giảm, mới nhất, phổ biến |
| R4 — Grid `TourCard` | |
| R5 — Pagination / Load more | |

## 2. Interactive Elements

| Mã EVT | Vùng | Element / Trigger | Event | Behavior | Target | UC |
|--------|------|-------------------|-------|----------|--------|----|
| EVT-06-01 | R2 | Select thành phố | Change | Filter `?city=` | self | UC-TOUR-003 |
| EVT-06-02 | R2 | Range slider ngân sách | Change | Filter `?priceMin&priceMax` (debounced) | self | UC-TOUR-004 |
| EVT-06-03 | R2 | Checkbox thời lượng | Change | Filter `?duration=` | self | UC-TOUR-005 |
| EVT-06-04 | R2 | Checkbox chủ đề | Change | Filter `?theme=` | self | UC-TOUR-006 |
| EVT-06-05 | R2 | "Xoá filter" | Click | Reset URL | self | — |
| EVT-06-06 | R3 | Sort dropdown | Change | Re-sort | self | — |
| EVT-06-07 | R4 | `TourCard` | Click | Navigate `/tour/:slug` | SCR-07 | UC-TOUR-007 |
| EVT-06-08 | R5 | "Xem thêm" | Click | Tăng pageSize | self | — |

## 3. States

| State | UI |
|-------|-----|
| Loading | Skeleton |
| Empty | "Không có tour phù hợp" + xoá filter |
| Error | `Alert` |
| Success | Grid |

## 4. Navigation

```
SCR-06 Tour list
  └─ EVT-06-07 → SCR-07 Tour detail
```
