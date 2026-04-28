# Image Description Library — Taste of Vietnam Explorer

> Tài liệu mô tả chi tiết cho **từng asset hình ảnh** trong `src/assets/` + **các ảnh cần tạo mới** sau khi mở rộng nội dung dataset (12 cities, 38 dishes, 11 tours).
>
> Mỗi file `.md` ở thư mục này đóng vai trò như **prompt brief** cho designer / AI image generator / nhiếp ảnh gia.

---

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
- **Phong cách**: editorial / travel-magazine / National Geographic.
- **Negative chung**: text, logo, watermark, AI artifact, HDR rực rỡ giả tạo, filter Instagram bão hoà.

---

## Cấu trúc mỗi file mô tả

1. **Mục đích sử dụng** — ảnh xuất hiện ở đâu trong app.
2. **Concept / Câu chuyện** — thông điệp muốn truyền tải.
3. **Bố cục (Composition)** — vị trí chủ thể, không gian chữ.
4. **Màu sắc (Palette)** — màu chủ đạo & accent.
5. **Ánh sáng & Mood** — golden hour / overcast / đèn đêm / studio.
6. **Nội dung chi tiết (Subject)** — cụ thể có gì trong khung hình.
7. **Phong cách & Kỹ thuật** — lens, depth of field, texture.
8. **Negative prompt** — những gì cần tránh.

---

## 1. Asset đã có trong `src/assets/` (23 file)

### City (7)
- `city-hanoi.md`, `city-hanoi-hero.md`, `city-hue.md`, `city-danang.md`, `city-hoian.md`, `city-dalat.md`, `city-cantho.md`

### Food (10)
- `food-pho.md`, `food-bunbo.md`, `food-buncha.md`, `food-caolau.md`, `food-banhxeo.md`, `food-banhcuon.md`, `food-banhgoi.md`, `food-comtam.md`, `food-cafetrung.md`, `food-che.md`

### Tour (4)
- `tour-hanoi.md`, `tour-motorbike.md`, `tour-cooking.md`, `tour-mekong.md`

### Hero / Marketing (2)
- `hero-hoian.md`, `cta-banner.md`

---

## 2. Asset CẦN TẠO MỚI (41 file) — sau khi mở rộng dataset

> Hiện tại các entry mới đang **tái sử dụng image key cũ** (xem cột "Tạm dùng key"). Khi tạo ảnh thật, designer cần:
> 1. Render ảnh theo brief tương ứng → save vào `src/assets/<key>.jpg`
> 2. Update `src/lib/imageMap.ts` thêm import + entry mới
> 3. Update field `image`/`heroImage` trong JSON tương ứng

### City mới (6)

| Brief | Tạm dùng key | Đề xuất key mới |
|-------|--------------|-----------------|
| `city-sapa.md` | `city-dalat` | `city-sapa` |
| `city-ninhbinh.md` | `city-hanoi` | `city-ninhbinh` |
| `city-hagiang.md` | `city-dalat` | `city-hagiang` |
| `city-nhatrang.md` | `city-danang` | `city-nhatrang` |
| `city-saigon.md` | `city-danang` | `city-saigon` |
| `city-phuquoc.md` | `city-cantho` | `city-phuquoc` |

### Food mới (28)

#### Hà Nội extras (4)
| Brief | Tạm dùng key | Đề xuất key mới |
|-------|--------------|-----------------|
| `food-phoga.md` | `food-pho` | `food-phoga` |
| `food-bunthang.md` | `food-pho` | `food-bunthang` |
| `food-nemran.md` | `food-banhgoi` | `food-nemran` |
| `food-xoixeo.md` | `food-banhcuon` | `food-xoixeo` |

#### Sa Pa (2)
| Brief | Tạm dùng key | Đề xuất key mới |
|-------|--------------|-----------------|
| `food-thangco-sapa.md` | `food-bunbo` | `food-thangco-sapa` |
| `food-cahoi-sapa.md` | `food-bunbo` | `food-cahoi-sapa` |

#### Ninh Bình (2)
| Brief | Tạm dùng key | Đề xuất key mới |
|-------|--------------|-----------------|
| `food-denui-ninhbinh.md` | `food-comtam` | `food-denui-ninhbinh` |
| `food-comchay-ninhbinh.md` | `food-comtam` | `food-comchay-ninhbinh` |

#### Hà Giang (2)
| Brief | Tạm dùng key | Đề xuất key mới |
|-------|--------------|-----------------|
| `food-phochua-hagiang.md` | `food-pho` | `food-phochua-hagiang` |
| `food-menmen.md` | `food-banhcuon` | `food-menmen` |

#### Huế extras (2)
| Brief | Tạm dùng key | Đề xuất key mới |
|-------|--------------|-----------------|
| `food-comhen-hue.md` | `food-bunbo` | `food-comhen-hue` |
| `food-banhbeo-hue.md` | `food-banhcuon` | `food-banhbeo-hue` |

#### Đà Nẵng / Hội An (4)
| Brief | Tạm dùng key | Đề xuất key mới |
|-------|--------------|-----------------|
| `food-miquang.md` | `food-caolau` | `food-miquang` |
| `food-banhtrangcuonthitheo.md` | `food-banhxeo` | `food-banhtrangcuonthitheo` |
| `food-banhmi-hoian.md` | `food-banhgoi` | `food-banhmi-hoian` |
| `food-comga-hoian.md` | `food-comtam` | `food-comga-hoian` |

#### Nha Trang (2)
| Brief | Tạm dùng key | Đề xuất key mới |
|-------|--------------|-----------------|
| `food-nemnuong-nhatrang.md` | `food-buncha` | `food-nemnuong-nhatrang` |
| `food-buncha-ca-nhatrang.md` | `food-bunbo` | `food-buncha-ca-nhatrang` |

#### Đà Lạt (2)
| Brief | Tạm dùng key | Đề xuất key mới |
|-------|--------------|-----------------|
| `food-banhtrangnuong-dalat.md` | `food-banhxeo` | `food-banhtrangnuong-dalat` |
| `food-suadaunanh-dalat.md` | `food-cafetrung` | `food-suadaunanh-dalat` |

#### Sài Gòn (3)
| Brief | Tạm dùng key | Đề xuất key mới |
|-------|--------------|-----------------|
| `food-banhmi-saigon.md` | `food-banhgoi` | `food-banhmi-saigon` |
| `food-hutieu-namvang.md` | `food-pho` | `food-hutieu-namvang` |
| `food-goicuon.md` | `food-banhcuon` | `food-goicuon` |

#### Cần Thơ (3)
| Brief | Tạm dùng key | Đề xuất key mới |
|-------|--------------|-----------------|
| `food-laumam.md` | `food-bunbo` | `food-laumam` |
| `food-cakhoto.md` | `food-comtam` | `food-cakhoto` |
| `food-banhcanh-caloc.md` | `food-bunbo` | `food-banhcanh-caloc` |

#### Phú Quốc (2)
| Brief | Tạm dùng key | Đề xuất key mới |
|-------|--------------|-----------------|
| `food-goicatrich.md` | `food-banhxeo` | `food-goicatrich` |
| `food-bunquay.md` | `food-bunbo` | `food-bunquay` |

### Tour mới (7)

| Brief | Tạm dùng key | Đề xuất key mới |
|-------|--------------|-----------------|
| `tour-sapa-vungcao.md` | `tour-mekong` | `tour-sapa-vungcao` |
| `tour-hue-cungdinh.md` | `tour-cooking` | `tour-hue-cungdinh` |
| `tour-hoian-denlong.md` | `tour-cooking` | `tour-hoian-denlong` |
| `tour-danang-haisan.md` | `tour-mekong` | `tour-danang-haisan` |
| `tour-dalat-farmtotable.md` | `tour-cooking` | `tour-dalat-farmtotable` |
| `tour-saigon-streetfood.md` | `tour-motorbike` | `tour-saigon-streetfood` |
| `tour-phuquoc-nuocmam.md` | `tour-mekong` | `tour-phuquoc-nuocmam` |

---

## 3. Tổng quan số liệu

| Loại | Đã có asset | Cần tạo mới | Tổng brief |
|------|-------------|-------------|------------|
| **City** | 7 | 6 | 13 |
| **Food** | 10 | 28 | 38 |
| **Tour** | 4 | 7 | 11 |
| **Hero / CTA** | 2 | 0 | 2 |
| **TỔNG** | **23** | **41** | **64** |

---

## 4. Ưu tiên render

### Must (sprint 1) — tránh trùng lặp visual nhiều nhất
1. **6 city mới** (Sài Gòn, Sa Pa, Phú Quốc đặc biệt cần — đang share key với Đà Nẵng/Đà Lạt/Cần Thơ).
2. **Mì Quảng + Cao lầu** — đang share `food-caolau` gây nhầm 2 món signature khác nhau.
3. **Bánh mì Hội An + Bánh mì Sài Gòn** — đang share `food-banhgoi` (sai concept).
4. **Hủ tiếu Nam Vang vs Phở** — đang share `food-pho`.

### Should (sprint 2)
- 4 món Hà Nội extras (phở gà, bún thang, nem rán, xôi xéo).
- 7 tour mới.

### Could (sprint 3)
- Phần còn lại (Sa Pa, Ninh Bình, Hà Giang dishes...) — vùng cao có ít user traffic hơn.
