# Image Description Library — Taste of Vietnam Explorer

> Tài liệu mô tả chi tiết cho **từng asset hình ảnh** trong `src/assets/`.
> Mỗi file `.md` ở thư mục này tương ứng 1-1 với 1 file ảnh và đóng vai trò như **prompt brief** cho designer / AI image generator / nhiếp ảnh gia.

## Nguyên tắc chung (Brand visual guideline)

- **Tinh thần**: tinh tế, ấm áp, truyền cảm hứng; tôn vinh chiều sâu văn hoá vùng miền — KHÔNG sến súa, KHÔNG quảng cáo OTA đại trà.
- **Bảng màu chủ đạo**:
  - Đỏ son truyền thống `#B8341B` / vàng nghệ `#D9A441` (accent ẩm thực, lễ hội).
  - Xanh trà `#2F5D50` / xanh ngọc `#86A89A` (thiên nhiên, miền Trung — Tây Nguyên).
  - Be ngà `#F5EBDD` / nâu trầm `#3B2A1E` (nền ấm, hoài cổ).
- **Ánh sáng**: ưu tiên *golden hour*, ánh sáng tự nhiên dịu, hoặc ánh đèn ấm vàng cho cảnh đêm.
- **Tỉ lệ ưu tiên**:
  - `hero-*` / `cta-banner` → 16:9 (≥ 2400×1350).
  - `city-*` → 4:3 hoặc 3:2 (≥ 1600×1200).
  - `food-*` → 1:1 (≥ 1400×1400) hoặc 4:5.
  - `tour-*` → 3:2 (≥ 1800×1200).
- **Phong cách**: editorial / travel-magazine / National Geographic — KHÔNG stock photo nhợt nhạt, KHÔNG over-saturated, KHÔNG watermark.
- **Con người**: nếu xuất hiện, ưu tiên người Việt thật, biểu cảm tự nhiên, KHÔNG pose mẫu cứng.
- **Negative (chung)**: text, logo, watermark, AI artifact (tay 6 ngón, méo chữ), HDR rực rỡ giả tạo, filter Instagram bão hoà.

## Cấu trúc mỗi file mô tả

1. **Mục đích sử dụng** — ảnh xuất hiện ở đâu trong app.
2. **Concept / Câu chuyện** — thông điệp muốn truyền tải.
3. **Bố cục (Composition)** — vị trí chủ thể, foreground/background, rule of thirds, không gian chữ.
4. **Màu sắc (Palette)** — màu chủ đạo & accent.
5. **Ánh sáng & Mood** — golden hour / overcast / đèn đêm / studio.
6. **Nội dung chi tiết (Subject)** — cụ thể có gì trong khung hình.
7. **Phong cách & Kỹ thuật** — lens, depth of field, texture.
8. **Negative prompt** — những gì cần tránh.

## Danh sách asset

### City (7)
- `city-hanoi.md`, `city-hanoi-hero.md`, `city-hue.md`, `city-danang.md`, `city-hoian.md`, `city-dalat.md`, `city-cantho.md`

### Food (10)
- `food-pho.md`, `food-bunbo.md`, `food-buncha.md`, `food-caolau.md`, `food-banhxeo.md`, `food-banhcuon.md`, `food-banhgoi.md`, `food-comtam.md`, `food-cafetrung.md`, `food-che.md`

### Tour (4)
- `tour-hanoi.md`, `tour-motorbike.md`, `tour-cooking.md`, `tour-mekong.md`

### Hero / Marketing (2)
- `hero-hoian.md`, `cta-banner.md`
