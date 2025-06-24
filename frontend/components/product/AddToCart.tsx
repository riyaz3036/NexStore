"use client"
import { useAuth } from "@/auth/AuthProvider";
import ColorConstants from "@/constants/ColorConstants";
import { MsgEnum } from "@/enums/message-enum";
import CartService from "@/services/cart.service";
import { CreateCartRequest } from "@/types/cart.types";
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from "react";
import LoaderOverlay from "../common/Loader/LoaderOverlay";
import { message } from "../common/message/message";


interface AddToCartProps {
    variantId: string
}

const AddToCart: React.FC<AddToCartProps> = ({variantId}) => {
    const { user } = useAuth();

    const [loading, setLoading] = useState<boolean>(false);
    const [toAdd, setToAdd] = useState<CreateCartRequest>({
        userId: user? user.id : '',
        variantId: variantId,
        quantity: 1
    }); //to handle add to cart functionality



    const incrementQuantity = () => {
        setToAdd(prevState => ({
            ...prevState,
            quantity: prevState.quantity + 1
        }));
    };


    const decrementQuantity = () => {
        setToAdd(prevState => ({
            ...prevState,
            quantity: prevState.quantity - 1
        }));
    };


    const handleAddToCart = () => {
        setLoading(true);
        console.log(toAdd);
        CartService.createMultipleCarts([toAdd])
            .then((response) => {
                message.open({ text: "Product added to cart", type: MsgEnum.SUCCESS });
            })
            .catch((error) => {
                console.error('Error adding the product to cart', error);
                message.open({ text: error.response.data.message || 'Error adding the product to cart', type: MsgEnum.ERROR });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return(
        <div className="flex mb-5">
            <div className="flex h-[40px] bg-red-200"  style={{color: ColorConstants.black}}>
                <button className="h-full w-10" style={{backgroundColor: ColorConstants.grey}} disabled={toAdd.quantity === 1} onClick={decrementQuantity}><MinusOutlined /></button>
                <div className="h-full w-16 flex items-center justify-center"  style={{backgroundColor: ColorConstants.grey}}><p>{toAdd.quantity}</p></div>
                <button className="h-full w-10" onClick={incrementQuantity}  style={{backgroundColor: ColorConstants.grey}}><PlusOutlined /></button>
            </div>
            <div className="h-[40px] text-white">
                <button className="h-full w-32 text-sm"  style={{backgroundColor: ColorConstants.primaryColor}} onClick={handleAddToCart}>ADD TO CART</button>
            </div>

            {loading && (<LoaderOverlay />)}
        </div>
    )
};


export default AddToCart;