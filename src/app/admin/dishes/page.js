"use client";

import { useState } from "react";
import Sidebar from "./features/category-sidebar";
import DishCategory from "./features/dish-form-dialog";

export default function Dishes() {
  return (
    <div className="flex bg-gray-200">
      <Sidebar />
      <DishCategory />
    </div>
  );
}
