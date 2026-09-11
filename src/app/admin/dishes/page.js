"use client";

import { useEffect, useState } from "react";
import { server } from "@/app/_api/api";
import AddNewCat from "./features/add-new-cat";
import DishGrid from "./features/dish-grid";
import { X } from "lucide-react";
import { toast } from "sonner";

export default function Dishes() {
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState("all");
  const [loading, setLoading] = useState(true);

  const [deleteCat, setDeleteCat] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchCategories = async () => {
      try {
        const response = await server.get("/food-category/get");
        if (isMounted) {
          setCategories(response?.data?.FoodCategories || []);
        }
      } catch (err) {
        console.log("Error fetching categories;", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  const reloadCategories = async () => {
    try {
      const response = await server.get("/food-category/get");
      setCategories(response?.data?.FoodCategories || []);
    } catch (err) {
      console.log("Error reload categories:", err);
    }
  };

  const handleDeleteCategory = async () => {
    if (!deleteCat) return;

    try {
      await server.delete(`/food-category/delete/${deleteCat._id}`);
      toast.success("Category deleted succesfully");

      if (selectedCat === deleteCat._id) {
        setSelectedCat("all");
      }
      await reloadCategories();
    } catch (err) {
      console.log("Deleting category error:", err);
      toast.error("Could not delet this category");
    } finally {
      setDeleteCat(null);
    }
  };

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
                <div
                  key={category._id}
                  onClick={() => setSelectedCat(category._id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all cursor-pointer ${
                    selectedCat === category._id
                      ? "border-red-500 bg-white text-gray-900"
                      : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                  }`}
                >
                  <span>{category.categoryName}</span>
                  <span className="bg-black text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                    {category.dishes?.length || 0}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteCat(category);
                    }}
                    className="ml-1 p-0.5 rounded-full hover:text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <X className="w-3.5 h-3.5 cursor-pointer" />
                  </button>
                </div>
              ))}

              <AddNewCat reloadCategories={reloadCategories} />
            </div>
          )}
        </div>

        {!loading && (
          <DishGrid categories={categories} selectedCat={selectedCat} />
        )}
      </div>

      {/* Custom Delete Modal */}
      {deleteCat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 w-80 text-center shadow-xl border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Delete this category?
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure want to delete{" "}
              <span className="font-semibold text-red-600">
                `{deleteCat.categoryName}`
              </span>
              ?
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setDeleteCat(null)}
                className="flex-1 py-2 text-sm font-medium border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer text-gray-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteCategory}
                className="flex-1 py-2 text-sm font-medium bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
