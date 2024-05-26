"use client"

import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { usePathname } from "next/navigation"
import { buttonVariants } from "./ui/button";
import type { ButtonProps } from "./ui/button";
import { VariantProps } from "class-variance-authority";


// ButtonProps
export type NavLinkProps = {
    href: string,
    children: React.ReactNode,
    exact?: boolean,
    activeSegmentIndex?: number,
    activeStartsWith?: string,
    variant?: ButtonProps['variant'],
    activeVariant?: ButtonProps['variant'],
    size?: ButtonProps['size'],
    className?: ButtonProps['className']
    activeClassName?: ButtonProps['className']
    icon?: React.ReactNode
}
export default function NavLink({
    href,
    children,
    exact = false,
    activeSegmentIndex,
    activeStartsWith = "",
    variant = 'outline',
    activeVariant = variant,
    size = 'sm',
    className = '',
    activeClassName
}: NavLinkProps) {
    const pathname = usePathname()
    const isActive = (href: string) => {
        // pathname is equal to href or pathname starts with 3rd segment of href (e.g. /channels/111/settings)
        let active = false;
        let pathnameSegments = pathname.split('/');
        let hrefSegments = href.split('/');
        // active on exact url or starting segement:
        // /profile: active
        // /profile/settings: active
        if (exact && activeSegmentIndex) {
            active = pathname === href || pathnameSegments[activeSegmentIndex]?.startsWith(hrefSegments[activeSegmentIndex]);
        } else if (activeSegmentIndex) {
            active = pathnameSegments[activeSegmentIndex]?.startsWith(hrefSegments[activeSegmentIndex]);
            // if (hrefSegments.includes('settings')) {
            //     console.log(pathnameSegments, hrefSegments)
            //     console.log(pathnameSegments[activeSegmentIndex], hrefSegments[activeSegmentIndex])
            //     console.log(active)
            // }


        } else if (activeStartsWith) {
            active = pathname.startsWith(activeStartsWith);
        } else {
            active = pathname === href
        }
        return active;
    }

    return (
        <Link href={href}
            className={cn(
                buttonVariants({ variant: isActive(href) ? activeVariant : variant, size }),
                className,
                isActive(href) && activeClassName,
                "transition delay-150 duration-300 ease-in-out"
            )}>
            {children}
        </Link>
    )
}