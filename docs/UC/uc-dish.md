# UC — Module DISH (Khám phá món ăn)

> Luồng "Khám phá món ăn" (Vision §10). Codebase đã có `FoodCard` nhưng chưa có route chi tiết món ăn riêng.

## Use Case List

| Mã UC | Tên Use Case | Actor chính | Ưu tiên | Hiện trạng | Ghi chú |
|-------|--------------|-------------|---------|------------|---------|
| UC-DISH-001 | Xem danh sách món ăn nổi bật trên trang chủ | Guest | Must | Đã có | Section món ăn |
| UC-DISH-002 | Xem toàn bộ danh sách món ăn | Guest | Should | Chưa có | Trang `/mon-an` |
| UC-DISH-003 | Lọc món ăn theo vùng miền / thành phố | Guest | Should | Chưa có | Liên kết EXPLORE |
| UC-DISH-004 | Lọc món ăn theo loại (mặn/chay/đường phố/cao cấp...) | Guest | Could | Chưa có | Metadata phân loại |
| UC-DISH-005 | Lọc món ăn theo khẩu vị (cay/ngọt/chua...) | Guest | Could | Chưa có | Hỗ trợ Chatbot context |
| UC-DISH-006 | Xem chi tiết một món ăn | Guest | Must | Chưa có | Route `/mon-an/:slug` |
| UC-DISH-007 | Xem câu chuyện / lịch sử món ăn | Guest | Should | Chưa có | Chiều sâu văn hoá |
| UC-DISH-008 | Xem các thành phố / nhà hàng gắn với món ăn | Guest | Should | Chưa có | Cross-link EXPLORE |
| UC-DISH-009 | Xem các tour có món ăn này | Guest | Should | Chưa có | Cross-link TOUR |
| UC-DISH-010 | Chia sẻ trang món ăn qua mạng xã hội | Guest | Should | Chưa có | `<<extend>>` UC-SEO-003 |
| UC-DISH-011 | Xem món gợi ý liên quan | Guest | Could | Chưa có | Theo vùng miền / khẩu vị |

## Quan hệ

- UC-DISH-006 `<<include>>` UC-DISH-007, UC-DISH-008, UC-DISH-009.
- UC-DISH-002 `<<include>>` UC-SEARCH-001 (cùng cơ chế filter/sort).
