"use client"
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import NextLink from "next/link";

import { getTranslations } from 'next-intl/server';
import { getLocale } from "next-intl/server";


export type PageNumberPaginationMeta = {
    isFirstPage: boolean;
    isLastPage: boolean;
    currentPage: number;
    previousPage: number | null;
    nextPage: number | null;
    pageCount: number | null;
    total: number | null;
};
export type PaginationProps = PageNumberPaginationMeta & {
    pathname: string;
    pageSize?: number; // take
    short?: boolean;
};

import { usePathname, useSearchParams } from "next/navigation"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react";


interface IPagination {
    totalCount: number
}

export default function Pagination({ totalCount }: IPagination) {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const currentPage = Number(searchParams.get("page")) || 1
    const limit = Number(searchParams.get("limit")) || 20
    const totalPages = Math.ceil(totalCount / limit)

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams)
        params.set("page", pageNumber.toString())
        return `${pathname}?${params.toString()}`
    }

    const [rtl, setRtl] = useState<boolean>(false)
    useEffect(() => {
        const html = document.documentElement;
        const direction = html.getAttribute("dir");
        setRtl(direction === "rtl");
    }
    )


    return (
        <div className=" flex items-start justify-start">
            <ul className="flex items-center justify-between space-x-3">
                <li>
                    <PaginationLink
                        href={createPageURL(currentPage - 1)}
                        disabled={currentPage - 1 === 0}
                    >
                        {rtl ? <ChevronRight /> : <ChevronLeft />}
                    </PaginationLink>
                </li>
                <PaginationEllipsis totalPages={totalPages} currentPage={currentPage} createPageURL={createPageURL} />
                <li>
                    <PaginationLink
                        href={createPageURL(currentPage + 1)}
                        disabled={currentPage >= totalPages}
                    >
                        {rtl ? <ChevronLeft /> : <ChevronRight />}
                    </PaginationLink>
                </li>
            </ul>
        </div>
    )
}

// Pagination Ellipsis
// dipalyed when there are more than 5 pages and the current page is not close to the first or last page
// for example: 1 2 3 ... 10 11

const PaginationEllipsis = ({ totalPages, currentPage, createPageURL }) => {
    const paginationItems = () => {
        let pages = [];

        if (totalPages <= 5) {
            // If total pages is 5 or less, show all pages
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always add the first page
            pages.push(1);

            // Define dynamic range
            let start = Math.max(2, currentPage - 2);
            let end = Math.min(totalPages - 1, currentPage + 2);

            if (currentPage - 1 > 2) {
                pages.push('...');
            }

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (currentPage + 2 < totalPages - 1) {
                pages.push('...');
            }

            // Always add the last page
            pages.push(totalPages);
        }

        return pages;
    };
    return (
        paginationItems().map((page, index) => (
            <li key={index}>
                {page === '...' ? (
                    <span>...</span>
                ) : (
                    <PaginationLink
                        href={createPageURL(page)}
                        active={page === currentPage}
                    >
                        {page}
                    </PaginationLink>
                )}
            </li>
        ))

    );
}


const PaginationLink = ({ href, children, active = false, disabled = false, className = "" }) => {

    return (
        <NextLink
            className={cn(
                buttonVariants({
                    variant: active ? 'outline' : 'ghost',

                }),
                disabled ? 'pointer-events-none text-muted-foreground ' : '',
                active ? 'pointer-events-none' : '',
            )}
            aria-disabled={disabled || active}
            tabIndex={(active || disabled) ? -1 : undefined}
            href={href}
        >
            {children}
        </NextLink>
    )
}
