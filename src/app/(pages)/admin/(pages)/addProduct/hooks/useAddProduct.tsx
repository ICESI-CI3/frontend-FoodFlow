"use client";

import { FormEvent, useState } from "react";
import { useAddProduct } from "./useContextAddProduct";
import { Product } from "@/app/interface/product";
import { Ingredient } from "@/app/interface/ingredient";
import { useRouter } from "next/navigation";
import { v4 as UUID } from "uuid";
import Swal from "sweetalert2";

export const useForm = () => {
  const { addProduct, uploadImage } = useAddProduct();
  const [searchTerm, setSearchTerm] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
  const router = useRouter();

  /*const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleImageRemove = () => {
    setImageFile(null);
    setImageURL(null);
  };*/

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    Swal.fire({
      title: "¿Quieres guardar los cambios?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
        return;
      }
    });


    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const category = (form.elements.namedItem("category") as HTMLInputElement).value;
    const description = (form.elements.namedItem("description") as HTMLInputElement).value;
    const price = new Int32Array([parseInt((form.elements.namedItem("price") as HTMLInputElement).value, 10)]);
    const imageFile = (form.elements.namedItem("image") as HTMLInputElement).files?.[0];
    const id = UUID()

    if (!name) {
        Swal.fire({
            title: "Error",
            text: "El nombre es requerido",
            icon: "error",
            timer: 3000,
        })
      return;
    }

    let imageUrl = "";
    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
    }

    const product: Product = {
        id, 
        name,
        category,
        description,
        price,
        ingredients: selectedIngredients,
        image: imageUrl,
    };

    const docRef = await addProduct(product);
    if (docRef) {
      setTimeout(() => {
        router.push("/admin/product");
      }, 2000);
    }
  };

  return {
    /*searchTerm,
    setSearchTerm,
    handleImageChange,
    handleImageRemove,*/
    imageURL,
    handleSubmit,
    selectedIngredients,
    setSelectedIngredients,
  };
};