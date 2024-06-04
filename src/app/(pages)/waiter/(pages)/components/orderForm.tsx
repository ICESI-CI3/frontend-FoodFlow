import { Label } from "@/app/components/label/label"
import { useForm } from "../hooks/useOrder"
import { Input } from "@/app/components/input/input"
import { Button } from "@/app/components/button/button"
import { useOrder } from "../hooks/useContextOrder"
import { Checkbox } from "@/app/components/checkbox/checkbox"

export const OrderForm = () => {

    const { handleProductChange, selectedProducts, handleSubmit } = useForm()
    const { products } = useOrder();

    const total = selectedProducts.reduce((accumulator, currentProduct) => {
        const productPrice = parseInt(currentProduct.price as string);
        return accumulator + productPrice;
    }, 0);

    return (
        <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
            <div className="grid gap-4">
                <form onSubmit={handleSubmit} className="grid gap-4 md:gap-8">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nombre de la orden</Label>
                        <Input id="name" placeholder="Ingresa el nombre" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="table">Número de mesa</Label>
                        <Input id="table" placeholder="Ingresa el número de mesa" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="table-number">Estado de la orden</Label>
                        <Input id="table-number" disabled={true} placeholder="CREADA" />
                    </div>
                    <div className="grid gap-2">
                        <span id="total" className="text-lg font-medium text-gray-700">Total: ${total}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <Button type="submit" className="justify-self-end w-full">Crear Orden</Button>
                    </div>
                </form>
            </div>
            <div className="grid gap-4">
                {products.length === 0 ? (
                    <p className="text-center text-gray-500 dark:text-gray-400 mt-8">No hay productos creados</p>
                ) : (
                    <div className="space-y-2">
                        <Label htmlFor="ingredients">Ingredientes</Label>
                        <div className="grid gap-4 max-h-[600px] overflow-auto">
                            {products.map((product) => (
                                <div key={product.name} className="flex items-center justify-between p-4 border rounded-lg max-h-[80px]">
                                    <img src={product.image || "/placeholder.svg"} alt={product.name} width={60} height={60} className="rounded" />
                                    <div className="flex flex-col flex-grow pl-4 pr-20">
                                        <span className="font-semibold text-gray-700">{product.name}</span>
                                        <span className="text-gray-700">{product.price} unidades</span>
                                    </div>
                                    <div className="flex items-center pr-5">
                                        <Checkbox
                                            id={`product-${product.id}`}
                                            checked={selectedProducts.some((item) => item.id === product.id)}
                                            onChange={() => handleProductChange(product)}
                                            className="ml-4 pr-20"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>

    )

}