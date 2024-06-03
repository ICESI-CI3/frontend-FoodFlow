"use client";

import { useContext } from "react";
import { OrderContext } from "../context/orderContextProvider";

export const useOrder = () => {
  const orderContext = useContext(OrderContext);

  if (!orderContext) {
    throw new Error("useOrder must be used within a OrderContextProvider");
  }

  const { order, filteredOrders, sortedOrders, setSortColumn, setSortDirection, setStatusFilter } = orderContext;

  return {
    order,
    filteredOrders,
    sortedOrders,
    setSortColumn,
    setSortDirection,
    setStatusFilter,
  };
};
