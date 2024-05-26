"use client";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormState } from "react-dom";
import { useRef } from "react";
import { SubmitButton } from "@/components/submit-button";
import { signin, signup, resetPassword, signout } from "@/app/[locale]/(auth)/actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeftIcon, ArrowRight } from "lucide-react";




export function SignInForm() {
    const formRef = useRef(null)
    const [state, formAction] = useFormState(signin, {
        error: null
    });
    return (
        <form action={formAction}>
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                <Link href="/auth/reset-password" className="ml-auto inline-block text-sm underline">
                                    Forgot your password?
                                </Link>
                            </div>
                            <Input name="password" id="password" type="password" required />
                        </div>
                        <SubmitButton className="w-full">
                            Sign in
                        </SubmitButton>

                        <Button variant="outline" className="w-full">
                            Sign in with GitHub
                        </Button>

                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Link href="/auth/signup" className="underline">
                                Sign up
                            </Link>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </form>

    )
}

export function SignUpForm() {
    const formRef = useRef(null)
    const [state, formAction] = useFormState(signup, {
        error: null
    });
    return (
        // center the card
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-xl">Sign Up</CardTitle>
                <CardDescription>
                    Enter your information to create an account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="first-name">First name</Label>
                            <Input id="first-name" placeholder="Max" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="last-name">Last name</Label>
                            <Input id="last-name" placeholder="Robinson" required />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" />
                    </div>
                    <Button type="submit" className="w-full">
                        Create an account
                    </Button>
                    <Button variant="outline" className="w-full">
                        Sign up with GitHub
                    </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link href="/auth/signin" className="underline">
                        Sign in
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}


export function RestPasswordForm() {
    const formRef = useRef(null)
    const [state, formAction] = useFormState(resetPassword, {
        error: null
    });
    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-xl">Reset Password</CardTitle>
                <CardDescription>
                    Enter your email below to reset your password
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        Reset password
                    </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                    <Link href="/auth/signin" className="underline">
                        Back to Sign in <ArrowRight className="inline-block w-4 h-4" />
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}

export function SignOutForm() {
    const formRef = useRef(null)
    const [state, formAction] = useFormState(signout, {
        error: null
    });
    return (
        <form action={formAction}>
            <SubmitButton> Sign out</SubmitButton>
        </form>

    )
}
