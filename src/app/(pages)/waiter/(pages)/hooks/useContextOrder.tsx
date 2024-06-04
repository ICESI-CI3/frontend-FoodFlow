"use client";

import { useContext } from "react";
import { DatabaseContext } from "@/app/context/databaseContext";

export const useOrder = () => {
    const databaseContext = useContext(DatabaseContext);

    if (!databaseContext) {
        throw new Error("useAddProduct must be used within an AddProductContextProvider");
    }

    const { orders, setOrders, products, setProducts, orderCreate, addToOrder, removeFromOrder } = databaseContext

    return {
        orders,
        setOrders,
        products,
        setProducts,
        orderCreate,
        addToOrder,
        removeFromOrder
    }
};