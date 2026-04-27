# SCR-02 — Danh sách thành phố

- **Route**: `/thanh-pho`
- **UC liên quan**: UC-EXPLORE-003, UC-EXPLORE-004, UC-SEARCH-001, UC-SEARCH-004
- **Hiện trạng**: Chưa triển khai.

## 1. Layout regions

| Vùng | Mô tả |
|------|-------|
| R1 — Page header | Tiêu đề + breadcrumb |
| R2 — Filter bar | Filter theo vùng miền (Bắc / Trung / Nam / Tất cả); sort |
| R3 — Grid kết quả | Grid `CityCard` |
| R4 — Pagination / Load more | Phân trang client-side |
| R5 — Empty / Error state | Khi filter quá hẹp |

## 2. Interactive Elements

| Mã EVT | Vùng | Element / Trigger | Event | Behavior | Target | UC |
|--------|------|-------------------|-------|----------|--------|----|
| EVT-02-01 | R2 | Tab "Tất cả / Bắc / Trung / Nam" | Click | Filter mảng `cities` theo `region`, cập nhật query `?region=bac` | self | UC-EXPLORE-003 |
| EVT-02-02 | R2 | Dropdown sort (A-Z / mới nhất) | Change | Re-sort danh sách | self | — |
| EVT-02-03 | R3 | `CityCard` | Click | Navigate `/thanh-pho/:slug` | SCR-03 | UC-EXPLORE-004 |
| EVT-02-04 | R3 | `CityCard` | Hover | Hiệu ứng zoom/elevate (UX) | self | — |
| EVT-02-05 | R4 | Nút "Xem thêm" / pagination | Click | Tăng số phần tử hiển thị | self | UC-SEARCH-006 |
| EVT-02-06 | URL | URL có `?region=...` khi load | Page load | Khôi phục filter từ URL | self | UC-EXPLORE-003 |

## 3. States

| State | UI |
|-------|-----|
| Loading | Skeleton grid 6-9 card |
| Empty (sau filter) | "Không có thành phố nào ở vùng miền này" + nút "Xoá filter" |
| Error | `Alert` lỗi load + nút "Thử lại" |
| Success | Grid card |

## 4. Navigation

```
SCR-02 City list
  ├─ EVT-02-03 → SCR-03 City detail
  └─ Header search → SCR-08
```
