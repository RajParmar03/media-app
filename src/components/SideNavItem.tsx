"use client";

import { cn } from "@/lib/utils";
import { Link, usePathname } from "@/navigation";

type SideNavItemProps = {
    href: string;
    icon: React.ReactNode;
};
export default function SideNavItem({
    href,
    icon,
    ...props
}: Readonly<SideNavItemProps>) {
    const pathname = usePathname()
    const isActive = (href: string) => {
        return pathname === href || pathname.startsWith(href)
    }
    return (
        <Link
            href={href}

            className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                {
                    "bg-primary text-primary-foreground hover:text-muted": isActive(href),
                }
            )}
        >
            {icon}
        </Link>
    );
}


// Compare this snippet from src/app/%5Blocale%5D/auth/actions.ts:
