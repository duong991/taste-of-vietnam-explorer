# Project Vision Document — Tinh hoa Hương vị Việt (Taste of Vietnam Explorer)

> Tài liệu nền tảng mô tả lý do tồn tại, mục tiêu chiến lược và giá trị cốt lõi của dự án.
> Vai trò soạn thảo: **Product Owner / Senior Product Manager**.
> Ngôn ngữ: Tiếng Việt (giữ nguyên thuật ngữ kỹ thuật bằng tiếng Anh).

---

## 0. Tổng quan dự án

- **Tên dự án:** Tinh hoa Hương vị Việt — *Taste of Vietnam Explorer*
- **Loại sản phẩm:** Web application (SPA) khám phá ẩm thực & văn hoá Việt Nam
- **Tech stack hiện tại:** React 18 + TypeScript + Vite + TailwindCSS + shadcn/ui + React Router + TanStack Query
- **Phạm vi hiện tại của codebase:**
  - Trang chủ giới thiệu các **thành phố**, **món ăn nổi bật**, **tour ẩm thực**
  - Trang chi tiết theo thành phố (`/thanh-pho/:slug`)
  - Trợ lý ảo (Chatbot) gợi ý trải nghiệm
  - Bộ component UI giàu (49+ component shadcn/ui) làm nền tảng mở rộng

---

## 1. Problem Statement

Du khách trong và ngoài nước khi muốn khám phá **ẩm thực Việt Nam** đang gặp các trở ngại:

- **Thông tin phân mảnh:** dữ liệu món ăn, địa điểm, tour ẩm thực nằm rải rác trên blog du lịch, mạng xã hội, OTA — thiếu một nguồn được biên tập có chiều sâu văn hoá.
- **Thiếu chiều sâu văn hoá vùng miền:** đa số nội dung dừng ở mức "ăn gì — ở đâu", chưa kể được câu chuyện vùng miền, lịch sử món ăn, bối cảnh thưởng thức.
- **Khó cá nhân hoá:** người dùng không có công cụ gợi ý theo khẩu vị, hành trình, ngân sách hoặc thời gian.
- **Khoảng cách ngôn ngữ & văn hoá:** du khách quốc tế khó tiếp cận tinh hoa ẩm thực địa phương ngoài các món "phổ biến đại trà".
- **Nhà cung cấp tour & nhà hàng địa phương** thiếu kênh kể chuyện chuẩn hoá để tiếp cận đúng tệp khách quan tâm trải nghiệm thật.

**Đối tượng đang chịu ảnh hưởng:** du khách nội địa & quốc tế, foodie, food blogger, đơn vị lữ hành ẩm thực, nhà hàng địa phương.

---

## 2. Vision Statement

> **Trở thành cánh cổng số hàng đầu đưa thế giới đến với tinh hoa ẩm thực và văn hoá Việt Nam — nơi mỗi món ăn là một câu chuyện, mỗi hành trình là một trải nghiệm đáng nhớ.**

---

## 3. Mission Statement

Xây dựng một nền tảng web hiện đại, được biên tập kỹ lưỡng, kết hợp **nội dung văn hoá — dữ liệu địa điểm — trợ lý ảo cá nhân hoá**, giúp người dùng:

- Khám phá ẩm thực Việt Nam theo **vùng miền & thành phố**.
- Lựa chọn **tour trải nghiệm** phù hợp với sở thích và ngân sách.
- Nhận **gợi ý cá nhân hoá** thông qua trợ lý ảo (Chatbot).

---

## 4. Target Users

### Primary
- **Du khách quốc tế (inbound travelers)**: nhóm yêu trải nghiệm bản địa, food tourism.
- **Du khách nội địa thế hệ Millennials & Gen Z**: thích khám phá vùng miền, sẵn sàng chi cho trải nghiệm.

### Secondary
- **Food bloggers / content creators** tìm nguồn cảm hứng và dữ liệu chuẩn hoá.
- **Đơn vị lữ hành ẩm thực & nhà hàng địa phương** muốn quảng bá tour/món ăn đặc trưng.

### Tertiary (tương lai)
- Cộng đồng Việt kiều muốn kết nối với hương vị quê nhà.
- Đối tác giáo dục — du lịch văn hoá.

---

## 5. Core Value Proposition

> **"Không chỉ là nơi tìm món ăn — mà là nơi kể câu chuyện ẩm thực Việt theo cách đẹp, sâu và đáng tin."**

Giá trị khác biệt so với OTA, blog du lịch hay map review:

| Khía cạnh                | Đối thủ phổ biến                | Tinh hoa Hương vị Việt                       |
|--------------------------|----------------------------------|----------------------------------------------|
| Nội dung                 | UGC, ngắn, không có biên tập    | Biên tập theo chiều sâu văn hoá vùng miền    |
| Trải nghiệm              | Liệt kê, rời rạc                 | Hành trình theo thành phố — món — tour       |
| Cá nhân hoá              | Bộ lọc tĩnh                      | Trợ lý ảo gợi ý theo ngữ cảnh                |
| Đối tượng quốc tế        | Hạn chế                          | Định hướng đa ngôn ngữ ngay từ thiết kế       |
| Cảm xúc thương hiệu      | Tiện dụng                        | Tinh tế, truyền cảm hứng, "đáng để khám phá" |

---

## 6. Strategic Goals

1. **G1 — Thiết lập thương hiệu nội dung dẫn đầu** về ẩm thực vùng miền Việt Nam trên môi trường digital.
2. **G2 — Xây dựng kho dữ liệu chuẩn hoá** (món ăn, thành phố, tour) đủ phong phú cho ≥ 12 thành phố trọng điểm.
3. **G3 — Phát triển trợ lý ảo cá nhân hoá** (Chatbot) đạt mức độ hài lòng > 80% trong việc đưa ra gợi ý phù hợp.
4. **G4 — Hình thành mạng lưới đối tác** với tối thiểu 30 đơn vị tour & nhà hàng địa phương trong giai đoạn đầu.
5. **G5 — Mở rộng đa ngôn ngữ** (Việt — Anh là tối thiểu) để phục vụ thị trường inbound.

---

## 7. Success Metrics (KPIs)

### Engagement
- **MAU** (Monthly Active Users) tăng trưởng tháng/tháng.
- **Avg. session duration** ≥ 3 phút.
- **Pages per session** ≥ 4 (chỉ báo hành trình khám phá sâu).

### Content Coverage
- Số **thành phố** được publish đầy đủ (mục tiêu giai đoạn đầu: ≥ 6, trung hạn: ≥ 12).
- Số **món ăn** & **tour** được biên tập với metadata đầy đủ.

### Personalization
- **Chatbot resolution rate** (tỉ lệ phiên kết thúc bằng gợi ý hữu ích).
- **CSAT** sau tương tác chatbot.

### Business
- Số **lead** chuyển hướng sang đối tác tour/nhà hàng.
- **Tỉ lệ chuyển đổi** từ trang tour → liên hệ/đặt chỗ.

### Brand
- **Organic traffic** từ các từ khoá ẩm thực vùng miền.
- **Inbound backlink** từ kênh du lịch/ẩm thực uy tín.

---

## 8. Out of Scope

Dự án **KHÔNG** đặt mục tiêu (ít nhất ở giai đoạn hiện tại):

- Trở thành **OTA / hệ thống đặt phòng** đầy đủ (hotel booking, vé máy bay).
- Vận hành **giao đồ ăn** (food delivery).
- Trở thành **mạng xã hội UGC** với tính năng đăng tin tự do — nội dung được biên tập có kiểm soát.
- **Thanh toán trực tiếp** trên nền tảng cho tour/nhà hàng (giai đoạn đầu chỉ dẫn lead).
- Nội dung **không liên quan đến ẩm thực & văn hoá vùng miền Việt Nam** (du lịch chung chung, review điểm đến không gắn ẩm thực).

---

## 9. Assumptions & Risks

### Assumptions
- Nhu cầu **food tourism** tại Việt Nam tiếp tục tăng cùng làn sóng inbound phục hồi.
- Người dùng sẵn sàng dành thời gian khám phá nội dung biên tập sâu thay vì chỉ liệt kê.
- Đối tác địa phương (tour, nhà hàng) sẵn sàng hợp tác cung cấp dữ liệu/nội dung chuẩn hoá.
- Trợ lý ảo (Chatbot) tạo được giá trị cá nhân hoá đủ rõ rệt so với bộ lọc thông thường.

### Risks

| Rủi ro                                | Mức độ | Chiến lược giảm thiểu                                         |
|---------------------------------------|--------|---------------------------------------------------------------|
| Chi phí biên tập nội dung cao          | Cao    | Xây dựng quy trình biên tập + cộng tác viên vùng miền         |
| Khó duy trì độ tươi mới của dữ liệu    | Trung  | Vòng đời nội dung + đối tác địa phương + người dùng phản hồi  |
| Phụ thuộc vào chất lượng Chatbot       | Trung  | Bắt đầu bằng rule-based, đo lường rồi mới đầu tư LLM sâu      |
| Cạnh tranh từ OTA/blog đã có thương hiệu | Trung | Khác biệt hoá bằng chiều sâu văn hoá & UX cảm xúc             |
| Đa ngôn ngữ tốn nguồn lực              | Trung  | Ưu tiên VI → EN trước, các ngôn ngữ khác theo dữ liệu nhu cầu |
| Bản quyền hình ảnh/nội dung            | Cao    | Quy trình bản quyền rõ ràng, hợp tác nhiếp ảnh gia/đối tác    |

---

## 10. Next Steps (định hướng cho BA/SA)

> *Phần này chỉ nêu định hướng — chi tiết scope, use case, kiến trúc thuộc về BA/SA.*

- **BA**: bóc tách Use Case cho 3 luồng cốt lõi — *Khám phá thành phố*, *Khám phá món ăn/tour*, *Tương tác Chatbot*.
- **SA**: đề xuất kiến trúc dữ liệu cho `City`, `Dish`, `Tour`, `ChatSession`; định hướng nguồn dữ liệu (CMS vs. static).
- **Design**: hệ thống design language phản ánh "tinh tế — vùng miền — cảm xúc".
- **Content**: kế hoạch biên tập 6 thành phố ưu tiên giai đoạn đầu.

---

*Tài liệu này là phiên bản khởi tạo (v0.1) — sẽ được cập nhật theo phản hồi của stakeholder và dữ liệu thực tế từ thị trường.*
