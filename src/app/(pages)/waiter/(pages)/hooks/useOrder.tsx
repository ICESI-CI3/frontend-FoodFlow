import { FormEvent, useState } from "react"
import Swal from "sweetalert2";
import { useOrder } from "./useContextOrder";
import { Order } from "@/app/interface/order";
import { Product } from "@/app/interface/product";
import { v4 as UUID } from "uuid";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../../../../services/firebaseConfig";
import { useRouter } from "next/navigation";

export const useForm = () => {

    const { products } = useOrder();
    const [searchTerm, setSearchTerm] = useState("");

    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const router = useRouter();

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;

        const name = form.name.value as string;
        const tableNumber = parseInt(form.table.value as string);
        const total = selectedProducts.reduce((accumulator, currentProduct) => {
            const productPrice = parseInt(currentProduct.price as string);
            return accumulator + productPrice;
        }, 0);

        const id = UUID()

        if (name == null || tableNumber == null || total == null) {
            Swal.fire({
                title: "Error",
                text: "Todos los campos son requeridos",
                icon: "error",
                timer: 2000,
            })
            return;
        }

        const order: Order = {
            name,
            tableNumber,
            orderStatus: "CREADO",
            price: total,
            id,
            products: selectedProducts,
        }

        try {
            const docRef = await addDoc(collection(db, "orders"), order);
            Swal.fire({
                title: "Éxito",
                text: "Producto creado correctamente",
                icon: "success",
                timer: 3000,
            })
            if (docRef) {
                router.push("/waiter/menu");
            }
        } catch (error) {
            console.log(error)
            Swal.fire({
                title: "Error",
                text: "No se ha podido crear el producto",
                icon: "error",
                timer: 2000,
            })
        }

    }

    const handleProductChange = (product: Product) => {
        setSelectedProducts((prevSelected) => {
            if (prevSelected.some((item) => item.id === product.id)) {
                return prevSelected.filter((item) => item.id !== product.id);
            } else {
                return [...prevSelected, product];
            }
        });
    };

    return {
        handleSubmit,
        searchTerm,
        setSearchTerm,
        filteredProducts,
        handleProductChange,
        selectedProducts,
    }

}
