"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { server } from "@/app/_api/api";
import { Plus } from "lucide-react";

export default function DishCategory() {
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await server.get("/food-category/get");
        const data = response.data;
        console.log("response:", data);

        if (response.data && Array.isArray(response.data.FoodCategories)) {
          setCategories(response.data.FoodCategories);
        } else {
          setCategories([]);
        }
        setLoading(false);
      } catch (err) {
        console.log("error fetching:", err);
      }
    })();
  }, []);

  return (
    <div className="rounded-2xl bg-white w-292.75 py-4 shadow-sm border border-gray-200 mt-21">
      <h1 className="text-xl font-semibold ml-6">Dishes category</h1>

      {loading ? (
        <span className="ml-6">Loading...</span>
      ) : (
        <div className="flex flex-wrap gap-2 px-4 py-4 mt-4">
          <Button
            onClick={() => setSelectedCat("all")}
            className=" px-4 py-2 rounded-full border border-gray-400 hover:border-red-500"
          >
            All dishes
          </Button>
          {categories.map((category) => (
            <Button
              key={category._id}
              onClick={() => setSelectedCat(category._id)}
              className="px-4 py-2 rounded-full border border-gray-400 hover:border-red-500"
            >
              {category.categoryName}
              <div>{selectedCat.length}</div>
            </Button>
          ))}
          <Button className="px-2 py-2 rounded-full bg-red-500 hover:bg-red-900">
            <Plus />
          </Button>
        </div>
      )}
    </div>
  );
}
