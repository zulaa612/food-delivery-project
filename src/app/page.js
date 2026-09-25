"use client";

import HeaderSection from "./(main)/features/header";
import Image from "next/image";

export default function HomePage() {
  return (
    <div>
      <HeaderSection />
      <div className="w-full">
        <Image
          src="/pic/hero.png"
          alt="HeroPic"
          sizes="100vw"
          className="w-screen h-auto object-cover"
          height={570}
          width={1440}
        />
      </div>
    </div>
  );
}
