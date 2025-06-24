import ColorConstants from "@/constants/ColorConstants";
import './loader-overlay.css'
import { hexToRgba } from "@/utils/color.utils";

const LoaderOverlay = () => {
    return(
        <div className="flex flex-col items-center justify-center" style={{ backgroundColor: hexToRgba(ColorConstants.white, 0.8), position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000}}>
            <div className="pendulum_box">
                <div className="ball first"></div>
                <div className="ball"></div>
                <div className="ball"></div>
                <div className="ball"></div>
                <div className="ball last"></div>
            </div>
        </div>
    ) 
}

export default LoaderOverlay;