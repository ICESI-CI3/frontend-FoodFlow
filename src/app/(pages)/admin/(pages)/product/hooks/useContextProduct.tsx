"use client";

import { useContext } from "react";
import { DatabaseContext } from "@/app/context/databaseContext";

export const useProduct = () => {
  const productContext = useContext(DatabaseContext);

  if (!productContext) {
    throw new Error("useIngredient must be used within an IngredientContextProvider");
  }

  const { products, setProducts } = productContext

  return {
    products,
    setProducts,
  }
};
