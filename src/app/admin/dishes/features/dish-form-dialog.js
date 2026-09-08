"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function DishCategory() {
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSeelectedCat] = useState("all");
  const [loading, setLoading] = useState(false);


  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200 mt-21">
      <h1 className="text-xl font-semibold">Dishes category</h1>
      <div className="flex flex-wrap items-center gap-3"></div>
    </div>
  );
}
