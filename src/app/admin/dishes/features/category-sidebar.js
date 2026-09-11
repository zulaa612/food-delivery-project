"use client";

import { LayoutDashboard } from "lucide-react";
import Image from "next/image";
import { Truck } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import Dishes from "../page";
import Orders from "../../orders/page";

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState("foodMenu");

  return (
    <div className="flex h-screen">
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
        <div className="mt-10 flex flex-col gap-6">
          <Button
            onClick={() => setActiveTab("foodMenu")}
            className={`w-full justify-start gap-3 rounded-full px-4 py-2 cursor-pointer hover:bg-black hover:text-white ${
              activeTab === "foodMenu"
                ? "bg-black text-white"
                : "bg-transparent text-black hover:bg-black hover:text-white"
            }`}
          >
            <LayoutDashboard className="w-5 h-5 shrink-0 flex-none" />
            <span>Food Menu</span>
          </Button>
          <Button
            onClick={() => setActiveTab("orders")}
            className={`w-full justify-start gap-3 rounded-full px-4 py-2 cursor-pointer hover:bg-black hover:text-white ${
              activeTab === "orders"
                ? "bg-black text-white"
                : "bg-transparent text-black hover:bg-black hover:text-white"
            }`}
          >
            <Truck className="w-5 h-5 shrink-0 flex-none" />
            <span>Orders</span>
          </Button>
          <Button
            onClick={() => setActiveTab("settings")}
            className={`w-full justify-start gap-3 rounded-full px-4 py-2 cursor-pointer hover:bg-black hover:text-white ${
              activeTab === "settings"
                ? "bg-black text-white"
                : "bg-transparent text-black hover:bg-black hover:text-white"
            }`}
          >
            <Settings className="w-5 h-5 shrink-0 flex-none" />
            <span>Settings</span>
          </Button>
        </div>
      </aside>

      <div className="flex-1 p-8 bg-gray-50 ">
        {activeTab === "foodMenu" && <Dishes />}
        {activeTab === "orders" && <Orders />}
      </div>
    </div>
  );
}
