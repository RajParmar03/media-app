import { SignInForm } from "@/app/[locale]/(auth)/forms"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function Page() {

    // dont allow user to access this page if they are already logged in
    const { isAuthenticated } = await auth()
    if (isAuthenticated) {
        redirect("/")
    }
    return (
        <div className=" flex items-center justify-center h-screen">
            <SignInForm />
        </div>
    )
}
