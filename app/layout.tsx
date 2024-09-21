import Footer from "@/components/Footer/Footer";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { Viewport } from "next";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

import { Providers } from "./providers";

export const metadata: Metadata = {
    title: {
        default: "GrandLine Maps",
        template: "%s | GrandLine Maps",
    },
    description: "Create and share custom maps of your personal desire",
    keywords: ["maps", "custom maps", "personal journey", "GrandLine"],
    authors: [{ name: "Kevin Bueno", url: "https://www.kbueno-studio.com/" }],
    creator: "WorkinWeb",
    publisher: "WorkinWeb",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        title: "GrandLine Maps",
        description:
            "Create and share custom maps of your personal journey inspired by One Piece",
        url: "https://grandlinemaps.com",
        siteName: "GrandLine Maps",
        images: [
            {
                url: "https://grandlinemaps.com/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "GrandLine Maps - Create Your Journey",
            },
        ],
        locale: "en_US",
        type: "website",
    },

    viewport: {
        width: "device-width",
        initialScale: 1,
        maximumScale: 1,
    },
    icons: {
        icon: "/favicon.ico",
    },
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
