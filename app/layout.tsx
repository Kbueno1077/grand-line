import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { GeistSans } from "geist/font/sans";
import { Viewport } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { StoreProvider } from "@/store/StoreProvider";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Button } from "@radix-ui/themes";
import GoToMaps from "@/components/GlobeHero/GoToMaps";

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata = {
    metadataBase: new URL(defaultUrl),
    title: "Next.js and Supabase Starter Kit",
    description: "The fastest way to build apps with Next.js and Supabase",
};

export const viewport: Viewport = {
    initialScale: 1,
    maximumScale: 1,
    width: "device-width",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <html
            lang="en"
            className={GeistSans.className}
            suppressHydrationWarning
        >
            <body className="bg-background text-foreground">
                <Providers>
                    <main className="">
                        <div className="flex flex-col ">{children}</div>
                    </main>

                    <Footer />
                </Providers>
            </body>
        </html>
    );
}
