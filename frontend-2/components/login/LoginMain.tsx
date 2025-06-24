"use client"
import { useAuth } from "@/auth/AuthProvider";
import RouteConstants from "@/constants/RouteConstants";
import { MsgEnum } from "@/enums/message-enum";
import AuthService from "@/services/auth.service";
import { authStore } from "@/store/auth.store";
import { LoginRequest } from "@/types/auth.types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoaderOverlay from "../common/Loader/LoaderOverlay";
import ColorConstants from "@/constants/ColorConstants";
import { setAccessTokenInCookie } from "@/utils/cookie.utils";
import { message } from "../common/message/message";
import { MailOutlined, LockOutlined } from '@ant-design/icons'
import Link from "next/link";

const LoginMain = () => {
    const router = useRouter();
    const { user } = useAuth();
    const [loading, setLoading] = useState<boolean>(false);

    // State to store login details
    const [credentials, setCredentials] = useState<LoginRequest>({
        email: '',
        password: '',
    });

    // Handle input change
    const handleChange = (e: any) => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };


    // Handle form submission
    const handleLogin = async (e: any) => {
        e.preventDefault();
        if(user !== null){
            message.open({ text: 'Already logged in', type: MsgEnum.INFO });
            router.push(RouteConstants.home);
        }
        setLoading(true);
        AuthService.login(credentials)
            .then((response) => {
                const accessToken: string = response.data.token;
                authStore.setAccessToken(accessToken);
                authStore.setUser({
                    id: response.data.id,
                    username: response.data.username,
                    email: response.data.email,
                    phone: response.data.phone
                });
                authStore.setIsAuthenticated(true);
                setAccessTokenInCookie(accessToken);
                message.open({ text: 'Login Successful!', type: MsgEnum.SUCCESS });
                router.push(RouteConstants.home);
            })
            .catch((error) => {
                console.error('Error while login.', error);
                message.open({ text: error.response.data.message || 'Error while login', type: MsgEnum.ERROR });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return(
        <div className="flex items-center justify-center py-10 px-3">
            <div className="flex flex-col items-center w-[400px]">
                <p className="text-center px-3 mb-5 text-3xl text-white">Login</p>

                <form onSubmit={handleLogin} className="flex flex-col gap-5 items-center w-full p-5">
                    <div className="flex items-center gap-1 bg-white w-full cursor-pointer">
                        <MailOutlined className="pl-[10px]" style={{fontSize: '16px', color: ColorConstants.darkGrey}}/>
                        <input 
                            type="email" 
                            required id="email" 
                            name="email" 
                            placeholder="Email" 
                            className="h-[50px] p-2 focus:outline-none w-full" 
                            value={credentials.email} 
                            onChange={handleChange} 
                            style={{color: ColorConstants.black}}
                        />
                    </div>

                    <div className="flex items-center gap-1 bg-white w-full cursor-pointer">
                        <LockOutlined className="pl-[10px]" style={{fontSize: '16px', color: ColorConstants.darkGrey}}/>
                        <input 
                            type="password" 
                            required 
                            id="password" 
                            name="password" 
                            className="h-[50px] p-2 focus:outline-none w-full" 
                            placeholder="Password" 
                            value={credentials.password} 
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
                            LOGIN
                        </button>
                    </div>

                    <p className='text-center text-white text-semibold'>
                        Don't have an account? 
                        <Link href={RouteConstants.register} className="cursor-pointer text-[#6689ff]" style={{color: ColorConstants.primaryColor}}> Register</Link>
                    </p>
                </form>
            </div>

            {loading && (<LoaderOverlay />)}
        </div>
    )
}


export default LoginMain;