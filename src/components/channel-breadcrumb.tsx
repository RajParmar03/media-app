"use client";

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";
import { ChevronDownIcon, ChevronsUpDown } from "lucide-react";
import { IconComponent } from "./icons";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "./ui/breadcrumb";
import { Link } from "@/navigation";
import { useParams, useSearchParams } from 'next/navigation'
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { Key } from "react";
import { Prisma } from "@prisma/client";




type ChannelBreadcrumbProps = {
    data: Prisma.ChannelGetPayload<{ include: { subChannels: { include: { platform: true } }; } }>
}

export function ChannelBreadcrumb001({ data }: ChannelBreadcrumbProps) {
    const searchParams = useSearchParams()
    const p = searchParams.get('p')

    const hasLinks = data?.linkedChannels?.length > 0
    // - if channel has no links, disply single Breadcrumb Item
    // - if channel has links but home is active, display single Breadcrumb menu
    // - if channel has links and link is active, display Breadcrumb item / Breadcrumb Menu
    return (
        <div>
            <Breadcrumb>
                <BreadcrumbList>
                    {/*  */}
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/channels">Channels</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    {/*  */}

                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <>
                                <Link href={`/channels/${data.id}`} className=" flex items-center">
                                    {data?.title}
                                </Link>
                            </>
                        </BreadcrumbLink>
                        {hasLinks && !p && <BreadcrumbMenu data={data} />}
                    </BreadcrumbItem>
                    {hasLinks && p && (
                        <>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href={`/channels/${data.id}?p=${p}`} className="flex items-center">
                                        <IconComponent name={data?.linkedChannels?.find(item => item.id === p)?.platform?.code} className="h-5 w-5 me-1.5" />
                                        {data?.linkedChannels?.find(item => item.id === p)?.platform?.label}
                                    </Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbMenu data={data} />
                        </>
                    )}
                </BreadcrumbList>
            </Breadcrumb>
        </div >
    )
}

function BreadcrumbMenu001({ data }: ChannelBreadcrumbProps) {
    const searchParams = useSearchParams()
    const p = searchParams.get('p')
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 ms-1">
                <div className={"p-1"}>
                    <ChevronsUpDown className={cn("w-5 h-5 hover:text-primary")} />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                {data?.linkedChannels?.filter(item => item.id !== p)
                    .map((item, index: Key) => (
                        <DropdownMenuItem key={index} asChild >
                            <Link href={`/channels/${data.id}?p=${item.id}`} className=" flex items-center cursor-pointer">
                                <IconComponent name={item?.platform?.code} className="h-6 w-6 me-1.5" />
                                {item?.platform?.label}
                            </Link>
                        </DropdownMenuItem>
                    ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

function BreadcrumbMenu({ data }: ChannelBreadcrumbProps) {
    const searchParams = useSearchParams()
    const p = searchParams.get('p')
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 ms-1">
                <div className={"p-1"}>
                    <ChevronsUpDown className={cn("w-5 h-5 hover:text-primary")} />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                {data?.channels?.filter(item => item.id !== p)
                    .map((item, index: Key) => (
                        <DropdownMenuItem key={index} asChild >
                            <Link href={`/channels/${data.id}?p=${item.id}`} className=" flex items-center cursor-pointer">
                                <IconComponent name={item?.platform?.code} className="h-6 w-6 me-1.5" />
                                {item?.platform?.label}
                            </Link>
                        </DropdownMenuItem>
                    ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


export default function ChannelBreadcrumb({ data }: ChannelBreadcrumbProps) {
    const searchParams = useSearchParams()
    const params = useParams()
    const p = searchParams.get('p')

    // check if data object has channelId property to determine if it is a link
    const isLink = 'channelId' in data && data.channelId !== null && data.channelId !== undefined
    const belongsToStation = data?.stationId !== null || ('channel' in data && data.channel?.stationId !== null)

    const stationValues = isLink ? data?.channel?.station : data?.station
    const channelValues = isLink ? data?.channel : data

    const links = isLink ? data?.channel?.links : data?.links


    const hasLinks = links?.length > 0
    // - if channel has no links, disply single Breadcrumb Item
    // - if channel has links but home is active, display single Breadcrumb menu
    // - if channel has links and link is active, display Breadcrumb item / Breadcrumb Menu
    return (
        <div>

            <Breadcrumb>
                <BreadcrumbList>
                    {/*  */}
                    {belongsToStation && (
                        <>
                            <BreadcrumbItem>
                                <BreadcrumbLink href={`/stations/${stationValues.id}`}>{stationValues.name}</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                        </>
                    )}
                    {/*  */}

                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <>
                                <Link href={`/channels/${channelValues.id}`} className=" flex items-center">
                                    {channelValues?.title}
                                </Link>
                            </>
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    {hasLinks && (
                        <>
                            {/* <BreadcrumbSeparator /> */}
                            <DropdownMenu>
                                <DropdownMenuTrigger className="flex items-center gap-1 ms-0">
                                    <div className={"p-1 flex items-center justify-start"}>
                                        {isLink && (<IconComponent name={data?.platform?.code} className="h-6 w-6 me-1.5 text-yellow-400" />)}  <ChevronsUpDown className={cn("w-5 h-5 hover:text-primary")} />
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start" >
                                    {links?.filter(item => item.id !== p)
                                        .map((item, index: Key) => (
                                            <DropdownMenuItem key={index} asChild >
                                                <Link href={`/channels/${item.id}`} className={cn("flex items-center cursor-pointer", { " opacity-60 cursor-default": item.id === params?.id })}>
                                                    <IconComponent name={item?.platform?.code} className="h-6 w-6 me-1.5" />
                                                    {item?.platform?.label}
                                                </Link>
                                            </DropdownMenuItem>
                                        ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    )}
                </BreadcrumbList>
            </Breadcrumb>
        </div >
    )
}