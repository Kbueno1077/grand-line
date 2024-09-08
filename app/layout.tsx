import Navbar from "@/components/Navbar/Navbar";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Providers } from "./providers";
import Footer from "@/components/Footer/Footer";
import { Viewport } from "next";

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

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            className={GeistSans.className}
            suppressHydrationWarning
        >
            <body className="bg-background text-foreground">
                {/* <ThemePanel /> */}
                <Providers>
                    <Navbar />

                    <main className="">
                        <div className="flex flex-col ">
                            {children}

                            <Footer />
                        </div>
                    </main>
                </Providers>
            </body>
        </html>
    );
}
