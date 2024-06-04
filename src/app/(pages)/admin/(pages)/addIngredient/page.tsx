"use client";

import { IngredientForm } from "./components/ingredientForm";
import ProtectedRoute from "../../protected-route";
import { Header } from "@/app/components/header/headerView";

export default function Component() {
  return (
    <ProtectedRoute role="administrador">
      <Header></Header>
      <div className="pr-20 pl-20 pt-10 pb-20 bg-white">
        <IngredientForm />
      </div>
    </ProtectedRoute>
  );
}
