"use client"
import ColorConstants from "@/constants/ColorConstants";
import { useState } from "react";
import Confirmation from "../comfirmation/Confirmation";

interface UnfavoriteProps {
    favId: string;
    unFavoraite: (id: string) => void;
}

const Unfavorite: React.FC<UnfavoriteProps> = ({favId, unFavoraite}) => {
    const [open, setOpen] = useState<boolean>(false);

    console.log("open", open);
    return(
        <div className="w-full">
            <button 
                onClick={() => setOpen(true)} 
                className="h-[30px] w-full text-xs text-white hover:scale-105 transition-transform duration-300 ease-in-out"
                style={{backgroundColor: ColorConstants.secondaryColor}}>
                
                UNFAVORITE
            </button>

            <Confirmation text={"Are you sure you want to remove the product from favorites?"} buttonA="yes" buttonExec={() => unFavoraite(favId)} setOpen={setOpen} open={open}/>
        </div>
        
    )
}

export default Unfavorite;