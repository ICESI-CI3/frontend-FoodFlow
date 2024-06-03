"use client";

import { useState, useEffect, ReactNode, createContext } from "react";
import { db, auth } from "../../../../../../../services/firebaseConfig";
import { collection, onSnapshot, query } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Order } from "@/app/interface/order";

interface OrderContextProps {
  order: Order | null;
  filteredOrders: Order[];
  sortedOrders: Order[];
  setSortColumn: (column: string) => void;
  setSortDirection: (direction: string) => void;
  setStatusFilter: (status: string) => void;
}

export const OrderContext = createContext<OrderContextProps | undefined>(undefined);

interface OrderContextProviderProps {
  children: ReactNode;
}

export const OrderContextProvider = ({ children }: OrderContextProviderProps) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("table");
  const [sortDirection, setSortDirection] = useState("asc");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setOrder(user as unknown as Order);
    });
    return () => unsubscribe();
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

  return (
    <OrderContext.Provider value={{ order, filteredOrders, sortedOrders, setSortColumn, setSortDirection, setStatusFilter }}>
      {children}
    </OrderContext.Provider>
  );
};
