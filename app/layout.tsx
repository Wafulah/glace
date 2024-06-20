import { Metadata } from 'next';
import { Inter } from "next/font/google";

import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { ModalProvider } from "@/providers/modal-provider";
import { ToastProvider } from "@/providers/toast-provider";
import { ThemeProvider } from "@/providers/theme-provider";


import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: {
      template: "%s | Glace CRM",
      default: "Glace CRM",
    },
    description:
      "Easy Robust CRM to manage customers, Products and Orders",
    keywords: [
      "Best CRM in Kenya",
      "Customer Management System"
      
      
    ],
    metadataBase: new URL("https://glace-store.vercel.app"),
    
  };

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();
    
    return (
        <SessionProvider session={session}>
            <html lang="en">
                <body className={inter.className}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                    >
                        <ToastProvider />
                        <ModalProvider />
                        {children}
                        
                    </ThemeProvider>
                </body>
            </html>
        </SessionProvider>
    );
}

