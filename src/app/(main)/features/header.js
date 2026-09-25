"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { User } from "lucide-react";

export default function HeaderSection() {
  return (
    <div className="min-h-full flex flex-col">
      <div className="flex w-screen h-17 bg-black items-center justify-between px-6">
        <div className="flex items-center">
          <Image src="/pic/Logo.png" alt="Logo" width={40} height={40} />
          <div className="flex flex-col ml-2">
            <span className="text-white text-xl">
              Nom<span className="text-orange-400 text-xl">Nom</span>
            </span>
            <span className="text-xs text-white">Swift Delivery</span>
          </div>
        </div>

        <div className="flex gap-3">
          <Button className="h-9 px-4 bg-white rounded-2xl text-black flex items-center gap-1 cursor-pointer">
            <MapPin className="text-red-500" />
            <span className="text-xs text-red-500">Delivery address:</span>
            <span className="flex text-gray-400 gap-1 items-center text-xs ">
              Add Location <ChevronRight />
            </span>
          </Button>
          <Button className="w-9 h-9 bg-white rounded-4xl cursor-pointer">
            <ShoppingCart className="text-red-500 " />
          </Button>

          <Button className="w-9 h-9 bg-red-500 rounded-4xl cursor-pointer flex items-center">
            <User  className="text-white"/>
          </Button>
        </div>
      </div>
    </div>
  );
}
