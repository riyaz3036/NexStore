import PageLayout from '@/components/layout/PageLayout';
import PaymentMain from '@/components/payment/PaymentMain';
import Image from "next/image";
import payment from '../../assets/payment.jpg';
import AuthProvider from '@/auth/AuthProvider';

export interface Address {
    street: string;
    locality: string;
    country: string;
    pincode: string;
    phone: string
}

const Payment = async () => {
    return (
        <PageLayout>
            <main>
                {/* Cover Image */}
                <div className="w-full h-[350px]">
                    <Image className="h-full w-full object-cover" src={payment} alt="" />
                </div>

                <AuthProvider>
                    <PaymentMain />
                </AuthProvider>
            </main>
        </PageLayout>
    );
}


export default Payment;