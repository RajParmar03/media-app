"use client";
import { Button, buttonVariants } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useActionState, useEffect, useState } from "react";
import { updateChannelInfo, updateGeoLocationInfo, updateIntegrationInfo, updateAvatar } from "./_actions";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Braces, CalendarPlus2, KeyRound, Plus, RectangleEllipsis } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import UploadImage from "@/components/upload-image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link } from "@/navigation";
import { cn } from "@/lib/utils";
import PlatformIcon from "@/components/platform-icon";

// avatar, cover

export function ProfileForm({ id, data, platforms }: { id: string, data: any, platforms: any }) {
    const [state, action, isPending] = useActionState(updateChannelInfo, { data });

    useEffect(() => {
        if (state?.success) toast.success("Channel info updated")
    }, [state]);

    return (
        <Card>
            {/* {JSON.stringify(data)} */}
            <form action={action}>
                <CardHeader>
                    <CardTitle className=" flex items-center space-x-3">
                        <span>Channel info </span>
                        <div className="flex items-center space-x-2">
                            <Switch id="airplane-mode" />
                            <Label htmlFor="airplane-mode">Use Default</Label>
                        </div>
                    </CardTitle>
                    <CardDescription>
                        Update your channel information
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        {state?.success === false && (
                            <div className="text-red-500">
                                Something went wrong. Please try again.
                            </div>
                        )}
                    </div>
                    {/* id  */}
                    <input type="hidden" name="id" value={id} />
                    {/* <div className="grid gap-2">
                        <Image src="/uploads/1715238323465.jpeg" alt="avatar" width="100" height="100" />
                    </div> */}
                    <div className="grid sm:grid-cols-2 gap-2">
                        <div className="grid gap-2">
                            <Label>Channel image</Label>
                            <UploadImage name={"image"} defaultValue={data?.avatar} action={updateAvatar} id={id} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Channel Cover</Label>
                            <UploadImage name={"cover"} defaultValue={data?.avatar} action={updateAvatar} id={id} />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label>Channel Title</Label>
                        <Input placeholder="Channel Title" name="title" disabled={isPending} defaultValue={state?.data?.title} />
                        {state?.errors?.title && (<div className="text-red-600 text-sm">{state.errors.title}</div>)}
                    </div>
                    <div className="grid gap-2">
                        <Label>Channel Description</Label>
                        <Input placeholder="Channel Description" name="description" disabled={isPending} defaultValue={state?.data?.description} />
                        {state?.errors?.description && (<div className="text-red-500 text-sm">{state.errors.description}</div>)}
                    </div>
                    {/* <div className="grid gap-2">
                        <Label>Platform</Label>
                        <Select name="platformId" defaultValue={state?.data?.platformId}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder={state?.data?.platformId} />
                            </SelectTrigger>
                            <SelectContent >
                                {platforms.map((platform: any) => (
                                    <SelectItem key={platform.id} value={platform.id}>{platform.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {state?.errors?.platform && (<div className="text-red-500 text-sm">{state.errors.platform}</div>)}
                    </div> */}
                    <div className="grid gap-2">
                        <Label>URL</Label>
                        <Input placeholder="URL" name="url" disabled={isPending} />
                        {state?.errors?.url && (<div className="text-red-500 text-sm">{state.errors.url}</div>)}
                    </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button disabled={isPending} type="submit" variant={"secondary"}>
                        {isPending ? "Saving..." : "Save"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}

export function GeoLocationForm({ id, data }: { id: string, data: any }) {
    const [state, action, isPending] = useActionState(updateGeoLocationInfo, data);

    useEffect(() => {
        if (state?.success) toast.success("Channel info updated")
    }, [state]);

    // Bug: when values are passed to the form, they are not reactive
    return (
        <Card>
            <form action={action}>
                <CardHeader>
                    <CardTitle>Geo Location</CardTitle>
                    <CardDescription>
                        Update your channel geo location information
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        {state?.success === false && (
                            <div className="text-red-500">
                                Something went wrong. Please try again.
                            </div>
                        )}
                    </div>
                    <input type="hidden" name="id" value={id} />
                    <div className="grid gap-2">
                        <Label>Country</Label>
                        <Select name="country" defaultValue={state?.country}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select Country" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="sa">Saudi Arabia</SelectItem>
                                <SelectItem value="us">United States</SelectItem>
                                <SelectItem value="uk">United Kingdom</SelectItem>
                                <SelectItem value="ae">United Arab Emirates</SelectItem>
                                <SelectItem value="eg">Egypt</SelectItem>
                                <SelectItem value="kw">Kuwait</SelectItem>
                                <SelectItem value="iq">Iraq</SelectItem>
                                <SelectItem value="ma">Morocco</SelectItem>
                                <SelectItem value="br">Brazil</SelectItem>
                            </SelectContent>
                        </Select>
                        {state?.errors?.country && (<div className="text-red-500 text-sm">{state.errors.country}</div>)}
                    </div>
                    <div className="grid gap-2">
                        <Label>Currency</Label>
                        <Select name="currency" defaultValue={state?.currency}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="sar">SAR</SelectItem>
                                <SelectItem value="usd">USD</SelectItem>
                                <SelectItem value="gbp">GBP</SelectItem>
                                <SelectItem value="aed">AED</SelectItem>
                                <SelectItem value="egp">EGP</SelectItem>
                                <SelectItem value="kwd">KWD</SelectItem>
                                <SelectItem value="iqd">IQD</SelectItem>
                                <SelectItem value="mad">MAD</SelectItem>
                                <SelectItem value="brl">BRL</SelectItem>
                            </SelectContent>
                        </Select>
                        {state?.errors?.currency && (<div className="text-red-500 text-sm">{state.errors.currency}</div>)}
                    </div>
                    <div className="grid gap-2">
                        <Label>Language</Label>
                        <Select name="language" defaultValue={state?.language}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ar">Arabic</SelectItem>
                                <SelectItem value="en">English</SelectItem>
                                <SelectItem value="fr">French</SelectItem>
                                <SelectItem value="es">Spanish</SelectItem>
                                <SelectItem value="pt">Portuguese</SelectItem>
                            </SelectContent>
                        </Select>
                        {state?.errors?.language && (<div className="text-red-500 text-sm">{state.errors.language}</div>)}
                    </div>
                    <div className="grid gap-2">
                        <Label>Timezone</Label>
                        <Select name="timezone" defaultValue={state?.timezone}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select timezone" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="GMT">GMT</SelectItem>
                                <SelectItem value="UTC">UTC</SelectItem>
                                <SelectItem value="AST">AST</SelectItem>
                                <SelectItem value="EST">EST</SelectItem>
                                <SelectItem value="CST">CST</SelectItem>
                                <SelectItem value="MST">MST</SelectItem>
                            </SelectContent>
                        </Select>
                        {state?.errors?.timezone && (<div className="text-red-500 text-sm">{state.errors.timezone}</div>)}
                    </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button disabled={isPending} type="submit" variant={"secondary"}>
                        {isPending ? "Saving..." : "Save"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}


export function IntegrationForm({ id, data }: { id: string, data: any }) {
    const [state, action, isPending] = useActionState(updateIntegrationInfo, null);
    const [type, setType] = useState(data?.type || "oauth");
    useEffect(() => {
        console.log("state", state);
        if (state?.success) toast.success("Integration updated")
    }, [state]);

    // Bug: when values are passed to the form, they are not reactive
    return (
        <Card>
            <form action={action}>
                <CardHeader>
                    <CardTitle>Integration</CardTitle>
                    <CardDescription>
                        Update your integration information
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">

                        {state?.success === false && (
                            <div className="text-red-500">
                                Something went wrong. Please try again.
                            </div>
                        )}
                    </div>
                    <input type="hidden" name="id" value={id} />
                    <RadioGroup defaultValue={type} onValueChange={setType} className="grid grid-cols-4 gap-4 mb-4">
                        <div>
                            <RadioGroupItem
                                value="oauth"
                                id="oauth"
                                className="peer sr-only"
                            />
                            <Label
                                htmlFor="oauth"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                                <CalendarPlus2 className="mb-3 h-6 w-6" />
                                <span>OAuth</span>
                            </Label>
                        </div>
                        <div>
                            <RadioGroupItem
                                value="apiKey"
                                id="apiKey"
                                className="peer sr-only"
                                disabled
                            />
                            <Label
                                htmlFor="apiKey"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                                <KeyRound className="mb-3 h-6 w-6" />
                                <span>Api Key</span>
                            </Label>
                        </div>
                        <div>
                            <RadioGroupItem
                                value="token"
                                id="token"
                                className="peer sr-only"
                                disabled
                            />
                            <Label
                                htmlFor="token"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                                <Braces className="mb-3 h-6 w-6" />
                                <span>Token</span>
                            </Label>
                        </div>
                        <div>
                            <RadioGroupItem
                                value="password"
                                id="password"
                                className="peer sr-only"
                                disabled
                            />
                            <Label
                                htmlFor="password"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                                <RectangleEllipsis className="mb-3 h-6 w-6" />
                                <span>Password</span>
                            </Label>
                        </div>
                    </RadioGroup>
                    {/* <div className="grid gap-2">
                        <Label>Integration Type</Label>
                        <Select onValueChange={setType}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="password" defaultValue={type} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="password">Password</SelectItem>
                                <SelectItem value="token">Token</SelectItem>
                                <SelectItem value="apiKey">Api Key</SelectItem>
                            </SelectContent>
                        </Select>
                    </div> */}
                    {type === "oauth" && (
                        <div className="grid grid-flow-col gap-4">
                            <Link href="/" className={cn(buttonVariants({ variant: "secondary" }), " flex items-center gap-2")}>
                                <PlatformIcon code="youtube" /> <span>Youtube</span>
                            </Link>
                            <Link href="/" className={cn(buttonVariants({ variant: "secondary" }), " flex items-center gap-2")}>
                                <PlatformIcon code="tiktok" /> <span>Tiktok</span>
                            </Link>
                            <Link href="/" className={cn(buttonVariants({ variant: "secondary" }), " flex items-center gap-2")}>
                                <PlatformIcon code="twitter" /> <span>Twitter</span>
                            </Link>
                            <Link href="/" className={cn(buttonVariants({ variant: "secondary" }), " flex items-center gap-2")}>
                                <PlatformIcon code="linkedin" /> <span>Linkedin</span>
                            </Link>
                            <Link href="/" className={cn(buttonVariants({ variant: "secondary" }), " flex items-center gap-2")}>
                                <PlatformIcon code="facebook" /> <span>Facebook</span>
                            </Link>
                            <Link href="/" className={cn(buttonVariants({ variant: "secondary" }), " flex items-center gap-2")}>
                                <PlatformIcon code="instagram" /> <span>Instagram</span>
                            </Link>
                        </div>
                    )}
                    {type === "apiKey" && (
                        <div className=" grid gap-4">
                            <div className="grid gap-2">
                                <Label>Api Key</Label>
                                <Input placeholder="Api Key" name="key" disabled={isPending} />
                                {state?.errors?.key && (<div className="text-red-500 text-sm">{state.errors.key}</div>)}
                            </div>
                            <div className="grid gap-2">
                                <Label>Secret Key</Label>
                                <Input placeholder="Secret" name="secret" disabled={isPending} />
                                {state?.errors?.secret && (<div className="text-red-500 text-sm">{state.errors.secret}</div>)}
                            </div>
                        </div>
                    )}


                    {type === "token" && (
                        <div className="grid gap-2">
                            <Label>Token</Label>
                            <Input placeholder="Token" name="token" disabled={isPending} />
                            {state?.errors?.token && (<div className="text-red-500 text-sm">{state.errors.token}</div>)}
                        </div>
                    )}

                    {type === "password" && (
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label>Username</Label>
                                <Input placeholder="Username" name="username" disabled={isPending} />
                                {state?.errors?.username && (<div className="text-red-500 text-sm">{state.errors.username}</div>)}
                            </div>

                            <div className="grid gap-2">
                                <Label>Password</Label>
                                <Input placeholder="Password" name="password" disabled={isPending} />
                                {state?.errors?.password && (<div className="text-red-500 text-sm">{state.errors.password}</div>)}
                            </div>
                        </div>
                    )}

                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button disabled={isPending} type="submit" variant={"secondary"}>
                        {isPending ? "Saving..." : "Save"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}



export function MembersSettingsForm() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                    <CardTitle>Team Members</CardTitle>
                    <CardDescription>
                        Manage your team members
                    </CardDescription>
                </div>
                <Button size="sm" className="ml-auto gap-1" variant={"secondary"}>
                    Add Member
                    <Plus className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-4">
                        <Avatar>
                            <AvatarImage src="/avatars/01.png" />
                            <AvatarFallback>OM</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-sm font-medium leading-none">Sofia Davis</p>
                            <p className="text-sm text-muted-foreground">m@example.com</p>
                        </div>
                    </div>
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Fruits</SelectLabel>
                                <SelectItem value="apple">Apple</SelectItem>
                                <SelectItem value="banana">Banana</SelectItem>
                                <SelectItem value="blueberry">Blueberry</SelectItem>
                                <SelectItem value="grapes">Grapes</SelectItem>
                                <SelectItem value="pineapple">Pineapple</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
                <Button variant={"secondary"}>Save</Button>
            </CardFooter>
        </Card >
    )
}

export function DangerZone() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Danger Zone</CardTitle>
                <CardDescription>
                    Remove your channel
                </CardDescription>
                <CardDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4  items-center justify-start">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive">Remove Channel</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardContent>
        </Card >
    )
}
