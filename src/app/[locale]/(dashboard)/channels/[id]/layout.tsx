import { BarChart2, DollarSignIcon, InfoIcon, PlugZap, SendIcon, Settings, Videotape } from "lucide-react";
import prisma from "@/lib/prisma";
import NavLink from "@/components/nav-link";
import ChannelBreadcrumb from "@/components/channel-breadcrumb";
import { Separator } from "@/components/ui/separator";

type NavItem = {
    name: string;
    href: string;
    icon: React.ReactNode;
};

// get channel 
const getData = async (id: string) => {
    // get info by channel id
    const channel = await prisma.channel.findUnique({
        where: {
            id: id
        },
        include: {
            station: {
                select: {
                    id: true,
                    name: true
                }
            },
            links: {
                select: {
                    id: true,
                    metadata: true,
                    platform: {
                        select: {
                            code: true,
                            label: true
                        }
                    }
                }
            },
        }
    })

    if (channel) {
        return channel
    }


    // or get info by link id (subchannel)
    const link = await prisma.linked.findUnique({
        where: {
            id: id as string
        },
        include: {
            channel: {
                select: {
                    id: true,
                    title: true,
                    station: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                    links: {
                        select: {
                            id: true,
                            platform: {
                                select: {
                                    code: true,
                                    label: true
                                }
                            }
                        }
                    }
                }
            },
            platform: {
                select: {
                    code: true,
                    label: true
                }
            }
        }
    })

    if (link) {
        return link
    }
}

export default async function Layout({ children, params }: Readonly<{ children: React.ReactNode, params: { id: string } }>) {
    const data = await getData(params.id)
    const navigation: NavItem[] = [
        { name: "Info", href: `/channels/${data?.id}`, icon: <InfoIcon className="w-5 h-5" /> },
        { name: "Revenue", href: `/channels/${data?.id}/revenue`, icon: <DollarSignIcon className="w-5 h-5" /> },
        { name: "Analytics", href: `/channels/${data?.id}/analytics`, icon: <BarChart2 className="w-5 h-5" /> },
        { name: "Settings", href: `/channels/${data?.id}/settings`, icon: <Settings className="w-5 h-5" /> },
        { name: "Content", href: `/channels/${data?.id}/content`, icon: <Videotape className="w-5 h-5" /> },
        { name: "Inbox", href: `/channels/${data?.id}/inbox`, icon: <SendIcon className="w-5 h-5" /> },
    ];
    return (
        <div className="flex flex-col w-full h-full space-y-2">
            <ChannelBreadcrumb data={data} />
            <div className="flex space-x-2 flex-1 ">
                {navigation.map((item, index) => (
                    <NavLink key={index} href={`${item.href}`} activeVariant={"secondary"} variant={"ghost"}
                        className="flex items-center justify-center focus:text-primary font-semibold"
                        activeSegmentIndex={3}
                        exact
                    >
                        {item.icon}
                        <span className="ml-2">{item.name}</span>
                    </NavLink>
                ))}
            </div>
            <Separator />
            <div className="flex-1 ">
                {children}
            </div>
        </div >
    );
}