import { CategorySection } from "@/components/sections/category-section";
import { HeroSection } from "@/components/sections/hero-section";
import { HowToOrderSection } from "@/components/sections/how-to-order-section";
import { ProductSection } from "@/components/sections/product-section";
import { PromoSection } from "@/components/sections/promo-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <ProductSection />
      <PromoSection />
      <HowToOrderSection />
    </>
  );
}
