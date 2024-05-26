"use client"
import { Link, usePathname } from "@/navigation";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

export default function ChannelNav({ items }) {
    const pathname = usePathname()
    const isActive = (href: string) => {
        // pathname is equal to href or pathname starts with 3rd segment of href (e.g. /channels/111/settings)
        return pathname === href || pathname.startsWith(href.split('/')[3]);
    }
    return items?.map((item) => (
        <Link key={item.name} href={item.href} className={cn(buttonVariants({ variant: isActive(item.href) ? "secondary" : "outline", size: "sm" }), isActive(item.href) ? "text-primary hover:text-primary focus:text-primary" : "text-muted-foreground")}>
            {item.icon}
            <span className="ms-1">{item.name}</span>
        </Link>
    ))
}