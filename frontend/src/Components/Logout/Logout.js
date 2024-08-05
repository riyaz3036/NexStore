"use client"
import { useContext } from "react";
import { useRouter } from "next/navigation"
import { AuthContext } from "@/context/AuthContext"

export default function Logout({setLogout}){

    const {dispatch } = useContext(AuthContext);
    const router = useRouter();

    const handleLogout=()=>{
        dispatch({type:'LOGOUT'})
        alert("Successfully Logged out!!")
        setLogout(0);
        router.push('/');
    }

    return(
        <div className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center" style={{backgroundColor: "rgba(0,0,0,0.5)"}}>
            <div className="w-[300px] flex flex-col gap-5 justify-center bg-white py-5 px-3 rounded">
                <p className="text-center mb-6">Want to logout?</p>
                <div className='flex items-center justify-end gap-3'>
                    <button onClick={handleLogout} className="bg-[#E2342D] px-3 py-1 text-white rounded">Yes</button>
                    <button onClick={()=>{setLogout(0)}} className="bg-black px-3 py-1 text-white rounded">No</button>
                </div>
            </div>
        </div>
    )
}