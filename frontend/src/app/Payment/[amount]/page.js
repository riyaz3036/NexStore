"use client";
import { useState, useContext } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from "next/image";
import Header from '@/Components/Header/Header';
import Footer from '@/Components/Footer/Footer';
import payment from '../../../assets/payment.jpg';
import Success from '../../../Components/Success/Success';
import { BASE_URL } from '@/utils/config';
import { AuthContext } from '@/context/AuthContext';

export default function Payment() {
    const { user } = useContext(AuthContext);
    const { amount } = useParams();
    const [success, setSuccess] = useState(0);

    // Object to store the Address (import from the state later)
    const [address, setAddress] = useState({
        street: '',
        locality: '',
        country: '',
        pincode: '',
        phone: ''
    });

    const [order, setOrder] = useState({
        user_id: user._id,
        total: parseInt(amount) + 150,
        address: '',
        payment_mode: ''
    });

    // Function to handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value,
        }));
    };

    const PayDone = async () => {
        // Checks
        if (!order.payment_mode) {
            alert('Select a mode of Payment!!');
            return;
        }
        const { street, locality, pincode, country, phone } = address;
        if (!(street && locality && pincode && country && phone)) {
            alert("Please Fill in all the delivery address details!!");
            return;
        }

        // Create order object with the current date and total price
        const fullAddress = `${address.street}, ${address.locality}, ${address.country}, ${address.pincode}, Phone: ${address.phone}`;

        const newOrder = {
            ...order,
            address: fullAddress,
        };

        //send order api
        try {
            const res = await fetch(`${BASE_URL}/order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newOrder),
            });

            const result = await res.json();

            if (!res.ok) {
                alert(result.message);
                return;
            }
            setSuccess(1);
            
        } catch (e) {
            alert('Error creating the order');
        }
    };

    return (
        <main>
            <Header />

            {/* Cover Image */}
            <div className="w-full h-[350px]">
                <Image className="h-full w-full object-cover" src={payment} />
            </div>

            <div className="flex justify-center flex-wrap lg:flex-nowrap gap-5 py-10 px-5">
                <div className="w-[800px]">
                    <div className="bg-[#e6e6e6] p-2 mb-3">
                        <p className="text-sm text-[#2d394b] font-bold mb-1">1. DELIVERY ADDRESS</p>
                    </div>   
                    <div className="flex flex-col gap-5 mb-5">
                        <input type="text" id="street" name="street" placeholder="Enter street details" className="py-2 px-4 focus:outline-none" style={{ border: '1px solid #e6e6e6' }} required value={address.street} onChange={handleChange} />
                        <input type="text" id="locality" name="locality" placeholder="Enter locality details" className="py-2 px-4 focus:outline-none" style={{ border: '1px solid #e6e6e6' }} required value={address.locality} onChange={handleChange} />
                        <div className="flex flex-wrap sm:flex-nowrap w-full gap-5">
                            <input type="number" id="pincode" name="pincode" placeholder="Enter pincode" className="w-full sm:w-1/2 py-2 px-4 focus:outline-none" style={{ border: '1px solid #e6e6e6' }} required value={address.pincode} onChange={handleChange} />
                            <input type="text" id="country" name="country" placeholder="Enter the country" className="w-full sm:w-1/2 py-2 px-4 focus:outline-none" style={{ border: '1px solid #e6e6e6' }} required value={address.country} onChange={handleChange} />
                        </div>
                        <input type="number" id="phone" name="phone" placeholder="Enter phone number" className="py-2 px-4 focus:outline-none" style={{ border: '1px solid #e6e6e6' }} required value={address.phone} onChange={handleChange} />
                    </div>
                    <div className="bg-[#e6e6e6] p-2 mb-3">
                        <p className="text-sm text-[#2d394b] font-bold mb-1">2. PAYMENT</p>
                    </div>
                    <div className="flex flex-col gap-2 mb-5">
                        <button className="flex gap-2 items-center w-full sm:w-1/2 py-2 px-4" style={{ border: '1px solid #e6e6e6' }} onClick={() => setOrder({ ...order, payment_mode: 'Bitcoin' })}>
                            <div className="w-3 h-3 bg-white rounded-md" style={{ border: order.payment_mode === "Bitcoin" ? '4px solid #6689ff' : '1px solid #e6e6e6' }}></div>
                            <p className="">Bitcoin</p>
                        </button>
                        <button className="flex gap-2 items-center w-full sm:w-1/2 py-2 px-4" style={{ border: '1px solid #e6e6e6' }} onClick={() => setOrder({ ...order, payment_mode: 'Apple Wallet' })}>
                            <div className="w-3 h-3 bg-white rounded-md" style={{ border: order.payment_mode === "Apple Wallet" ? '4px solid #6689ff' : '1px solid #e6e6e6' }}></div>
                            <p className="">Apple Wallet</p>
                        </button>
                        <button className="flex gap-2 items-center w-full sm:w-1/2 py-2 px-4" style={{ border: '1px solid #e6e6e6' }} onClick={() => setOrder({ ...order, payment_mode: 'Paypal' })}>
                            <div className="w-3 h-3 bg-white rounded-md" style={{ border: order.payment_mode === "Paypal" ? '4px solid #6689ff' : '1px solid #e6e6e6' }}></div>
                            <p className="">Paypal</p>
                        </button>
                        <button className="flex gap-2 items-center w-full sm:w-1/2 py-2 px-4" style={{ border: '1px solid #e6e6e6' }} onClick={() => setOrder({ ...order, payment_mode: 'Debit/Credit Card' })}>
                            <div className="w-3 h-3 bg-white rounded-md" style={{ border: order.payment_mode === "Debit/Credit Card" ? '4px solid #6689ff' : '1px solid #e6e6e6' }}></div>
                            <p className="">Debit/Credit Card</p>
                        </button>
                    </div>
                </div>
                <div className="px-5 py-5 shadow w-full lg:w-[400px] h-[280px]">
                    <div className="p-2 mb-1">
                        <p className="text-[#2d394b] text-sm">ORDER SUMMARY</p>
                    </div>
                    <div className="flex justify-between items-center p-2 text-sm font-semibold">
                        <p>Subtotal</p>
                        <p>₹{amount}</p>
                    </div>
                    <div className="flex justify-between items-center p-2 text-sm">
                        <p>Delivery</p>
                        <p>+ ₹150</p>
                    </div>
                    <div className="flex justify-between items-center p-2 text-sm font-semibold" style={{ borderTop: '1px solid #e6e6e6', borderBottom: '1px solid #e6e6e6' }}>
                        <p>Total</p>
                        <p>₹{parseInt(amount) + 150}</p>
                    </div>                    
                    <div className="flex flex-wrap items-center justify-between mt-10">
                        <button className="bg-[#fff] text-[#2d394b] px-2 py-1 rounded">
                            <i className="ri-arrow-left-s-fill"></i>
                            <Link href="/Cart" className="text-sm cursor-pointer">Back</Link>
                        </button>
                        <button className="text-white text-sm py-2 px-3 rounded bg-[#2d394b]" onClick={PayDone}>
                            Pay ₹{parseInt(amount) + 150}
                        </button>
                    </div>
                    {success === 1 && <Success />}
                </div>
            </div>
            <Footer />
        </main>
    );
}
