"use client";

import { useState } from "react";
import { Label } from "@/app/components/label/label";
import { Input } from "@/app/components/input/input";
import { Textarea } from "@/app/components/textarea/textarea";
import { SelectTrigger, SelectValue, SelectContent, SelectItem, Select } from "@/app/components/select/select";
import { Checkbox } from "@/app/components/checkbox/checkbox";
import { Button } from "@/app/components/button/button";
import { useForm } from "../hooks/useAddProduct";
import { Ingredient } from "@/app/interface/ingredient";
import { useIngredient } from "@/app/(pages)/admin/(pages)/ingredient/hooks/useContextIngredient";

export const ProductForm = () => {
  const { handleSubmit, /*handleImageChange, handleImageRemove,*/ imageURL, selectedIngredients, setSelectedIngredients } = useForm();
  const { ingredients } = useIngredient();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");

  const handleIngredientChange = (ingredient: Ingredient) => {
    setSelectedIngredients((prevSelected) => {
      if (prevSelected.some((item) => item.id === ingredient.id)) {
        return prevSelected.filter((item) => item.id !== ingredient.id);
      } else {
        return [...prevSelected, ingredient];
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 md:gap-8">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Product Name</Label>
          <Input id="name" name="name" placeholder="Enter product name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select id="category" name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="drinks">Bebidas</SelectItem>
              <SelectItem value="starters">Entradas</SelectItem>
              <SelectItem value="main-dishes">Platos Fuertes</SelectItem>
              <SelectItem value="desserts">Postres</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Product Description</Label>
        <Textarea id="description" name="description" placeholder="Enter product description" maxLength={200} className="resize-none" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="price">Price</Label>
        <Input id="price" name="price" type="number" min="0" step="0.01" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        <Input type="file" id="image" />
        {imageURL ? (
          <img src="" alt="Product Image" className="w-full h-auto object-cover mt-2" />
        ) : (
          <div className="w-full h-40 flex items-center justify-center border border-gray-300 text-gray-500 mt-2">
            No image uploaded
          </div>
        )}
        {imageURL && (
          <button type="button" className="mt-2 text-red-500">
            Remove Image
          </button>
        )}
      </div>
        {ingredients.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 mt-8">No hay ingredientes creados</p>
        ) : (
        <div className="space-y-2">
            <Label htmlFor="ingredients">Ingredientes</Label>
            <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 max-h-[200px] overflow-auto">
                {ingredients.map((ingredient) => (
                    <div key={ingredient.id} className="flex items-center">
                    <Checkbox
                        id={`ingredient-${ingredient.id}`}
                        checked={selectedIngredients.some((item) => item.id === ingredient.id)}
                        onChange={() => handleIngredientChange(ingredient)}
                    />
                    <div className="flex items-center gap-2">
                        <img src={ingredient.image || "/placeholder.svg"} alt={ingredient.name} width={32} height={32} className="rounded-full" />
                        <span>{ingredient.name}</span>
                    </div>
                    <span>{ingredient.quantity[0]} unidades</span>
                    </div>
                ))}
            </div>
        </div>)}
      <Button type="submit" className="justify-self-end">
        Create Product
      </Button>
    </form>
  );
};
