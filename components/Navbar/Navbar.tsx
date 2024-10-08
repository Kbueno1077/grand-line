import Link from "next/link";
import AuthModule from "../../modules/AuthModule/AuthModule";
import { ThemeSwitcher } from "../ThemeSwitcher/ThemeSwitcher";

function Navbar() {
    return (
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
            <div className="w-full flex justify-between items-center p-3 px-5 text-sm">
                <div className="flex gap-5 items-center font-semibold">
                    <Link href={"/"} className="text-xl">
                        GrandLine Maps
                    </Link>
                    <div className="flex items-center gap-2"></div>
                </div>

                <div className="flex gap-5 items-center">
                    <ThemeSwitcher />
                    <AuthModule />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
