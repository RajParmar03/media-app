"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { PlusIcon, TriangleAlert } from "lucide-react"
import { useActionState } from "react"
import { createLink } from "./_actions"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
export function AddNewLinkForm({ id, platforms }: { id: string, platforms: any[] }) {
    const [state, action, isPending] = useActionState(createLink, null)
    const authTypes = [{ value: "password", label: "Password" }, { value: "api_token", label: "Api Token" }, { value: "oauth", label: "OAuth" }]
    return (
        <div>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="secondary">
                        <PlusIcon className="w-5 h-5" />
                        Add New
                    </Button>
                </SheetTrigger>
                <SheetContent className="w-[400px] sm:w-[540px]">
                    <SheetHeader>
                        <SheetTitle>Add New Integration</SheetTitle>
                        <SheetDescription>
                            Automatically share your content to your social media platforms. You can add as many integrations as you want.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 mt-5">
                        {/* <div className="grid gap-2">
                                <Select defaultValue={state?.data?.platform} name="platformId" >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select Auth Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Auth Type</SelectLabel>
                                            {authTypes.map((item) => (
                                                <SelectItem key={item.value} value={item.value}>
                                                    {item.label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div> */}
                        {/* platform input */}
                        <div className="grid gap-2">
                            <Separator />
                            <Label>Platform</Label>
                            <p className="text-sm text-muted-foreground">Select the platform you want to integrate with.</p>
                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select Platform" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Platform</SelectLabel>
                                        {platforms?.map((item) => {
                                            const Icon = Icons[item.name?.toLowerCase()] || TriangleAlert
                                            return (
                                                <SelectItem key={item.id} value={item.id} >
                                                    <div className=" flex items-center space-x-1 justify-center">
                                                        <Icon className=" w-5 h-5  text-yellow-500 me-1.5" /> {item.label}
                                                    </div>
                                                </SelectItem>
                                            )
                                        })}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <Separator />
                        <Tabs defaultValue="account" className="w-[400px]">
                            <TabsList >
                                <TabsTrigger disabled={isPending} value="password">Password</TabsTrigger>
                                <TabsTrigger disabled={isPending} value="api_token">Token</TabsTrigger>
                                <TabsTrigger disabled={isPending} value="oauth">OAuth</TabsTrigger>
                            </TabsList>
                            <TabsContent value="password">
                                <form action={action} className="grid gap-4">
                                    <input type="hidden" name="authType" value="password" />
                                    <div className="grid gap-2">
                                        <Label>Username</Label>
                                        <Input type="text" placeholder="Username" disabled={isPending} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Password</Label>
                                        <Input type="password" placeholder="Password" disabled={isPending} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Button type="submit" variant="outline">Connect with Password</Button>
                                    </div>
                                </form>
                            </TabsContent>
                            <TabsContent value="api_token">
                                <form action={action} className="grid gap-4">
                                    <input type="hidden" name="authType" value="api_token" />
                                    <div className="grid gap-2">
                                        <Label>Token</Label>
                                        <Input type="text" placeholder="Token" disabled={isPending} />
                                        <p className="text-sm text-muted-foreground">You can generate a token from your account settings.</p>
                                    </div>
                                    <div className="grid gap-2">
                                        <Button type="submit" variant="outline">Connect with Token</Button>
                                    </div>
                                </form>
                            </TabsContent>
                            <TabsContent value="oauth">
                                <form action={action} className="grid gap-4">
                                    <input type="hidden" name="authType" value="oauth" />
                                    <div className="grid gap-2">
                                        <Label>Client ID</Label>
                                        <Input type="text" placeholder="Client ID" disabled={isPending} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Client Secret</Label>
                                        <Input type="text" placeholder="Client Secret" disabled={isPending} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Button type="button" variant="outline">Connect with OAuth</Button>
                                    </div>
                                </form>
                            </TabsContent>
                        </Tabs>
                    </div>
                </SheetContent>
            </Sheet>
        </div >
    )
}



