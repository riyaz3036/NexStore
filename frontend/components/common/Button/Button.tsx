import ColorConstants from "@/constants/ColorConstants";
import { ButtonTypeEnum } from "@/enums/button-type.enum";

interface ButtonProps {
    text: string;
    theme: ButtonTypeEnum;
}

const Button: React.FC<ButtonProps> = ({ text, theme }) => {
    return (
        <>
        {
            theme === ButtonTypeEnum.LIGHT?
            <div className="w-[80px] h-[30px] sm:w-[120px] sm:h-[40px] flex items-center justify-center cursor-pointer border-2 border-white hover:text-[#2d394b] hover:bg-white transition duration-500 ease-in-out " style={{color: ColorConstants.white}}>
                <p className="text-xs sm:text-sm font-semibold" style={{margin: 0}}>{text}</p>
            </div>
            :
            <></>
        }
        {
            theme === ButtonTypeEnum.DARK?
            <div className="w-[80px] h-[30px] sm:w-[120px] sm:h-[40px] flex items-center justify-center cursor-pointer text-[#2d394b] hover:text-white border-2 border-[#2d394b] hover:bg-[#2d394b] transition duration-500 ease-in-out">
                <p className="text-xs sm:text-sm font-semibold" style={{margin: 0}}>{text}</p>
            </div>
            :
            <></>
        }
        {
            theme === ButtonTypeEnum.NORMAL?
            <div className="w-[80px] h-[30px] sm:w-[120px] sm:h-[40px] flex items-center justify-center cursor-pointer bg-[#6689ff] hover:bg-[#2d394b] transition duration-500 ease-in-out" style={{color: ColorConstants.white}}>
                <p className="text-xs sm:text-sm font-semibold" style={{margin: 0}}>{text}</p>
            </div>
            :
            <></>
        }
        </>
        
    )
}


export default Button;