"use client"
import { useAuth } from "@/auth/AuthProvider";
import ColorConstants from "@/constants/ColorConstants";
import { MsgEnum } from "@/enums/message-enum";
import FavoriteService from "@/services/favorite.service";
import { Favorite } from "@/types/favorite.types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoaderOverlay from "../common/Loader/LoaderOverlay";
import Pagination from "../common/Pagination/Pagination";
import VariantCard from "../common/VariantCard/VariantCard";
import { message } from "../common/message/message";
import '../products/variants.css'


const FavoritesMain = () => {
    const { user } = useAuth();
    const router = useRouter();
    const [page, setPage] = useState<number>(0);
    const [favorites, setFavorites] = useState<Favorite[]>([]);
    const [totalElements, setTotalElements] = useState<number>();
    const [loading, setLoading] = useState<boolean>(false);

    // Handle remove from cart
    const fetchFavs = (id: string, pageNum: number) => {
        if(page !== pageNum) setPage(pageNum);
        setLoading(true);
        FavoriteService.fetchFavoritesByUser(id, pageNum)
            .then((response) => {
                setFavorites(response?.data);
                setTotalElements(response.totalElements);
            })
            .catch((error) => {
                console.error('Error fetching the favorites', error);
                message.open({ text: error.response.data.message || 'Error fetching favorites', type: MsgEnum.ERROR });
            })
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        if(user === null){
            router.push('/non-existent-route');
        }
        else fetchFavs(user.id, page);
    }, []);


    const removeFav = (id: string) => {
        setLoading(true);
        FavoriteService.deleteFavorite(id)
            .then((response) => {
                message.open({ text: "Product removed from favorites", type: MsgEnum.SUCCESS });
            })
            .catch((error) => {
                console.error('Error removing the product from favorites', error);
                message.open({ text: error.response.data.message || 'Error removing the product from favorites', type: MsgEnum.ERROR });
            })
            .finally(() => {
                setLoading(false);
                if(user !== null) fetchFavs(user.id, 0);
            });
    }

    return(
        <div className="px-10">
            <div className="pt-[20px]">
                <p className="text-2xl font-bold " style={{color: ColorConstants.secondaryColor}}>FAVORITES</p>
            </div>

            { favorites.length===0 && <p className="p-5 text-xl text-center min-h-[300px] w-full flex items-center justify-center" style={{color: ColorConstants.darkGrey}}>No Favoraite products added yet</p>}

            <div className="py-5 products_main gap-[24px] w-full">
                {/* {favoraitesError && <p className="p-5 text-xl text-center text-gray-500">{favoraitesError}</p>} */}
                { favorites.map((favorite) => (
                    <VariantCard key={favorite.id} variant={favorite.variant} favId={favorite.id} unFavoraite={removeFav}/>                        
                ))}
            </div>

            {/* Pagination */}
            {totalElements && (
                <Pagination data={favorites} page={page} setPage={setPage} totalElements={totalElements}/>
            )}

            {loading && (<LoaderOverlay />)}
        </div>         
    )
}

export default FavoritesMain;