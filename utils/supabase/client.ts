import { createBrowserClient } from "@supabase/ssr";

export const createClient = () => {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL! ??
            "https://randomurl_for_testing.supabase.co",
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! ??
            //Random_ANON_KEY_FOR TESTING
            "rFsLtOhWbSzVcPmNiUxKqRwEyTuIoApDfGhJkLzXcBnMqWsErTyUiOpAsDfGhJkLzXcVbNmQwErTyUiOpAsDfGhJkLzXcBnMqWsErTyUiOpAsDfGhJkLzXcVbNmQwErTyUiOpAsDfGhJkLzXcBnMqWsErTyUiOpAsDfGhJkLzXcVbNmQwErTyUiOpAsDfGhJkLzXcBnM.kLzXcBnMqWsErTyUiOpAsDfGhJkLzXcVbNmQwErTyUiOpAsDfGhJkLzXcBnMqWsErTyUiOpAsDfGhJkLzXcVbNmQwErTyUiOpAsDfGhJkLzXcBnMqWsErTyUiOpAsDfGhJkLzXcVbNmQwErTyUiOpAsDfGhJkLzXcBnMqWsErTyUiOpAsDfGhJkLzXcVbNmQwErTyUiOpAsDfGhJkLzXcBnMqWsErTyUiOpAsDfGhJkLzXcVbNmQwErTyUiOpAsDfGhJkLzXcBnM"
    );
};
