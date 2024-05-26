"use client"
import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Link } from "@/navigation";
import { useState } from "react";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { Button } from "./ui/button";

// TODO: Add useMediaQuery to the next version of the library
// import { useMediaQuery } from "@/hooks/use-media-query"


export type BreadcrumbItemProps = {
    label: React.ReactNode;
    href?: string;
};

export type BreadcrumbProps = {
    items: BreadcrumbItemProps[];
    // separator?: React.ReactNode;
    disabled?: boolean;
    className?: string;
    // ellipsis?: boolean;
};

const ITEMS_TO_DISPLAY = 5

function useMediaQuery(query: string) {
    // use mediaQuery hook
    return true
}
export default function BreadcrumbComponent({ items }: BreadcrumbProps) {
    const [open, setOpen] = useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {/* get first item in items */}
                <BreadcrumbItem>
                    <BreadcrumbLink href={items[0].href}>{items[0].label}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                {items.length > ITEMS_TO_DISPLAY ? (
                    <>
                        <BreadcrumbItem>
                            {isDesktop !== undefined && isDesktop ? (
                                <DropdownMenu open={open} onOpenChange={setOpen}>
                                    <DropdownMenuTrigger
                                        className="flex items-center gap-1"
                                        aria-label="Toggle menu"
                                    >
                                        <BreadcrumbEllipsis className="h-4 w-4" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="start">
                                        {items.slice(1, -2).map((item, index) => (
                                            <DropdownMenuItem key={index}>
                                                <Link href={item.href ? item.href : "#"}>
                                                    {item.label}
                                                </Link>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <Drawer open={open} onOpenChange={setOpen}>
                                    <DrawerTrigger aria-label="Toggle Menu">
                                        <BreadcrumbEllipsis className="h-4 w-4" />
                                    </DrawerTrigger>
                                    <DrawerContent>
                                        <DrawerHeader className="text-left">
                                            <DrawerTitle>Navigate to</DrawerTitle>
                                            <DrawerDescription>
                                                Select a page to navigate to.
                                            </DrawerDescription>
                                        </DrawerHeader>
                                        <div className="grid gap-1 px-4">
                                            {items.slice(1, -2).map((item, index) => (
                                                <Link
                                                    key={index}
                                                    href={item.href ? item.href : "#"}
                                                    className="py-1 text-sm"
                                                >
                                                    {item.label}
                                                </Link>
                                            ))}
                                        </div>
                                        <DrawerFooter className="pt-4">
                                            <DrawerClose asChild>
                                                <Button variant="outline">Close</Button>
                                            </DrawerClose>
                                        </DrawerFooter>
                                    </DrawerContent>
                                </Drawer>
                            )}
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </>
                ) : null}
                {items.slice(-ITEMS_TO_DISPLAY + 1).map((item, index) => (
                    <BreadcrumbItem key={index}>
                        {item.href ? (
                            <>
                                <BreadcrumbLink
                                    asChild
                                    className="max-w-20 truncate md:max-w-none"
                                >
                                    <Link href={item.href}>{item.label} --- a</Link>
                                </BreadcrumbLink>
                                <BreadcrumbSeparator />
                            </>
                        ) : (
                            <BreadcrumbPage className="max-w-20 truncate md:max-w-none">
                                {item.label}
                            </BreadcrumbPage>
                        )}
                    </BreadcrumbItem>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    )
}

