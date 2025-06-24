import Image from "next/image";
import orders_cover from '../../assets/orders_cover.jpg';

import PageLayout from '@/components/layout/PageLayout';
import OrderMain from '@/components/orders/OrdersMain';
import AuthProvider from "@/auth/AuthProvider";

const Orders = () => {
    return (
        <PageLayout>
            <div>
                {/* Cover Image */}
                <div className="w-full h-[350px]">
                    <Image className="h-full w-full object-cover" src={orders_cover} alt="Cart Cover" />
                </div>  

                <div className="flex flex-wrap lg:flex-nowrap gap-5 mx-3 md:mx-10">
                    {/* Products */}
                    <AuthProvider>
                        <OrderMain />
                    </AuthProvider>
                </div>  
            </div>
        </PageLayout>
    )
}

export default Orders;