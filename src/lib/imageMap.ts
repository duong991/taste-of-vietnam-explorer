import cityCantho from '@/assets/city-cantho.jpg';
import cityDalat from '@/assets/city-dalat.jpg';
import cityDanang from '@/assets/city-danang.jpg';
import cityHanoiHero from '@/assets/city-hanoi-hero.jpg';
import cityHanoi from '@/assets/city-hanoi.jpg';
import cityHoian from '@/assets/city-hoian.jpg';
import cityHue from '@/assets/city-hue.jpg';
import foodBanhcuon from '@/assets/food-banhcuon.jpg';
import foodBanhgoi from '@/assets/food-banhgoi.jpg';
import foodBanhxeo from '@/assets/food-banhxeo.jpg';
import foodBunbo from '@/assets/food-bunbo.jpg';
import foodBuncha from '@/assets/food-buncha.jpg';
import foodCafetrung from '@/assets/food-cafetrung.jpg';
import foodCaolau from '@/assets/food-caolau.jpg';
import foodChe from '@/assets/food-che.jpg';
import foodComtam from '@/assets/food-comtam.jpg';
import foodPho from '@/assets/food-pho.jpg';
import heroHoian from '@/assets/hero-hoian.jpg';
import tourCooking from '@/assets/tour-cooking.jpg';
import tourHanoi from '@/assets/tour-hanoi.jpg';
import tourMekong from '@/assets/tour-mekong.jpg';
import tourMotorbike from '@/assets/tour-motorbike.jpg';
import ctaBanner from '@/assets/cta-banner.jpg';

export const IMAGE_MAP: Record<string, string> = {
  'city-cantho': cityCantho,
  'city-dalat': cityDalat,
  'city-danang': cityDanang,
  'city-hanoi-hero': cityHanoiHero,
  'city-hanoi': cityHanoi,
  'city-hoian': cityHoian,
  'city-hue': cityHue,
  'food-banhcuon': foodBanhcuon,
  'food-banhgoi': foodBanhgoi,
  'food-banhxeo': foodBanhxeo,
  'food-bunbo': foodBunbo,
  'food-buncha': foodBuncha,
  'food-cafetrung': foodCafetrung,
  'food-caolau': foodCaolau,
  'food-che': foodChe,
  'food-comtam': foodComtam,
  'food-pho': foodPho,
  'hero-hoian': heroHoian,
  'tour-cooking': tourCooking,
  'tour-hanoi': tourHanoi,
  'tour-mekong': tourMekong,
  'tour-motorbike': tourMotorbike,
  'cta-banner': ctaBanner,
};

export function resolveImage(key: string): string {
  return IMAGE_MAP[key] ?? '/placeholder.svg';
}
