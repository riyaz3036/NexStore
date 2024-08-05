"use client";
import './favoraites.css';
import { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from "next/image";
import favoraitesImage from '../../assets/favoraites.jpg'; 
import Header from "@/Components/Header/Header";
import ProductCard from "@/Components/ProductCard/ProductCard";
import Footer from '@/Components/Footer/Footer';
import { AuthContext } from '@/context/AuthContext';
import { BASE_URL } from '@/utils/config';

export default function Favoraites() {
    const { user } = useContext(AuthContext);

    // State for favorites
    const [favoraites, setFavoraites] = useState({});
    const [favoraitesError, setFavoraitesError] = useState('');
    const [favoraitesLoading, setFavoraitesLoading] = useState(true); 

    // Handle remove from favorites
    const handleRemoveFromFav = async (variant_id) => {
        try {
            if (!user) {
                alert('Please Login to access favorites');
                return;
            }

            const res = await fetch(`${BASE_URL}/favoraites/${user._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ variant_id }),
            });
            
            const result = await res.json();
    
            if (!res.ok) {
                alert(result.message);
                return;
            }
            window.location.reload();
        } catch (e) {
            alert('Error removing from favorites');
        }
    };

    useEffect(() => {
        const fetchFavoraites = async () => {
            try {
                const response = await fetch(`${BASE_URL}/favoraites/${user._id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setFavoraites(data);
            } catch (error) {
                setFavoraitesError('Error loading data');
            } finally {
                setFavoraitesLoading(false);
            }
        };
        fetchFavoraites();
    }, [user._id]);

    return (
        <div>
            <Header />

            {/* Cover Image */}
            <div className="w-full h-[350px]">
                <Image src={favoraitesImage} className="h-full w-full object-cover" alt="Favorites" />
            </div>  

            {/* Favorite Products */}
            <div className="px-10">
                <div><p className="text-[#2d394b] text-2xl font-bold mt-5">FAVORITES</p></div>

                <div className="favoraites_main py-5">
                    {favoraitesError && <p className="p-5 text-xl text-center text-gray-500">{favoraitesError}</p>}
                    {favoraitesLoading && <p className="p-5 text-xl text-center text-gray-500">Loading...</p>}
                    {!favoraitesError && !favoraitesLoading && favoraites.variants.length===0 && <p className="p-5 text-xl text-center text-gray-500">No Favoraite products yet</p>}
                    {!favoraitesError && !favoraitesLoading && favoraites.variants.map((variant) => (
                        <div key={variant._id} className="flex flex-col w-[260px]">
                            <ProductCard product={variant} />
                            <button 
                                onClick={() => handleRemoveFromFav(variant._id)} 
                                className="h-[30px] w-full bg-[#2d394b] text-xs text-white hover:scale-105 transition-transform duration-300 ease-in-out">
                                UNFAVORITE
                            </button>
                        </div>                          
                    ))}
                </div>
            </div>

            <Footer />                      
        </div>
    );
}
