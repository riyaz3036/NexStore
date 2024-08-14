import Image from "next/image"
import { BASE_URL } from "@/utils/config";
import Link from "next/link";


export default function ProductCard({product}){

    // Function to calculate discount percentage
    const calculateDiscount = () => {
        const discount = ((product.price - product.offer_price) / product.price) * 100;
        return Math.round(discount);
    };

    return(
        <Link href={`/Product/${product._id}`} className="relative flex flex-col items-center w-[260px] bg-[#f5f3f3] shadow cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out">
            <div className="relative w-[250px] h-[250px] py-[5px]">
                <Image src={`${BASE_URL}/${product?.images[0]?.replace(/\\/g, '/')}`} alt="Home Offers" width={260} height={250} className="w-full h-full object-cover"/>
            </div>

            <div className="p-2 bg-[#f5f3f3] w-full">
                <p className="text-sm text-center text-gray-400">{product.product_id.category_id?.name}</p>
                <p className="text-lg font-semibold overflow-hidden text-ellipsis whitespace-nowrap text-center">{product.product_id.name}-{product.name}</p>
                <p className="text-lg text-center italic">₹{product.offer_price}</p>
            </div>

            {/* Discount Label */}
            {
                calculateDiscount()?
                <div className="absolute top-1 right-0 bg-[#2d394b] font-semibold text-white text-xs p-1">
                    <p>{calculateDiscount()}% OFF</p>
                </div>
                :
                <></>
            }
            
            {/* Best seller */}
            {
                product.product_id.best_seller?
                <div className="absolute top-1 left-0 bg-[#6689ff] text-white text-xs py-1 px-2 font-semibold">
                    <p>BEST SELLER</p>
                </div>
                :
                <></>
            }
            
        </Link>
    )
}