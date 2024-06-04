"use client";

import { useContext } from "react";
import { DatabaseContext } from "@/app/context/databaseContext";

export const useAddIngredient = () => {
  const databaseContext = useContext(DatabaseContext);

  if (!databaseContext) {
    throw new Error("useAddIngredient must be used within an AddIngredientContextProvider");
  }

  const { ingredients, setIngredients, products, setProducts } = databaseContext

    return { 
      ingredients,
      setIngredients, 
      products,
      setProducts,
    }
};
