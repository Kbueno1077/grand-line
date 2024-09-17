import { createClient } from "@/utils/supabase/server";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import Account from "../../components/Navbar/Account";

export default async function AuthModule() {
    const {
        data: { user },
    } = await createClient().auth.getUser();

    return user ? (
        <Account user={user} />
    ) : (
        <div className="flex gap-4">
            <Button asChild variant={"outline"}>
                <Link href="/sign-in">Log in</Link>
            </Button>
            <Button asChild>
                <Link href="/sign-up">Sign up</Link>
            </Button>
        </div>
    );
}
