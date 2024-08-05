"use client"
import {useState,useContext} from 'react'
import { AuthContext } from '@/context/AuthContext'
import logo_dark from '../../assets/logo_dark.jpg'
import Image from 'next/image'
import Link from 'next/link'
import Logout from '../Logout/Logout'

export default function Footer() {

  const [logout,setLogout] = useState(false);
  const { user } = useContext(AuthContext);

    return(
        <footer className="bg-[#2d394b]">
            <section className="flex flex-wrap items-center justify-center gap-10 sm:justify-between py-5 px-10">
                <div><Image src={logo_dark} height={80} /></div>

                <div className="flex gap-10 sm:gap-20 font-normal text-[#a2b6d3]">
                    <div className="flex flex-col gap-3 py-5">
                        <Link href="/" className="">Home</Link>
                        {
                            user?(
                                <p onClick={()=>{setLogout(1)}} className="cursor-pointer">Logout</p>
                            ):(
                                <Link href="/Login">Login</Link>
                            )
                        }
                        
                    </div>

                    <div className="flex flex-col gap-3 py-5">
                        <Link href="/Products/all">Shop</Link>
                        {user &&  <Link href="/Favoraites">Favorites</Link> }
                        {user && <Link href="/Orders">Orders</Link>}
                    </div>
                </div>
            </section>

            <section className="pt-2">
                <p className="text-[#a2b6d3] text-center">developed by RIYAZ AHMED</p>
            </section>

            {/* Logout overlay */}
            {
                logout?
                <Logout setLogout={setLogout}/>:
                <></>
            }
        </footer>
    )
}