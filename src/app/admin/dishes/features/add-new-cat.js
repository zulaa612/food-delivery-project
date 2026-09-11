"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { server } from "@/app/_api/api";
import { X, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Check } from "lucide-react";
import { Trash } from "lucide-react";

export default function AddNewCat({ fetchCategories }) {
  const [addNewCategory, setAddNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddNewCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    try {
      const response = await server.post("/food-category/create", {
        categoryName: newCategoryName,
      });
      setNewCategoryName("");
      setAddNewCategory(false);

      if (fetchCategories) {
        await fetchCategories();
      }

      toast.custom(() => (
        <div className="flex items-center gap-2 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg text-sm font-medium border border-gray-800">
          <Check className="w-4 h-4 text-white" />
          <span>New Category is being added to the menu</span>
        </div>
      ));
    } catch (err) {
      console.log("error:", err);
    }
  };

  return (
    <div>
      <Button
        onClick={() => setAddNewCategory(true)}
        className="px-2 py-2 rounded-full bg-red-500 hover:bg-red-900 cursor-pointer"
      >
        <Plus />
      </Button>
      {addNewCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black-50 ">
          <div className="bg-white rounded-2xl w-115 h-68 shadow-xl border border-gray-300 relative flex flex-col items-center gap-6">
            <div className="w-103 h-13 flex justify-between">
              <span className="mt-7 font-semibold text-lg">
                Add new category
              </span>
              <Button
                onClick={() => setAddNewCategory(false)}
                className="w-9 h-9 bg-gray-100 rounded-full mt-6 cursor pointer"
              >
                <X />
              </Button>
            </div>
            <form onSubmit={handleAddNewCategory}>
              <div className="mt-6">
                <span>Category name</span>

                <InputGroup className="w-103 h-9.5 border-gray-400 mt-2">
                  <InputGroupInput
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="text-gray-400"
                    placeholder="Type category name..."
                  />

                  <InputGroupAddon></InputGroupAddon>
                </InputGroup>
              </div>

              <Button
                type="submit"
                className="w-30.75 h-10 bg-black mt-6 ml-72.25 text-white cursor-pointer"
                required
              >
                {isSubmitting ? "Adding..." : "Add category"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
