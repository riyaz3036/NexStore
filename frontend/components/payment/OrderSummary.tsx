import ColorConstants from "@/constants/ColorConstants"

interface OrderSummaryProps {
    amount: number;
}


const OrderSummary: React.FC<OrderSummaryProps> = ({amount}) => {
    return(
        <div className="px-5 py-5 shadow w-full lg:w-[400px]" style={{color: ColorConstants.black}}>
            <div className="py-2 mb-1">
                <p className="text-[18px] font-medium" style={{color: ColorConstants.secondaryColor}}>ORDER SUMMARY</p>
            </div>
            <div className="flex justify-between items-center py-2 text-sm font-semibold">
                <p>Subtotal</p>
                <p>₹{amount}</p>
            </div>
            <div className="flex justify-between items-center py-2 text-sm">
                <p>Delivery</p>
                <p>+ ₹150</p>
            </div>
            <div className="flex justify-between items-center py-2 text-sm font-semibold" style={{ borderTop: `1px solid ${ColorConstants.grey}`}}>
                <p>Total</p>
                <p>₹{amount + 150}</p>
            </div>                    
        </div>
    )
}


export default OrderSummary;