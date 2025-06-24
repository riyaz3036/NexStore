"use client"
import { Address } from "@/app/payment/page";
import { useAuth } from "@/auth/AuthProvider";
import ColorConstants from "@/constants/ColorConstants";
import RouteConstants from "@/constants/RouteConstants";
import { Cart } from "@/types/cart.types";
import { CreateOrderRequest, CreateOrderVariantRequest } from "@/types/order.types";
import { useState } from "react";
import { Link } from "react-alice-carousel";
import OrderPayment from "./OrderPayment";

interface OrderFormProps {
    total: number;
    cartItems: Cart[];
}


const OrderForm: React.FC<OrderFormProps> = ({ total, cartItems }) => {
    const { user } = useAuth();
    // Object to store the Address (import from the state later)
    const [address, setAddress] = useState<Address>({
        street: '',
        locality: '',
        country: '',
        pincode: '',
        phone: ''
    });

    const [order, setOrder] = useState<CreateOrderRequest>({
        userId: user ? user.id : '',
        variants: cartItems.reduce((acc, cartItem) => {
            acc.push({ variantId: cartItem.variant.id, quantity: cartItem.quantity });
            return acc;
        }, [] as CreateOrderVariantRequest[]),
        total: total + 150,
        address: '',
        paymentMode: ''
    });


    // Function to handle input changes
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value,
        }));
    };

    const PaymentOptions = ({ order, setOrder, ColorConstants }: { order: CreateOrderRequest, setOrder: any, ColorConstants: any }) => (
        <div className="flex flex-col gap-2 mb-5" style={{ color: ColorConstants.black }}>
            {['Bitcoin', 'Apple Wallet', 'Paypal', 'Debit/Credit Card'].map((mode) => (
                <button key={mode} className="flex gap-2 items-center w-full sm:w-1/2 py-2 px-4" style={{ border: '1px solid #e6e6e6' }} onClick={() => setOrder((prev: any) => ({ ...prev, paymentMode: mode }))}>
                    <div className="w-3 h-3 bg-white rounded-md" style={{ border: order.paymentMode === mode ? `4px solid ${ColorConstants.primaryColor}` : `1px solid ${ColorConstants.grey}` }}></div>
                    <p className="">{mode}</p>
                </button>
            ))}
        </div>
    );


    return (
        <div className="w-[800px]">
            <div className="p-2 mb-3" style={{ backgroundColor: ColorConstants.grey }}>
                <p className="text-sm font-bold mb-1" style={{ color: ColorConstants.secondaryColor }}>1. DELIVERY ADDRESS</p>
            </div>
            <div className="flex flex-col gap-5 mb-5" style={{ color: ColorConstants.black }}>
                <input type="text" id="street" name="street" placeholder="Enter street details" className="py-2 px-4 focus:outline-none" style={{ border: `1px solid ${ColorConstants.grey}` }} required value={address.street} onChange={handleChange} />
                <input type="text" id="locality" name="locality" placeholder="Enter locality details" className="py-2 px-4 focus:outline-none" style={{ border: '1px solid #e6e6e6' }} required value={address.locality} onChange={handleChange} />
                <div className="flex flex-wrap sm:flex-nowrap w-full gap-5">
                    <input type="number" id="pincode" name="pincode" placeholder="Enter pincode" className="w-full sm:w-1/2 py-2 px-4 focus:outline-none" style={{ border: `1px solid ${ColorConstants.grey}` }} required value={address.pincode} onChange={handleChange} />
                    <input type="text" id="country" name="country" placeholder="Enter the country" className="w-full sm:w-1/2 py-2 px-4 focus:outline-none" style={{ border: `1px solid ${ColorConstants.grey}` }} required value={address.country} onChange={handleChange} />
                </div>
                <input type="number" id="phone" name="phone" placeholder="Enter phone number" className="py-2 px-4 focus:outline-none" style={{ border: `1px solid ${ColorConstants.grey}` }} required value={address.phone} onChange={handleChange} />
            </div>
            <div className="p-2 mb-3" style={{ backgroundColor: ColorConstants.grey }}>
                <p className="text-sm font-bold mb-1" style={{ color: ColorConstants.secondaryColor }}>2. PAYMENT</p>
            </div>
            <PaymentOptions order={order} setOrder={setOrder} ColorConstants={ColorConstants} />

            <div className="flex flex-wrap items-center justify-between mt-10">
                <button className="text-white text-[16px] py-[6px] w-[100px] rounded" style={{ backgroundColor: ColorConstants.secondaryColor }}>
                    <Link href={RouteConstants.cart} className="text-sm cursor-pointer">Back</Link>
                </button>
                <OrderPayment amount={total} order={order} address={address} />
            </div>
        </div>
    )


}

export default OrderForm;