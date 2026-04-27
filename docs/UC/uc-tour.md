# UC — Module TOUR (Tour ẩm thực)

> Codebase có `TourCard`, chưa có trang chi tiết.
> **Theo scope v0.2**: KHÔNG có lead form. Trang tour chỉ hiển thị thông tin liên hệ đối tác để khách tự liên hệ ngoài hệ thống.

## Use Case List

| Mã UC | Tên Use Case | Actor chính | Ưu tiên | Hiện trạng | Ghi chú |
|-------|--------------|-------------|---------|------------|---------|
| UC-TOUR-001 | Xem danh sách tour nổi bật trên trang chủ | Guest | Must | Đã có | Section tour |
| UC-TOUR-002 | Xem toàn bộ tour ẩm thực | Guest | Must | Chưa có | Trang `/tour` |
| UC-TOUR-003 | Lọc tour theo thành phố | Guest | Must | Chưa có | |
| UC-TOUR-004 | Lọc tour theo ngân sách | Guest | Should | Chưa có | |
| UC-TOUR-005 | Lọc tour theo thời lượng | Guest | Should | Chưa có | Nửa ngày / 1 ngày / nhiều ngày |
| UC-TOUR-006 | Lọc tour theo chủ đề (street food / fine dining / market...) | Guest | Should | Chưa có | |
| UC-TOUR-007 | Xem chi tiết một tour | Guest | Must | Chưa có | Route `/tour/:slug` |
| UC-TOUR-008 | Xem lịch trình & các điểm dừng của tour | Guest | Must | Chưa có | Bao gồm món/nhà hàng |
| UC-TOUR-009 | Xem thông tin đối tác cung cấp tour | Guest | Must | Chưa có | Tên, mô tả ngắn, website |
| UC-TOUR-010 | Liên hệ đối tác qua kênh ngoài (email / phone / Zalo / Messenger / website) | Guest | Must | Chưa có | Chỉ là CTA `mailto:` / `tel:` / link ngoài. Không thu thập dữ liệu. |
| UC-TOUR-011 | Chia sẻ tour qua mạng xã hội | Guest | Should | Chưa có | `<<extend>>` UC-SEO-003 |
| UC-TOUR-012 | Hiển thị tour gợi ý theo thành phố / món ăn đang xem | Guest | Should | Chưa có | Cross-sell |
| UC-TOUR-013 | So sánh nhiều tour | Guest | Could | Chưa có | Hoàn toàn client-side |

## Quan hệ

- UC-TOUR-007 `<<include>>` UC-TOUR-008, UC-TOUR-009, UC-TOUR-010.
- UC-TOUR-002 `<<include>>` UC-SEARCH-001.

## Ghi chú scope v0.2

> Vision §8 (Out-of-Scope) đã nêu KHÔNG xử lý thanh toán. Scope v0.2 đi xa hơn: KHÔNG có cả lead form / yêu cầu liên hệ qua hệ thống. UC-TOUR-010 chỉ là chuyển hướng kênh liên hệ ngoài.
