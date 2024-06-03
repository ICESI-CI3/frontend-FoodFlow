"use client";

import { Checkbox } from "@/app/components/checkbox/checkbox";
import { useIngredient } from "@/app/(pages)/admin/(pages)/ingredient/hooks/useContextIngredient";

export const ListIngredientView = () => {
  const { ingredients } = useIngredient();

  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 max-h-[200px] overflow-auto">
      {ingredients.map((ingredient) => (
        <div key={ingredient.id} className="flex items-center">
          <Checkbox id={`ingredient-${ingredient.id}`} />
          <div className="flex items-center gap-2">
            <img src={ingredient.image || "/placeholder.svg"} alt={ingredient.name} width={32} height={32} className="rounded-full" />
            <span>{ingredient.name}</span>
          </div>
          <span>{ingredient.quantity[0]} unidades</span>
        </div>
      ))}
    </div>
  );
};
