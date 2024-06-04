"use client";

import ProtectedRoute from "@/app/(pages)/admin/protected-route";
import { Header } from "@/app/components/header/headerView";
import { Orders } from "./components/tableView";
import { useAuth } from "@/app/auth/hooks/useAuth";
import { AuthContextProvider } from "@/app/auth/context/contextProvider";
import { Footer } from "@/app/components/footer/footer";

export default function Page() {
  return (
    <ProtectedRoute role="administrador">
      <Header />
      <div className="flex flex-col h-screen bg-white pl-20 pr-20 pt-10 pb-20">
        <Orders />
      </div>
      <Footer />
    </ProtectedRoute>
  );
}
