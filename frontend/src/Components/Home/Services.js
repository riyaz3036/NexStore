import Image from 'next/image';
import './services.css'

export default function Services(){
    return(
        <div className="flex flex-wrap gap-8 p-5 justify-center">
            <div className="flex flex-col gap-3 justify-center items-center w-[180px] h-[200px] p-3 shadow-md">
                <p className="text-2xl text-center">What We Offer</p>
                <div className="w-1/2 h-[2px] bg-[#e6e6e6]"></div>
            </div>
            <div className="flex flex-col gap-3 justify-center items-center w-[180px] h-[200px] p-3 shadow-md service_card">
                <div className="relative bg-[#e6e6e6] h-[30px] w-[30px] flex items-center justify-center transform rotate-45">
                    <div className="absolute -top-2 -left-1 service_logo transform -rotate-45">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                        </svg>
                    </div>
                </div>
                <p className="text-2xl text-center">Fast Delivery</p>
                <div className="w-1/2 h-[2px] bg-[#e6e6e6] service_partition"></div>
                <p className="text-center text-sm">Get your orders delivered within 2-3 days</p>
            </div>
            <div className="flex flex-col gap-3 justify-center items-center w-[180px] h-[200px] p-3 shadow-md service_card">
                <div className="relative bg-[#e6e6e6] h-[30px] w-[30px] flex items-center justify-center transform rotate-45">
                    <div className="absolute -top-2 -left-1 service_logo transform -rotate-45">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0 6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z" />
                        </svg>
                    </div>
                </div>
                <p className="text-2xl text-center">24/7 Support</p>
                <div className="w-1/2 h-[2px] bg-[#e6e6e6] service_partition"></div>
                <p className="text-center text-sm">Our team is here to help you anytime</p>
            </div>
            <div className="flex flex-col gap-3 justify-center items-center w-[180px] h-[200px] p-3 shadow-md service_card">
                <div className="relative bg-[#e6e6e6] h-[30px] w-[30px] flex items-center justify-center transform rotate-45">
                    <div className="absolute -top-2 -left-1 service_logo transform -rotate-45">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 0 1-3.6 9.75m6.633-4.596a18.666 18.666 0 0 1-2.485 5.33" />
                        </svg>
                    </div>
                </div>
                <p className="text-2xl text-center">Safe Payment</p>
                <div className="w-1/2 h-[2px] bg-[#e6e6e6] service_partition"></div>
                <p className="text-center text-sm">Pay safely with our encrypted system</p>
            </div>
        </div>
    )
}