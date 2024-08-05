import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from "react";
import success from '../../assets/success.jpg'


const Success=()=>{

    const router = useRouter();

    const handleContinueShopping = () => {
        router.push('/'); 
    };

    return(
        <div className="flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-50">
            <div className="bg-white" style={{width: '500px'}}>
                <div className="relative">
                    <div className="w-full"><Image className="h-full w-full object-cover" src={success} /></div>
                    <div onClick={handleContinueShopping} className="flex items-center justify-center w-8 h-8 rounded-2xl absolute top-2 right-2 z-10 bg-black/20 text-base cursor-pointer text-white">X</div>
                </div>
                <div className="flex flex-col items-center py-12 px-10">
                    <p className="font-bold text-center mb-5 text-[18px] md:text-[28px]" style={{color: '#2d394b'}}>Order Placed Successfully</p>
                    <p className="text-center text-sm mb-12 max-w-[300px]">Your Order Has Been Placed Successfull We will Try To Ship It To Your Door Step As Soon We Can. Cheers</p>
                    <button className="text-white py-2 text-sm md:text-lg px-10 rounded" style={{backgroundColor: '#2d394b'}} onClick={handleContinueShopping}>CONTINUE SHOPPING</button>
                </div>
            </div>
        </div>        
    )
}

export default Success;