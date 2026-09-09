"use client";

import Sidebar from "./features/category-sidebar";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { server } from "@/app/_api/api";
import { Plus } from "lucide-react";
import DishGrid from "./features/dish-grid";

export default function Dishes() {
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState("all");
  const [loading, setLoading] = useState(true);
  const [dialog, setDialog] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);

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

  const handleAddDish = () => {
    setSelectedDish(null);
    setDialog(true);
  };

  const handleEditDish = () => {
    setSelectedDish();
    setDialog(true);
  };

  const handleCloseDialog = () => {
    setDialog(false);
    setSelectedDish(null);
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 px-4">
        <div className="rounded-2xl bg-white w-292.75 py-4 border border-gray-200 mt-21 ml-6">
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

        <DishGrid
          categories={categories}
          selectedCat={selectedCat}
          onAddDish={handleAddDish}
          onEditDish={handleEditDish}
        />

        
      </div>
    </div>
  );
}
