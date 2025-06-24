"use client"
import ColorConstants from "@/constants/ColorConstants";
import { Order } from "@/types/order.types";
import Image from "next/image";
import NoImg from '../../assets/image_not_available.png'
import { useState } from "react";
import Confirmation from "../comfirmation/Confirmation";

interface OrderCardProps {
    order: Order;
    onCancel: (id: string) => void
}

const OrderCard: React.FC<OrderCardProps> = ({order, onCancel}) => {
    const [open, setOpen] = useState<boolean>(false);
    return(
        <div key={order.id} className=""  style={{ boxShadow: '0 1px 10px rgba(0, 0, 0, 0.1)' }}>
            {/* Card Header */}
            <div className="flex justify-between items-center text-sm px-[15px] py-[5px]" style={{color: ColorConstants.darkGrey}}>
                <div className="rounded-[20px] py-[5px] px-[10px]" style={{backgroundColor: ColorConstants.grey}}>
                    <p style={{color: ColorConstants.black}}>Order <span style={{color: ColorConstants.secondaryColor, fontWeight: 600}}>#R{order.id.slice(0,7)}</span></p>
                </div>
                <p style={{fontSize: '12px', color: ColorConstants.darkGrey}}>Order placed on:{order.createdAt? order.createdAt.getDate() : 'some date'}</p>
            </div>

            {/* Card Main */}
            <div className="flex flex-col">
                {order.variants.map((orderVariant, index)=>(
                        <div key={orderVariant.id} className="flex flex-col h-[165px] items-center">
                            <div className="flex full py-[15px] h-full w-[94%]">
                                <div className="w-[150px] h-full flex-shrink-0">
                                    {orderVariant.variant && orderVariant.variant.images &&  orderVariant.variant.images.length > 0 ? (
                                        <Image src={`${process.env.NEXT_PUBLIC_LOCAL_BE_URL}/${orderVariant.variant?.images[0]?.replace(/\\/g, '/')}`}  width={150} height={150} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <Image src={NoImg}  width={150} height={150} alt="" className="w-full h-full object-cover" />
                                    )}
                                </div>
                                <div className="flex justify-between w-full gap-5 h-full pl-[5px] pr-[20px]">
                                    <div className="flex flex-col justify-between gap-[5px]" style={{color: ColorConstants.darkGrey}}>
                                        <div>
                                            <p className="text-sm sm:text-lg font-semibold" style={{color: ColorConstants.secondaryColor}}>{orderVariant.variant.product.name}</p>
                                            <p className="text-xs sm:text-sm">{orderVariant.variant.name}</p>
                                        </div>
                                        <div className="flex items-center gap-[20px]">
                                            <p className="text-xs sm:text-sm">Qty: {orderVariant.quantity}</p>
                                            <p style={{color: ColorConstants.secondaryColor, fontSize: '14px', fontWeight: 500}}>₹{orderVariant.variant.offerPrice * orderVariant.quantity}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center justify-center">
                                        <p className="text-xs sm:text-sm" style={{color: ColorConstants.darkGrey}}>Status:</p>
                                        <p style={{color: ColorConstants.primaryColor, fontSize: '20px', fontWeight: 500}}>In-Transit</p>
                                    </div>
                                    <div className="flex flex-col items-center justify-center">
                                        <p className="text-xs sm:text-sm" style={{color: ColorConstants.darkGrey}}>Estimated Delivery:</p>
                                        <p style={{color: ColorConstants.secondaryColor, fontSize: '20px', fontWeight: 500}}>In -Transit</p>
                                    </div>
                                </div>
                            </div>
                              
                            {index !== order.variants.length - 1 && (
                                <div className="w-[95%] h-[1px] flex-shrink-0" style={{backgroundColor: ColorConstants.grey}}></div>
                            )}
                        </div>
                    ))
                }
            </div>

            {/* Card Footer */}
            <div className="flex h-[40px]" style={{borderTop: `1px solid ${ColorConstants.grey}`}}>
                <button onClick={() => setOpen(true)} className="px-[30px] h-full" style={{fontSize: '14px', color: ColorConstants.darkGrey}}>CANCEL</button>
                <div className="flex-1 w-full h-full flex items-center justify-between px-[10px]" style={{borderLeft: `1px solid ${ColorConstants.grey}`}}>
                    <p style={{fontSize: '12px', color: ColorConstants.darkGrey}}>Paid using {order.paymentMode}</p>
                    <p style={{fontSize: '16px', color: ColorConstants.black, fontWeight: 700}}>₹{order.total}</p>
                </div>
            </div>

            <Confirmation text={"Are you sure you want to cancel the order?"} buttonA="yes" buttonExec={() => onCancel(order.id)} setOpen={setOpen} open={open}/>
        </div>
    )
}

export default OrderCard;