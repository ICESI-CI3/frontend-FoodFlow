"use client"

import { useState } from "react";
import { useForm } from "../hooks/useAddIngredient";
import { Label } from "@/app/components/label/label";
import { Input } from "@/app/components/input/input";
import { SelectTrigger, SelectValue, SelectContent, SelectItem, Select } from "@/app/components/select/select";
import { Button } from "@/app/components/button/button";

export const IngredientForm = () => {
  const { handleSubmit } = useForm();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [unit, setUnit] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [minQuantity, setMinQuantity] = useState(0);
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [salePrice, setSalePrice] = useState(0);

  return (
    <div className="grid gap-4 md:gap-8">
      <form onSubmit={handleSubmit} className="grid gap-4 md:gap-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre</Label>
            <Input id="name" name="name" placeholder="Ingresa el nombre del producto" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Categoría</Label>
            <Select id="category" name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una categoría" value={category} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="produce">Aceites y grasas</SelectItem>
                <SelectItem value="dairy">Carne y pescado</SelectItem>
                <SelectItem value="grains">Cereales y frutos secos</SelectItem>
                <SelectItem value="protein">Frutas</SelectItem>
                <SelectItem value="spices">Hierbas y especies</SelectItem>
                <SelectItem value="eggs-dairy">Huevos y lácteos</SelectItem>
                <SelectItem value="vegetables">Verduras</SelectItem>
                <SelectItem value="pasta">Pasta</SelectItem>
                <SelectItem value="rice-legumes">Arroz y legumbres</SelectItem>
                <SelectItem value="others">Otros</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="unit">Unidad de medida</Label>
            <Select id="unit" name="unit" value={unit} onChange={(e) => setUnit(e.target.value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una unidad" value={unit} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="liter">Litro (l)</SelectItem>
                <SelectItem value="ounce">Onza (oz)</SelectItem>
                <SelectItem value="gram">Gramo (g)</SelectItem>
                <SelectItem value="kilogram">Kilogramo (kg)</SelectItem>
                <SelectItem value="milliliter">Mililitro (ml)</SelectItem>
                <SelectItem value="pound">Libra (lb)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantity">Cantidad</Label>
            <Input id="quantity" name="quantity" type="number" min="0" placeholder="Ingresa la cantidad" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="min-quantity">Cantidad mínima</Label>
            <Input id="min-quantity" name="minQuantity" type="number" min="0" placeholder="Ingresa la cantidad mínima" value={minQuantity} onChange={(e) => setMinQuantity(Number(e.target.value))} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="purchase-price">Precio de compra</Label>
            <Input id="purchase-price" name="purchasePrice" type="number" min="0" step="0.01" placeholder="Ingresa el precio de compra" value={purchasePrice} onChange={(e) => setPurchasePrice(Number(e.target.value))} />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="sale-price">Precio de venta</Label>
          <Input id="sale-price" name="salePrice" type="number" min="0" step="0.01" value={salePrice} onChange={(e) => setSalePrice(Number(e.target.value))} />
        </div>
        <Button type="submit" className="justify-self-end">
          Crear producto
        </Button>
      </form>
    </div>
  );
};
