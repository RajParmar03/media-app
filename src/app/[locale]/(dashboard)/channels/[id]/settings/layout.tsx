import NavLink, { type NavLinkProps } from "@/components/nav-link";
import { Button } from "@/components/ui/button";
import { GitCompareArrows, PlugZap } from "lucide-react";

export default function Layout({ children, params }: { children: React.ReactNode, params: { id: string } }) {
    const items: NavLinkProps[] = [
        { href: `/channels/${params.id}/settings`, children: "General", },
        { href: `/channels/${params.id}/settings/publishing`, children: "Publishing", },
        { href: `/channels/${params.id}/settings/classifications`, children: "Classifications", },
        { href: `/channels/${params.id}/settings/integrations`, children: "Integrations", icon: <PlugZap className="w-5 h-5" /> },

    ]
    return (
        <div className=" grid grid-cols-12 gap-4">
            <div className="col-span-2 ">
                <div className="">
                    <div className="text-2xl font-semibold flex items-center gap-2">
                        <h3 className="text-2xl font-semibold">Settings</h3>
                        <Button variant={"secondary"} size={"icon"}>
                            <GitCompareArrows className="w-5 h-5" />
                        </Button>

                    </div>
                    <ul className=" mt-4">
                        {items.map((i) => {
                            return (
                                <li className="mb-2">
                                    <NavLink href={i.href} variant={"link"} className="p-0 text-muted-foreground" activeClassName=" text-primary font-bold focus:text-primary underline">
                                        {i.children}
                                    </NavLink>
                                </li>
                            )
                        })}

                    </ul>
                </div>
            </div>
            <div className=" col-span-10 ">
                {children}
            </div>
        </div>
    )
}