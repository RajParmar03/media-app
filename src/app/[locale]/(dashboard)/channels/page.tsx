// import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Pagination from "@/components/pagination";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Link, redirect } from "@/navigation"
import { Eye, ListChecks, Plus, Users2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import PlatformIcon from "@/components/platform-icon";
import { platform } from "os";
import { Badge } from "@/components/ui/badge";


export type GetManyParams = {
    offset?: number;
    limit?: number;
    // search?: string;
    order?: "asc" | "desc";
    sort?: string;
    include?: any;
};
/**
 *  get channels
 * @param page
 * @param limit
 * @returns
 */
async function getChannels({ limit = 20, offset = 1, order = "desc", sort = "createdAt", include }: GetManyParams) {
    const [data, total] = await prisma.$transaction([
        prisma.channel.findMany({
            where: {
                // linkedParentId: null,
            },
            orderBy: {
                [sort]: order,
            },
            take: Number(limit),
            skip: Number(offset),
            include,
        }),
        prisma.channel.count({
            where: {
                // linkedParentId: null,
            },
        }),
    ]);

    return {
        data,
        total,
    };
}

export const FooterItem = ({ label, icon, value }) => {
    return (
        <Tooltip>
            <TooltipTrigger>
                <div className="flex justify-center items-center space-x-2 text-muted-foreground">
                    {icon}
                    <span>{value}</span>
                </div>
            </TooltipTrigger>
            <TooltipContent>
                {label}
            </TooltipContent>
        </Tooltip>
    )
}

export default async function Page({ params, searchParams }) {
    const { isAuthenticated } = await auth()
    if (!isAuthenticated) {
        redirect('/signin')
    }

    const search = searchParams?.query || ""
    const currentPage = Number(searchParams?.page) || 1
    const limit = Number(searchParams?.limit) || 20
    const offset = (currentPage - 1) * limit

    const { data, total } = await getChannels({
        limit,
        offset,
        include: {
        },
        order: "desc",
        sort: "createdAt",
    });


    return <>
        <div className="flex justify-between items-center py-2">
            <h1 className="text-lg font-semibold">Channels</h1>
            <Button variant={"secondary"}>
                <Plus className="w-4 h-4 me-2" />
                Create Channel
            </Button>
        </div>
        <div className="grid grid-cols-6 gap-4">
            {data.map((channel) => (
                <Card className=" p-1">
                    <CardHeader className=" p-2">
                        <div className=" flex items-center justify-between">
                            <Badge variant={"outline"} className=" text-green-400 font-bold">Active</Badge>
                            {/* <span className="bg-green-500 rounded-e-full -ms-3 px-2 py-1 w-fit text-white text-xs">Active</span> */}
                            {/* <PlatformIcon code={channel?.platform} /> */}
                        </div>
                        <div className=" flex items-center justify-between">
                            <CardTitle>
                                <Link href={`/channels/${channel?.id}`} className="hover:text-muted-foreground text-lg">
                                    {channel?.title ?? "Channel Title"}
                                </Link>
                            </CardTitle>
                        </div>
                        <CardDescription className="line-clamp-2">
                            {channel?.description}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-2 items-center justify-center flex">
                        {/* <pre>{JSON.stringify(channel, null, 2)}</pre> */}
                        <Image src={channel?.avatar} alt={channel?.title || ""} width={200} height={200} className="rounded-lg" />
                    </CardContent>
                    <CardFooter>
                        <TooltipProvider>
                            <div className=" grid gap-4 grid-cols-3  w-full">
                                <FooterItem label="Total Subscribers" icon={<Users2 className=" h-4 w-4" />} value={channel?.subscribers ?? 0} />
                                <FooterItem label="Total Videos" icon={<ListChecks className="h-4 w-4" />} value={channel?.videos ?? 0} />
                                <FooterItem label="Total Views" icon={<Eye className=" h-4 w-4" />} value={channel?.views ?? 0} />
                            </div>
                        </TooltipProvider>

                    </CardFooter>
                </Card>
            ))}
        </div>
        <Pagination totalCount={total} />
    </>
}