import { Button } from "@radix-ui/themes";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import React from "react";

function GoToMaps({ user }: { user: User | null }) {
    return (
        <div className="flex justify-center items-center">
            <Button size="4">
                <Link href="/protected/maps">Go to Maps</Link>
            </Button>
        </div>
    );
}

export default GoToMaps;
