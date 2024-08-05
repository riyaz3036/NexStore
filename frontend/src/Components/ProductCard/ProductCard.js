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
        <Link href={`/Product/${product._id}`} className="relative flex flex-col items-center w-[260px] bg-[#e6e6e6] shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out">
            <div className="relative w-[240px] h-[240px] my-3">
                <Image src={`${BASE_URL}/${product?.images[0]?.replace(/\\/g, '/')}`} alt="Home Offers" width={260} height={250} className="w-full h-full object-cover"/>
            </div>

            <div className="p-2 bg-[#e6e6e6] w-full">
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
                <div className="absolute top-1 left-0 bg-[#6689ff] text-white text-xs p-2 italic" style={{borderRadius: '0 10px 10px 0'}}>
                    <p>BEST SELLER</p>
                </div>
                :
                <></>
            }
            
        </Link>
    )
}