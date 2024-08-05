import Image from "next/image"
import Link from 'next/link'
import ProductCard from "../ProductCard/ProductCard"
import Button from "../Button/Button"
import home_electronics from '../../assets/home_electronics.jpg'
import home_fashion from '../../assets/home_fashion.jpg'
import home_kitchen from '../../assets/home_kitchen.jpg'
import home_beauty from '../../assets/home_beauty.jpg'
import home_health from '../../assets/home_health.jpg'
import home_sports from '../../assets/home_sports.jpg'
import home_toys from '../../assets/home_toys.jpg'
import home_media from '../../assets/home_media.jpg'


export default function CategoryPreview({left,category}){


    const getCoverImage = (categoryId) => {
        switch (categoryId) {
          case "66abc8bd2abb0c792856ad28":
            return home_electronics;
          case "66abc8e32abb0c792856ad2a":
            return home_fashion;
          case "66abc8eb2abb0c792856ad2c":
            return home_kitchen;
          case "66abc8f32abb0c792856ad2e":
            return home_beauty;
          case "66abc8f82abb0c792856ad30":
            return home_health;
          case "66abc8fe2abb0c792856ad32":
            return home_sports;
          case "66abc9042abb0c792856ad34":
            return home_toys;
          case "66abc90b2abb0c792856ad36":
            return home_media;
        }
      };
      
    return(
        <section className="w-full flex flex-wrap items-center justify-center gap-10 p-5 my-10">
            {/* left component */}
            <div className={`hidden ${left?'xl:block':''}`}>
                <div className="flex items-center gap-3 py-3">
                    <p className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2d394b]">{category.category_name}</p>
                    <Link href={`/Products/${category.category_id}`}><Button text={"VIEW MORE"} theme={"dark"}/></Link>
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                    {category.variants.map(variant => (                     
                    <ProductCard key={variant._id} product={variant}/>
                    ))}
                </div>
            </div>
            
            {/* Cover Image */}
            <div className="relative h-[400px] w-full xl:w-[600px]">
                <Image src={getCoverImage(category.category_id)} alt="Home Offers" className="w-full h-full object-cover"/>
            </div>
            
            {/* right component */}
            <div className={`${left?'xl:hidden':''}`}>
                <div className="flex items-center gap-3 py-3">
                    <p className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2d394b]">{category.category_name}</p>
                    <Link href={`/Products/${category.category_id}`}><Button text={"VIEW MORE"} theme={"dark"}/></Link>
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                    {category.variants.map(variant => (                     
                        <ProductCard key={variant._id} product={variant}/>
                    ))}
                </div>
            </div>

        </section>
    )
}