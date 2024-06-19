"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { WebAppProvider } from "@vkruglikov/react-telegram-web-app";
import Script from "next/script";
import { SDKProvider } from "@tma.js/sdk-react";
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ["latin"] });
const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)=> {
  return (
    <html lang="en">
      {/* <head>
        <Script src="https://telegram.org/js/telegram-web-app.js"></Script>
      </head> */}
      <SDKProvider>
        <body className={inter.className}>{children}</body>
      </SDKProvider>
    </html>
  );
}

export default dynamic(() => Promise.resolve(RootLayout), { ssr: false });