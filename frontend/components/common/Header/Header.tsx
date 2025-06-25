"use client"
import { useAuth } from "@/auth/AuthProvider";
import ColorConstants from "@/constants/ColorConstants";
import RouteConstants from "@/constants/RouteConstants";
import { MenuOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logo from '../../../assets/logo.jpg';
import Logout from "../Logout/Logout";
import './header.css';
import NavLink from "./NavLink";


const Header: React.FC = () => {
    const { user } = useAuth();
    const [menu, setMenu] = useState<boolean>(false); 
    const [logout,setLogout] = useState<boolean>(false);

    return(
        <header className="sticky top-0 left-0 right-0 shadow-md z-50">
            {/* Pre header */}
            <section className="flex items-center justify-end gap-5 h-[40px] px-5" style={{backgroundColor: ColorConstants.secondaryColor, color: ColorConstants.preHeaderText}}>
                {user ? (
                    <Link href={RouteConstants.cart} className="flex text-2xl font-semibold cursor-pointer">
                        <ShoppingCartOutlined />
                    </Link>
                ) : null}
                {user !== null ? (
                    <p className="cursor-pointer text-sm">{user.username}</p>
                ) : (
                    <Link href={RouteConstants.login} className="cursor-pointer text-sm">Login</Link>
                )}
                    {user !== null ? (
                    <p onClick={()=>{setLogout(true)}}className="cursor-pointer text-sm">Logout</p>
                ) : null}
            </section>
        
            {/* Header main */}
            <section className="h-[80px] bg-white flex items-center justify-between px-3 sm:px-8">
                <div>
                    <Image src={logo} alt="Logo" height={60} />
                </div>
        
                <div className="hidden md:flex gap-8 text-semibold text-base" style={{color: ColorConstants.black}}>
                    <NavLink href={RouteConstants.root}>Home</NavLink>
                    <NavLink href={RouteConstants.products}>Shop</NavLink>
                    {user &&  <NavLink href={RouteConstants.favorites}>Favorites</NavLink> }
                    {user &&  <NavLink href={RouteConstants.orders}>Orders</NavLink>}
                </div>
    
                {/* Mobile Hamburger menu */}
                <div className="md:hidden">
                    <div className="text-xl p-2" style={{ color: ColorConstants.black }} onClick={() => setMenu(!menu)}>
                        <MenuOutlined />
                    </div>
                    {menu ? (
                    <div className="bg-white absolute top-full right-0 left-0 flex flex-col mt-1 mx-1 rounded shadow-lg" style={{color: ColorConstants.black}}>
                        <Link href={RouteConstants.root} className="px-[20px] py-[16px] mobile-header-element" style={{borderBottom: `1px solid ${ColorConstants.grey2}`}}>Home</Link>
                        <Link href={RouteConstants.products}  className="px-[20px] py-[16px] mobile-header-element"  style={{borderBottom: `1px solid ${ColorConstants.grey2}`}}>Shop</Link>
                        {user &&  <Link href={RouteConstants.favorites}  className="px-[20px] py-[16px] mobile-header-element"  style={{borderBottom: `1px solid ${ColorConstants.grey2}`}}>Favorites</Link> }
                        <Link href={RouteConstants.orders}  className="px-[20px] py-[16px] mobile-header-element"  style={{borderBottom: `1px solid ${ColorConstants.grey2}`}}>Orders</Link>
                    </div>
                    ) : null}
                </div>
            </section>
    
            {/* Logout overlay */}
            {logout? (<Logout showLogout={logout} setShowLogout={setLogout}/>) : (<></>)}
        </header>       
    )
}

export default Header;