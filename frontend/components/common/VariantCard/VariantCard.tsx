import ColorConstants from "@/constants/ColorConstants";
import { Variant } from "@/types/variant.types";
import { generateRoute } from "@/utils/generateRoute";
import Image from "next/image";
import Link from "next/link";
import NoImg from '../../../assets/image_not_available.png'
import Unfavorite from "@/components/favorites/Unfavorite";

interface VariantProps {
    variant: Variant
    favId?: string;
    unFavoraite?: (id: string) => void;
}

const VariantCard: React.FC<VariantProps> = ({variant, favId, unFavoraite}) => {

    // Function to calculate discount percentage
    const calculateDiscount = () => {
        const discount = ((variant.price - variant.offerPrice) / variant.price) * 100;
        return Math.round(discount);
    };


    return(
        <div className="w-[300px] shadow cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out">
             <Link href={generateRoute.product(variant.id)} className="relative flex flex-col items-center w-[300px] p-[10px]" style={{backgroundColor: ColorConstants.grey2}}>
                <div className="relative w-full h-[250px] py-[5px] bg-white">
                    {variant && variant.images && variant.images.length > 0 ? (
                        <Image src={`${process.env.NEXT_PUBLIC_LOCAL_BE_URL}/${variant?.images[0]?.replace(/\\/g, '/')}`} alt="Home Offers" width={260} height={250} className="w-full h-full object-cover"/>
                    ): (
                        <Image src={NoImg} alt="Home Offers" width={260} height={250} className="w-full h-full object-cover"/>
                    )}
                </div>

                <div className="py-2 w-full flex flex-col gap-[5px] h-[105px]">
                    <p className="text-center" style={{color: ColorConstants.darkGrey, fontSize: '14px'}}>{variant.product.category.description}</p>
                    {variant?.product?.name && variant?.name && (
                         <p className="font-semibold overflow-hidden text-ellipsis whitespace-normal line-clamp-2 text-center" style={{color: ColorConstants.black, fontSize: '16px'}}>{variant.product.name}-{variant.name}</p>
                    )}
                    <p className="text-lg text-center italic" style={{color: ColorConstants.secondaryColor}}>₹{variant.offerPrice}</p>
                </div>

                {/* Discount Label */}
                {
                    calculateDiscount()?
                    <div className="absolute top-1 right-0 font-semibold text-white text-xs p-1" style={{backgroundColor: ColorConstants.secondaryColor}}>
                        <p>{calculateDiscount()}% OFF</p>
                    </div>
                    :
                    <></>
                }
                
                {/* Best seller */}
                {
                    variant.product.isBestSeller?
                    <div className="absolute top-1 left-0 text-white text-xs py-1 px-2 font-semibold" style={{backgroundColor: ColorConstants.primaryColor}}>
                        <p>BEST SELLER</p>
                    </div>
                    :
                    <></>
                }    
            </Link>
            {favId && unFavoraite && (
                <Unfavorite unFavoraite={unFavoraite} favId={favId}/>
            )}
        </div>
       
    )
}


export default VariantCard;