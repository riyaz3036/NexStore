import ColorConstants from "@/constants/ColorConstants";
import { totalmem } from "os";

interface PaginationProps{
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    data: any[],
    totalElements: number;
}

const Pagination: React.FC<PaginationProps> = ({page, setPage, data, totalElements}) => {

    let maxPage: number = totalElements / 10;

    const handleNextPage = () => {
        if(data.length > 0) {
            setPage((prevPage) => prevPage + 1);
        }
        window.scrollTo({
            top: 0,
            behavior: 'smooth' 
        });
    };

    const handlePrevPage = () => {
        setPage((prevPage) => Math.max(prevPage - 1, 0));
        window.scrollTo({
            top: 0,
            behavior: 'smooth' 
        });
    };

    return (
        <div className="flex items-center justify-center gap-3 py-5">
            <button onClick={handlePrevPage} className="w-[100px] py-2 text-white rounded" style={{backgroundColor: ColorConstants.secondaryColor}} disabled={page === 0}>Previous</button>
            <button className="text-white px-5 py-2 rounded" style={{backgroundColor: ColorConstants.primaryColor}}><p>{page + 1}</p></button>
            <button onClick={handleNextPage} className="w-[100px] py-2 text-white rounded" style={{backgroundColor: ColorConstants.secondaryColor}} disabled={page >= maxPage - 1}>Next</button>
        </div>
    )
}


export default Pagination;