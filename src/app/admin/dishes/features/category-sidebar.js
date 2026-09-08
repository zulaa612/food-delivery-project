"use client";

import { LayoutDashboard } from "lucide-react";
import Image from "next/image";
import { Truck } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  return (
    <aside className="w-51.25 h-screen bg-white border-r-4 border-gray-100 flex flex-col p-5.5">
      {/*Logo*/}
      <div className="flex">
        <Image src="/pic/Logo.png" alt="Logo" width={40} height={40} />
        <div className="flex flex-col ml-2">
          <h1 className="font-semibold text-lg">NomNom</h1>
          <p className="text-xs text-gray-400">Swift delivery</p>
        </div>
      </div>

      {/*Buttons*/}
      <div className="mt-10">
        <Button
          variant="outline"
          className="cursor-pointer bg-white border-none hover:bg-black"
        >
          <LayoutDashboard />
          <span>Food Menu</span>
        </Button>
        <Button
          variant="outline"
          className="cursor-pointer bg-white border-none hover:bg-black"
        >
          <Truck/>
          <span>Orders</span>
        </Button>
      </div>
    </aside>
  );
}
