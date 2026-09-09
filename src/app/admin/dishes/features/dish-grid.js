"use client";

import { Plus } from "lucide-react";
import { Pencil } from "lucide-react";
import { Button } from "@base-ui/react";
import Image from "next/image";

export default function DishGrid({
  categories,
  selectedCat,
  onAddDish,
  onEditDish,
}) {
  const filteredCategories =
    selectedCat === "all"
      ? categories
      : categories.filter((categories) => categories._id === selectedCat);

  return (
    <div className="px-4 py-2">
      {filteredCategories.map((category) => (
        <div
          key={category._id}
          className="bg-white rounded-2xl p-6 border border-gray-300"
        >
          <span className="font-semibold text-xl">
            {category.categoryName} ({category.dishes?.length})
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <Button
              onClick={onAddDish}
              className="border-2 border-dashed border-red-500 hover:border-red-950 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 text-center min-h-screen-60.25"
            >
              <div className="w-11 h-11 rounded-full bg-red-400 flex items-center justify-center text-white">
                <Plus />
              </div>
              <span>Add new Dish to {category.categoryName}</span>
            </Button>

            {category.dishes?.map((dish) => (
              <div
                key={dish._id}
                className="border border-gray-200 rounded-2xl p-4 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow relative bg-white"
              >
                <div>
                  <div className="realtive w-59.75 h-32.5 rounded-xl overflow-hidden bg-gray-200">
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover"
                    />
                    <Button
                      onClick={() => onEditDish(dish)}
                      className="absolute rounded-full bg-white cursor-pointer"
                    >
                      <Pencil />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
