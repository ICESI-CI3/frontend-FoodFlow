"use client";

import { useOrder } from "./useContextOrder";

export const useForm = () => {
  const { setSortColumn, setSortDirection, setStatusFilter } = useOrder();

  const handleSort = (column: string) => {
    setSortColumn((prevColumn: string) => {
      if (prevColumn === column) {
        setSortDirection((prevDirection: string) => (prevDirection === "asc" ? "desc" : "asc"));
      } else {
        setSortColumn(column);
        setSortDirection("asc");
      }
      return column;
    });
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
  };

  return {
    handleSort,
    handleStatusFilter,
  };
};
