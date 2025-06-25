import ColorConstants from '@/constants/ColorConstants';
import { ExpandedProduct } from '@/types/product.types';
import { Variant } from '@/types/variant.types';
import { generateRoute } from '@/utils/generateRoute';
import Link from "next/link";
import 'react-alice-carousel/lib/alice-carousel.css';
import AddToCart from './AddToCart';
import DisplayVariantImg from './DisplayVariantImg';
import RelatedVariants from './RelatedVariants';
import AuthProvider from '@/auth/AuthProvider';
import { useEffect, useState } from 'react';
import VariantService from '@/services/variant.service';
import { message } from '../common/message/message';
import { MsgEnum } from '@/enums/message-enum';
import LoaderOverlay from '../common/Loader/LoaderOverlay';


interface VariantMainProps {
    id: string
}

const VariantMain: React.FC<VariantMainProps> = ({id}) => {
    
    const [product, setProduct] = useState<ExpandedProduct>();
    const [loading, setLoading] = useState<boolean>(false);
    const variant: Variant | undefined = product ? product.variants.find(v => v.id === id) : undefined;

    const fetchExpandedProduct = () => {
        setLoading(true);
        VariantService.fetchExpandedProduct(id)
            .then((response) => {
                setProduct(response?.data);
            })
            .catch((error) => {
                console.error('Error fetching product details', error);
                message.open({ text: error.response.data.message || 'Error fetching product details', type: MsgEnum.ERROR });
            })
            .finally(() => {
                setLoading(false);
            });
    }
    
    useEffect(() => {
        fetchExpandedProduct();
    }, []);

    return (
        <div>
            {product && variant && (
                <div className="flex flex-wrap justify-center">
                    {/* Product Images */}
                    <DisplayVariantImg variantId={id} displayImages={variant ? variant.images : []} />

                    {/* Product Details */}
                    <div className="p-3 w-full lg:w-[500px]">
                        <div className="flex gap-2">
                            <div className="font-bold text-2xl mb-1" style={{color: ColorConstants.secondaryColor}}>
                                <p>{variant.product?.name || 'Product Name'} - {variant.name || 'Product Name'}</p>
                            </div>
                        </div>

                        <div className="flex gap-3 text-xl mb-3">
                            <p className="line-through" style={{color: ColorConstants.darkGrey}}>₹{variant.price}</p>
                            <p className="font-semibold" style={{color: ColorConstants.primaryColor}}>₹{variant.offerPrice}</p>
                        </div>

                        <div className="mb-[20px]">
                            <p className="font-semibold text-sm" style={{color: ColorConstants.secondaryColor}}>Variants:</p>
                            <div className="flex flex-wrap gap-3 mt-[8px]">
                                {product?.variants?.map((variant, index) => (
                                    <Link key={index} href={generateRoute.product(variant.id)}>
                                        <button className={`p-2 hover:text-white hover:bg-[#2d394b] transition duration-500 ease-in-out ${variant.id === id ? 'bg-[#2d394b] text-white' : ''}`} style={{ border: '1px solid #2d394b' }}>
                                            <p>{variant.name}</p>
                                        </button>
                                    </Link>
                                ))}
                            </div>
                        </div>


                        <AuthProvider>
                            <AddToCart variantId={id} />
                        </AuthProvider>
                    

                        <div className="mb-5">
                            <div className="flex items-center gap-2 mb-1">
                                <p className="font-semibold text-sm" style={{color: ColorConstants.secondaryColor}}>About Product:</p>
                            </div>
                            <p className="text-base" style={{color: ColorConstants.darkGrey}}>{variant.product?.description || 'No description available.'}</p>
                        </div>
                        
                        <div className="mb-5">
                            <div className="flex items-center gap-2 mb-1">
                                <p className="font-semibold text-sm" style={{color: ColorConstants.secondaryColor}}>Additional Information:</p>
                            </div>
                            <p className="text-base" style={{color: ColorConstants.darkGrey}}>{variant.description || 'No additional information.'}</p>
                        </div>
                    </div>
                </div>
            )}
            
            
            {/* You may also like suggessions */}
            {product && (<RelatedVariants variants={product.relatedVariants}/>)}

            {loading && (<LoaderOverlay />)}
        </div>
    );
}


export default VariantMain;