"use client";

import Link from "next/link";
import { GridView } from "./components/gridView";
import { Header } from "@/app/components/header/headerView";
import ProtectedRoute from "../../protected-route";
import { Footer } from "@/app/components/footer/footer";

export default function Component() {
  return (
    <ProtectedRoute role="administrador">
      <main className="h-screen">
        <Header />
        <div className="flex flex-col h-2000 bg-white pl-20 pr-20 pb-2000">
          <GridView />
        </div>
        <Footer />
      </main>
    </ProtectedRoute>
  );
}
