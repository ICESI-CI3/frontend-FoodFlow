"use client";

import { ProductForm } from "./components/productForm";
import ProtectedRoute from "../../protected-route";
import { Header } from "@/app/components/header/headerView";
import { Footer } from "@/app/components/footer/footer";

export default function Component() {
    return (
        <ProtectedRoute role="administrador">
            <div className="bg-white w-full h-full">
                <Header></Header>
                <div className="pr-20 pl-20 pt-10 pb-20 bg-white">
                    <ProductForm />
                </div>
                <Footer></Footer>
            </div>
        </ProtectedRoute>
    );
}
