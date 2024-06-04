"use client";

import { Label } from "@/app/components/label/label";
import { Input } from "@/app/components/input/input";
import { Textarea } from "@/app/components/textarea/textarea";
import { SelectTrigger, SelectValue, SelectContent, SelectItem, Select } from "@/app/components/select/select";
import { useForm } from "../hooks/useAddProduct";
import { MenuSeparator } from "@headlessui/react";
import { Button } from "@/app/components/button/button";
import { useAddProduct } from "../hooks/useContextAddProduct";
import { Checkbox } from "@/app/components/checkbox/checkbox";

export const ProductForm = () => {
  const { handleSubmit, handleImageChange, imageURL, handleIngredientChange, selectedIngredients } = useForm();
  const { ingredients } = useAddProduct();

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
      <div className="grid gap-4">
        <form onSubmit={handleSubmit} className="grid gap-4 md:gap-8">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre</Label>
            <Input id="name" name="name" placeholder="Ingresa el nombre del producto" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Categoría</Label>
            <Select id="category" name="category" className="bg-white border border-gray-300 rounded-lg p-2 w-full text-black">
              <option value="" disabled selected>Seleccione una categoría</option>
              <option value="Bebidas">Bebidas</option>
              <option value="Entradas">Entradas</option>
              <option value="Platos Fuertes">Platos Fuertes</option>
              <option value="Postres">Postres</option>
            </Select>
          </div>
          <div className="">
            <Label htmlFor="description">Descripción</Label>
            <MenuSeparator className="h-2"></MenuSeparator>
            <Textarea id="description" name="description" placeholder="Ingresa la descripción del producto" maxLength={200} className="resize-none h-24 text-gray-700" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Precio</Label>
            <Input id="price" placeholder="Ingresa el precio del producto" name="price" type="number" min="0" step="0.01" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Imagen</Label>
            <div className="flex justify-center items-center">
              {imageURL ? (
                <img src={imageURL} alt="Imagen del producto" className="mt-2" height={300} width={300} />
              ) : (
                <div className="w-full h-40 flex items-center justify-center border border-gray-300 text-gray-500 mt-2">
                  No se ha cargado ninguna imagen
                </div>
              )}
            </div>
            <Input type="file" id="image" onChange={(e) => handleImageChange(e)} />
          </div>
          < Button type="submit" className="justify-self-end w-50" >
            Crear Producto
          </Button >
        </form>
      </div>
      <div className="grid gap-4">
        {ingredients.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-8">No hay ingredientes creados</p>
        ) : (
          <div className="space-y-2">
            <Label htmlFor="ingredients">Ingredientes</Label>
            <div className="grid gap-4 max-h-[600px] overflow-auto">
              {ingredients.map((ingredient) => (
                <div key={ingredient.name} className="flex items-center justify-between p-4 border rounded-lg max-h-[80px]">
                  <img src={ingredient.image || "/placeholder.svg"} alt={ingredient.name} width={60} height={60} className="rounded" />
                  <div className="flex flex-col flex-grow pl-4 pr-20">
                    <span className="font-semibold text-gray-700">{ingredient.name}</span>
                    <span className="text-gray-700">{ingredient.quantity} unidades</span>
                  </div>
                  <div className="flex items-center pr-5">
                    <Checkbox
                      id={`ingredient-${ingredient.id}`}
                      checked={selectedIngredients.some((item) => item.id === ingredient.id)}
                      onChange={() => handleIngredientChange(ingredient)}
                      className="ml-4 pr-20"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>

  );
};
