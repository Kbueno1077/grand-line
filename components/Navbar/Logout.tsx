import { signOutAction } from "@/app/actions";
import { DropdownMenu } from "@radix-ui/themes";
function Logout() {
    return (
        <form action={signOutAction}>
            <DropdownMenu.Item className="cursor-pointer" itemType="submit">
                <button type="submit" className="w-full text-left">
                    Sign out
                </button>
            </DropdownMenu.Item>{" "}
        </form>
    );
}

export default Logout;
