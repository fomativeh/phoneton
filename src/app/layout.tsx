"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { WebAppProvider } from "@vkruglikov/react-telegram-web-app";
import Script from "next/script";
import { SDKProvider } from "@tma.js/sdk-react";

const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
