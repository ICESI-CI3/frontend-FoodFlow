"use client";

import { FormEvent } from "react";
import { useAuth } from "@/app/auth/hooks/useAuth";
import { User } from "@/app/interface/user";
import { v4 as UUID } from "uuid";
import Swal from "sweetalert2";
//import bcrypt from "bcrypt";

export const useForm = () => {
  const { register, login, logout } = useAuth();

  const handleSubmitRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const username = form.name.value as string;
    const email = form.email.value as string;
    const password = form.password.value as string;
    const role = form.role?.value as string;
    const phone = form.phone.value as string;
    const id = UUID()

    if (!username || !email || !password || !role || !phone) {
      Swal.fire({
        title: "Error",
        text: "Todos los campos son obligatorios",
        icon: "error",
        timer: 3000,
      })
      return;
    }

    role.toLowerCase

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

  const handleSubmitLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const email = form.email.value as string;
    const password = form.password.value as string;

    if (!email || !password) {
      Swal.fire({
        title: "Error",
        text: "Todos los campos son obligatorios",
        icon: "error",
        timer: 3000,
      })
      return;
    }

    const user: any = {
      email,
      password,
    };

    login(user);
  };

  const handleSubmitLogout = () => {
    logout()
  };

  return {
    handleSubmitRegister,
    handleSubmitLogin,
    handleSubmitLogout
  };
};
