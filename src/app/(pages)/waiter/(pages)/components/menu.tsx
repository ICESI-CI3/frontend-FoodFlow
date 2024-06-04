"use client"

import { Input } from "@/app/components/input/input";
import Link from "next/link";;
import { useForm } from "../hooks/useOrder";

export const MenuView = () => {
    const { searchTerm, setSearchTerm, filteredProducts } = useForm();

  return (
    <section className="w-full h-screen">
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl text-gray-800 font-bold tracking-tight">Productos</h2>
          <Link href="/waiter/createOrder" className="inline-flex h-9 items-center justify-center rounded-md bg-[#F7511E] px-4 py-2 text-sm font-medium text-white-50 shadow transition-colors hover:bg-[#F7511E]/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-[#F7511E] dark:text-white-900 dark:hover:bg-[#F7511E]/80 dark:focus-visible:ring-gray-300">
            Crear Orden
          </Link>
        </div>
        <div className="relative">
          <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-500 dark:text-gray-500" />
          <Input
            type="search"
            placeholder="Buscar productos..."
            className="w-full pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-200 text-gray-800 shadow-xl border-2 border-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-8">No hay productos creados</p>
        ) : (
          <div className="grid gap-6 md:gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="rounded-lg overflow-hidden dark:bg-white shadow-xl">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={300}
                  height={200}
                  className="object-cover rounded-lg overflow-hidden w-full aspect-[3/2]"
                />
                <div className="p-4 flex flex-col gap-2">
                  <h3 className="font-semibold text-lg text-[#F7511E]">Nombre: {product.name}</h3>
                  <div className="text-sm font-semibold text-gray-700">Precio: {product.price}</div>
                  <div className="text-sm font-semibold text-gray-700">Categoría: {product.category}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function SearchIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    );
  }