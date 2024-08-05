"use client"
import {useState,useContext,useEffect} from 'react'
import Image from "next/image";
import orders_cover from '../../assets/orders_cover.jpg'
import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";
import { AuthContext } from '@/context/AuthContext';
import { BASE_URL } from '@/utils/config';
import { format } from 'date-fns';

export default function Cart(){
    const { user } = useContext(AuthContext);

    // State for orders
    const [orders, setOrders] = useState([]);
    const [orderError, setOrderError] = useState('');
    const [orderLoading, setOrderLoading] = useState(true);

    // Handle remove from cart
    const cancelOrder = async (id) => {
        try {
            const res = await fetch(`${BASE_URL}/order/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await res.json();

            if (!res.ok) {
                alert(result.message);
                return;
            }
            window.location.reload();
        } catch (e) {
            alert('Error removing the order');
        }
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`${BASE_URL}/order/user/${user._id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setOrders(data); 
            } catch (error) {
                setOrderError('Error loading data');
            } finally {
                setOrderLoading(false);
            }
        };
        if (user) {
            fetchOrders();
        }
    }, [user]);

    // Format date utility function using date-fns
    const formatDate = (dateString) => {
        try {
        const date = new Date(dateString);
        return format(date, 'dd-MM-yyyy');
        } catch (error) {
        console.error('Error formatting date:', error);
        return 'Invalid Date';
        }
    };

    return (
        <div>
            <Header />

            {/* Cover Image */}
            <div className="w-full h-[350px]">
                <Image className="h-full w-full object-cover" src={orders_cover} alt="Cart Cover" />
            </div>  

            <div className="flex flex-wrap lg:flex-nowrap gap-5 mx-3 md:mx-10">
                {/* Products */}
                <div className="w-full">
                    <div className="flex items-center justify-between py-5 text-xl text-[#2d394b] font-bold">
                        <p>Orders</p>
                        <p>{orders.length} Items</p>
                    </div>

                    <div className="flex flex-col gap-2">
                        {/* Order Card */}
                        {orderError && <p className="p-5 text-xl text-center text-gray-500">{orderError}</p>}
                        {orderLoading && <p className="p-5 text-xl text-center text-gray-500">Loading...</p>}
                        {!orderError && !orderLoading && orders.length === 0 && <p className="p-5 text-xl text-center text-gray-500">No Orders yet</p>}
                        {!orderError && !orderLoading && orders.map((order) => (
                            <div key={order._id} className="shadow-lg px-5 pt-5 bg-[#e6e6e6]">
                                <div className="flex justify-end text-sm text-gray-400"><p>{formatDate(order.createdAt)}</p></div>
                                <div className="flex flex-col gap-2">
                                    {
                                        order.variants.map((variant)=>(
                                            <div key={variant.variant_id._id} className="flex gap-2 bg-white">
                                                <div className="w-[100px] h-[100px] "><Image src={`${BASE_URL}/${variant.variant_id?.images[0]?.replace(/\\/g, '/')}`}  width={200} height={200} className="w-full h-full object-cover" /></div>
                                                <div className="flex justify-between w-full gap-5">
                                                    <div className="text-gray-400 flex flex-col py-1">
                                                        <p className="text-sm sm:text-lg text-[#2d394b] font-semibold">{variant.variant_id.product_id.name}</p>
                                                        <p className="text-xs sm:text-sm">{variant.variant_id.name}</p>
                                                        <p className="text-xs sm:text-sm">Quantity: {variant.quantity}</p>
                                                    </div>
                                                    <div className="text-[#2d394b] text-sm sm:text-lg font-semibold py-1"><p>₹{variant.variant_id.offer_price * variant.quantity}</p></div>
                                                </div>  
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="flex justify-end py-1"><button onClick={() => cancelOrder(order._id)} className="bg-[#8B0000] text-white px-3 py-1">CANCEL</button></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />          
        </div>
    )
}