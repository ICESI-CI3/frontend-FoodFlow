"use client";

import { useState, useEffect, ReactNode, createContext, Dispatch, SetStateAction } from "react";
import { auth, db, storage } from "../../../services/firebaseConfig"; // Asegúrate de tener configurado Firebase correctamente
import { collection, onSnapshot, query } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { Product } from "@/app/interface/product";
import { Order } from "../interface/order";
import { Ingredient } from "../interface/ingredient";

interface OrderItem extends Product {
  quantity: number;
}

interface DatabaseContextProps {
  products: Product[];
  setProducts: (products: Product[]) => void;

  order: Order | null;
  filteredOrders: Order[];
  sortedOrders: Order[];

  orders: Order[]
  setOrders: (orders: Order[]) => void

  setSortColumn: (column: string) => void;
  setSortDirection: (direction: string) => void;
  setStatusFilter: (status: string) => void;

  orderCreate: OrderItem[];
  addToOrder: (product: Product) => void;
  removeFromOrder: (product: Product) => void;

  ingredients: Ingredient[];
  setIngredients: (ingredients: Ingredient[]) => void;
}

export const DatabaseContext = createContext<DatabaseContextProps | undefined>(undefined);

interface DatabaseContextProviderProps {
  children: ReactNode;
}

export const DatabaseContextProvider = ({ children }: DatabaseContextProviderProps) => {
  const [products, setProducts] = useState<Product[]>([]);

  const [order, setOrder] = useState<Order | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("table");
  const [sortDirection, setSortDirection] = useState("asc");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [orders, setOrders] = useState<Order[]>([]);

  const [orderCreate, setOrderCreate] = useState<OrderItem[]>([]);

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

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



  useEffect(() => {
    const getOrders = () => {
      const q = query(collection(db, "orders"));
      onSnapshot(q, (querySnapshot) => {
        const orders: Order[] = [];
        querySnapshot.forEach((doc) => {
          orders.push(doc.data() as Order);
        });
        setOrders(orders);
      });
    };
    getOrders();
  }, []);

  const filteredOrders = orders.filter((order: Order) => {
    if (statusFilter === "Todos") {
      return (
        order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.tableNumber.toString().includes(searchTerm) ||
        order.price.toString().includes(searchTerm)
      );
    } else {
      return (
        order.orderStatus.toLowerCase() === statusFilter &&
        (order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.tableNumber.toString().includes(searchTerm) ||
          order.price.toString().includes(searchTerm))
      );
    }
  });

  const sortedOrders = filteredOrders.sort((a: any, b: any) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const addToOrder = (product: Product) => {
    setOrderCreate((prevOrder) => {
      const existingItem = prevOrder.find((item) => item.id === product.id);
      if (existingItem) {
        return prevOrder.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevOrder, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromOrder = (product: Product) => {
    setOrderCreate((prevOrder) => {
      const existingItem = prevOrder.find((item) => item.id === product.id);
      if (existingItem && existingItem.quantity > 1) {
        return prevOrder.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        return prevOrder.filter((item) => item.id !== product.id);
      }
    });
  };



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
    <DatabaseContext.Provider value={{ products, setProducts, order, filteredOrders, sortedOrders, orders, setOrders, setSortColumn, setSortDirection, setStatusFilter, orderCreate, addToOrder, removeFromOrder, ingredients, setIngredients }}>
      {children}
    </DatabaseContext.Provider>
  );
};
