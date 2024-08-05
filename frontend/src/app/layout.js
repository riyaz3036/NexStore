import { Inter } from "next/font/google";
import "./globals.css";
import 'remixicon/fonts/remixicon.css';
import '../../public/styles/tailwind.css'
import { AuthContextProvider } from "@/context/AuthContext";



const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nexstore",
  description: "An e-Commerce Web Application",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png"  />
      </head>
      <body className={inter.className}>
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
