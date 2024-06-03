"use client";

import { useState, useEffect, ReactNode, createContext } from "react";
import { auth, db, storage } from "../../../../../../../services/firebaseConfig"; // Asegúrate de tener configurado Firebase correctamente
import { collection, onSnapshot, query } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { Product } from "@/app/interface/product";

interface ProductContextProps {
  products: Product[];
  setProducts: (products: Product[]) => void;
}

export const ProductContext = createContext<ProductContextProps | undefined>(undefined);

interface ProductContextProviderProps {
  children: ReactNode;
}

export const ProductContextProvider = ({ children }: ProductContextProviderProps) => {
  const [products, setProducts] = useState<Product[]>([]);

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
        products.sort((a, b) => a.name.localeCompare(b.name));
        setProducts(productsData);
      });
      return () => unsubscribe();
    };
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
