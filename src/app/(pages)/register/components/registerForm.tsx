"use client";

import { Input } from "../../../components/input/input";
import { Button } from "../../../components/button/button";
import { Select } from "@/app/components/select/select";
import Link from "next/link";
import { useForm } from "@/app/auth/hooks/useGeneralAuth";

export function RegisterForm() {
  const { handleSubmitRegister } = useForm();

  return (
    <div className="bg-[#f8f8f8] border border-[#a3a3a3] rounded-lg p-8 max-w-lg w-full min-h-[500px]">
      <h1 className="text-center text-lg font-semibold mb-6 text-black">Completa tus datos para registrarte</h1>
      <form onSubmit={handleSubmitRegister} className="space-y-4">
        <div>
          <Input id="name" placeholder="Nombre" type="text" className="w-full" />
        </div>
        <div>
          <Input id="email" placeholder="Correo" type="email" className="w-full" />
        </div>
        <div>
          <Input id="password" placeholder="Contraseña" type="password" className="w-full" />
        </div>
        <div>
          <Input id="phone" placeholder="Teléfono" type="tel" className="w-full" />
        </div>
        <div>
          <Select id="role" className="bg-white border border-gray-300 rounded-lg p-2 w-full text-black" required>
            <option value="" disabled selected>Selecciona un rol</option>
            <option value="mesero">Mesero</option>
            <option value="chef">Chef</option>
            <option value="administrador">Administrador</option>
          </Select>
        </div>
        <Button type="submit">Registrarse</Button>
      </form>
      <div className="mt-4 text-center text-sm text-black">
        ¿Ya tienes una cuenta?
        <Link href="/login" className="underline" prefetch={false}>
          Inicia sesión
        </Link>
      </div>
    </div>
  );
}
