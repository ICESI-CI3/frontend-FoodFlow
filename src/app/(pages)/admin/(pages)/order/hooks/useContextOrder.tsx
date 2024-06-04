"use client";

import { useContext } from "react";
import { DatabaseContext } from "@/app/context/databaseContext";

export const useOrder = () => {
  const orderContext = useContext(DatabaseContext);

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
