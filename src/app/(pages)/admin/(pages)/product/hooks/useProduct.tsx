"use client";

import Swal from "sweetalert2";
import { useProduct } from "./useContextProduct";
import { useState } from "react";

export const useForm = () => {
  const { products } = useProduct();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleButtonMore = () => {
    //acceder a la ventana de ese producto
  }

  return {
    searchTerm,
    setSearchTerm,
    filteredProducts,
    handleButtonMore,
  };
};
