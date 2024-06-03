"use client";

import Link from "next/link";
import { LoginForm } from "./components/loginForm";
import { AuthContextProvider } from "../../auth/context/contextProvider";
import { useAuth } from "@/app/auth/hooks/useAuth";
import { useEffect } from "react";
import { User } from "@/app/interface/user";
import { useRouter } from "next/navigation";

export default function Page() {
  return (
    <div className="flex h-screen bg-white p-20 pl-40">
      <div className="w-2/4 flex justify-center items-center">
        <img src="/Isotipo.svg" alt="Decorative Image" className="max-w-md" width={1000} height={1000} />
      </div>
      <div className="w-3/4 flex justify-center items-center">
        <LoginForm />
      </div>
    </div>
  );
}
