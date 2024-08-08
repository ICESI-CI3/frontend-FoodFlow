"use client";

import Link from "next/link";
import { GridView } from "./components/gridView";
import { Header } from "@/app/components/header/headerView";
import ProtectedRoute from "../../protected-route";
import { AuthContextProvider } from "@/app/auth/context/contextProvider";
import { Footer } from "@/app/components/footer/footer";

export default function Component() {
  return (
    <ProtectedRoute role="administrador">
      <Header />
      <main className="h-screen">
        <div className="flex flex-col h-full bg-white pl-20 pr-20">
          <GridView />
        </div>
      </main>
      <Footer />

    </ProtectedRoute>
  );
}
