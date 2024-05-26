import NavLink, { NavLinkProps } from "@/components/nav-link"
import { PlugZap } from "lucide-react"
import Link from "next/link"


export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    const items: NavLinkProps[] = [
        { href: "/settings", children: "General", icon: <PlugZap className="w-5 h-5" /> },
        { href: "/settings/profile", children: "Profile", icon: <PlugZap className="w-5 h-5" /> },
        { href: "/settings/fetches", children: "Fetches", icon: <PlugZap className="w-5 h-5" /> },
        { href: "/settings/platforms", children: "Platforms", icon: <PlugZap className="w-5 h-5" /> },
    ]
    return (
        <div className="  flex w-full gap-4">
            <div className="flex flex-col w-64 gap-6 ">
                <div className="mx-auto grid w-full max-w-6xl gap-2">
                    <h1 className="text-3xl font-semibold">Settings</h1>
                </div>
                <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                    <nav
                        className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0"
                    >
                        <ul className="grid gap-1">
                            {items.map((i) => {
                                return (
                                    <li className="">
                                        <NavLink
                                            href={i.href as string}
                                            activeStartsWith={i.href as string}
                                            variant={"link"}

                                            className="p-0 text-muted-foreground gap-x-1" activeClassName="text-primary font-bold focus:text-primary underline">
                                            {i.icon && i.icon} {i.children}
                                        </NavLink>
                                    </li>
                                )
                            }
                            )}
                        </ul>
                    </nav>
                </div>
            </div>
            <div className="  w-full">
                {children}
            </div>
        </div>
    )
}
