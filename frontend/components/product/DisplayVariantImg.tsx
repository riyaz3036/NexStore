"use client"
import Image from "next/image";
import { useState } from "react";
import NoImg from '../../assets/image_not_available.png';
import AddToFav from "./AddToFav";
import AuthProvider from "@/auth/AuthProvider";


interface DisplayVariantImgProps {
    displayImages: string[];
    variantId: string
}

const DisplayVariantImg: React.FC<DisplayVariantImgProps> = ({displayImages, variantId}) => {
    const [displayImg, setDisplayImg] = useState<string>(displayImages && displayImages.length > 0 ? displayImages[0] : '');    // To manage display image
    

    return (
        <div className="flex flex-col gap-3 p-3">
            <div className="relative w-[280px] h-[280px] sm:w-[500px] sm:h-[500px]">
                {displayImg.length > 0 ? (
                    <Image src={`${process.env.NEXT_PUBLIC_LOCAL_BE_URL}/${displayImg.replace(/\\/g, '/')}`} alt="Product Image" width={500} height={500} className="w-full h-full object-cover" />
                ) : (
                    <Image src={NoImg} alt="Product Image" width={500} height={500} className="w-full h-full object-cover" />
                )}
                
                <div className="absolute top-[0px] right-[0px]">
                    <AuthProvider>
                        <AddToFav variantId={variantId} />
                    </AuthProvider>
                </div>
            </div>
            <div className="flex flex-wrap gap-5">
                {displayImages?.map((img, index) => (
                    <div key={index} className="relative w-[60px] h-[60px] sm:w-[110px] sm:h-[100px] cursor-pointer">
                        <div className={`bg-[#6689ff] w-full h-[4px] absolute bottom-0 left-0 z-10 ${img === displayImg ? '' : 'hidden'}`}></div>
                        <Image src={`${process.env.NEXT_PUBLIC_LOCAL_BE_URL}/${img.replace(/\\/g, '/')}`} alt={`Product Image ${index + 1}`} width={110} height={110} className="w-full h-full object-cover" onClick={() => setDisplayImg(img)} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DisplayVariantImg;