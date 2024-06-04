"use client"

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Ingredient } from "@/app/interface/ingredient";
import { v4 as UUID } from "uuid";
import Swal from "sweetalert2";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, db } from "../../../../../../../services/firebaseConfig";
import { useAddIngredient } from "./useContextAddIngredient";

export const useForm = () => {
  const { ingredients } = useAddIngredient();
  const [searchTerm, setSearchTerm] = useState("");
  const [imageFile, setImageFile] = useState<File>();
  const [imageURL, setImageURL] = useState<string>();
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
    const unitMeasurement = form.unit.value as string;
    const quantity = form.quantity.value as string;
    const dangetQuantity = form.minQuantity.value as string;
    const purchasePrice = form.purchasePrice.value as string;
    const salePrice = form.salePrice.value as string;
    const status = "activo"
    const id = UUID()

    console.log(imageFile)

    await handleFileUpload(imageFile)

    if (name == null || category == null || unitMeasurement == null || quantity == null || dangetQuantity == null || purchasePrice == null || salePrice == null || imageFile == null) {
      Swal.fire({
        title: "Error",
        text: "Todos los campos son requeridos",
        icon: "error",
        timer: 3000,
      })
      return;
    }

    if (ingredients.some((i) => i.name === name)) {
      Swal.fire({
        title: "Error",
        text: "Ya existe un ingrediente con este nombre",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      })
      return;
    }

    const ingredient: Ingredient = {
      id,
      name,
      category,
      unitMeasurement,
      quantity,
      dangetQuantity,
      purchasePrice,
      salePrice,
      status,
      image: imageFile.name as string,
    };

    try {
      const docRef = await addDoc(collection(db, "ingredients"), ingredient);
      Swal.fire({
        title: "Éxito",
        text: "Ingrediente creado correctamente",
        icon: "success",
        timer: 3000,
      })
      if (docRef) {
        router.push("/admin/ingredient");
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "No se ha podido crear el ingrediente",
        icon: "error",
        timer: 2000,
      })
    }
  };


  return {
    searchTerm,
    setSearchTerm,
    handleImageChange,
    imageURL,
    handleSubmit,
    selectedIngredients,
    setSelectedIngredients,
  };
};