"use client"
import React,{useState} from 'react'
import Image from 'next/image';
import { BASE_URL } from '@/utils/config';

export default function CartCard({variant,user,setTrigger,trigger}){

    const [newQuantity,setNewQuantity] = useState(variant.quantity);
    //to increase quantity
    const increaseQuantity = () =>{
        setNewQuantity(newQuantity+1);
    }
    //to decrease quantity
    const decrementQuantity = () =>{
        if(newQuantity>1){
            setNewQuantity(newQuantity-1);
        }
    }

    // Handle remove from cart
    const handleRemoveFromCart = async (variant_id) => {
        try {
            const res = await fetch(`${BASE_URL}/cart/${user._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ variant_id }),
            });

            const result = await res.json();

            if (!res.ok) {
                alert(result.message);
                return;
            }
            window.location.reload();
        } catch (e) {
            alert('Error removing from cart');
        }
    };

    // Handle change of quantity
    const changeQuantity = async (variant_id,quantity) => {
        try {
            const res = await fetch(`${BASE_URL}/cart/${user._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ variant_id,quantity }),
            });

            const result = await res.json();

            if (!res.ok) {
                alert(result.message);
                return;
            }
            window.location.reload();
        } catch (e) {
            alert('Error removing from cart');
        }
    };


    return(
        <div className="flex gap-2 bg-[#f5f3f3] p-2">
            <div className="w-[100px] h-[100px] sm:w-[200px] sm:h-[200px] sm:w-[250px] sm:h-[250px]"><Image src={`${BASE_URL}/${variant.variant_id.images[0].replace(/\\/g, '/')}`}  width={200} height={200} className="w-full h-full object-cover" /></div>
            <div className="flex justify-between w-full gap-5">
                <div className="text-gray-400 flex flex-col py-1 gap-1">
                    <p className="text-sm sm:text-lg text-[#2d394b] font-semibold">{variant.variant_id.product_id.name}</p>
                    <p className="text-xs sm:text-sm">{variant.variant_id.name}</p>
                    <p className="text-xs sm:font-semibold">{variant.variant_id.product_id.category_id.name}</p>
                    <p className="text-xs sm:text-sm">Quantity: {variant.quantity}</p>
                    <div className="h-[30px] flex my-2">
                        <button className="h-full flex items-center px-2 bg-[#6689ff] " onClick={decrementQuantity}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="white" class="size-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                            </svg>
                        </button>
                        <div className="h-full flex items-center px-5 text-sm">
                            {newQuantity}
                        </div>
                        <button className="h-full flex items-center px-2 bg-[#6689ff]" onClick={increaseQuantity}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="white" class="size-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </button>
                        {
                            newQuantity===variant.quantity?
                            <></>
                            :
                            <div className="h-full ml-3">
                                <button className="bg-[#2d394b] h-full text-xs text-white px-4" onClick={() => changeQuantity(variant.variant_id._id,newQuantity)}>Save</button>
                            </div>
                        }
                    </div>
                    <div className="text-xs sm:text-sm underline cursor-pointer" onClick={() => handleRemoveFromCart(variant.variant_id._id)}><p>Remove</p></div>
                </div>
                <div className="text-[#2d394b] text-sm sm:text-lg font-semibold py-1"><p>₹{variant.variant_id.offer_price * variant.quantity}</p></div>
            </div>  
        </div>
    )
}