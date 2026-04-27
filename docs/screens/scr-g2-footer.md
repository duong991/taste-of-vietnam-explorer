# SCR-G2 — Footer (Global)

- **Phạm vi**: hiển thị trên mọi màn hình (trừ overlay).
- **UC liên quan**: UC-EXPLORE-001, UC-I18N-001
- **Components**: `Footer`

## 1. Layout regions

| Vùng | Mô tả |
|------|-------|
| R1 — Brand | Logo + tagline |
| R2 — Sitemap links | Cụm link tới các trang chính (City / Dish / Tour / About) |
| R3 — Social | Icon FB / Instagram / YouTube (nếu có) |
| R4 — Legal | Copyright, link Privacy / Terms (tĩnh) |
| R5 — Language | Switcher phụ (đồng bộ với Header) |

## 2. Interactive Elements

| Mã EVT | Vùng | Element / Trigger | Event | Behavior | Target | UC |
|--------|------|-------------------|-------|----------|--------|----|
| EVT-G2-01 | R1 | Logo | Click | Navigate `/` | SCR-01 | UC-EXPLORE-001 |
| EVT-G2-02 | R2 | Sitemap link | Click | Navigate trang tương ứng | SCR-02/04/06 | — |
| EVT-G2-03 | R3 | Social icon | Click | Mở tab mới tới trang xã hội | external | — |
| EVT-G2-04 | R4 | Privacy / Terms | Click | Navigate trang tĩnh | static | — |
| EVT-G2-05 | R5 | Language switcher | Change | Đồng bộ EVT-G1-07 | self | UC-I18N-001 |
