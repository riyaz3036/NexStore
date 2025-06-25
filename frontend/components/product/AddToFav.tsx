"use client"
import { useAuth } from "@/auth/AuthProvider";
import ColorConstants from "@/constants/ColorConstants";
import { MsgEnum } from "@/enums/message-enum";
import FavoriteService from "@/services/favorite.service";
import { Favorite } from "@/types/favorite.types";
import { HeartFilled } from '@ant-design/icons';
import { useEffect, useState } from "react";
import LoaderOverlay from "../common/Loader/LoaderOverlay";
import { message } from "../common/message/message";


interface AddToFavProps {
    variantId: string
}


const AddToFav: React.FC<AddToFavProps> = ({variantId}) => {
    const { user } = useAuth();

    const [loading, setLoading] = useState<boolean>(false);
    const [favorite, setFavorite] = useState<Favorite>(); 

    const toggleFavorite = () => {
        if(user === null){
            message.open({ text: "please login to perform action", type: MsgEnum.INFO });
            return;
        }
        setLoading(true);
        if(favorite){
            FavoriteService.deleteFavorite(favorite.id)
            .then((response) => {
                message.open({ text:"Product removed from favorites", type: MsgEnum.SUCCESS });
            })
            .catch((error) => {
                console.error('Error removing the product to favorites', error);
                message.open({ text: error.response.data.message || 'Error removing the product from favorites', type: MsgEnum.ERROR });
            })
            .finally(() => {
                setLoading(false);
                getFav();
            });
        }
        else{
            FavoriteService.createFavorite({userId: user ? user.id : '', variantId: variantId})
            .then((response) => {
                message.open({ text: "Product added to favorites", type: MsgEnum.SUCCESS });
            })
            .catch((error) => {
                console.error('Error adding the product to favorites', error);
                message.open({ text: error.response.data.message || 'Error adding the product to favorites', type: MsgEnum.ERROR });
            })
            .finally(() => {
                setLoading(false);
                getFav();
            });
        }
        
    };


    const getFav = () => {
        FavoriteService.fetchFavoritesByUserAndVariant(user ? user.id : '', variantId)
            .then((response) => {
                setFavorite(response?.data);
            })
            .catch((error) => {
                console.error('Error fetching favorite', error);
                message.open({ text: error.response.data.message || 'Error fetching favorite', type: MsgEnum.ERROR });
            });
    };

    useEffect(() => {
        if(user !== null) getFav();
    }, []);


    return (
        <div>
            <div className="text-2xl h-[40px] w-[40px] px-5 flex items-center justify-center text-white cursor-pointer my-[5px]" onClick={toggleFavorite} style={{borderRadius: '20px', backgroundColor: ColorConstants.secondaryColor}}>
                <HeartFilled style={{fontSize: '20px', color: favorite ? ColorConstants.heartRed : ColorConstants.white}}/>
            </div>
            {loading && (<LoaderOverlay />)}
        </div>
    )
}

export default AddToFav;