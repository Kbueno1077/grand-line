import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import AccountForm from "./account-form";

export default async function Page() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/sign-in");
    }

    return <AccountForm user={user} />;
}
