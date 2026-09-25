"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { server } from "@/app/_api/api";

const CategoryContext = createContext(null);

export function CategoryProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchCategories = async () => {
      try {
        const [catRes, dishRes] = await Promise.all([
          server.get("/food-category/get"),
          server.get("/add-dish/get"),
        ]);

        if (isMounted) {
          setCategories(catRes?.data?.FoodCategories || []);
          setDishes(dishRes?.data.CategoryDish || []);
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

  return (
    <CategoryContext.Provider
      value={{ categories, dishes, loading, fetchCategories }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategory() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth in AuthProvider");
  return context;
}
