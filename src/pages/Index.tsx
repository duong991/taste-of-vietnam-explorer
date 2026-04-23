import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SectionHeader from "@/components/SectionHeader";
import Carousel from "@/components/Carousel";
import CityCard from "@/components/CityCard";
import FoodCard from "@/components/FoodCard";
import TourCard from "@/components/TourCard";
import Features from "@/components/Features";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

import cityHanoi from "@/assets/city-hanoi.jpg";
import cityHue from "@/assets/city-hue.jpg";
import cityDanang from "@/assets/city-danang.jpg";
import cityHoian from "@/assets/city-hoian.jpg";
import cityDalat from "@/assets/city-dalat.jpg";
import cityCantho from "@/assets/city-cantho.jpg";

import foodPho from "@/assets/food-pho.jpg";
import foodBunbo from "@/assets/food-bunbo.jpg";
import foodCaolau from "@/assets/food-caolau.jpg";
import foodBanhxeo from "@/assets/food-banhxeo.jpg";
import foodBuncha from "@/assets/food-buncha.jpg";
import foodComtam from "@/assets/food-comtam.jpg";

import tourHanoi from "@/assets/tour-hanoi.jpg";
import tourMotorbike from "@/assets/tour-motorbike.jpg";
import tourCooking from "@/assets/tour-cooking.jpg";
import tourMekong from "@/assets/tour-mekong.jpg";

const cities = [
  { image: cityHanoi, name: "Hà Nội", tagline: "Tinh tế và cổ kính" },
  { image: cityHue, name: "Huế", tagline: "Trầm mặc và thơ mộng" },
  { image: cityDanang, name: "Đà Nẵng", tagline: "Năng động và đáng sống" },
  { image: cityHoian, name: "Hội An", tagline: "Phố cổ rực ánh đèn" },
  { image: cityDalat, name: "Đà Lạt", tagline: "Mộng mơ và lãng mạn" },
  { image: cityCantho, name: "Cần Thơ", tagline: "Sông nước hữu tình" },
];

const foods = [
  { image: foodPho, name: "Phở bò Hà Nội", city: "Hà Nội", rating: 4.8, michelin: true },
  { image: foodBunbo, name: "Bún bò Huế", city: "Huế", rating: 4.7, michelin: true },
  { image: foodCaolau, name: "Cao lầu Hội An", city: "Hội An", rating: 4.6, michelin: true },
  { image: foodBanhxeo, name: "Bánh xèo", city: "Miền Nam", rating: 4.6, michelin: true },
  { image: foodBuncha, name: "Bún chả Hà Nội", city: "Hà Nội", rating: 4.7, michelin: true },
  { image: foodComtam, name: "Cơm tấm Sài Gòn", city: "Sài Gòn", rating: 4.7 },
];

const tours = [
  { image: tourHanoi, name: "Khám phá ẩm thực phố cổ Hà Nội", city: "Hà Nội", duration: "1 ngày", price: "1.250.000đ", rating: 4.9, reviews: 120 },
  { image: tourMotorbike, name: "Food Tour Hà Nội bằng xe máy", city: "Hà Nội", duration: "1 ngày", price: "1.450.000đ", rating: 4.8, reviews: 95 },
  { image: tourCooking, name: "Trải nghiệm ẩm thực truyền thống", city: "Hà Nội", duration: "1 ngày", price: "1.350.000đ", rating: 4.9, reviews: 110 },
  { image: tourMekong, name: "Khám phá ẩm thực miền Tây sông nước", city: "Cần Thơ", duration: "2 ngày 1 đêm", price: "2.350.000đ", rating: 4.8, reviews: 80 },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />

        <section id="thanh-pho" className="container py-16 md:py-20">
          <SectionHeader
            eyebrow="Khám phá các thành phố"
            title="Đi khắp Việt Nam, thưởng thức hương vị địa phương"
          />
          <Carousel>
            {cities.map((c) => <CityCard key={c.name} {...c} />)}
          </Carousel>
        </section>

        <section id="mon-an" className="container py-12 md:py-16">
          <SectionHeader
            eyebrow="Món ngon nổi bật"
            title="Những món ăn làm nên thương hiệu Việt"
          />
          <Carousel>
            {foods.map((f) => <FoodCard key={f.name} {...f} />)}
          </Carousel>
        </section>

        <section id="tour" className="container py-12 md:py-16">
          <SectionHeader
            eyebrow="Tour ẩm thực trải nghiệm"
            title="Những hành trình vị giác không thể bỏ lỡ"
            action={
              <a href="#" className="text-sm font-medium text-primary hover:underline">
                Xem tất cả tour →
              </a>
            }
          />
          <Carousel>
            {tours.map((t) => <TourCard key={t.name} {...t} />)}
          </Carousel>
        </section>

        <Features />
        <CTABanner />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;
