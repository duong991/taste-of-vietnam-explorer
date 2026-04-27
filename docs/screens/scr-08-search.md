# SCR-08 — Kết quả tìm kiếm

- **Route**: `/tim-kiem?q=...&type=...`
- **UC liên quan**: UC-SEARCH-001..009
- **Hiện trạng**: Chưa triển khai.

## 1. Layout regions

| Vùng | Mô tả |
|------|-------|
| R1 — Search header | Hiển thị query + ô search inline để chỉnh |
| R2 — Type tabs | All / Cities / Dishes / Tours |
| R3 — Sort | Phù hợp / mới nhất / A-Z |
| R4 — Result list | Grid hỗn hợp hoặc theo tab |
| R5 — Empty state | "Không tìm thấy kết quả cho '{q}'" + gợi ý từ khoá thay thế |
| R6 — Recent searches (Could) | Lưu `localStorage` |

## 2. Interactive Elements

| Mã EVT | Vùng | Element / Trigger | Event | Behavior | Target | UC |
|--------|------|-------------------|-------|----------|--------|----|
| EVT-08-01 | R1 | Input search | Submit / Enter | Cập nhật query `?q=...` và re-search client-side | self | UC-SEARCH-001 |
| EVT-08-02 | R1 | Input search | Input change | Autosuggest dropdown (debounce 200ms) | self | UC-SEARCH-002 |
| EVT-08-03 | R2 | Tab loại nội dung | Click | Filter `?type=city|dish|tour` | self | UC-SEARCH-004 |
| EVT-08-04 | R3 | Sort dropdown | Change | Re-sort | self | UC-SEARCH-005 |
| EVT-08-05 | R4 | Card kết quả | Click | Navigate tới detail tương ứng | SCR-03/05/07 | UC-SEARCH-001 |
| EVT-08-06 | R5 | Gợi ý từ khoá | Click | Cập nhật `?q=...` | self | UC-SEARCH-007 |
| EVT-08-07 | R6 | Mục lịch sử | Click | Re-run search | self | UC-SEARCH-009 |
| EVT-08-08 | R6 | Nút "Xoá lịch sử" | Click | Clear `localStorage.recentSearches` | self | UC-SEARCH-009 |

## 3. States

| State | UI |
|-------|-----|
| Empty query | Hiển thị recent searches + gợi ý từ khoá phổ biến |
| Loading | Skeleton list |
| No result | R5 |
| Success | List có kết quả |

## 4. Navigation

```
SCR-08 Search
  └─ EVT-08-05 → SCR-03 / SCR-05 / SCR-07
```
