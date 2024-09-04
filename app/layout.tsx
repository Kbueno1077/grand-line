import Navbar from "@/components/Navbar/Navbar";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Providers } from "./providers";

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata = {
    metadataBase: new URL(defaultUrl),
    title: "Next.js and Supabase Starter Kit",
    description: "The fastest way to build apps with Next.js and Supabase",
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
                        <div className="flex flex-col gap-20 ">
                            {children}

                            <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
                                <p>
                                    Powered by{" "}
                                    <a
                                        href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
                                        target="_blank"
                                        className="font-bold hover:underline"
                                        rel="noreferrer"
                                    >
                                        Supabase
                                    </a>
                                </p>
                            </footer>
                        </div>
                    </main>
                </Providers>
            </body>
        </html>
    );
}
