import prisma from "@/lib/prisma"
import { AddNewLinkForm } from "./_forms"
import { buttonVariants } from "@/components/ui/button"
import { Link } from "@/navigation"
import { cn } from "@/lib/utils"
import { TriangleAlert } from "lucide-react"
import { Icons } from "@/components/icons"
import { Badge } from "@/components/ui/badge"

const getData = async (id: string) => {
    const data = await prisma.channel.findUnique({
        where: {
            id,
        }
    })
    return data
}
const getPlatforms = async () => {
    const platforms = await prisma.platform.findMany({
        select: {
            id: true,
            name: true,
            label: true,
        }
    })
    return platforms
}

// tow ways of integration:
// 1. api key
// 2. scrapper: username, password || token



// extenranla id
// platform
// password: username, password
// token: token
// webhook: url

export default async function Page({ params }: { params: { locale: string, id: string } }) {
    const data = await getData(params.id)
    const platforms = await getPlatforms()
    return (
        <div>
        </div>
    )
}