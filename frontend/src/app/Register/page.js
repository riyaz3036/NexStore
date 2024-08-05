"use client"
import {useState,useContext} from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import login from '../../assets/login.jpg'
import Header from '../../Components/Header/Header';
import { BASE_URL } from '@/utils/config';
import { AuthContext } from '@/context/AuthContext';



export default function Register(){

    const router = useRouter();
    const { dispatch } = useContext(AuthContext);

    // To store all the registration details
    const [details, setDetails] = useState({
        username: '',
        password: '',
        email: '',
        phone: '',
        role: 'user',
        ADMIN_KEY: '',
    });
    

    // Handling change and submit
    const handleChange = (e) => {
        const { id, value } = e.target;
        setDetails((prevDetails) => ({
            ...prevDetails,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(details.role==='admin' && details.ADMIN_KEY===''){
            alert('Please enter the ADMIN KEY to register as an admin');
            return;
        }

        try {
            const res = await fetch(`${BASE_URL}/auth/register`, {
                method: 'post',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(details),
            });

            const data = await res.json();

            if (res.ok) {
                alert('Successfully Registered!!! Please login');
                dispatch({ type: 'REGISTER_SUCCESS' });
                router.push('/Login');
            } else {
                alert(data.message || 'Registration failed. Please try again.');
                router.push('/Register');
            }
        } catch (err) {
            alert(err.message || 'Registration Failed!!');
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

            {/* Register body */}
             <div className="w-full flex items-center justify-center py-10 px-3">
                <div className="flex flex-col items-center w-[400px]">
                    <p className="text-center px-3 mb-5 text-3xl text-white">Register</p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5 items-center w-full p-5">
                        <div className="flex items-center gap-1 bg-white w-full">
                            <div className="text-[#2d394b] text-2xl"><i class="ri-user-3-fill"></i></div>
                            <input type="text" required id="username" name="username" placeholder="Full Name" className="h-[50px] p-2 focus:outline-none w-full" value={details.username} onChange={handleChange} />
                        </div>

                        <div className="flex items-center gap-1 bg-white w-full">
                            <div className="text-[#2d394b] text-2xl"><i class="ri-mail-fill"></i></div>
                            <input type="email" required id="email" name="email" placeholder="Email" className="h-[50px] p-2 focus:outline-none w-full" value={details.email} onChange={handleChange} />
                        </div>

                        <div className="flex items-center gap-1 bg-white w-full">
                            <div className="text-[#2d394b] text-2xl"><i class="ri-lock-fill"></i></div>
                            <input type="password" required id="password" name="password" className="h-[50px] p-2 focus:outline-none w-full" placeholder="Password" value={details.password} onChange={handleChange} />
                        </div>

                        <div className="flex items-center gap-1 bg-white w-full">
                            <div className="text-[#2d394b] text-2xl"><i class="ri-phone-fill"></i></div>
                            <input type="number" required id="phone" name="phone" className="h-[50px] p-2 focus:outline-none w-full" placeholder="Phone" value={details.phone} onChange={handleChange} />
                        </div>

                        <div className="flex justify-center w-full h-[50px] bg-[#6689ff] text-white">
                            <button className="w-full" type="submit">REGISTER</button>
                        </div>

                        <p className='text-center text-white text-semibold'>Already have an account? <Link href="/Login" className="cursor-pointer text-[#6689ff]">Login</Link></p>
                    </form>
                </div>
            </div>
        </div>
      
    )
}