export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="pt-10 w-full flex flex-col gap-12 items-center justify-center">
            {children}
        </div>
    );
}
