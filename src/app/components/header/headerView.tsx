"use client";

import React from "react";
import { useForm } from "@/app/auth/hooks/useGeneralAuth";
import Link from "next/link";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "../dropdownmenu/dropdownmenu";
import { Button } from "../button/button";

export const Header = () => {
  const { handleSubmitLogout } = useForm();

  return (
    <header className="bg-gray-100 dark:bg-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
            <Link href="/admin/order" className="flex items-center gap-2" prefetch={false}>
                <Package2Icon className="w-6 h-6" />
            </Link>
            <nav className="flex items-center gap-4">
              <Link href="/admin/product" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" prefetch={false}>
                    Productos
              </Link>
              <Link href="/admin/ingredient" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" prefetch={false}>
                    Ingredientes
              </Link>
              <Link href="/admin/report" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" prefetch={false}>
                  Reportes
              </Link>
            </nav>
        </div>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <img src="/profile.svg" width="32" height="32" className="rounded-full" alt="Avatar" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem>Mi perfil</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500" onClick={handleSubmitLogout}>Cerrar sesión</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </header>
  );
};

function Package2Icon(props: any) {
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
        <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
        <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
        <path d="M12 3v6" />
      </svg>
    );
}