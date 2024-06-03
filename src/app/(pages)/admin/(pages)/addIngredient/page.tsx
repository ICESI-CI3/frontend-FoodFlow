"use client";

import { AddIngredientContextProvider } from "./context/addIngredientContextProvider";
import { ImageForm } from "./components/imageForm";
import { IngredientForm } from "./components/ingredientForm";
import ProtectedRoute from "../../protected-route";

export default function Component() {
  return (
    <ProtectedRoute role="administrador">
      <AddIngredientContextProvider>
        <div className="bg-white h-screen">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
            <div className="grid gap-4 md:gap-8">
              <IngredientForm />
              <ImageForm />
            </div>
          </div>
        </div>
      </AddIngredientContextProvider>
    </ProtectedRoute>
  );
}
