"use client";

import { FormEvent } from "react";
import { useRegister } from "./useContextRegister";
import { User } from "@/app/interface/user";
import { v4 as UUID } from "uuid";

export const useForm = () => {
  const { register } = useRegister();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const username = form.name.value as string;
    const email = form.email.value as string;
    const password = form.password.value as string;
    const role = form.role?.value as string;
    const phone = form.phone.value as string;
    const id = UUID()

    if (!username || !email || !password || !role || !phone) {
      alert("Todos los campos son obligatorios");
      return;
    }

    const user: User = {
      username,
      email,
      password,
      role,
      phone,
      id
    };

    register(user);
  };

  return {
    handleSubmit
  };
};
