"use client";

import FoodGrid from "./(main)/features/food-grid";
import Footer from "./(main)/features/footer";
import HeaderSection from "./(main)/features/header";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      <HeaderSection />
      <div className="w-full">
        <Image
          src="/pic/hero.png"
          alt="HeroPic"
          width={1920}
          height={570}
          sizes="100vw"
        />
      </div>
      <FoodGrid />
      <Footer />
    </div>
  );
}
