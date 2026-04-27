# UC — Module SEARCH (Tìm kiếm & Lọc)

> Tìm kiếm hoàn toàn ở client trên dữ liệu JSON đã load. Hiện chưa có thanh search trong codebase.

## Use Case List

| Mã UC | Tên Use Case | Actor chính | Ưu tiên | Hiện trạng | Ghi chú |
|-------|--------------|-------------|---------|------------|---------|
| UC-SEARCH-001 | Tìm kiếm toàn cục theo từ khoá (city / dish / tour) | Guest | Must | Chưa có | Thanh search ở Header |
| UC-SEARCH-002 | Hiển thị gợi ý khi đang gõ (autosuggest) | Guest | Should | Chưa có | Client-side fuzzy |
| UC-SEARCH-003 | Xem trang kết quả tìm kiếm hợp nhất | Guest | Must | Chưa có | Route `/tim-kiem?q=...` |
| UC-SEARCH-004 | Lọc kết quả theo loại nội dung | Guest | Should | Chưa có | Tab City / Dish / Tour |
| UC-SEARCH-005 | Sắp xếp kết quả (mới nhất / phổ biến / phù hợp) | Guest | Should | Chưa có | |
| UC-SEARCH-006 | Phân trang / load more | Guest | Must | Chưa có | |
| UC-SEARCH-007 | Hiển thị "không có kết quả" với gợi ý thay thế | Guest | Must | Chưa có | UX |
| UC-SEARCH-008 | Tìm kiếm trên dữ liệu đa ngôn ngữ | Du khách quốc tế | Should | Chưa có | `<<include>>` UC-I18N-002 |
| UC-SEARCH-009 | Lưu lịch sử tìm kiếm gần đây | Guest | Could | Chưa có | `localStorage` |

## Quan hệ

- UC-DISH-002, UC-TOUR-002, UC-EXPLORE-003 `<<include>>` UC-SEARCH-001/004/005.
