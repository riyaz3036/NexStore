"use client"
import AliceCarousel from "react-alice-carousel";
import VariantCard from "../common/VariantCard/VariantCard";
import { ExpandedProduct } from "@/types/product.types";
import ColorConstants from "@/constants/ColorConstants";
import { CaretRightFilled, CaretLeftFilled } from '@ant-design/icons';
import { Variant } from "@/types/variant.types";

interface RelatedVariantsProps {
    variants: Variant[]
}

const RelatedVariants: React.FC<RelatedVariantsProps>  = ({variants}) => {

    const items = variants?.map((variant, index) => (
        <div className="m-5 shadow-lg">
            <VariantCard key={variant.id} variant={variant}/>
        </div>
    ));

    return (
        <div className="flex flex-col items-center mt-10">
            <p className="text-center text-xl font-semibold" style={{color: ColorConstants.secondaryColor}}>YOU MAY ALSO LIKE</p>
            <div className="w-[300px] sm:w-[580px] lg:w-[870px] pb-[10px]">
                <AliceCarousel
                    items={items}
                    responsive={{
                        0: { items: 1 },
                        640: { items: 2 },
                        1024: { items: 3 },
                    }}
                    autoPlay
                    autoPlayInterval={3000}
                    infinite
                    disableDotsControls
                    renderPrevButton={() => (
                        <button className="absolute -left-5 top-1/2 transform -translate-y-1/2 bg-white w-12 h-12 rounded-full p-2 shadow-lg" style={{color: ColorConstants.secondaryColor}}>
                            <CaretLeftFilled />
                        </button>
                    )}
                    renderNextButton={() => (
                        <button className="absolute -right-5 top-1/2 transform -translate-y-1/2 bg-white w-12 h-12 rounded-full p-2 shadow-lg" style={{color: ColorConstants.secondaryColor}}>
                            <CaretRightFilled />
                        </button>
                    )}
                />
            </div>
        </div>
    )
}

export default RelatedVariants;
