"use client";

import { FormEvent, useState } from "react";
import { useAddProduct } from "./useContextAddProduct";
import { Product } from "@/app/interface/product";
import { Ingredient } from "@/app/interface/ingredient";
import { useRouter } from "next/navigation";
import { v4 as UUID } from "uuid";
import Swal from "sweetalert2";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../../../../../../services/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

export const useForm = () => {
  const { products } = useAddProduct();
  const [searchTerm, setSearchTerm] = useState("");
  const [imageFile, setImageFile] = useState<File>();
  const [imageURL, setImageURL] = useState<string | null>(null);

  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageURL(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileUpload = async (file: any) => {
    const storageRef = ref(storage, file.name);

      try {
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        setImageURL(downloadURL)
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "El archivo no se ha podido guardar",
          icon: "error",
          timer: 2000,
          position: "bottom-end",
          showConfirmButton: false,
        })
      }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const name = form.name.value as string;
    const category = form.category.value as string;
    const description = form.description.value as string;
    const price = form.price.value as string;
    const id = UUID()

    handleFileUpload(imageFile)

    if (name == null || category == null || description == null || price == null || imageFile == null) {
      Swal.fire({
        title: "Error",
        text: "Todos los campos son requeridos",
        icon: "error",
        timer: 2000,
      })
      return;
    }

    if (products.some((i) => i.name === name)) {
      Swal.fire({
        title: "Error",
        text: "Ya existe un producto con este nombre",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      })
      return;
    }

    const product: Product = {
        id, 
        name,
        category,
        description,
        price,
        ingredients: selectedIngredients,
        image: imageFile.name as string,
    };
 
    try {
      const docRef = await addDoc(collection(db, "products"), product);
      Swal.fire({
        title: "Éxito",
        text: "Producto creado correctamente",
        icon: "success",
        timer: 3000,
      })
      if (docRef) {
        router.push("/admin/product");
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "No se ha podido crear el producto",
        icon: "error",
        timer: 2000,
      })
    }
  };

  const handleIngredientChange = (ingredient: Ingredient) => {
    setSelectedIngredients((prevSelected) => {
      if (prevSelected.some((item) => item.id === ingredient.id)) {
        return prevSelected.filter((item) => item.id !== ingredient.id);
      } else {
        return [...prevSelected, ingredient];
      }
    });
  };

  return {
    searchTerm,
    setSearchTerm,
    handleImageChange,
    imageURL,
    handleSubmit,
    selectedIngredients,
    setSelectedIngredients,
    handleIngredientChange,
  };
};