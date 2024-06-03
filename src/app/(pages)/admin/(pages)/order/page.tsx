"use client";

import ProtectedRoute from "@/app/(pages)/admin/protected-route";
import { Header } from "@/app/components/header/headerView";
import { Orders } from "./components/tableView";
import { OrderContextProvider } from "./context/orderContextProvider";
import { useAuth } from "@/app/auth/hooks/useAuth";
import { AuthContextProvider } from "@/app/auth/context/contextProvider";
import { Footer } from "@/app/components/footer/footer";

export default function Page() {
  return (
    <ProtectedRoute role="administrador">
      <OrderContextProvider>
        <Header />
        <div className="flex flex-col h-screen bg-white p-20 pl-40">
          <Orders />
        </div>
        <Footer />
      </OrderContextProvider>
    </ProtectedRoute>
  );
}
