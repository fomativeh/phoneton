"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WebAppProvider } from "@vkruglikov/react-telegram-web-app";

const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://telegram.org/js/telegram-web-app.js"></script>
      </head>
      <WebAppProvider>
        <body className={inter.className}>{children}</body>
      </WebAppProvider>
    </html>
  );
}
