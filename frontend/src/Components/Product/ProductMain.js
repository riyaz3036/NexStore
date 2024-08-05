"use client";
import { useState, useEffect,useContext } from 'react';
import Image from "next/image";
import Link from "next/link";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css'; 
import ProductCard from '@/Components/ProductCard/ProductCard';
import { BASE_URL } from '@/utils/config';
import { AuthContext } from '@/context/AuthContext';

export default function ProductMain({product,productError,relatedProducts,relatedError,id}) {
    const { user } = useContext(AuthContext);
    
    //to preview the added to cart messagae
    const [addedmsg, setAddedmsg] = useState(false);

    //to preview the added to favoraite messagae
    const [addedFav, setAddedFav] = useState(false);

    //to handle add to cart functionality
    const [toAddFav,setToAddFav] =useState({
        variant_id: id,
    });

    const handleAddToFav = async (e) => {
        try {
            if(!user){
                alert('Please Login to access favoraites')
                return;
            }
            const res = await fetch(`${BASE_URL}/favoraites/${user._id}`, {
                method: 'post',
                headers: {
                'content-type': 'application/json'
                },
                body: JSON.stringify(toAddFav)
            });
            const result = await res.json();
    
            if (!res.ok) {
                alert(result.message);
                return;
            }
            setAddedFav(true);         
            } catch (e) {
            alert('Error adding to favoraites')
        }
    };

    //to handle add to cart functionality
    const [toAdd,setToAdd] =useState({
        variant_id: id,
        quantity: 1
    });
   
   const incrementQuantity = () => {
        setToAdd(prevState => ({
            ...prevState,
            quantity: prevState.quantity + 1
        }));
    };

    const decrementQuantity = () => {
        setToAdd(prevState => ({
            ...prevState,
            quantity: prevState.quantity - 1
        }));
    };

    const handleAddToCart = async (e) => {
        try {
            if(!user){
                alert('Please Login to access cart')
                return;
            }
            const res = await fetch(`${BASE_URL}/cart/${user._id}`, {
                method: 'post',
                headers: {
                'content-type': 'application/json'
                },
                body: JSON.stringify(toAdd)
            });
            const result = await res.json();
    
            if (!res.ok) {
                alert(result.message);
                return;
            }
            setAddedmsg(true);         
            } catch (e) {
            alert('Error adding to cart')
        }
    };

    // To manage display image
    const [displayImg, setDisplayImg] = useState('');
    useEffect(() => {
        if (product.images?.length) {
            setDisplayImg(product.images[0]);
        }
    }, [product.images]);

    const items = relatedProducts?.map((prod, index) => (
        <div className="m-5 shadow-lg">
            <ProductCard key={index} product={prod}/>
        </div>
    ));

    return (
        <div>
            <div className="flex flex-wrap justify-center">
                {/* Product Images */}
                <div className="flex flex-col gap-3 p-3">
                    <div className="relative w-[280px] h-[280px] sm:w-[500px] sm:h-[500px]">
                        <Image src={`${BASE_URL}/${displayImg.replace(/\\/g, '/')}`} alt="Product Image" width={500} height={500} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-wrap gap-5">
                        {product.images?.map((img, index) => (
                            <div key={index} className="relative w-[60px] h-[60px] sm:w-[110px] sm:h-[100px] cursor-pointer">
                                <div className={`bg-[#6689ff] w-full h-[4px] absolute bottom-0 left-0 z-10 ${img === displayImg ? '' : 'hidden'}`}></div>
                                <Image src={`${BASE_URL}/${img.replace(/\\/g, '/')}`} alt={`Product Image ${index + 1}`} width={110} height={110} className="w-full h-full object-cover" onClick={() => setDisplayImg(img)} />
                            </div>
                        ))}
                    </div>
                </div>
                {/* Product Details */}
                <div className="p-3 w-full lg:w-[500px]">
                    <div className="flex gap-2">
                        <div className="text-[#2d394b] font-bold text-2xl mb-1">
                            <p>{product.product_id?.name || 'Product Name'} - {product.name || 'Product Name'}</p>
                        </div>
                        <div className="text-2xl h-[40px] w-[40px] bg-[#6689ff] px-5 flex items-center justify-center text-white cursor-pointer" onClick={handleAddToFav} style={{borderRadius: '20px'}}>
                            <i class="ri-heart-fill"></i>
                        </div>
                    </div>
                    <div className="flex gap-3 text-xl mb-3">
                        <p className="line-through text-gray-400">₹{product.price || '00000'}</p>
                        <p className="text-[#6689ff] font-semibold">₹{product.offer_price || '00000'}</p>
                    </div>
                    <div className="mb-5">
                        <p className="font-semibold text-sm text-[#2d394b] mb-1">Variants:</p>
                        <div className="flex flex-wrap gap-3">
                            {product.product_id?.variants?.map((variant, index) => (
                                <Link key={index} href={`/Product/${variant._id}`}>
                                    <button className={`py-1 px-2 hover:text-white hover:bg-[#2d394b] transition duration-500 ease-in-out ${variant._id === id ? 'bg-[#2d394b] text-white' : ''}`} style={{ border: '1px solid #2d394b' }}>
                                        <p>{variant.name}</p>
                                    </button>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="flex mb-5">
                        <div className="flex h-[40px] bg-red-200">
                            <button className="h-full w-10 bg-[#e6e6e6]" disabled={toAdd.quantity === 1} onClick={decrementQuantity}>-</button>
                            <div className="h-full w-16 bg-[#e6e6e6] flex items-center justify-center"><p>{toAdd.quantity}</p></div>
                            <button className="h-full w-10 bg-[#e6e6e6]" onClick={incrementQuantity}>+</button>
                        </div>
                        <div className="h-[40px] text-white">
                            <button className="h-full w-32 text-sm bg-[#6689ff]" onClick={handleAddToCart}>ADD TO CART</button>
                        </div>
                    </div>
                    <div className="mb-5">
                        <div className="flex items-center gap-2 mb-1">
                            <div><i className="ri-edit-2-line"></i></div>
                            <p className="font-semibold text-sm text-[#2d394b]">About Product:</p>
                        </div>
                        <p className="text-gray-500 text-base">{product.product_id?.description || 'No description available.'}</p>
                    </div>
                    <div className="mb-5">
                        <div className="flex items-center gap-2 mb-1">
                            <div><i className="ri-link"></i></div>
                            <p className="font-semibold text-sm text-[#2d394b]">Additional Information:</p>
                        </div>
                        <p className="text-gray-500 text-base">{product.description || 'No additional information.'}</p>
                    </div>
                </div>
            </div>
            
            {/* You may also like suggessions */}
            <div className="flex flex-col items-center mt-10">
                <p className="text-center text-[#2d394b] text-xl font-semibold">YOU MAY ALSO LIKE</p>
                <div className="w-[300px] sm:w-[580px] lg:w-[870px] p-5">
                    {relatedError && <p className="p-5 text-xl text-center text-gray-500">{relatedError}</p>}
                    {!relatedError  && 
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
                            <button className="absolute -left-5 top-1/2 transform -translate-y-1/2 bg-white w-12 h-12 rounded-full p-2 text-black shadow-lg">
                                &lt;
                            </button>
                        )}
                        renderNextButton={() => (
                            <button className="absolute -right-5 top-1/2 transform -translate-y-1/2 bg-white w-12 h-12 rounded-full p-2 text-black shadow-lg">
                                &gt;
                            </button>
                        )}
                    />
                    }
                </div>
            </div>

            {/* Added to cart Message */}
            {addedmsg && (
                <div className="fixed top-[120px] left-0 right-0 bg-[#6689ff] flex text-sm items-center py-1 text-white gap-2 w-full z-10">
                    <div className="flex gap-1 justify-center w-full">
                        <p>ADDED TO CART.</p>
                        <Link href="/Cart" className="underline">CHECK NOW</Link>
                    </div>
                    <p onClick={() => setAddedmsg(false)} className="cursor-pointer text-xl px-5">x</p>
                </div>
            )}

            {/* Added to favoraites Message */}
            {addedFav && (
            <div className="fixed top-[120px] left-0 right-0 bg-[#6689ff] flex text-sm items-center py-1 text-white gap-2 w-full z-10">
                <div className="flex gap-1 justify-center w-full">
                    <p>ADDED TO FAVORAITES.</p>
                    <Link href="/Favoraites" className="underline">CHECK NOW</Link>
                </div>
                <p onClick={() => setAddedFav(false)} className="cursor-pointer text-xl px-5">x</p>
            </div>
            )}

        </div>
    );
}
