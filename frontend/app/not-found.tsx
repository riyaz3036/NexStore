import ColorConstants from '@/constants/ColorConstants';
import RouteConstants from '@/constants/RouteConstants';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const NotFound = () => {
    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-white px-4 text-center">
            <h2 className="text-sm font-semibold text-gray-600 tracking-widest uppercase mb-2">
                Oops! Page Not Found
            </h2>
            <h1 className="text-9xl font-extrabold mb-4 leading-none" style={{color: ColorConstants.headingColor}}>
                404
            </h1>
            <p className="text-base text-gray-700 mb-6 px-2">
                We are sorry, but the page you requested was not found
            </p>
            <Link
                href={RouteConstants.root}
                style={{backgroundColor: ColorConstants.primaryColor}}
                className="text-sm text-white bg-gray-900 px-6 py-2 mt-5 rounded hover:bg-gray-700 transition"
            >
                Go to Homepage
            </Link>
        </div>
    );
};

export default NotFound; 