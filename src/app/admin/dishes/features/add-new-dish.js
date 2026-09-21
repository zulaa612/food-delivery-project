"use client";

import { server } from "@/app/_api/api";
import { X, Trash2, Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const upload_preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

export default function AddDish({
  isOpen,
  onClose,
  dishEdit = null,
  categories = [],
  selectedCatId = null,
  onRefresh,
}) {
  const [prevProps, setPrevProps] = useState({
    isOpen,
    dishEdit,
    selectedCatId,
  });

  const [formData, setFormData] = useState({
    dishName: dishEdit?.dishName || "",
    category: dishEdit?.categoryId || selectedCatId || "",
    ingredients: dishEdit?.ingredients || "",
    price: dishEdit?.price || "",
    image: dishEdit?.image || "",
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const pickFile = (event) => {
    const image = event.target.files[0];
    console.log(image);
    setFile(image);

    setPreview(URL.createObjectURL(image));
  };

  const upload = async () => {
    const body = new FormData();
    body.append("file", file);
    body.append("upload_preset", upload_preset);

    const data = axios.post(
      `
      https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload
      `,
      body,
    );
    console.log(data);
  };
  if (
    prevProps.isOpen !== isOpen ||
    prevProps.dishEdit !== dishEdit ||
    prevProps.selectedCatId !== selectedCatId
  ) {
    setPrevProps({ isOpen, dishEdit, selectedCatId });
    if (isOpen) {
      setFormData({
        dishName: dishEdit?.dishName || "",
        category: dishEdit?.categoryId || selectedCatId || "",
        ingredients: dishEdit?.ingredients || "",
        price: dishEdit?.price || "",
        image: dishEdit?.image || "",
      });
      setFile(null);
    }
  }

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const currentCat = categories.find(
    (cat) => cat._id === (formData.category || selectedCatId),
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.dishName || !formData.price) {
      toast.error("Please provide required fields (name, price)");
      return;
    }

    setIsSubmitting(true);

    try {
      let imageUrl = formData.image;

      const payload = {
        dishName: formData.dishName,
        category: formData.category || selectedCatId,
        ingredients: formData.ingredients,
        price: Number(formData.price),
        image: imageUrl,
      };

      if (dishEdit) {
        await server.put(`/category-dishes/update/${dishEdit._id}`, payload);
        toast.success("Dish updated successfully.");
      } else {
        await server.post("/add-dish/create", payload);
        toast.success("Dish created successfully.");
      }

      onRefresh?.();
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

  const handleDelete = async () => {
    if (!dishEdit) return;

    if (!confirm("Are you sure you want to delete this dish?")) return;
    setIsSubmitting(true);

    try {
      await server.delete(`/category-dishes/delete/${dishEdit._id}`);
      toast.success("Dish deleted successfully.");
      onRefresh?.();
      onClose();
    } catch (err) {
      console.log("delete dish error:", err);
      toast.error("Failed to delete dish.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md relative shadow-xl space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center pb-2">
          <h2 className="text-lg font-bold text-black">
            {dishEdit
              ? "Edit Dish"
              : currentCat
                ? `Add new Dish to ${currentCat.categoryName}`
                : "Add new Dish"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-gray-400 bg-gray-100 rounded-full hover:text-black hover:bg-gray-200 cursor-pointer transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-black mb-1">
                Food name
              </label>
              <input
                type="text"
                name="dishName"
                value={formData.dishName}
                onChange={handleChange}
                placeholder="Type food name"
                className="w-full border border-gray-200 rounded-xl p-2.5 text-sm outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-black mb-1">
                Food price
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price..."
                className="w-full border border-gray-200 rounded-xl p-2.5 text-sm outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-black mb-1">
              Ingredients
            </label>
            <textarea
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              rows={3}
              placeholder="List ingredients..."
              className="w-full border border-gray-200 rounded-xl p-2.5 text-sm outline-none focus:ring-1 focus:ring-gray-400 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-black mb-1">
              Food image
            </label>
            <label className="relative border-2 border-dashed border-blue-100 bg-blue-50/40 rounded-xl p-2 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50/70 transition h-36 overflow-hidden">
              <input
                type="file"
                accept="image/*"
                onChange={pickFile}
                className="hidden"
              />
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="flex flex-col items-center justify-center py-4">
                  <button
                    type="button"
                    onClick={upload}
                    className="p-2 rounded-lg text-gray-500 mb-1"
                  >
                    <ImageIcon className="w-5 h-5 text-gray-400" />
                  </button>
                  <span className="text-xs font-medium text-gray-600 text-center">
                    {file ? file.name : "Choose a file or drag & drop it here"}
                  </span>
                </div>
              )}
            </label>
          </div>

          <div className="flex justify-between items-center pt-2">
            {dishEdit ? (
              <button
                type="button"
                onClick={handleDelete}
                disabled={isSubmitting}
                className="p-2.5 border border-red-200 text-red-500 rounded-xl hover:bg-red-50 transition cursor-pointer"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            ) : (
              <div />
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-black text-white  
              hover:bg-zinc-800 rounded-xl px-6 py-2.5 cursor-pointer text-sm font-medium"
            >
              {isSubmitting ? "Saving..." : dishEdit ? "Save dish" : "Add Dish"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
