import 'antd/dist/reset.css';
import { Inter } from "next/font/google";
import "./globals.css";
import ClientEntry from './client-entry';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nexstore",
  description: "An e-Commerce Web Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png"  />
      </head>
      <body className={inter.className}>
          {children}
          <div id="__message__" />
          <ClientEntry />
      </body>
    </html>
  );
}
