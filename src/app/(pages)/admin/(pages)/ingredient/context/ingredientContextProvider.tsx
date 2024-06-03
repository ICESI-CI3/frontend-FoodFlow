"use client";

import { useState, useEffect, ReactNode, createContext } from "react";
import { auth, db, storage } from "../../../../../../../services/firebaseConfig"; // Asegúrate de tener configurado Firebase correctamente
import { collection, onSnapshot, query } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { Ingredient } from "@/app/interface/ingredient";
import { signOut } from "firebase/auth";

interface IngredientContextProps {
  ingredients: Ingredient[];
  setIngredients: (ingredients: Ingredient[]) => void;
}

export const IngredientContext = createContext<IngredientContextProps | undefined>(undefined);

interface IngredientContextProviderProps {
  children: ReactNode;
}

export const IngredientContextProvider = ({ children }: IngredientContextProviderProps) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

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
        ingredientsData.sort((a, b) => a.name.localeCompare(b.name));
        setIngredients(ingredientsData);
      });
      return () => unsubscribe();
    };
    fetchIngredients();
  }, []);

  return (
    <IngredientContext.Provider value={{ ingredients, setIngredients }}>
      {children}
    </IngredientContext.Provider>
  );
};
