import NavbarMaps from "@/components/Navbar/NavbarMaps";
import Sidebar from "@/modules/Sidebar/Sidebar";
import { StoreProvider } from "@/store/StoreProvider";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/sign-in");
    }

    return (
        <div>
            <StoreProvider user={user}>
                <NavbarMaps />

                <div
                    className="flex"
                    style={{
                        height: "calc(100dvh - 63px)",
                    }}
                >
                    <Sidebar />
                    {children}
                </div>
            </StoreProvider>
        </div>
    );
}
