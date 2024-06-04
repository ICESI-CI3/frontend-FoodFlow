"use client"

import { useOrder } from "../hooks/useContextOrder"
import { Label } from "@/app/components/label/label"
import { Input } from "@/app/components/input/input"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/app/components/table/table"
import { Button } from "@/app/components/button/button"
import { HeaderOther } from "@/app/components/header/headerViewOther"
import ProtectedRoute from "@/app/(pages)/admin/protected-route"
import { OrderForm } from "../components/orderForm"
import { Footer } from "@/app/components/footer/footer"

export default function CreateOrder() {
  const { orderCreate, orders } = useOrder()

  const total = orderCreate.reduce((sum: any, item: any) => sum + item.price, 0)

  return (
    <ProtectedRoute role="mesero">
      <div className="bg-white w-full h-full">
        <HeaderOther></HeaderOther>
        <div className="pr-20 pl-20 pt-10 pb-20 bg-white h-screen">
          <OrderForm></OrderForm>
        </div>
        <Footer></Footer>
      </div>
    </ProtectedRoute>
  )
}
