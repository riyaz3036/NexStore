"use client"
import {useState,useContext,useEffect} from 'react'
import Image from "next/image";
import Link from "next/link";
import cart from '../../assets/cart.jpg';
import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";
import Button from "@/Components/Button/Button";
import { AuthContext } from '@/context/AuthContext';
import { BASE_URL } from '@/utils/config';
import CartCard from '../../Components/Cart/CartCard'

export default function Cart(){
    const { user } = useContext(AuthContext);

    // State for products in cart
    const [products, setProducts] = useState([]);
    const [productError, setProductError] = useState('');
    const [productLoading, setProductLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${BASE_URL}/cart/${user._id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setProducts(data.variants); // Set the variants array directly
            } catch (error) {
                setProductError('Error loading data');
            } finally {
                setProductLoading(false);
            }
        };
        if (user) {
            fetchProducts();
        }
    }, [user]);


    //function to calculate total
    const calcTotal = () =>{
        let total = 0;
        products.forEach((variant) => {
            total += variant.quantity * variant.variant_id.offer_price;
        }); 
        
        return total
    }

    return (
        <div>
            <Header />

            {/* Cover Image */}
            <div className="w-full h-[350px]">
                <Image className="h-full w-full object-cover" src={cart} alt="Cart Cover" />
            </div>  

            <div className="flex flex-wrap lg:flex-nowrap gap-5 mx-3 md:mx-10">
                {/* Products */}
                <div className="w-full">
                    <div className="flex items-center justify-between py-5 text-xl text-[#2d394b] font-bold">
                        <p>Shopping Cart</p>
                        <p>{products.length || 0} Items</p>
                    </div>

                    <div className="flex flex-col gap-2">
                        {/* Cart Card */}
                        {productError && <p className="p-5 text-xl text-center text-gray-500">{productError}</p>}
                        {productLoading && <p className="p-5 text-xl text-center text-gray-500">Loading...</p>}
                        {!productError && !productLoading && products.length === 0 && <p className="p-5 text-xl text-center text-gray-500">No Products in the cart</p>}
                        {!productError && !productLoading && products.map((variant) => (
                            <div key={variant.variant_id._id}><CartCard variant={variant} user={user} /></div>
                        ))}
                    </div>
                </div>

                {/* Summary */}
                <div className={`w-full lg:w-[350px] py-5 ${products.length===0?'hidden':''}`}>
                    <div className="text-base text-[#2d394b] font-bold"><p>Summary</p></div>
                    <div className="flex flex-col gap-1 text-sm">
                       <div className="flex justify-between py-1 ">
                            <p>Subtotal</p>
                            <p>₹{calcTotal() }</p>
                        </div>
                        <div className="flex justify-between py-1">
                            <p>Estimated Shipping</p>
                            <p>₹150</p>
                        </div>
                        <div className="flex justify-between py-1">
                            <p>Estimated Tax</p>
                            <p>--</p>
                        </div>
                        <div className="flex justify-between py-1 font-semibold" style={{borderTop:'1px solid #e6e6e6' , borderBottom: '1px solid #e6e6e6'}}>
                            <p>Total</p>
                            <p>₹{calcTotal() + 150}</p>
                        </div>
                    </div>
                    <Link href={`/Payment/${calcTotal()}`} className="py-5 flex justify-center">
                        <Button text={"CHECKOUT"} theme={"dark"}/>
                    </Link> 
                    
                </div>
            </div>

            <Footer />          
        </div>
    )
}