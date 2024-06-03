"use client";

import { useContext } from "react";
import { AddProductContext } from "../context/addProductContextProvider";

export const useAddProduct = () => {
  const context = useContext(AddProductContext);

  if (!context) {
    throw new Error("useAddIngredient must be used within an AddIngredientContextProvider");
  }

  const { addProduct, uploadImage } = context

    return { 
        addProduct, 
        uploadImage,
    }
};