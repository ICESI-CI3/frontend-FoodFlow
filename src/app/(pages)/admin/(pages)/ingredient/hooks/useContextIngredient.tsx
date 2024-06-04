"use client";

import { useContext } from "react";
import { DatabaseContext } from "@/app/context/databaseContext";

export const useIngredient = () => {
  const ingredientContext = useContext(DatabaseContext);

  if (!ingredientContext) {
    throw new Error("useIngredient must be used within an IngredientContextProvider");
  }

  const { ingredients, setIngredients } = ingredientContext

  return {
    ingredients,
    setIngredients,
  }
};
