// import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { redirect } from "@/navigation"

export default async function Page() {
    const { isAuthenticated } = await auth()
    if (!isAuthenticated) {
        redirect('/signin')
    }
    return <h1>Hello, Stations page!</h1>
}