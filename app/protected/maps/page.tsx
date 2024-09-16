import MapModule from "@/modules/MapModule/MapModule";

export default async function ProtectedPage() {
    return (
        <div className="flex-1 w-full flex flex-col gap-12">
            <MapModule />
        </div>
    );
}
