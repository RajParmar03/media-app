import Image from "next/image"
// import Link from "next/link"
import { Link } from "@/navigation"
import {
    Antenna,
    Home,
    Library,
    Package,
    Package2,
    Settings,
    Truck,
    Tv,
} from "lucide-react"



import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import SideNavItem from "@/components/SideNavItem"


type NavItem = {
    icon: React.ReactNode
    label: string
    href: string
    children?: NavItem[]
}

// items are: channels, stations, content
const navItems: NavItem[] = [
    {
        icon: <Tv className="h-5 w-5" />,
        label: "Channels",
        href: "/channels",
    },
    {
        icon: <Antenna className="h-5 w-5" />,
        label: "Stations",
        href: "/stations",
    },
    {
        icon: <Library className="h-5 w-5" />,
        label: "Content",
        href: "/content",
    },
]



export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    // is route active or its children are active
    // TODO: implement this function to check if the current route
    //  Implement a function that checks if the current route or its children are active
    //  labels: enhancement, good first issue, help wanted
    //  assignees: azizk17

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <aside className="fixed inset-y-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex rtl:right-0 ltr:left-0">
                <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                    <Link
                        href="/"
                        className="group group-hover:bg-secondary-foreground flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-secondary text-lg font-semibold text-secondary-foreground md:h-8 md:w-8 md:text-base"
                    >
                        <Home className="h-4 w-4 transition-all group-hover:scale-110 duration-75" />
                        <span className="sr-only">My App</span>
                    </Link>
                    <TooltipProvider>
                        {navItems.map((item) => (
                            <Tooltip key={item.label}>
                                <TooltipTrigger>
                                    <SideNavItem {...item} />
                                </TooltipTrigger>
                                <TooltipContent side="right">{item.label}</TooltipContent>
                            </Tooltip>
                        ))}
                    </TooltipProvider>
                </nav>
                <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <SideNavItem href="/settings" icon={<Settings className="h-5 w-5" />} />
                            </TooltipTrigger>
                            <TooltipContent side="right">Settings</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </nav>
            </aside>
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:ps-14">
                <main className="grid w-full  flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 ">
                    {children}
                </main>
            </div>
        </div>
    )
}
