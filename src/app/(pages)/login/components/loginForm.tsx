"use client";

import { Input } from "../../../components/input/input";
import { Button } from "../../../components/button/button";
import Link from "next/link";
import { useForm } from "@/app/auth/hooks/useGeneralAuth";

export function LoginForm() {
  const { handleSubmitLogin } = useForm();

  return (
    <div className="bg-[#f8f8f8] border border-[#a3a3a3] rounded-lg p-8 max-w-lg w-full">
      <h1 className="text-center text-lg font-semibold mb-6 text-black">Completa tus datos para registrarte</h1>
      <form onSubmit={handleSubmitLogin} className="space-y-4">
        <div>
          <Input id="email" placeholder="Correo" type="email" />
        </div>
        <div>
          <Input id="password" placeholder="Contraseña" type="password" />
        </div>
        <Button type="submit">Iniciar sesión</Button>
      </form>
      <div className="mt-4 text-center text-sm text-black">
        ¿No tienes una cuenta?
        <Link href="/" className="underline" prefetch={false}>
          Regístrate
        </Link>
      </div>
    </div>
  );
}
