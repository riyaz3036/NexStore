"use client"
import { useAuth } from "@/auth/AuthProvider";
import ColorConstants from "@/constants/ColorConstants";
import { MsgEnum } from "@/enums/message-enum";
import OrderService from "@/services/order.service";
import { Order } from "@/types/order.types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoaderOverlay from "../common/Loader/LoaderOverlay";
import { message } from "../common/message/message";
import Pagination from "../common/Pagination/Pagination";
import OrderCard from "./OrderCard";


const OrderMain = () => {
    const { user } = useAuth();
    const router = useRouter();
    const [page, setPage] = useState<number>(0);
    const [orders, setOrders] = useState<Order[]>([]);
    const [totalElements, setTotalElements] = useState<number>();
    const [loading, setLoading] = useState<boolean>(false);
    

    // Handle remove from cart
    const fetchOrders = (id: string, page: number) => {
        setLoading(true);
        OrderService.fetchOrdersForUser(id, page)
            .then((response) => {
                setOrders(response?.data);
                setTotalElements(response.totalElements);
            })
            .catch((error) => {
                console.error('Error fetching the favorites', error);
                message.open({ text: error.response.data.message || 'Error fetching the favorites', type: MsgEnum.ERROR });
            })
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        if(user === null){
            router.push('/non-existent-route');
        }
        else fetchOrders(user.id, page)
    }, []);

    // Handle remove from cart
    const cancelOrder = (id: string) => {
        setLoading(true);
        OrderService.deleteOrder(id)
            .then((response) => {
                message.open({ text: "Order cancelled", type: MsgEnum.SUCCESS });
            })
            .catch((error) => {
                console.error('Error Cancelling Order', error);
                message.open({ text: error.response.data.message || 'Error cancelling Order', type: MsgEnum.ERROR });
            })
            .finally(() => {
                setLoading(false);
                 if(user !== null) fetchOrders(user.id, page)
            });
    };


    return(
        <div className="w-full">
            <div className="flex items-center justify-between py-5 text-xl font-bold" style={{color: ColorConstants.secondaryColor}}>
                <p>Orders</p>
                <p>{orders.length} Items</p>
            </div>

            {!loading && orders.length === 0 && <p className="p-5 text-xl text-center min-h-[300px] flex items-center justify-center" style={{color: ColorConstants.darkGrey}}>No Orders yet</p>}

            <div className="flex flex-col gap-2">
                {/* Order Card */}
                {!loading && orders.map((order) => (
                    <OrderCard key={order.id} order={order} onCancel={cancelOrder} />
                ))}  
            </div>

            {/* Pagination */}
            {totalElements && (
                <Pagination data={orders} page={page} setPage={setPage} totalElements={totalElements}/>
            )}

            {loading && (<LoaderOverlay />)} 
        </div>            
    )
}

export default OrderMain;