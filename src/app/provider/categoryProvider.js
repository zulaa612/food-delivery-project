"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { server } from "@/app/_api/api";

const CategoryContext = createContext(null);

export function CategoryProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dishes, setDishes] = useState([]);

  const fetchCategories = useCallback(async () => {
    try {
      const [catRes, dishRes] = await Promise.all([
        server.get("/food-category/get"),
        server.get("/add-dish/get"),
      ]);

      setCategories(catRes?.data?.FoodCategories || []);
      setDishes(dishRes?.data?.CategoryDish || []);
    } catch (err) {
      console.log("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCategories();
  }, [fetchCategories]);

  return (
    <CategoryContext.Provider
      value={{ categories, dishes, loading, fetchCategories }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategory() {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useAuth in AuthProvider");
  }
  return context;
}
