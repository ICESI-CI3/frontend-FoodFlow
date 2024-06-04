"use client";

import React from "react";
import { useOrders } from "../hooks/useOrder";
import { Label } from "@/app/components/label/label";
import Link from "next/link";

export const Orders = () => {
  const { orders } = useOrders()

  return (
    <div className="grid gap-4">
      {orders.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-8">No hay órdenes creados</p>
      ) : (
        <div className="space-y-2">
          <h2 className="text-2xl text-gray-800 font-bold tracking-tight">Órdenes</h2>
          <div className="grid gap-4 max-h-[800px] overflow-auto">
            {orders.map((order) => (
              <div key={order.name} className="flex items-center justify-between p-4 border rounded-lg max-h-[80px]">
                <div className="w-10 h-10">
                  <DeliveryIcon className="bg-[#F7511E]"></DeliveryIcon>
                </div>
                <div className="flex flex-col flex-grow pl-4 pr-20 w-1/2">
                  <span className="font-semibold text-gray-700">Nombre: {order.name}</span>
                  <span className="text-gray-700">Estado: {order.orderStatus}</span>
                </div>
                <div className="flex flex-col flex-grow justify-end pl-4 pr-20 w-1/3">
                  <span className="text-gray-700">Número de mesa: {order.tableNumber as unknown as string}</span>
                  <span className="text-gray-700">Precio: {order.price as unknown as string}</span>
                </div>
                <div className="flex flex-col flex-grow justify-end pl-4 pr-20 w-1/3">
                  <Link href="#" className="text-[#F7511E]">Ver más</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

function DeliveryIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="#f7511e" d="M624 352h-16V243.9c0-12.7-5.1-24.9-14.1-33.9L494 110.1c-9-9-21.2-14.1-33.9-14.1H416V48c0-26.5-21.5-48-48-48H112C85.5 0 64 21.5 64 48v48H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h272c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H40c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h208c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h208c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H64v128c0 53 43 96 96 96s96-43 96-96h128c0 53 43 96 96 96s96-43 96-96h48c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zM160 464c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm320 0c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm80-208H416V144h44.1l99.9 99.9V256z"/></svg>
  )
}