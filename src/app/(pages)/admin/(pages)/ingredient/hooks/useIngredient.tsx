"use client";

import Swal from "sweetalert2";
import { useIngredient } from "./useContextIngredient";
import { useState } from "react";

export const useForm = () => {
  const { ingredients } = useIngredient();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredIngredients = ingredients.filter((ingredient) =>
    ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleButtonMore = () => {
    //acceder a la ventana de ese producto
  }

  return {
    searchTerm,
    setSearchTerm,
    filteredIngredients,
    handleButtonMore,
  };
};
