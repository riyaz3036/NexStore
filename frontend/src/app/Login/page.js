"use client"
import {useState,useContext} from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import login from '../../assets/login.jpg'
import Header from '../../Components/Header/Header';
import { BASE_URL } from '@/utils/config';
import { AuthContext } from '@/context/AuthContext';



export default function Login(){

    const router = useRouter();
    const { dispatch } = useContext(AuthContext);

    // State to store login details
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });

    // Handle input change
    const handleChange = (e) => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: 'LOGIN_START' });

        try {
        const res = await fetch(`${BASE_URL}/auth/login`, {
            method: 'post',
            headers: {
            'content-type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(credentials)
        });
        const result = await res.json();

        if (!res.ok) {
            alert(result.message);
            return;
        }

        dispatch({ type: 'LOGIN_SUCCESS', payload: result.data });
        alert('Login Successful');
        router.push('/');

        } catch (e) {
        dispatch({ type: 'LOGIN_FAILURE', payload: e.message });
        }
    };


    return(
     
        <div className="relative h-screen w-full">
            {/* Header */}
            <Header />

            {/* Background Image */}
            <div className="absolute top-0 left-0 w-full h-full z-[-1]">
                <Image src={login} alt="Home Offers" layout="fill" className="object-cover"/>
                <div className="absolute inset-0 bg-black opacity-70"></div>
            </div>

            {/* Login body */}
             <div className="w-full flex items-center justify-center py-10 px-3">
                <div className="flex flex-col items-center w-[400px]">
                    <p className="text-center px-3 mb-5 text-3xl text-white">Login</p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5 items-center w-full p-5">
                        <div className="flex items-center gap-1 bg-white w-full">
                            <div className="text-[#2d394b] text-2xl"><i class="ri-user-3-fill"></i></div>
                            <input type="email" required id="email" name="email" placeholder="Email" className="h-[50px] p-2 focus:outline-none w-full" value={credentials.email} onChange={handleChange} />
                        </div>

                        <div className="flex items-center gap-1 bg-white w-full">
                            <div className="text-[#2d394b] text-2xl"><i class="ri-lock-fill"></i></div>
                            <input type="password" required id="password" name="password" className="h-[50px] p-2 focus:outline-none w-full" placeholder="Password" value={credentials.password} onChange={handleChange} />
                        </div>

                        <div className="flex justify-center w-full h-[50px] bg-[#6689ff] text-white">
                            <button className="w-full" type="submit">LOGIN</button>
                        </div>

                        <p className='text-center text-white text-semibold'>Donot have an account? <Link href="/Register" className="cursor-pointer text-[#6689ff]">Register</Link></p>
                    </form>
                </div>
            </div>
        </div>
      
    )
}