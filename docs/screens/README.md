# Screen Interaction Flow — Tinh hoa Hương vị Việt

> Tài liệu mô tả **các màn hình của hệ thống** và **cách người dùng tương tác** trên từng màn hình.
> Bổ trợ cho Use Case List (`docs/UC/`): UC nói **WHAT**, tài liệu này nói **HOW** (event → behavior → navigation).
> Áp dụng theo scope v0.2 (FE-only, dữ liệu JSON/Markdown trong `public/`, Chatbot gọi LLM API trực tiếp).

---

## 1. Quy ước

- **Mã màn hình**: `SCR-[STT]-[tên-ngắn]` — duy nhất trong toàn dự án.
- **Mã element**: `EVT-[SCR]-[STT]` — tham chiếu sự kiện UI.
- Mỗi màn hình một file `scr-*.md`. Cross-cutting (Header / Footer / Chatbot overlay / Toast) tách riêng.
- Trong bảng Interactive Elements:
  - **Event**: tên sự kiện (Click / Hover / Submit / Scroll / KeyDown ...).
  - **Trigger**: phần tử UI cụ thể.
  - **Behavior**: hệ thống làm gì (đọc dữ liệu, đổi state, navigate, mở modal...).
  - **Target**: màn hình/state đích (nếu có).
  - **UC**: mã UC liên quan trong `docs/UC/`.

---

## 2. Screen Map

| Mã | Tên màn hình | Route | File | Hiện trạng |
|----|--------------|-------|------|------------|
| SCR-01 | Trang chủ | `/` | [`scr-01-home.md`](./scr-01-home.md) | Đã có |
| SCR-02 | Danh sách thành phố | `/thanh-pho` | [`scr-02-city-list.md`](./scr-02-city-list.md) | Chưa có |
| SCR-03 | Chi tiết thành phố | `/thanh-pho/:slug` | [`scr-03-city-detail.md`](./scr-03-city-detail.md) | Đã có (cần mở rộng) |
| SCR-04 | Danh sách món ăn | `/mon-an` | [`scr-04-dish-list.md`](./scr-04-dish-list.md) | Chưa có |
| SCR-05 | Chi tiết món ăn | `/mon-an/:slug` | [`scr-05-dish-detail.md`](./scr-05-dish-detail.md) | Chưa có |
| SCR-06 | Danh sách tour | `/tour` | [`scr-06-tour-list.md`](./scr-06-tour-list.md) | Chưa có |
| SCR-07 | Chi tiết tour | `/tour/:slug` | [`scr-07-tour-detail.md`](./scr-07-tour-detail.md) | Chưa có |
| SCR-08 | Kết quả tìm kiếm | `/tim-kiem?q=...` | [`scr-08-search.md`](./scr-08-search.md) | Chưa có |
| SCR-09 | 404 / Not found | `*` | [`scr-09-not-found.md`](./scr-09-not-found.md) | Chưa có |
| SCR-G1 | Header (global) | — | [`scr-g1-header.md`](./scr-g1-header.md) | Đã có |
| SCR-G2 | Footer (global) | — | [`scr-g2-footer.md`](./scr-g2-footer.md) | Đã có |
| SCR-G3 | Chatbot overlay | — | [`scr-g3-chatbot.md`](./scr-g3-chatbot.md) | Đã có (cần nâng cấp) |

---

## 3. Global Navigation Graph

```
                       ┌──────────────────────────┐
                       │       SCR-G1 Header      │  (mọi màn hình)
                       └──────────────┬───────────┘
                                      │
            ┌───────────────┬─────────┼─────────┬───────────────┐
            ▼               ▼         ▼         ▼               ▼
        SCR-01 Home   SCR-02 City  SCR-04 Dish SCR-06 Tour  SCR-08 Search
            │            list         list        list         results
            │             │            │           │             │
            │             ▼            ▼           ▼             │
            │        SCR-03 City   SCR-05 Dish  SCR-07 Tour      │
            │        detail        detail       detail           │
            │             │            │           │             │
            └─────────────┴────────────┴───────────┴─────────────┘
                                      │
                                      ▼
                            (cross-link giữa các detail)

  SCR-G3 Chatbot overlay: kích hoạt được từ MỌI màn hình (floating button).
  SCR-G2 Footer: hiển thị trên mọi màn hình (trừ overlay).
  SCR-09 Not found: fallback cho mọi route không hợp lệ.
```

---

## 4. Quy ước trạng thái màn hình (chung)

Mỗi màn hình động (load dữ liệu JSON) cần mô tả 4 trạng thái:

- **Loading**: skeleton / spinner.
- **Empty**: không có dữ liệu (filter quá hẹp, slug không tồn tại nhưng dữ liệu rỗng).
- **Error**: fetch JSON lỗi / parse fail.
- **Success**: hiển thị dữ liệu bình thường.

Trạng thái cụ thể được mô tả trong từng file `scr-*.md`.
