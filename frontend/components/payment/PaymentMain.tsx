"use client"
import { useAuth } from "@/auth/AuthProvider";
import { MsgEnum } from "@/enums/message-enum";
import CartService from "@/services/cart.service";
import { Cart } from "@/types/cart.types";
import { useEffect, useState } from "react";
import LoaderOverlay from "../common/Loader/LoaderOverlay";
import { message } from "../common/message/message";
import OrderForm from "./OrderForm";
import OrderSummary from "./OrderSummary";
import { useRouter } from "next/navigation";
import RouteConstants from "@/constants/RouteConstants";


const PaymentMain = () => {
    const { user } = useAuth();
    const router = useRouter();

    const [cartItems, setCartItems] = useState<Cart[]>([]);
    const [loading, setLoading] = useState<boolean>(false);


    // Handle remove from cart
    const fetchCartItems = (id: string) => {
        setLoading(true);
        CartService.fetchCartsByUserWithoutPagination(id)
            .then((response) => {
                setCartItems(response?.data);
            })
            .catch((error) => {
                console.error('Error fetching the cart items', error);
                message.open({ text: error.response.data.message || 'Error fetching the cart items', type: MsgEnum.ERROR });
            })
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        if(user === null){
            router.push('/non-existent-route');
        }
        else fetchCartItems(user.id)
    }, []);



    //function to calculate total
    const calcTotal = () =>{
        let total = 0;
        cartItems.forEach((item) => {
            total += item.quantity * item.variant.offerPrice;
        }); 
        
        return total;
    }


    return(
        <div className="flex justify-center items-start flex-wrap lg:flex-nowrap gap-5 py-10 px-5">
            <OrderSummary amount={calcTotal()}/>
            <OrderForm cartItems={cartItems} total={calcTotal()}/>
            {loading && (<LoaderOverlay />)}
        </div>
    )
}

export default PaymentMain;