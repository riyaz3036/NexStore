"use client"
import { useAuth } from "@/auth/AuthProvider";
import ColorConstants from "@/constants/ColorConstants";
import RouteConstants from "@/constants/RouteConstants";
import { ButtonTypeEnum } from "@/enums/button-type.enum";
import { MsgEnum } from "@/enums/message-enum";
import CartService from "@/services/cart.service";
import { Cart } from "@/types/cart.types";
import { useEffect, useState } from "react";
import { Link } from "react-alice-carousel";
import Button from "../common/Button/Button";
import LoaderOverlay from "../common/Loader/LoaderOverlay";
import { message } from "../common/message/message";
import Pagination from "../common/Pagination/Pagination";
import CartCard from "./CartCard";
import { useRouter } from "next/navigation";


const CartMain = () => {
    const { user } = useAuth();
    const router = useRouter();

    const [page, setPage] = useState<number>(0);
    const [cartItems, setCartItems] = useState<Cart[]>([]);
    const [totalElements, setTotalElements] = useState<number>();
    const [loading, setLoading] = useState<boolean>(false);


    const fetchCartItems = (id: string, pageNum: number) => {
        setLoading(true);
        CartService.fetchCartsByUser(id, pageNum)
            .then((response) => {
                setCartItems(response?.data);
                setTotalElements(response.totalElements);
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
        else fetchCartItems(user.id, page)
    }, []);


    //function to calculate total
    const calcTotal = () =>{
        let total = 0;
        cartItems.forEach((item) => {
            total += item.quantity * item.variant.offerPrice;
        }); 
        
        return total
    }


    // Handle remove from cart
    const removeCart = (id: string) => {
        setLoading(true);
        CartService.deleteCart(id)
            .then((response) => {
                message.open({ text: "Product removed from cart", type: MsgEnum.SUCCESS });
            })
            .catch((error) => {
                console.error('Error removing the product from cart', error);
                message.open({ text: error.response.data.message || 'Error removing the product from cart', type: MsgEnum.ERROR });
            })
            .finally(() => {
                if(user !== null) fetchCartItems(user.id, page);
                setLoading(false);
            });
    }

    // Handle change of quantity
    const changeVariantQuantity = (id: string, quantity: number) => {
        if(quantity == 0) {
            removeCart(id);
            return;
        }
        setLoading(true);
        CartService.updateCarts([{id, quantity}])
            .then((response) => {
                message.open({ text: "Modified item quantity", type: MsgEnum.SUCCESS });
            })
            .catch((error) => {
                console.error('Error Modifying item quantity', error);
                message.open({ text: error.response.data.message || 'Error Modifying item quantity', type: MsgEnum.ERROR });
            })
            .finally(() => {
                if(user !== null) fetchCartItems(user.id, page);
                setLoading(false);
            });
    }
    

    return(
        <div className="flex flex-wrap lg:flex-nowrap gap-5 mx-3 md:mx-10">
            {/* Products */}
            <div className="w-full">
                <div className="flex items-center justify-between py-5 text-xl font-bold" style={{color: ColorConstants.secondaryColor}}>
                    <p>Shopping Cart</p>
                    <p>{cartItems.length || 0} Items</p>
                </div>

                {cartItems.length === 0 && <p className="p-5 text-xl text-center min-h-[300px] flex items-center justify-center" style={{color: ColorConstants.darkGrey}}>No Products in the cart</p>}

                    <div>
                    <div className="flex flex-col gap-2">
                        {/* Cart Card */}
                        {cartItems.map((item) => (
                            <div key={item.id}>
                                <CartCard cartItem={item} removeCart={removeCart} changeVariantQuantity={changeVariantQuantity}/>
                            </div>
                        ))}
                    </div>

                    {totalElements && (
                        <Pagination data={cartItems} page={page} setPage={setPage} totalElements={totalElements}/>
                    )}
                </div>
            </div>

            {/* Summary */}
            <div className={`w-full lg:w-[350px] py-5 ${cartItems.length===0?'hidden':''}`}>
                <div className="text-base font-bold" style={{color: ColorConstants.secondaryColor}}><p>Summary</p></div>
                <div className="flex flex-col gap-1 text-sm" style={{color: ColorConstants.black}}>
                    <div className="flex justify-between py-1">
                        <p>Subtotal</p>
                        <p>₹{calcTotal() }</p>
                    </div>
                    <div className="flex justify-between py-1">
                        <p>Estimated Shipping</p>
                        <p>₹150</p>
                    </div>
                    <div className="flex justify-between py-1">
                        <p>Estimated Tax</p>
                        <p>--</p>
                    </div>
                    <div className="flex justify-between py-1 font-semibold" style={{borderTop: `1px solid ${ColorConstants.grey}` , borderBottom: `1px solid ${ColorConstants.grey}`}}>
                        <p>Total</p>
                        <p>₹{calcTotal() + 150}</p>
                    </div>
                </div>
                <Link href={RouteConstants.payment} className="py-5 flex justify-center">
                    <Button text={"CHECKOUT"} theme={ButtonTypeEnum.DARK}/>
                </Link> 
            </div>

            {loading && (<LoaderOverlay />)}
        </div>       
    )
}

export default CartMain;