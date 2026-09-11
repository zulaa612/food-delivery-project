"use client";

import { useEffect, useState } from "react";
import { server } from "@/app/_api/api";
import AddNewCat from "./features/add-new-cat";
import DishGrid from "./features/dish-grid";

export default function Dishes() {
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await server.get("/food-category/get");

        if (response) {
          setCategories(response.data.FoodCategories || []);
        } else {
          setCategories([]);
        }
        setLoading(false);
      } catch (err) {
        console.log("error fetching:", err);
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <div className="flex-1 p-8 space-y-6">
        {/* Dishes category Section */}
        <div className="rounded-2xl bg-white p-6 border border-gray-200 shadow-sm">
          <h1 className="text-xl font-bold text-gray-900 mb-4">
            Dishes category
          </h1>

          {loading ? (
            <div className="text-gray-500 py-2">Loading...</div>
          ) : (
            <div className="flex flex-wrap items-center gap-3">
              {/* All Dishes Button */}
              <button
                type="button"
                onClick={() => setSelectedCat("all")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all cursor-pointer ${
                  selectedCat === "all"
                    ? "border-red-500 bg-white text-gray-900"
                    : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                }`}
              >
                <span>All Dishes</span>
                <span className="bg-black text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                  {categories.dishes?.length || 0}
                </span>
              </button>

              {/* Category Buttons */}
              {categories.map((category) => (
                <button
                  key={category._id}
                  type="button"
                  onClick={() => setSelectedCat(category._id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all cursor-pointer ${
                    selectedCat === category._id
                      ? "border-red-500 bg-white text-gray-900"
                      : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                  }`}
                >
                  <span>{category.categoryName}</span>
                  <span className="bg-black text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                    {categories.dishes?.length || 0}
                  </span>
                </button>
              ))}

              <AddNewCat />
            </div>
          )}
        </div>

        {!loading && (
          <DishGrid categories={categories} selectedCat={selectedCat} />
        )}
      </div>
    </div>
  );
}
