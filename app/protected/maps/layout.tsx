import Sidebar from "@/modules/Sidebar/Sidebar";

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <div
                className="flex"
                style={{
                    height: "calc(100dvh - 63px)",
                }}
            >
                <Sidebar />
                {children}
            </div>
        </div>
    );
}
