"use client";

import Link from "next/link";
import { IngredientContextProvider } from "./context/ingredientContextProvider";
import { GridView } from "./components/gridView";
import { Header } from "@/app/components/header/headerView";
import ProtectedRoute from "../../protected-route";
import { AuthContextProvider } from "@/app/auth/context/contextProvider";
import { Footer } from "@/app/components/footer/footer";

export default function Component() {
  return (
    <ProtectedRoute role="administrador">
      <IngredientContextProvider>
        <Header />
        <div className="flex flex-col h-screen bg-white pl-20 pr-20">
          <GridView />
        </div>
        <Footer />
      </IngredientContextProvider>
    </ProtectedRoute>
  );
}
