import AuthProvider from "@/auth/AuthProvider";
import Footer from "../common/Footer/Footer";
import Header from "../common/Header/Header";

const PageLayout = async ({children}: {children: React.ReactNode}) => {
    return(
        <div className="w-[100vw] h-[100vh]">
            <AuthProvider>
                <Header />
            </AuthProvider>
            <div className="w-full">
                {children}
            </div>
            <AuthProvider>
                <Footer />
            </AuthProvider>
        </div>
    )
}

export default PageLayout;