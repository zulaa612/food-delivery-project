"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Minus, Plus } from "lucide-react";

interface DishDetailModalProps {
  isOpen: boolean;
  dish: {
    _id: string;
    dishName: string;
    price: number;
    ingredients?: string;
    imageUrl?: string;
  } | null;
  onClose: () => void;
  onAddToCart: (dish: any, quantity: number) => void;
}

export default function DishDetailModal({ isOpen, dish, onClose, onAddToCart }: DishDetailModalProps) {
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !dish) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 relative flex flex-col md:flex-row gap-6 shadow-2xl animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 p-1.5 rounded-full text-gray-600 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Image */}
        <div className="relative w-full md:w-1/2 aspect-square rounded-2xl overflow-hidden bg-gray-100">
          {dish.imageUrl ? (
            <Image src={dish.imageUrl} alt={dish.dishName} fill className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
          )}
        </div>

        {/* Right Side: Details & Actions */}
        <div className="flex-1 flex flex-col justify-between py-2">
          <div>
            <h3 className="text-2xl font-bold text-red-500">{dish.dishName}</h3>
            <p className="text-gray-500 text-sm mt-2 leading-relaxed">
              {dish.ingredients || "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar."}
            </p>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400">Total price</p>
                <p className="text-2xl font-extrabold text-gray-900">${(dish.price * quantity).toFixed(2)}</p>
              </div>

              {/* Quantity Counter */}
              <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-1 rounded-full hover:bg-gray-200 text-gray-600"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-semibold text-gray-800 text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-1 rounded-full hover:bg-gray-200 text-gray-600"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                onAddToCart(dish, quantity);
                onClose();
              }}
              className="w-full bg-gray-900 text-white font-medium py-3 rounded-full hover:bg-black transition-colors"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}