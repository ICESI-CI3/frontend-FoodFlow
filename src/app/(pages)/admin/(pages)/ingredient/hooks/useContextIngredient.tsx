"use client";

import { useContext } from "react";
import { IngredientContext } from "../context/ingredientContextProvider";

export const useIngredient = () => {
  const ingredientContext = useContext(IngredientContext);

  if (!ingredientContext) {
    throw new Error("useIngredient must be used within an IngredientContextProvider");
  }

  const { ingredients, setIngredients } = ingredientContext

  return {
    ingredients,
    setIngredients,
  }
};
