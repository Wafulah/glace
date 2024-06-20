import { Metadata } from 'next';
import { Inter } from "next/font/google";

import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { ModalProvider } from "@/providers/modal-provider";
import { ToastProvider } from "@/providers/toast-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: {
      template: "%s | Glamarace ",
      default: "Glamarace ",
    },
    description:
      "Discover extravagant, stylish, and top-quality fashion for everyone at Glamarace, Kenya's leading online fashion store. We offer a wide variety of clothing, shoes, accessories, and more from top brands and local designers. Shop wedding dresses, suits, watches, purses, Nike, Adidas, and more. Find your perfect look and elevate your style with Glamarace. Free shipping within Kenya!",
    keywords: [
      "best online fashion store in Kenya",
      "luxury wedding dresses in Kenya",
      "tailored suits for men in Kenya",
      "high-end watches available in Kenya",
      "designer purses and handbags in Kenya",
      "Nike sportswear and sneakers in Kenya",
      "Adidas clothing and accessories in Kenya",
      "trendy clothing for all ages in Kenya",
      "stylish shoes and footwear in Kenya",
      "fashion accessories for men and women in Kenya",
      "latest fashion trends in Kenya",
      "vintage clothing and accessories in Kenya",
      "designer clothing and luxury brands in Kenya",
      "traditional Kitenge outfits in Kenya",
      "elegant dresses for special occasions in Kenya",
      "fashionable skirts for women in Kenya",
      "Nike Air Force 1 sneakers in Kenya",
      "premium denim jeans and jackets in Kenya",
      "luxury Rolex watches in Kenya",
      "Puma sportswear and casual wear in Kenya",
      "Levi's jeans and apparel in Kenya",
      "Gucci luxury fashion items in Kenya",
      "Prada high-end fashion accessories in Kenya",
      "Louis Vuitton designer bags and clothing in Kenya",
      "Zara trendy fashion collections in Kenya",
      "H&M affordable clothing in Kenya",
      "affordable fashion for men and women in Kenya",
      "high-quality fashion for discerning buyers in Kenya",
      "stylish clothing and accessories in Kenya",
      "glamorous fashion and style in Kenya",
      "top fashion designers in Kenya",
    ],
    metadataBase: new URL("https://sokofiti-store.vercel.app"),
    openGraph: {
      type: "website",
      url: "https://sokofiti-store.vercel.app",
      title: "Glamarace - Kenya's Premier Online Fashion Destination",
      description:
        "Discover extravagant, stylish, and top-quality fashion for everyone at Glamarace, Kenya's leading online fashion store. We offer a wide variety of clothing, shoes, accessories, and more from top brands and local designers.",
      images: [
        {
          url: "https://sokofiti-store.vercel.app/og-image.png",
          width: 1200,
          height: 630,
          alt: "Glamarace Online Fashion Store",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@glamarace",
      title: "Glamarace - Kenya's Premier Online Fashion Destination",
      description:
        "Discover extravagant, stylish, and top-quality fashion for everyone at Glamarace, Kenya's leading online fashion store. We offer a wide variety of clothing, shoes, accessories, and more from top brands and local designers.",
      images: "https://sokofiti-store.vercel.app/twitter-image.png",
    },
    themeColor: "FF3300",
    robots: "index, follow",
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
                        <SpeedInsights />
                    </ThemeProvider>
                </body>
            </html>
        </SessionProvider>
    );
}

