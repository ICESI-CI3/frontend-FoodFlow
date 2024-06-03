"use client";

import React from "react";
import { useOrder } from "../hooks/useContextOrder";
import { useForm } from "../hooks/useOrder";

export const Orders = () => {
  const { sortedOrders } = useOrder();
  const { handleSort } = useForm();

  return (
    <div className="p-6">
      {sortedOrders.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">No hay órdenes creadas</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr>
              <th onClick={() => handleSort("tableNumber")} className="cursor-pointer">
                Número de mesa
              </th>
              <th onClick={() => handleSort("name")} className="cursor-pointer">
                Nombre de la orden
              </th>
              <th onClick={() => handleSort("price")} className="cursor-pointer">
                Precio
              </th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {sortedOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.tableNumber}</td>
                <td>{order.name}</td>
                <td>{order.price}</td>
                <td>{order.orderStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
