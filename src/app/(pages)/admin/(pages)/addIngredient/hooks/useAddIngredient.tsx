"use client"

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useAddIngredient } from "./useContextAddIngredient";
import { Ingredient } from "@/app/interface/ingredient";
import { v4 as UUID } from "uuid";
import Swal from "sweetalert2";

export const useForm = () => {
  const { addIngredient, uploadImage } = useAddIngredient();
  const router = useRouter();
  const [imageURL, setImageURL] = useState<string | null>(null);

  /*const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setImageURL(URL.createObjectURL(file));
    } else {
      setImageURL(null);
    }
  };

  const handleImageRemove = () => {
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
    const unitMeasurement = (form.elements.namedItem("unit") as HTMLInputElement).value;
    const quantity = new Int32Array([parseInt((form.elements.namedItem("quantity") as HTMLInputElement).value, 10)]);
    const dangetQuantity = new Int32Array([parseInt((form.elements.namedItem("minQuantity") as HTMLInputElement).value, 10)]);
    const purchasePrice = new Int32Array([parseInt((form.elements.namedItem("purchasePrice") as HTMLInputElement).value, 10)]);
    const salePrice = new Int32Array([parseInt((form.elements.namedItem("salePrice") as HTMLInputElement).value, 10)]);
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

    const ingredient: Ingredient = {
        id, 
        name,
        category,
        unitMeasurement,
        quantity,
        dangetQuantity,
        purchasePrice,
        salePrice,
        image: imageUrl,
    };

    const docRef = await addIngredient(ingredient);
    if (docRef) {
      setTimeout(() => {
        router.push("/admin/ingredient");
      }, 2000);
    }
  };

  return {
    /*handleImageChange,
    handleImageRemove,*/
    handleSubmit,
    imageURL,
    setImageURL,
  };
};
