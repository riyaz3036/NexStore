"use client"
import { usePathname } from 'next/navigation';
import Link from 'next/link';


const NavLink = ({ href, children }) => {

  const pathname = usePathname(); 
  const isActive = pathname === href;

  return (
    <Link href={href} className={`relative group cursor-pointer h-[40px] flex items-center`}>
        {children}
        <span className={`absolute bottom-0 left-0 w-full h-[4px] bg-[#6689ff] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-bottom-left ${isActive ? 'scale-x-100' : ''}`}/>
    </Link>
  );
};

export default NavLink;
