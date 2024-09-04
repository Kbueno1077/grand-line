import Sidebar from "@/modules/Sidebar/Sidebar";

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <div className="flex items-center">
                <Sidebar />
                {children}
            </div>
        </div>
    );
}
