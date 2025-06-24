"use client"
import { Address } from "@/app/payment/page";
import ColorConstants from "@/constants/ColorConstants";
import OrderService from "@/services/order.service";
import { CreateOrderRequest } from "@/types/order.types";
import { useState } from "react";
import LoaderOverlay from "../common/Loader/LoaderOverlay";
import Success from "./Success";
import { MsgEnum } from "@/enums/message-enum";
import { message } from "../common/message/message";

interface OrderPaymentProps { 
    amount: number;
    order: CreateOrderRequest;
    address: Address;
}

const OrderPayment: React.FC<OrderPaymentProps> = ({amount, order, address}) => {

    const [success, setSuccess] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const CreateOrder = (newOrder: CreateOrderRequest) => {
        setLoading(true);
        OrderService.createOrder(newOrder)
            .then((response) => {
                message.open({ text: "Order placed", type: MsgEnum.ERROR });
            })
            .catch((error) => {
                console.error('Error placing the order', error);
                message.open({ text: error.response.data.message || 'Error placing the order', type: MsgEnum.SUCCESS });
            })
            .finally(() => {
                setSuccess(true);
                setLoading(false);
            });
    }


    const PayDone = async () => {
        // Checks
        if (!order.paymentMode) {
            message.open({ text: 'Select a mode of Payment!!', type: MsgEnum.INFO });
            return;
        }

        const { street, locality, pincode, country, phone } = address;
        if (!(street && locality && pincode && country && phone)) {
            message.open({ text: "Please Fill in all the delivery address details!!", type: MsgEnum.INFO });
            return;
        }

        // Create order object with the current date and total price
        const fullAddress = `${address.street}, ${address.locality}, ${address.country}, ${address.pincode}, Phone: ${address.phone}`;
        
        //send order api
       CreateOrder({...order, address: fullAddress});
    };

    return (
        <div>
            <button className="text-white text-[16px] py-[6px] w-[100px] rounded" style={{backgroundColor: ColorConstants.primaryColor}} onClick={PayDone}>
                Pay
            </button>
            {success && <Success />}
            {loading && (<LoaderOverlay />)}
        </div>
        
    )
}


export default OrderPayment;