"use client";

import ProtectedRoute from "@/app/(pages)/admin/protected-route";
import { MenuView } from "../components/menu";
import { Footer } from "@/app/components/footer/footer";
import { HeaderOther } from "@/app/components/header/headerViewOther";

export default function Menu() {

  return (
    <ProtectedRoute role="mesero">
      <main className="h-screen bg-white">
        <HeaderOther></HeaderOther>
        <div className="pr-20 pl-20 pt-10 pb-20 bg-white">
          <MenuView></MenuView>
        </div>
        <Footer></Footer>
      </main>
    </ProtectedRoute>
  );
}