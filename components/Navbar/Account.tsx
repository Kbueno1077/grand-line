"use client";
import { createClient } from "@/utils/supabase/client";
import { Avatar, Button, DropdownMenu, Flex, Skeleton } from "@radix-ui/themes";
import { User } from "@supabase/supabase-js";
import { useCallback, useState } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Logout from "./Logout";
import Link from "next/link";

function Account({ user }: { user: User | null }) {
    const router = useRouter();

    const supabase = createClient();
    const [loading, setLoading] = useState(true);
    const [fullname, setFullname] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [website, setWebsite] = useState<string | null>(null);
    const [avatar_url, setAvatarUrl] = useState<string | null>(null);
    const queryClient = useQueryClient();

    const getProfile = useCallback(async () => {
        try {
            setLoading(true);

            const { data, error, status } = await supabase
                .from("profiles")
                .select(`full_name, username, website, avatar_url`)
                .eq("id", user?.id)
                .single();

            if (error && status !== 406) {
                console.log(error);
                throw error;
            }

            if (data) {
                setFullname(data.full_name);
                setUsername(data.username);
                setWebsite(data.website);
                setAvatarUrl(data.avatar_url);
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            alert("Error loading user data!");
        }
    }, [user, supabase]);

    const query = useQuery({
        queryKey: [user?.id ?? "user"],
        queryFn: () => getProfile(),
        refetchOnWindowFocus: false,
    });

    const mutation = useMutation({
        mutationFn: getProfile,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: [user?.id ?? "user"] });
        },
    });

    if (loading) {
        return <Skeleton width="38px" height="38px" />;
    }

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <Flex gap="2">
                    <Avatar
                        size="3"
                        src={avatar_url || ""}
                        fallback={user?.email?.charAt(0) || ""}
                        className="cursor-pointer"
                    />
                </Flex>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content className="p-2">
                <DropdownMenu.Item>Hey, {user?.email}!</DropdownMenu.Item>{" "}
                <DropdownMenu.Item className="cursor-pointer" asChild>
                    <Link href="/protected/maps">Go To Maps</Link>
                </DropdownMenu.Item>{" "}
                <Logout />
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
}

export default Account;
