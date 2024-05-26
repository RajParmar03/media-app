import NoData from "@/components/no-data";
import PlatformIcon from "@/components/platform-icon";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { Braces, CalendarPlus2, KeyIcon, KeyRound, Plus, RectangleEllipsis } from "lucide-react";
import { KeysForm } from "./_forms";
import { formatDistance, parseISO } from "date-fns";
import { CredentialsType } from "@/type.d";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const getData = async (code: string) => {
    const res = await prisma.platform.findUnique({
        where: { code: code }
    });
    return res;
}
export const credentialsType = [
    { label: "API Key", value: CredentialsType.API_KEY, icon: <KeyRound className="w-5 h-5" />, disabled: false, description: "An API key is a unique identifier used to authenticate a user, developer, or calling program to an API. It is used to track and control how the API is being used, for example to prevent malicious use or abuse of the API." },
    { label: "Basic Auth", value: CredentialsType.BASIC_AUTH, icon: <RectangleEllipsis className="w-9 h-9" />, disabled: false, description: "Username and password are a pair of strings that are used for authentication. The username is the user's identity, and the password is a secret that only the user and the authentication system know." },
    { label: "Bearer Token", value: CredentialsType.BEARER_TOKEN, icon: <Braces className="w-5 h-5" />, disabled: false, description: "Bearer tokens are a type of access token that are given to the client by the server. The client then uses the bearer token to access protected resources on the server." },
    { label: "JWT", value: CredentialsType.JWT_TOKEN, icon: <KeyIcon className="w-5 h-5" />, disabled: false, description: "JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object." },
    { label: "OAuth", value: CredentialsType.OAUTH, icon: <CalendarPlus2 className="w-5 h-5" />, disabled: false, description: "OAuth is an open standard for access delegation, commonly used as a way for Internet users to grant websites or applications access to their information on other websites but without giving them the passwords." },
]
export default async function Page({ params }: { params: { code: string } }) {
    const data = await getData(params.code);
    const getLabelKey = (item) => {
        const key = item.type === CredentialsType.BASIC_AUTH ? item.key : "token";
        return key;
    }
    return (
        <div className=" grid gap-4">
            <div className=" flex items-center justify-start">
                <h1 className="text-3xl font-semibold">{data?.label} <PlatformIcon code={data?.code} className="h-7 w-7 " /></h1>
            </div>
            {/* <NoData show /> */}
            <Card>
                <CardHeader>
                    <div className=" flex items-center justify-between">
                        <div>
                            <CardTitle>Creadentials</CardTitle>
                            <CardDescription>Manage your API keys, OAuth tokens, and other credentials</CardDescription>
                        </div>
                        <div className=" flex items-center gap-2">
                            <KeysForm data={data} />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className=" grid gap-4">

                    <div className=" grid border rounded-xl p-2 divide-y">
                        {data?.keys?.map((key: any) => (
                            <div className=" flex items-center justify-start gap-4 p-2">
                                <div className=" grid gap-2">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                {credentialsType.find((type) => type.value === key.type)?.icon}
                                            </TooltipTrigger>
                                            <TooltipContent className=" max-w-lg">
                                                <h3 className=" text-lg">{credentialsType.find((type) => type.value === key.type)?.label}</h3>
                                                <p className=" text-sm text-muted-foreground">{credentialsType.find((type) => type.value === key.type)?.description}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                    {/* <span>{data.id}</span> */}
                                </div>
                                <div className=" flex-1 grid gap-1">

                                    <Link href={`/settings/platforms/${data.code}/${key.id}`} className=" hover:text-muted-foreground cursor-pointer w-fit">{key[getLabelKey(key)]}</Link>
                                    {key?.description && <span>{key?.description}</span>}
                                    {key?.note && <span>{key?.note}</span>}
                                    {key.updatedAt && (
                                        <span className="text-muted-foreground text-xs">Updated {formatDistance(parseISO(key.updatedAt), new Date(), { addSuffix: true })}</span>
                                    )}
                                </div>
                            </div>
                        ))}
                        {/* <div className=" flex items-center justify-start gap-4">
                            <div className=" grid gap-2">
                                icon
                                <span>label</span>
                            </div>
                            <div className=" flex-1 grid gap-1">
                                <span>label</span>
                                <span>description</span>
                                <span>dates</span>
                            </div>
                        </div>
                        <div className=" flex items-center justify-start gap-4">
                            <div className=" grid gap-2">
                                icon
                                <span>label</span>
                            </div>
                            <div className=" flex-1 grid gap-1">
                                <span>label</span>
                                <span>description</span>
                                <span>dates</span>
                            </div>
                        </div>
                        <div className=" flex items-center justify-start gap-4">
                            <div className=" grid gap-2">
                                icon
                                <span>label</span>
                            </div>
                            <div className=" flex-1 grid gap-1">
                                <span>label</span>
                                <span>description</span>
                                <span>dates</span>
                            </div>
                        </div> */}

                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <div className=" flex items-center justify-between">
                        <div>
                            <CardTitle>Settings</CardTitle>
                            <CardDescription>Cutomize your platform settings</CardDescription>
                        </div>
                        <div className=" flex items-center gap-2">
                            {/* <Button variant={"secondary"} className=" w-fit">Add Webhook</Button> */}
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum magni expedita, eos quos numquam repudiandae vitae sit placeat pariatur iusto libero consequuntur, voluptates, quaerat ratione nulla nisi at voluptas. Cum.

                </CardContent>
            </Card>
        </div>
    )
}