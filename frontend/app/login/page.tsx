import AuthProvider from '@/auth/AuthProvider';
import LoginMain from '@/components/login/LoginMain';
import Image from 'next/image';
import login from '../../assets/login.jpg';


const Login = () => {
    return(
        <div className="w-full h-full flex items-center justify-center">
            {/* Background Image */}
            <div className="absolute top-0 left-0 w-full h-full z-[-1]">
                <Image src={login} alt="Home Offers" layout="fill" className="object-cover"/>
                <div className="absolute inset-0 bg-black opacity-70"></div>
            </div>

            {/* Login body */}
            <AuthProvider>
                <LoginMain />
            </AuthProvider> 
        </div>
    )
}


export default Login;