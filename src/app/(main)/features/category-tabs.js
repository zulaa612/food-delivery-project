"use client";

import { useCategory } from "@/app/provider/categoryProvider";
import Image from "next/image";
import { ImageIcon, Plus } from "lucide-react";

export default function CategoryTab() {
  const { categories, dishes, loading } = useCategory();

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12 flex flex-col gap-12">
      {loading ? (
        <div className="text-gray-500 text-center py-2">Loading...</div>
      ) : (
        categories.map((category) => (
          <section key={category._id}>
            <h2 className="text-white text-3xl font-semibold mb-6">
              {category.categoryName}
            </h2>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {dishes
                .filter((dish) => dish.category === category._id)
                .map((dish) => (
                  <div
                    key={dish._id}
                    className="bg-white rounded-2xl p-3 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
                  >
                    {/* Image + add button */}
                    <div className="relative w-full aspect-4/3 rounded-xl bg-gray-100">
                      {dish.imageUrl ? (
                        <Image
                          src={dish.imageUrl}
                          alt={dish.dishName || "dish"}
                          fill
                          className="object-cover rounded-2xl"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="w-8 h-8 text-gray-300" />
                        </div>
                      )}

                      <button
                        onClick={() => handleAdd(dish)}
                        className="absolute bottom-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-white text-red-500 shadow hover:bg-gray-50 cursor-pointer"
                        aria-label={`Add {dish.dishName}`}
                      >
                        <Plus />
                      </button>
                    </div>

                    {/* Name + price */}
                    <div className="flex justify-between items-baseline gap-2 mt-3 px-1">
                      <span className="font-semibold text-red-500 text-base line-clamp-1">
                        {dish.dishName}
                      </span>
                      <span className="font-bold text-sm text-gray-900 shrink-0">
                        {dish.price}
                      </span>
                    </div>

                    {/* Ingredients */}
                    {dish.ingredients && (
                      <p className="mt-1 px-1 text-sm leading-snug text-gray-800 line-clamp-2">
                        {dish.ingredients}
                      </p>
                    )}
                  </div>
                ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
