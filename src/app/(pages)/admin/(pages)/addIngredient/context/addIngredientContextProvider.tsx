"use client";

import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from "react";
import { collection, addDoc, query, where, getDocs, DocumentReference, DocumentData, onSnapshot } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../../../../../../services/firebaseConfig"; // Asegúrate de tener la configuración correcta de Firebase
import { Ingredient } from "@/app/interface/ingredient";
import Swal from "sweetalert2";

interface AddIngredientContextProps {
  addIngredient: (ingredient: Ingredient) => Promise<DocumentReference<DocumentData> | undefined>;
  uploadImage: (file: File) => Promise<string>;
}

export const AddIngredientContext = createContext<AddIngredientContextProps | undefined>(undefined);

interface AddIngredientContextProviderProps {
  children: ReactNode;
}

export const AddIngredientContextProvider = ({ children }: AddIngredientContextProviderProps) => {
  /*const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      const q = query(collection(db, "ingredients"));
      const unsubscribe = onSnapshot(q, async (querySnapshot) => {
        const ingredientsData: Ingredient[] = [];
        for (const doc of querySnapshot.docs) {
          const ingredient = doc.data() as Ingredient;
          if (ingredient.image) {
            const imageRef = ref(storage, ingredient.image);
            ingredient.image = await getDownloadURL(imageRef);
          }
          ingredientsData.push(ingredient);
        }
        setIngredients(ingredientsData);
      });
      return () => unsubscribe();
    };
    fetchIngredients();
  }, []);*/

  const addIngredient = async (ingredient: Ingredient) => {
    try {
      
      /*const q = query(collection(db, "ingredients"), where("name", "==", ingredient.name));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot) {
        Swal.fire({
          title: "Error",
          text: "El nombre del ingrediente ya existe",
          icon: "error",
          timer: 3000,
      })
        return;
      }*/

      const docRef = await addDoc(collection(db, "ingredients"), ingredient);
      Swal.fire({
        title: "Éxito",
        text: "Ingrediente creado correctamente",
        icon: "success",
        timer: 3000,
    })
      return docRef;
    } catch (e) {
      Swal.fire({
        title: "Error",
        text: "No se ha podido crear el producto",
        icon: "error",
        timer: 3000,
    })
    }
  };

  const uploadImage = async (file: File) => {
    const storageRef = ref(storage, file.name);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  return (
    <AddIngredientContext.Provider value={{ addIngredient, uploadImage }}>
      {children}
    </AddIngredientContext.Provider>
  );
};
