"use client";

import { useContext } from "react";
import { ProductContext } from "../context/productContextProvider";

export const useProduct = () => {
  const productContext = useContext(ProductContext);

  if (!productContext) {
    throw new Error("useIngredient must be used within an IngredientContextProvider");
  }

  const { products, setProducts } = productContext

  return {
    products,
    setProducts,
  }
};
