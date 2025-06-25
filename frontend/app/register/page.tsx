"use client"
import {useState} from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import login from '../../assets/login.jpg'
import { RegisterRequest } from '@/types/auth.types';
import RouteConstants from '@/constants/RouteConstants';
import AuthService from '@/services/auth.service';
import ColorConstants from '@/constants/ColorConstants';
import LoaderOverlay from '@/components/common/Loader/LoaderOverlay';
import { MsgEnum } from '@/enums/message-enum';
import { message } from '@/components/common/message/message';
import { MailOutlined, LockOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons'



const Register = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    // To store all the registration details
    const [details, setDetails] = useState<RegisterRequest>({
        username: '',
        password: '',
        email: '',
        phone: ''
    });
    

    // Handling change and submit
    const handleChange = (e: any) => {
        const { id, value } = e.target;
        setDetails((prevDetails) => ({
            ...prevDetails,
            [id]: value,
        }));
    };


    // Handle register 
    const handleRegister = (e: any) => {
        e.preventDefault();
        setLoading(true);
        AuthService.register(details)
            .then((response: any) => {
                message.open({ text: 'Registered Successfully', type: MsgEnum.SUCCESS });
                router.push(RouteConstants.login);
            })
            .catch((error) => {
                console.error('Error while registering.', error);
                message.open({ text: 'Error while registering', type: MsgEnum.ERROR });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    
    return(
        <div className="w-full h-full flex items-center justify-center">
            {/* Background Image */}
            <div className="absolute top-0 left-0 w-full h-full z-[-1]">
                <Image src={login} alt="Home Offers" layout="fill" className="object-cover"/>
                <div className="absolute inset-0 bg-black opacity-70"></div>
            </div>

            {/* Register body */}
             <div className="w-full flex items-center justify-center py-10 px-3">
                <div className="flex flex-col items-center w-[400px]">
                    <p className="text-center px-3 mb-5 text-3xl text-white">Register</p>

                    <form onSubmit={handleRegister} className="flex flex-col gap-5 items-center w-full p-5">
                        <div className="flex items-center gap-1 bg-white w-full">
                            <UserOutlined className="pl-[10px]" style={{fontSize: '16px', color: ColorConstants.darkGrey}}/>
                            <input 
                                type="text" 
                                required 
                                id="username" 
                                name="username" 
                                placeholder="Full Name" 
                                className="h-[50px] p-2 focus:outline-none w-full" 
                                value={details.username} 
                                onChange={handleChange} 
                                style={{color: ColorConstants.black}}
                            />
                        </div>

                        <div className="flex items-center gap-1 bg-white w-full">
                            <MailOutlined className="pl-[10px]" style={{fontSize: '16px', color: ColorConstants.darkGrey}}/>
                            <input 
                                type="email" 
                                required 
                                id="email" 
                                name="email" 
                                placeholder="Email" 
                                className="h-[50px] p-2 focus:outline-none w-full" 
                                value={details.email} 
                                onChange={handleChange} 
                                style={{color: ColorConstants.black}}
                            />
                        </div>

                        <div className="flex items-center gap-1 bg-white w-full">
                            <LockOutlined className="pl-[10px]" style={{fontSize: '16px', color: ColorConstants.darkGrey}}/>
                            <input 
                                type="password" 
                                required 
                                id="password" 
                                name="password" 
                                className="h-[50px] p-2 focus:outline-none w-full" 
                                placeholder="Password" 
                                value={details.password} 
                                onChange={handleChange} 
                                style={{color: ColorConstants.black}}
                                />
                        </div>

                        <div className="flex items-center gap-1 bg-white w-full">
                            <PhoneOutlined className="pl-[10px]" style={{fontSize: '16px', color: ColorConstants.darkGrey}}/>
                            <input 
                                type="number" 
                                required 
                                id="phone" 
                                name="phone" 
                                className="h-[50px] p-2 focus:outline-none w-full" 
                                placeholder="Phone" 
                                value={details.phone} 
                                onChange={handleChange} 
                                style={{color: ColorConstants.black}}
                            />
                        </div>

                        <div className="flex justify-center w-full h-[50px] font-medium transition-colors duration-200 hover:bg-opacity-90" style={{backgroundColor: ColorConstants.primaryColor, color: ColorConstants.white}}>
                            <button 
                                className="w-full h-full hover:bg-opacity-90 transition-colors duration-200" 
                                type="submit"
                                style={{
                                    backgroundColor: ColorConstants.primaryColor,
                                    color: ColorConstants.white,
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = ColorConstants.secondaryColor;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = ColorConstants.primaryColor;
                                }}
                            >
                                REGISTER
                            </button>
                        </div>

                        <p className='text-center text-white text-semibold'>Already have an account? <Link href={RouteConstants.login} className="cursor-pointer text-[#6689ff]">Login</Link></p>
                    </form>
                </div>
            </div>

            {loading && (<LoaderOverlay />)}
        </div>
      
    )
}


export default Register;