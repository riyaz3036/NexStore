import FavoritesMain from '@/components/favorites/FavoritesMain';
import PageLayout from '@/components/layout/PageLayout';
import Image from "next/image";
import favoraitesImage from '../../assets/favoraites.jpg';
import './favoraites.css';
import AuthProvider from '@/auth/AuthProvider';

const Favorites = async () => {

    return (
        <PageLayout>
            <div>
                {/* Cover Image */}
                <div className="w-full h-[350px]">
                    <Image src={favoraitesImage} className="h-full w-full object-cover" alt="Favorites" />
                </div>  

                {/* Favorite Products */}
                <AuthProvider>
                    <FavoritesMain />  
                </AuthProvider>
            </div>
        </PageLayout>
    );
}


export default Favorites;