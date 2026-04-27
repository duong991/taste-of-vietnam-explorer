# SCR-G1 — Header (Global)

- **Phạm vi**: hiển thị trên mọi màn hình.
- **UC liên quan**: UC-EXPLORE-001..003, UC-DISH-002, UC-TOUR-002, UC-SEARCH-001, UC-I18N-001
- **Components**: `Header`, `Logo`, `NavLink`

## 1. Layout regions

| Vùng | Mô tả |
|------|-------|
| R1 — Logo | Click về Home |
| R2 — Nav links | Trang chủ / Thành phố / Món ăn / Tour |
| R3 — Search box | Input tìm kiếm nhanh |
| R4 — Language switcher | VI / EN |
| R5 — Mobile menu | Hamburger trên màn hình nhỏ |

## 2. Interactive Elements

| Mã EVT | Vùng | Element / Trigger | Event | Behavior | Target | UC |
|--------|------|-------------------|-------|----------|--------|----|
| EVT-G1-01 | R1 | Logo | Click | Navigate `/` | SCR-01 | UC-EXPLORE-001 |
| EVT-G1-02 | R2 | Nav "Thành phố" | Click | Navigate `/thanh-pho` | SCR-02 | UC-EXPLORE-003 |
| EVT-G1-03 | R2 | Nav "Món ăn" | Click | Navigate `/mon-an` | SCR-04 | UC-DISH-002 |
| EVT-G1-04 | R2 | Nav "Tour" | Click | Navigate `/tour` | SCR-06 | UC-TOUR-002 |
| EVT-G1-05 | R3 | Input search | Focus | Mở dropdown autosuggest (Should) | self | UC-SEARCH-002 |
| EVT-G1-06 | R3 | Input search | Submit / Enter | Navigate `/tim-kiem?q=...` | SCR-08 | UC-SEARCH-001 |
| EVT-G1-07 | R4 | Language switcher | Change | Đổi `i18n.language` + lưu `localStorage('locale')` + (Should) navigate `/{locale}/...` | self | UC-I18N-001, UC-I18N-004 |
| EVT-G1-08 | R5 | Hamburger button | Click | Toggle drawer chứa Nav + Language + Search | self | — |
| EVT-G1-09 | R5 | Backdrop drawer | Click / Esc | Đóng drawer | self | — |
| EVT-G1-10 | window | Scroll xuống | Scroll | Header thu nhỏ / sticky (UX) | self | — |
| EVT-G1-11 | nav link active | Khi route khớp | Route change | Highlight link đang active | self | — |

## 3. States

| State | UI |
|-------|-----|
| Top of page | Header transparent / fullsize |
| Scrolled | Header solid / shrink |
| Mobile | Hiện hamburger, ẩn nav inline |
| Loading i18n | Hiển thị label key fallback (VI) |
