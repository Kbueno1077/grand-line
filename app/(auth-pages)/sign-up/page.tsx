import {
    FormMessage,
    Message,
} from "@/app/(auth-pages)/_components/form-message";
import { SubmitButton } from "@/app/(auth-pages)/_components/submit-button";
import { signUpAction } from "@/app/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";

export default function Signup({ searchParams }: { searchParams: Message }) {
    if ("message" in searchParams) {
        return (
            <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
                <FormMessage message={searchParams} />
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen max-w-3xl flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="w-full space-y-8">
                    <h1 className="text-2xl font-medium">Sign up</h1>
                    <p className="text-sm text text-foreground">
                        Already have an account?{" "}
                        <Link
                            className="text-primary font-medium underline"
                            href="/sign-in"
                        >
                            Log in
                        </Link>
                    </p>
                </div>

                <form className="flex flex-col min-w-64 w-full mx-auto ">
                    <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8 ">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            name="email"
                            placeholder="you@example.com"
                            required
                        />
                        <Label htmlFor="password">Password</Label>
                        <Input
                            type="password"
                            name="password"
                            placeholder="Your password"
                            minLength={6}
                            required
                        />
                        <SubmitButton
                            size={"4"}
                            formAction={signUpAction}
                            pendingText="Signing up..."
                            className="cursor-pointer"
                        >
                            Sign up
                        </SubmitButton>
                        <FormMessage message={searchParams} />
                    </div>
                </form>

                <div className="mt-5">
                    <SmtpMessage />
                </div>
            </div>
        </>
    );
}
