import {
    FormMessage,
    Message,
} from "@/app/(auth-pages)/_components/form-message";
import { SubmitButton } from "@/app/(auth-pages)/_components/submit-button";
import { signInAction } from "@/app/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";

export default function Login({ searchParams }: { searchParams: Message }) {
    return (
        <>
            <div className="min-h-screen max-w-3xl w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="w-full space-y-8">
                    <h1 className="text-2xl font-medium">Log in</h1>
                    <p className="text-sm text-foreground">
                        Don't have an account?{" "}
                        <Link
                            className="text-foreground font-medium underline"
                            href="/sign-up"
                        >
                            Sign up
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
                        <div className="flex justify-between items-center  w-full">
                            <Label htmlFor="password">Password</Label>
                            <Link
                                className="text-xs text-foreground underline"
                                href="/forgot-password"
                            >
                                Forgot Password?
                            </Link>
                        </div>
                        <Input
                            type="password"
                            name="password"
                            placeholder="Your password"
                            required
                        />
                        <SubmitButton
                            pendingText="Signing In..."
                            formAction={signInAction}
                            size={"4"}
                        >
                            Sign in
                        </SubmitButton>
                        <FormMessage message={searchParams} />
                    </div>
                </form>
            </div>
        </>
    );
}
