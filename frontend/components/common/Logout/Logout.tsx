"use client"
import Confirmation from '@/components/comfirmation/Confirmation';
import RouteConstants from '@/constants/RouteConstants';
import { authStore } from '@/store/auth.store';
import { clearAccessTokenInCookie } from '@/utils/cookie.utils';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import './logout.css';
import LoaderOverlay from '../Loader/LoaderOverlay';
import { MsgEnum } from '@/enums/message-enum';
import { message } from '../message/message';

interface LogoutProps {
  showLogout: boolean;
  setShowLogout: React.Dispatch<React.SetStateAction<boolean>>;
}

const Logout: React.FC<LogoutProps> = ({showLogout, setShowLogout}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleLogout = async () => {
        setIsLoading(true);
        
        // Use the auth store's logout method
        authStore.logout(setIsLoading);
        
        // Clear access token cookie
        clearAccessTokenInCookie();
        
        // Close the modal
        setShowLogout(false);
        message.open({ text: "Logged out", type: MsgEnum.SUCCESS });
        // Redirect to login page
        router.push(RouteConstants.login);
    };
    
    return (
        <div>
            <Confirmation open={showLogout} setOpen={setShowLogout} text="Are you sure you want to logout?" buttonA="yex" buttonExec={handleLogout}/>
            {isLoading && (<LoaderOverlay />)}
        </div>
        
    );
}

export default Logout;
