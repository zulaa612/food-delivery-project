"use client";

import { Plus, Pencil } from "lucide-react";
import { Button } from "@base-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import AddDish from "./add-new-dish";
import { server } from "@/app/_api/api";

export default function DishGrid({ categories = [], selectedCat, onRefresh }) {
  const [dishesInfo, setDishesInfo] = useState(false);
  const [editDish, setEditDish] = useState(null);
  const [selectedCatId, setSelectedCatId] = useState(null);
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchDishes = async () => {
      try {
        const response = await server.get("/add-dish/get");
        if (isMounted) {
          setDishes(response?.data?.CategoryDish || []);
        }
        console.log(response.data.CategoryDish);
      } catch (err) {
        console.log("Error fetching dishes:", err);
      }
    };

    fetchDishes();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleOpenDishesInfo = (catId) => {
    setEditDish(null);
    setSelectedCatId(catId);
    setDishesInfo(true);
  };

  const handleOpenEdit = (dish) => {
    setEditDish(dish);
    setSelectedCatId(dish.categoryId);
    setDishesInfo(true);
  };

  const filteredCategories =
    selectedCat === "all"
      ? categories
      : categories.filter((category) => category._id === selectedCat);

  return (
    <div className="space-y-6">
      {filteredCategories.map((category) => (
        <div
          key={category._id}
          className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
        >
          <h2 className="font-bold text-xl text-gray-900 mb-4">
            {category.categoryName} ({category.dishes?.length || 0})
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <Button
              onClick={() => handleOpenDishesInfo(category._id)}
              className="border-2 border-dashed border-red-300 hover:border-red-400 bg-red-50/20 rounded-2xl h-60 flex flex-col items-center justify-center gap-3 text-center cursor-pointer transition"
            >
              <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white">
                <Plus className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-gray-700">
                Add new Dish to {category.categoryName}
              </span>
            </Button>

            {dishes?.map((dish) => (
              <div
                key={dish._id}
                className="border border-gray-100 rounded-2xl p-3 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow relative bg-white"
              >
                <div>
                  <div className="relative w-full h-36 rounded-xl overflow-hidden bg-gray-100">
                    <Image
                      src={dish.image || "/placeholder.png"}
                      alt={dish.dishName || "dish"}
                      fill
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <button
                      onClick={() => handleOpenEdit(dish)}
                      className="absolute top-2 right-2 p-2 rounded-full bg-white text-red-500 shadow hover:bg-gray-50 cursor-pointer"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex justify-between items-start mt-3 mb-1">
                    <span className="font-semibold text-red-500 text-sm line-clamp-1">
                      {dish.dishName}
                    </span>
                    <span className="font-bold text-xs text-gray-900">
                      ${dish.price}
                    </span>
                  </div>

                  <p className="text-gray-500 text-xs line-clamp-2">
                    {dish.ingredients}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <AddDish
        key={editDish?._id || selectedCatId || "new-dish"}
        isOpen={dishesInfo}
        onClose={() => setDishesInfo(false)}
        dishEdit={editDish}
        selectedCatId={selectedCatId}
        categories={categories}
        onRefresh={onRefresh}
      />
    </div>
  );
}
