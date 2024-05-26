import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn, formatNumber } from "@/lib/utils";
import { Link } from "@/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import prisma from "@/lib/prisma";
import { IconComponent } from "@/components/icons";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { EllipsisVertical, EyeIcon, Heart, MessageCircle, Plus, Users, Users2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import PlatformIcon from "@/components/platform-icon";
import numbro from "numbro";


type ChannelDataType = {
    id: string;
    title: string;
    description: string;
    avatar: string;
    links: {
        id: string;
        platform: {
            label: string;
            code: string;
        }
    }[]
}
const getData = async (id: string, searchParams: { [key: string]: string | string[] | undefined }) => {
    // Build the include object conditionally based on searchParams
    // const includeObject: any = {};

    // if (searchParams?.p) {
    //     includeObject.linkedChannel = {
    //         where: {
    //             id: searchParams.p
    //         },
    //         select: {
    //             id: true,
    //             platform: {
    //                 select: {
    //                     name: true,
    //                     label: true
    //                 }
    //             }
    //         },
    //         items: true
    //     };
    // }
    let data: ChannelDataType;
    const p = searchParams.p
    const channel = await prisma.channel.findUnique({
        where: {
            id: id
        },
        select: {
            id: true,
            title: true,
            description: true,
            avatar: true,
            links: {
                select: {
                    id: true,
                    metadata: true,
                    platform: {
                        select: {
                            label: true,
                            code: true
                        }
                    }
                }
            },
        }
    });

    if (channel) {
        return {
            ...channel,
            id: channel.id,
            title: channel.title,
            description: channel.description,
            avatar: channel.avatar,
            links: channel.links,
            // combine subscribers from all linked channels
            subscribers: formatNumber(channel.links.reduce((acc, link) => {
                const jsonMetadata = link.metadata ? JSON.parse(link.metadata) : null;
                return acc + (jsonMetadata?.subscribers || 0);
            }, 0)),
            model: "channel"
        }
    }

    const linked = await prisma.linked.findUnique({
        where: {
            id: id as string
        },
        select: {
            id: true,
            metadata: true,
            platform: {
                select: {
                    label: true,
                    code: true
                }
            },
        }
    });

    if (linked) {
        const jsonMetadata = JSON.parse(linked.metadata);
        return {
            ...linked,
            id: linked.id,
            title: jsonMetadata?.title,
            description: jsonMetadata?.description,
            avatar: jsonMetadata?.avatar,
            subscribers: formatNumber(jsonMetadata?.subscribers),
            links: [linked.platform],
            model: "linked"
        }
    }
}




export default async function Page({ params, searchParams }: Readonly<{ params: { id: string }, searchParams: { [key: string]: string | string[] | undefined } }>) {
    let data = await getData(params.id, searchParams);
    return (
        <div className="grid gap-4 grid-cols-1">
            {/* <pre className="bg-gray-800 text-white p-4 rounded">
                {JSON.stringify(data, null, 2)}
            </pre> */}
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 ">
                <Card
                    className="sm:col-span-2" x-chunk="dashboard-05-chunk-0"
                >
                    <CardHeader className="pb-3">
                        <div className="flex items-center space-x-3 ">
                            <div>
                                <Image src={data?.avatar} alt={data?.title} width={150} height={150} className="rounded-lg" />
                            </div>
                            <div className=" grid gap-2">
                                {data?.model === "linked" && (
                                    <div className="flex items-center gap-2.5">
                                        <PlatformIcon code={data?.links[0]?.code} label={data?.links[0]?.label} className="text-yellow-400 h-9 w-9" />
                                        <Badge variant="secondary">Linked</Badge>
                                    </div>
                                )}
                                <CardTitle className="items-center flex">{data?.title}</CardTitle>
                                <CardDescription className="max-w-lg text-balance leading-relaxed">
                                    Introducing Our Dynamic Orders Dashboard for Seamless
                                    Management and Insightful Analysis.
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    {data?.model === "channel" && (
                        <CardFooter>
                            {data?.links?.map((item) => (
                                <Link key={item.id} href={`/channels/${data.id}?p=${item.id}`} className="flex items-center justify-start gap-2.5">
                                    <PlatformIcon code={item?.platform?.code} label={item?.platform?.label} className="text-yellow-400  h-8 w-8 me-2.5" />
                                </Link>
                            ))}
                            <Button variant={"secondary"} size={"sm"}>
                                <Plus className="h-5 w-5 me-1" /> Link Channel
                            </Button>
                        </CardFooter>
                    )}

                </Card>
                <Card x-chunk="dashboard-05-chunk-1">
                    <CardHeader className="pb-2">
                        <CardDescription>Subscribers</CardDescription>
                        <CardTitle className="text-4xl">{data?.subscribers}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xs text-muted-foreground">
                            +25% from last week
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Progress value={25} aria-label="25% increase" />
                    </CardFooter>
                </Card>
                <Card x-chunk="dashboard-05-chunk-2">
                    <CardHeader className="pb-2">
                        <CardDescription>Likes</CardDescription>
                        <CardTitle className="text-4xl">87M</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xs text-muted-foreground">
                            +10% from last month
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Progress value={12} aria-label="12% increase" />
                    </CardFooter>
                </Card>
                <Card x-chunk="dashboard-05-chunk-2">
                    <CardHeader className="pb-2">
                        <CardDescription>Interactions</CardDescription>
                        <CardTitle className="text-4xl">11.2M</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xs text-muted-foreground">
                            +10% from last month
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Progress value={12} aria-label="12% increase" />
                    </CardFooter>
                </Card>
            </div>

            <div className="grid grid-cols-5 gap-4 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5  ">
                <div className="col-span-3 gap-4 ">

                    <Tabs defaultValue="videos" className="w-full ">
                        <TabsList>
                            <TabsTrigger value="videos">Videos</TabsTrigger>
                            {/* add more  */}
                            <TabsTrigger value="othere">Other</TabsTrigger>
                        </TabsList>
                        <TabsContent value="videos">
                            {data?.items?.map((item) => (
                                <div key={item.id} className="flex items-start justify-start gap-2 border rounded">

                                    <Link href={`item/${item.id}`} className="relative flex items-center justify-center w-56  h-32 rounded p-1 hover:opacity-90 hover:border ">
                                        <Badge variant="secondary" className="absolute top-2 start-2 z-10">Live</Badge>
                                        <Badge variant="secondary" className="absolute bottom-2 end-2 z-10 font-semibold text-sm">{item.details?.duration}</Badge>
                                        <Image src={item.details.thumbnails[0]} alt={item.details.thumbnails[0]} fill className="rounded" />
                                    </Link>
                                    <div className="flex flex-col gap-1.5 p-2 pt-2 w-full">
                                        <div className="flex items-center justify-between ">
                                            <div className="grid grid-flow-col gap-2 items-center">
                                                <Badge variant="secondary">Live</Badge>
                                                <IconComponent name={"tiktok"} className="h-4 w-4" />
                                            </div>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger>
                                                    <EllipsisVertical className="h-5 w-5 hover:text-muted-foreground cursor-pointer" />
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem>Profile</DropdownMenuItem>
                                                    <DropdownMenuItem>Billing</DropdownMenuItem>
                                                    <DropdownMenuItem>Team</DropdownMenuItem>
                                                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                        <div className="flex">
                                            <Link href={`/channels/${data.id}/item/${item.id}`} className="text-md font-semibold hover:text-muted-foreground">{item.title}</Link>
                                        </div>
                                        <p className="text-sm text-muted-foreground line-clamp-1">{item.description}</p>
                                        <TooltipProvider>
                                            <div className="grid grid-flow-col gap-2 items-center">
                                                <Tooltip>
                                                    <div className="flex items-center">
                                                        <TooltipTrigger className="flex items-center gap-1 text-muted-foreground" >
                                                            <EyeIcon className="h-5 w-5" />
                                                            <span className="text-sm">{2332}</span>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            Views
                                                        </TooltipContent>
                                                    </div>
                                                </Tooltip>
                                                <Tooltip>
                                                    <div className="flex items-center">
                                                        <TooltipTrigger className="flex items-center gap-1 text-muted-foreground" >
                                                            <Heart className="h-5 w-5" />
                                                            <span className="text-sm">{2332}</span>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            Likes
                                                        </TooltipContent>
                                                    </div>
                                                </Tooltip>
                                                <Tooltip>
                                                    <div className="flex items-center">
                                                        <TooltipTrigger className="flex items-center gap-1 text-muted-foreground" >
                                                            <MessageCircle className="h-5 w-5" />
                                                            <span className="text-sm">{2332}</span>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            Comments
                                                        </TooltipContent>
                                                    </div>
                                                </Tooltip>
                                            </div>
                                        </TooltipProvider>
                                    </div>
                                </div>
                            ))}
                        </TabsContent>
                        <TabsContent value="other">More tabs goes here</TabsContent>
                    </Tabs>
                </div >
                <div className="grid-cols-2">
                    <Tabs defaultValue="comments" className="w-full ">
                        <TabsList>
                            <TabsTrigger value="comments">Comments</TabsTrigger>
                            <TabsTrigger value="notifications">Notifications</TabsTrigger>
                            <TabsTrigger value="inbox">Inbox</TabsTrigger>
                        </TabsList>
                        <TabsContent value="comments">Comments goes here</TabsContent>
                        <TabsContent value="notifications">Make changes to your account here.</TabsContent>
                        <TabsContent value="inbox">Change your password here.</TabsContent>
                    </Tabs>
                </div>
            </div >
        </div >
    )
}