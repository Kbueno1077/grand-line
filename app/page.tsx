import { GlobeDemo } from "@/components/GlobeHero/GlobeDemo";
import Navbar from "@/components/Navbar/Navbar";

export default async function Page() {
    return (
        <>
            <Navbar />

            <main className="flex-1 flex flex-col">
                <GlobeDemo />
            </main>
        </>
    );
}
