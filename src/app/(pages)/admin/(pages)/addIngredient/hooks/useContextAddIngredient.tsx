"use client";

import { useContext } from "react";
import { AddIngredientContext } from "../context/addIngredientContextProvider";

export const useAddIngredient = () => {
  const context = useContext(AddIngredientContext);

  if (!context) {
    throw new Error("useAddIngredient must be used within an AddIngredientContextProvider");
  }

  const { addIngredient, uploadImage } = context

    return { 
        addIngredient, 
        uploadImage, 
    };
};
