"use client"

import { useState } from "react";
import { useForm } from "../hooks/useAddIngredient";
import { Label } from "@/app/components/label/label";
import { Input } from "@/app/components/input/input";
import { SelectTrigger, SelectValue, SelectContent, SelectItem, Select } from "@/app/components/select/select";
import { Button } from "@/app/components/button/button";

export const IngredientForm = () => {
  const { handleSubmit, handleImageChange, imageURL } = useForm();

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
      <div className="grid gap-4">
        <form onSubmit={handleSubmit} className="grid gap-4 md:gap-8">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre</Label>
            <Input id="name" name="name" placeholder="Ingresa el nombre" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Categoría</Label>
            <Select id="category" name="category" className="bg-white border border-gray-300 rounded-lg p-2 w-full text-black">
              <option value="" disabled selected>Seleccione una categoría</option>
              <option value="Aceites y grasas">Aceites y grasas</option>
              <option value="Carne y pescado">Carne y pescado</option>
              <option value="Cereales y frutos secos">Cereales y frutos secos</option>
              <option value="Frutas">Frutas</option>
              <option value="Hierbas y especies">Hierbas y especies</option>
              <option value="Huevos y lácteos">Huevos y lácteos</option>
              <option value="Verduras">Verduras</option>
              <option value="Pasta">Pasta</option>
              <option value="Arroz y legumbres">Arroz y legumbres</option>
              <option value="Otros">Otros</option>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="unit">Unidad de medida</Label>
            <Select id="unit" name="unit" className="bg-white border border-gray-300 rounded-lg p-2 w-full text-black">
              <option value="" disabled selected>Seleccione una unidad de medida</option>
              <option value="Litro">Litro (l)</option>
              <option value="Onza">Onza (oz)</option>
              <option value="Gramo">Gramo (g)</option>
              <option value="Kilogramo">Kilogramo (kg)</option>
              <option value="Mililitro">Mililitro (ml)</option>
              <option value="Libra">Libra (lb)</option>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantity">Cantidad</Label>
            <Input id="quantity" name="quantity" type="number" min="0" placeholder="Ingresa la cantidad" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="min-quantity">Cantidad mínima</Label>
            <Input id="min-quantity" name="minQuantity" type="number" min="0" placeholder="Ingresa la cantidad mínima" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="purchase-price">Precio de compra</Label>
            <Input id="purchase-price" name="purchasePrice" type="number" min="0" step="0.01" placeholder="Ingresa el precio de compra" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sale-price">Precio de venta</Label>
            <Input id="sale-price" name="salePrice" placeholder="Ingresa el precio de venta" type="number" min="0" step="0.01" />
          </div>
          <Button type="submit" className="justify-self-end">
            Crear ingrediente
          </Button>
        </form>
      </div>
      <div className="grid gap-4">
        <Label htmlFor="image">Imagen</Label>
        {imageURL ? (
          <img
            src={imageURL}
            alt="Product Image"
            className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
          />
        ) : (
          <div className="aspect-square border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800 flex items-center justify-center">
            <span className="text-gray-500">No se ha subido ninguna imagen</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <div className="grid gap-2 w-full">
            <Input id="image" type="file" onChange={(e) => handleImageChange(e)} />
          </div>
        </div>
      </div>
    </div>
  );
};
