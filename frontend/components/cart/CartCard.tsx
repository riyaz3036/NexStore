"use client"
import ColorConstants from '@/constants/ColorConstants';
import { Cart } from '@/types/cart.types';
import Image from 'next/image';
import React, { useState } from 'react';
import NoImg from '../../assets/image_not_available.png';
import Confirmation from '../comfirmation/Confirmation';

interface CartCardProps {
    cartItem: Cart;
    changeVariantQuantity: (id: string, quantity: number) => void;
    removeCart: (id: string) => void;
}
  

const CartCard: React.FC<CartCardProps> = ({cartItem, changeVariantQuantity, removeCart}) => {
    const [open, setOpen] = useState<boolean>(false);

    const [newQuantity,setNewQuantity] = useState(cartItem.quantity);
    //to increase quantity
    const increaseQuantity = () =>{
        setNewQuantity(newQuantity+1);
    }
    //to decrease quantity
    const decrementQuantity = () => {
        if(newQuantity>1){
            setNewQuantity(newQuantity-1);
        }
    }


    return(
        <div className="flex gap-2 p-2" style={{backgroundColor: ColorConstants.grey2}}>
            <div className="w-[100px] h-[100px] sm:w-[200px] sm:h-[200px] sm:w-[250px] sm:h-[250px]">
                {cartItem.variant.images && cartItem.variant.images.length > 0 ? (
                     <Image src={`${process.env.REACT_APP_LOCAL_BE_URL}/${cartItem.variant.images[0].replace(/\\/g, '/')}`}  width={200} height={200} alt="" className="w-full h-full object-cover" />
                ) : (
                     <Image src={NoImg}  width={200} height={200} alt="" className="w-full h-full object-cover" />
                )}
               
            </div>
            <div className="flex justify-between w-full gap-5">
                <div className="text-gray-400 flex flex-col py-1 gap-1">
                    <p className="text-sm sm:text-lg font-semibold" style={{color: ColorConstants.secondaryColor}}>{cartItem.variant.product.name}</p>
                    <p className="text-xs sm:text-sm">{cartItem.variant.name}</p>
                    <p className="text-xs sm:font-semibold">{cartItem.variant.product.category.description}</p>
                    <p className="text-xs sm:text-sm">Quantity: {cartItem.quantity}</p>
                    <div className="h-[30px] flex my-2">
                        <button className="h-full flex items-center px-2" style={{backgroundColor: ColorConstants.secondaryColor}} onClick={decrementQuantity}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="white" className="size-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                            </svg>
                        </button>
                        <div className="h-full flex items-center px-5 text-sm">
                            {newQuantity}
                        </div>
                        <button className="h-full flex items-center px-2" style={{backgroundColor: ColorConstants.primaryColor}} onClick={increaseQuantity}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="white" className="size-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </button>
                        {
                            newQuantity===cartItem.quantity?
                            <></>
                            :
                            <div className="h-full ml-3">
                                <button className="h-full text-xs text-white px-4" style={{backgroundColor: ColorConstants.secondaryColor}} onClick={() => changeVariantQuantity(cartItem.id, newQuantity)}>Save</button>
                            </div>
                        }
                    </div>
                    <div className="text-xs sm:text-sm underline cursor-pointer" onClick={() => setOpen(true)}><p>Remove</p></div>
                </div>
                <div className="text-sm sm:text-lg font-semibold py-1" style={{color: ColorConstants.secondaryColor}}><p>₹{cartItem.variant.offerPrice * cartItem.quantity}</p></div>
            </div>  

             <Confirmation text={"Are you sure you want to remove the product from cart?"} buttonA="yes" buttonExec={() => removeCart(cartItem.id)} setOpen={setOpen} open={open}/>
        </div>
    )
}


export default CartCard;