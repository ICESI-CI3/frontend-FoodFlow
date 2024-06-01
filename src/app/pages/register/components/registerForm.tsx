"use client";

import { Input } from "../../../components/input/input";
import { Button } from "../../../components/button/button";
import { Select } from "../../../components/select/select";
import Link from "next/link";
import { useForm } from "../hooks/useForm";

export function RegisterForm() {
  const { handleSubmit } = useForm();

  return (
    <div className="bg-[#f8f8f8] border border-[#a3a3a3] rounded-lg p-8 max-w-lg w-full min-h-[500px]">
      <h1 className="text-center text-lg font-semibold mb-6 text-black">Completa tus datos para registrarte</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input id="name" placeholder="Nombre" type="text" />
        </div>
        <div>
          <Input id="email" placeholder="Correo" type="email" />
        </div>
        <div>
          <Input id="password" placeholder="Contraseña" type="password" />
        </div>
        <div>
          <Input id="phone" placeholder="Teléfono" type="tel" />
        </div>
        <div>
          <Select id="role" className="bg-white border border-gray-300 rounded-lg p-2 w-full text-black" required>
            <option value="" disabled selected>Selecciona un rol</option>
            <option value="waiter">Waiter</option>
            <option value="chef">Chef</option>
            <option value="manager">Manager</option>
          </Select>
        </div>
        <Button type="submit">Registrarse</Button>
      </form>
      <div className="mt-4 text-center text-sm text-black">
        ¿No tienes una cuenta?
        <Link href="login" className="underline" prefetch={false}>
          Inicia sesión
        </Link>
      </div>
    </div>
  );
}
