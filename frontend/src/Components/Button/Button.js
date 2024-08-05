export default function Button({ text, theme }) {
    return (
        <>
        {
            theme==='light'?
            <div className="w-[80px] h-[30px] sm:w-[120px] sm:h-[40px] flex items-center justify-center cursor-pointer border-2 border-white text-white hover:text-[#2d394b] hover:bg-white transition duration-500 ease-in-out">
                <p className="text-xs sm:text-sm font-semibold">{text}</p>
            </div>
            :
            <></>
        }
        {
            theme==='dark'?
            <div className="w-[80px] h-[30px] sm:w-[120px] sm:h-[40px] flex items-center justify-center cursor-pointer text-[#2d394b] hover:text-white border-2 border-[#2d394b] hover:bg-[#2d394b] transition duration-500 ease-in-out">
                <p className="text-xs sm:text-sm font-semibold">{text}</p>
            </div>
            :
            <></>
        }
        {
            theme==='normal'?
            <div className="w-[80px] h-[30px] sm:w-[120px] sm:h-[40px] flex items-center justify-center cursor-pointer text-white bg-[#6689ff] hover:bg-[#2d394b] transition duration-500 ease-in-out">
                <p className="text-xs sm:text-sm font-semibold">{text}</p>
            </div>
            :
            <></>
        }
        </>
        
    )
}
