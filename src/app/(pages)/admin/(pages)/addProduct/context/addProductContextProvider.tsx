"use client";

import { useState, ReactNode, createContext, useEffect } from "react";
import { db, storage } from "../../../../../../../services/firebaseConfig";
import { collection, addDoc, getDocs, query, where, DocumentReference, DocumentData, onSnapshot } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Product } from "@/app/interface/product";
import Swal from "sweetalert2";
import { error } from "console";

interface AddProductContextProps {
    addProduct: (product: Product) => Promise<DocumentReference<DocumentData> | undefined>;
    uploadImage: (file: File) => Promise<string>;
}

export const AddProductContext = createContext<AddProductContextProps | undefined>(undefined);

interface AddProductContextProviderProps {
  children: ReactNode;
}

export const AddProductContextProvider = ({ children }: AddProductContextProviderProps) => {
  /*const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const q = query(collection(db, "products"));
      const unsubscribe = onSnapshot(q, async (querySnapshot) => {
        const productsData: Product[] = [];
        for (const doc of querySnapshot.docs) {
          const product = doc.data() as Product;
          if (product.image) {
            const imageRef = ref(storage, product.image);
            product.image = await getDownloadURL(imageRef);
          }
          productsData.push(product);
        }
        setProducts(productsData);
      });
      return () => unsubscribe();
    };
    fetchProducts();
  }, []);*/

  const addProduct = async (product: Product) => {
    try {

      //const productRepeat = products.some((i) => i.name === product.name)
      const q = query(collection(db, "products"), where("name", "==", product.name));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot) {
        Swal.fire({
          title: "Error",
          text: "El nombre del producto ya existe",
          icon: "error",
          timer: 3000,
      })
        return;
      }

      const docRef = await addDoc(collection(db, "products"), product);
      Swal.fire({
        title: "Éxito",
        text: "Producto creado correctamente",
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
    <AddProductContext.Provider value={{ addProduct, uploadImage }}>
      {children}
    </AddProductContext.Provider>
  );
};
