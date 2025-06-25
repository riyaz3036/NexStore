import ColorConstants from "@/constants/ColorConstants"
import { ButtonTypeEnum } from "@/enums/button-type.enum"
import { PreviewVariant } from "@/types/preview.types"
import { generateRoute } from "@/utils/generateRoute"
import Image from "next/image"
import Link from 'next/link'
import Button from "../common/Button/Button"
import VariantCard from "../common/VariantCard/VariantCard"

interface CategoryPreviewProps {
  left: boolean,
  preview: PreviewVariant
}

const CategoryPreview: React.FC<CategoryPreviewProps> = ({left, preview}) => {
      
    return(
        <section className="w-full flex flex-wrap items-end justify-center gap-10 p-5 my-10">
            {/* left component */}
            <div className={`hidden ${left?'xl:block':''}`}>
                <div className="flex items-center gap-3 py-[24px]">
                    <p className="text-xl md:text-2xl lg:text-3xl font-bold" style={{color: ColorConstants.secondaryColor}}>{preview.category.description}</p>
                    <Link href={generateRoute.productWithCategoryFilter(preview.category.id)}><Button text={"VIEW MORE"} theme={ButtonTypeEnum.DARK}/></Link>
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                    {preview.variants.map(variant => (                     
                      <VariantCard key={variant.id} variant={variant}/>
                    ))}
                </div>
            </div>
            
            {/* Cover Image */}
            <div className="relative h-[400px] w-full xl:w-[600px]">
                <Image src={`${process.env.NEXT_PUBLIC_BE_URL}/${preview.category.image.replace(/\\/g, '/')}`} alt="Home Offers" height={400} width={600} className="w-full h-full object-cover"/>
            </div>
            
            {/* right component */}
            <div className={`${left?'xl:hidden':''}`}>
                <div className="flex items-center gap-3 py-[24px]">
                    <p className="text-xl md:text-2xl lg:text-3xl font-bold" style={{color: ColorConstants.secondaryColor}}>{preview.category.description}</p>
                    <Link href={generateRoute.productWithCategoryFilter(preview.category.id)}><Button text={"VIEW MORE"} theme={ButtonTypeEnum.DARK}/></Link>
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                    {preview.variants.map(variant => (                     
                        <VariantCard key={variant.id} variant={variant}/>
                    ))}
                </div>
            </div>

        </section>
    )
}


export default CategoryPreview;