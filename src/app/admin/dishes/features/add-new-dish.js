"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { server } from "@/app/_api/api";
import { X } from "lucide-react";
import { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Check } from "lucide-react";
import { Pencil } from "lucide-react";
import Dishes from "../page";
import { Trash2 } from "lucide-react";

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const upload_preset =
  process.env.NEXT_PUBLIC_NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

export default function AddDish({
  isOpen,
  onClose,
  dishEdit = null,
  categories = [],
  onRefresh,
}) {
  const [formData, setFormData] = useState({
    dishName: dishEdit?.dishName,
    category: dishEdit?.categoryId,
    ingredients: dishEdit?.ingredients,
    price: dishEdit?.price,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.dishName || !formData.price || !formData.category) {
      toast.error("Please provide required fields (name, price, category");
      return;
    }

    setIsSubmitting(true);
    const payload = {
      dishName: formData.dishName,
      categoryId: formData.category,
      ingredients: formData.ingredients,
      price: Number(formData.price),
    };

    try {
      if (dishEdit) {
        await server.put(`/category-dishes/update/${dishEdit._id}`, payload);
        toast.success("Dish updated successfully.");
      } else {
        await server.post("/category-dishes/create", payload);
        toast.success("Dish created successfully.");
      }

      onRefresh();
      onClose();
    } catch (err) {
      console.log("create dish error", err);
      toast.error(
        dishEdit ? "Failed to update dish." : "Failed to create dish.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = async () => {
    if (!dishEdit) return;

    if (!confirm("Are you sure you want to delete this dish")) return;
    setIsSubmitting(true);

    try {
      await server.delete(`/category-dishes/delete/${dishEdit._id}`);
      toast.success("Dish deleted successfully.");
      onRefresh();
      onClose();
    } catch (err) {
      console.log("delete dish errrorr:", err);
      toast.error("Failed to delete dish.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md relative shadow-xl space-y-4">
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-xl font-bold text-gray-800">
            {dishEdit ? "Dishes info" : "Add new Dish"}
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-black cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Dish Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">
              Dish name
            </label>
            <input
              type="text"
              name="dishName"
              value={formData.dishName}
              onChange={handleChange}
              placeholder="Dish name..."
              className="w-full border rounded-xl p-2.5 text-sm outline-none focus:ring-1 focus:ring-red-400"
            />
          </div>

          {/* Dish Category */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">
              Dish category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded-xl p-2.5 text-sm outline-none focus:ring-1 focus:ring-red-400 bg-white"
            >
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.categoryName}
                </option>
              ))}
            </select>
          </div>

          {/* Ingredients */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">
              Ingredients
            </label>
            <textarea
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              rows={3}
              placeholder="Ingredients..."
              className="w-full border rounded-xl p-2.5 text-sm outline-none focus:ring-1 focus:ring-red-400 resize-none"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">
              Price ($)
            </label>
            <input
              type="number"
              
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price..."
              className="w-full border rounded-xl p-2.5 text-sm outline-none focus:ring-1 focus:ring-red-400"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center pt-3 border-t">
            {dishEdit ? (
              <button
                type="button"
                onClick={handleDelete}
                disabled={isSubmitting}
                className="p-2.5 border border-red-200 text-red-500 rounded-xl hover:bg-red-50 transition"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            ) : (
              <div />
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-black text-white hover:bg-zinc-800 rounded-xl px-6 py-2.5"
            >
              {isSubmitting ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
