"use client";

import { useContext } from "react";
import { DatabaseContext } from "@/app/context/databaseContext";

export const useOrders = () => {
  const databaseContext = useContext(DatabaseContext);

  if (!databaseContext) {
    throw new Error("useAddProduct must be used within an AddProductContextProvider");
  }

  const { ingredients, setIngredients, products, setProducts, orders } = databaseContext

    return { 
      ingredients,
      setIngredients, 
      products,
      setProducts,
      orders,
    }
};