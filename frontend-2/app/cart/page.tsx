import CartMain from '@/components/cart/CartMain';
import PageLayout from '@/components/layout/PageLayout';
import Image from "next/image";
import cart from '../../assets/cart.jpg';
import AuthProvider from '@/auth/AuthProvider';

const UserCart = () => {
    return (
        <PageLayout>
             <div>
                {/* Cover Image */}
                <div className="w-full h-[350px]">
                    <Image className="h-full w-full object-cover" src={cart} alt="Cart Cover" />
                </div>  

                <AuthProvider>
                    <CartMain /> 
                </AuthProvider>    
            </div>
        </PageLayout>
    )
       
}


export default UserCart;