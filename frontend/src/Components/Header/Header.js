"use client";
import { useState, useContext} from 'react';
import Image from "next/image";
import logo from '../../assets/logo.jpg';
import NavLink from './NavLink';
import Link from 'next/link';
import { AuthContext } from '@/context/AuthContext';
import Logout from '../Logout/Logout'



export default function Header() {
  const [menu, setMenu] = useState(false); 
  const [logout,setLogout] = useState(false);
  const { user } = useContext(AuthContext);

  return (
    <header className="sticky top-0 left-0 right-0 shadow-md z-50">
      {/* Pre header */}
      <section className="flex items-center justify-end gap-5 h-[40px] bg-[#2d394b] text-[#a2b6d3] px-5">
        {user ? (
          <Link href="/Cart" className="flex text-2xl font-semibold cursor-pointer">
            <i className="ri-shopping-cart-line"></i>
          </Link>
        ) : null}
        {user ? (
          <p className="cursor-pointer text-sm">{user.username}</p>
        ) : (
          <Link href="/Login" className="cursor-pointer text-sm">Login</Link>
        )}
         {user ? (
           <p onClick={()=>{setLogout(1)}}className="cursor-pointer text-sm">Logout</p>
        ) : null}
      </section>

      {/* Header main */}
      <section className="h-[80px] bg-white flex items-center justify-between px-3 sm:px-8">
        <div>
          <Image src={logo} alt="Logo" height={60} />
        </div>

        <div className="hidden md:flex gap-8 text-semibold text-base">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/Products/all">Shop</NavLink>
          {user &&  <NavLink href="/Favoraites">Favorites</NavLink> }
          {user &&  <NavLink href="/Orders">Orders</NavLink>}
        </div>

        {/* Mobile Hamburger menu */}
        <div className="md:hidden">
          <div className="text-xl" onClick={() => setMenu(!menu)}>
            <i className="ri-menu-line"></i>
          </div>
          {menu ? (
            <div className="bg-white absolute top-full right-0 left-0 flex flex-col mt-1 mx-1 rounded shadow-lg">
              <Link href="/" className="p-2 border-b-2">Home</Link>
              <Link href="/Products/all"  className="p-2 border-b-2">Shop</Link>
              {user &&  <Link href="/Favoraites"  className="p-2 border-b-2">Favorites</Link> }
              <Link href="/Orders"  className="p-2 border-b-2">Orders</Link>
            </div>
          ) : null}
        </div>
      </section>

      {/* Logout overlay */}
      {
        logout?
        <Logout setLogout={setLogout}/>:
        <></>
      }
      
    </header>
  );
}
