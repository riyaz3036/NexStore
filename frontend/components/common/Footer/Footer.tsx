"use client"
import { useAuth } from '@/auth/AuthProvider'
import ColorConstants from '@/constants/ColorConstants'
import RouteConstants from '@/constants/RouteConstants'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import logo_dark from '../../../assets/logo_dark.jpg'
import Logout from '../Logout/Logout'


const Footer = () => {
    const { user } = useAuth();
  const [logout,setLogout] = useState<boolean>(false);

    return(
        <footer style={{backgroundColor: ColorConstants.secondaryColor}}>
            <section className="flex flex-wrap items-center justify-center gap-10 sm:justify-between py-5 px-10">
                <div className="h-[80px] w-[200px]">
                    <Image src={logo_dark} height={80} width={200} alt="logo" />
                </div>

                <div className="flex gap-10 sm:gap-20 font-norma" style={{color: ColorConstants.preHeaderText}}>
                    <div className="flex flex-col gap-3 py-5">
                        <Link href={RouteConstants.root} className="">Home</Link>
                        {
                            user?(
                                <p onClick={()=>{setLogout(true)}} className="cursor-pointer">Logout</p>
                            ):(
                                <Link href={RouteConstants.login}>Login</Link>
                            )
                        }
                    </div>

                    <div className="flex flex-col gap-3 py-5">
                        <Link href={RouteConstants.products}>Shop</Link>
                        {user &&  <Link href={RouteConstants.favorites}>Favorites</Link> }
                        {user && <Link href={RouteConstants.orders}>Orders</Link>}
                    </div>
                </div>
            </section>

            <section className="py-2">
                <p className="text-center" style={{color: ColorConstants.preHeaderText}}>developed by RIYAZ AHMED</p>
            </section>

            {/* Logout overlay */}
            {
                logout?
                (<Logout showLogout={logout} setShowLogout={setLogout}/>) : (<></>)
            }
        </footer>
    )
}


export default Footer;