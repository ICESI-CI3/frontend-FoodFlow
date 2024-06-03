"use client"

import { useForm } from "../hooks/useAddIngredient";
import { Label } from "@/app/components/label/label";
import { Input } from "@/app/components/input/input";
import { Button } from "@/app/components/button/button";

export const ImageForm = () => {
  const { /*handleImageChange, handleImageRemove,*/ imageURL, setImageURL } = useForm();

  return (
    <div className="grid gap-4">
      {imageURL == null ? (
        <div className="aspect-square border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800 flex items-center justify-center">
          <span className="text-gray-500">No se ha subido ninguna imagen</span>
        </div>
      ) : (
        <img
          src=""
          alt="Product Image"
          className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
        />
      )}
      <div className="flex items-center gap-2">
        <div className="grid gap-2">
          <Label htmlFor="image">Product Image</Label>
          <Input id="image" type="file" onChange={(e) => setImageURL(e.target.value)}  />
        </div>
        <Button variant="outline" size="sm">
          <TrashIcon className="w-4 h-4 mr-2" />
          Borrar imagen
        </Button>
      </div>
    </div>
  );
};

function TrashIcon(props: any) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
