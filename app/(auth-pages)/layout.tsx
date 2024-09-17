import Navbar from "@/components/Navbar/Navbar";

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Navbar />
            <div className="w-full flex flex-col items-center justify-center">
                {children}
            </div>
        </>
    );
}
