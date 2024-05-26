"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge, Braces, CalendarPlus2, ChevronsDownUp, ChevronsUpDown, CreativeCommons, KeyIcon, KeyRound, KeyRoundIcon, MoreVertical, Plus, PlusCircle, RectangleEllipsis } from "lucide-react"
import React, { useActionState, useEffect, useState } from "react";
import { createKey } from "./_actions";
import { toast } from "sonner";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { CredentialsType } from "@/type.d"

export const credentialsType = [
    { label: "API Key", value: CredentialsType.API_KEY, icon: <KeyRound className="w-5 h-5" />, disabled: false, description: "An API key is a unique identifier used to authenticate a user, developer, or calling program to an API. It is used to track and control how the API is being used, for example to prevent malicious use or abuse of the API." },
    { label: "Basic Auth", value: CredentialsType.BASIC_AUTH, icon: <RectangleEllipsis className="w-5 h-5" />, disabled: false, description: "Username and password are a pair of strings that are used for authentication. The username is the user's identity, and the password is a secret that only the user and the authentication system know." },
    { label: "Bearer Token", value: CredentialsType.BEARER_TOKEN, icon: <Braces className="w-5 h-5" />, disabled: false, description: "Bearer tokens are a type of access token that are given to the client by the server. The client then uses the bearer token to access protected resources on the server." },
    { label: "JWT", value: CredentialsType.JWT_TOKEN, icon: <KeyIcon className="w-5 h-5" />, disabled: false, description: "JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object." },
    { label: "OAuth", value: CredentialsType.OAUTH, icon: <CalendarPlus2 className="w-5 h-5" />, disabled: false, description: "OAuth is an open standard for access delegation, commonly used as a way for Internet users to grant websites or applications access to their information on other websites but without giving them the passwords." },
]


const optionsInputs = ({ state, isPending }: { state: any, isPending: boolean }) => {
    return (
        <>
            <Collapsible>
                <CollapsibleTrigger className=" text-muted-foreground hover:text-primary font-medium flex items-center">
                    Options <ChevronsUpDown className="ms-1 w-4 h-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className=" grid gap-4 mt-4">
                    <div className="gird gap-2 ">
                        <Label>Label</Label>
                        <Input placeholder="label" name="label" disabled={isPending} defaultValue={state?.label} />
                        {state?.errors?.label && (<div className="text-red-500 text-sm">{state.errors.label}</div>)}
                    </div>
                    <div className="grid gap-2">
                        <Label>Description</Label>
                        <Input placeholder="Description" name="description" disabled={isPending} defaultValue={state?.description} />
                        {state?.errors?.description && (<div className="text-red-500 text-sm">{state.errors.description}</div>)}
                    </div>
                    <div className=" grid gap-2">
                        <Label>Note</Label>
                        <Input placeholder="Note" name="note" disabled={isPending} defaultValue={state?.note} />
                        {state?.errors?.note && (<div className="text-red-500 text-sm">{state.errors.note}</div>)}
                    </div>
                    <div className="grid gap-2">
                        <div className=" flex items-center gap-2">
                            <Switch id="disabled" name="disabled" disabled={isPending} defaultValue={state?.disabled} />
                            <Label htmlFor="disabled">Disabling</Label>
                        </div>
                        {state?.errors?.disabled && (<div className="text-red-500 text-sm">{state.errors.disabled}</div>)}
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </>
    )
}
export const KeysForm = ({ data, children }: { data: any, children: React.ReactNode }) => {
    const [state, action, isPending] = useActionState(createKey, data);
    const [type, setType] = useState(data?.type || "BASIC_AUTH");
    const [basicKey, setBasickey] = useState(data?.key || "username");
    const isUpdate = false;
    useEffect(() => {
        if (state?.success) toast.success("Integration updated")
    }, [state]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children ? children : <Button variant="secondary">Create <Plus className="ms-2 w-5 h-5" /></Button>}
            </DialogTrigger>
            <DialogContent className="max-w-xl" >
                <DialogHeader>
                    <DialogTitle>Create a new integration credential</DialogTitle>
                    <DialogDescription>
                        {/* {JSON.stringify(data)} */}
                        Create a new integration credential to connect third-party services.
                    </DialogDescription>
                </DialogHeader>
                <Tabs defaultValue={type} onValueChange={setType} className="w-full" >
                    <TabsList asChild className=" bg-background gap-3 pb-2 mb-4 w-full ">
                        <div>
                            {credentialsType.map((item) => (
                                <TabsTrigger key={item.value} value={item.value} disabled={isUpdate} className=" flex flex-col border gap-2 items-center justify-center  data-[state='active']:border-primary">
                                    {item.icon}
                                    <span>{item.label}</span>
                                </TabsTrigger>
                            ))}
                        </div>
                    </TabsList>
                    <form action={action} >
                        <TabsContent value={"BASIC_AUTH"} className="grid gap-4">
                            <p className=" text-muted-foreground font-medium text-sm"> {credentialsType.find((item) => item.value === "BASIC_AUTH")?.description}</p>
                            {state?.success === false && (
                                <div className="text-red-500">
                                    Something went wrong. Please try again.
                                    {JSON.stringify(state?.errors)}
                                </div>
                            )
                            }
                            <input type="hidden" name="type" value={type} />
                            <input type="hidden" name="key" value={basicKey} />
                            <input type="hidden" name="code" value={data?.code} />

                            {/* TODO: impl multi credintionals key: username, email, phone */}
                            <RadioGroup defaultValue={basicKey} onValueChange={setBasickey}>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="email" id="email" />
                                    <Label htmlFor="email">Email</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="username" id="username" />
                                    <Label htmlFor="username">Username</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="phone" id="phone" />
                                    <Label htmlFor="phone">Phone</Label>
                                </div>
                            </RadioGroup>
                            {basicKey === "email" && (
                                <div className="grid gap-2">
                                    <Label>Email</Label>
                                    <Input placeholder="Email" name="email" disabled={isPending} />
                                    {state?.errors?.email && (<div className="text-red-500 text-sm">{state.errors?.email}</div>)}
                                </div>
                            )}
                            {basicKey === "username" && (
                                <div className="grid gap-4">
                                    <Label className=" flex items-center  ">Username</Label> {/* username, email, phone */}
                                    <Input placeholder="Username" name="username" disabled={isPending} defaultValue={state?.username} />
                                    {/* <Button onClick={() => setBasicKeyOpen(!basicKeyOpen)}>{basicKeyOpen ? "Close" : "Open"}</Button> */}
                                    {state?.errors?.username && (<div className="text-red-500 text-sm">{state.errors?.username}</div>)}
                                </div>
                            )}
                            {basicKey === "phone" && (
                                <div className="grid gap-2">
                                    <Label>Phone</Label>
                                    <Input placeholder="Phone" name="phone" type="number" disabled={isPending} />
                                    {state?.errors?.phone && (<div className="text-red-500 text-sm">{state.errors?.phone}</div>)}
                                </div>
                            )}

                            <div className="grid gap-4">
                                <Label>Password</Label>
                                <Input placeholder="********" name="password" disabled={isPending} />
                                {state?.errors?.password && (<div className="text-red-500 text-sm">{state.errors?.password}</div>)}
                            </div>

                            {optionsInputs({ state, isPending })}

                            <div className="grid gap-2">
                                <Button disabled={isPending} type="submit" variant={"secondary"}>
                                    {isPending ? "Processing..." : "Create"}
                                </Button>
                            </div>
                        </TabsContent>
                    </form>
                    <TabsContent value={CredentialsType.API_KEY} className="grid gap-4">
                        <form action={action} >
                            <input type="hidden" name="type" value={type} />
                            <input type="hidden" name="key" value="key" />
                            <input type="hidden" name="code" value={data?.code} />

                            <p className=" text-muted-foreground font-medium text-sm"> {credentialsType.find((item) => item.value === "API_KEY")?.description}</p>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label>Api Key</Label>
                                    <Input placeholder="Api Key" name="token" disabled={isPending} />
                                    {state?.errors?.values?.token && (<div className="text-red-500 text-sm">{state.errors.values?.token}</div>)}
                                </div>
                                {optionsInputs({ state, isPending })}
                                <div className="grid gap-2">
                                    <Button disabled={isPending} type="submit" variant={"secondary"}>
                                        {isPending ? "Processing..." : isUpdate ? "Update" : "Create"}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </TabsContent>
                    <TabsContent value={CredentialsType.BEARER_TOKEN} className="grid gap-4">
                        <p className=" text-muted-foreground font-medium text-sm"> {credentialsType.find((item) => item.value === "BEARER_TOKEN")?.description}</p>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label>Token</Label>
                                <Input placeholder="Token" name="token" disabled={isPending} />
                                {state?.errors?.values?.token && (<div className="text-red-500 text-sm">{state.errors.values?.token}</div>)}
                            </div>
                            {optionsInputs({ state, isPending })}
                            <div className="grid gap-2">
                                <Button disabled={isPending} type="submit" variant={"secondary"}>
                                    {isPending ? "Processing..." : "Create"}
                                </Button>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value={CredentialsType.JWT_TOKEN}>
                        <p className=" text-muted-foreground font-medium text-sm"> {credentialsType.find((item) => item.value === "JWT_TOKEN")?.description}</p>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label>Token</Label>
                                <Input placeholder="Token" name="token" disabled={isPending} />
                                {state?.errors?.values?.token && (<div className="text-red-500 text-sm">{state.errors.values?.token}</div>)}
                            </div>
                            {optionsInputs({ state, isPending })}
                            <div className="grid gap-2">
                                <Button disabled={isPending} type="submit" variant={"secondary"}>
                                    {isPending ? "Processing..." : "Create"}
                                </Button>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value={CredentialsType.OAUTH}>
                        <p className=" text-muted-foreground font-medium text-sm"> {credentialsType.find((item) => item.value === "OAUTH")?.description}</p>
                        <form className="grid gap-4">
                            <div className="grid gap-2">
                                <Label>Client ID</Label>
                                <Input placeholder="Client ID" name="clientId" disabled={isPending} />
                                {state?.errors?.values?.clientId && (<div className="text-red-500 text-sm">{state.errors.values?.clientId}</div>)}
                            </div>
                            <div className="grid gap-2">
                                <Label>Client Secret</Label>
                                <Input placeholder="Client Secret" name="clientSecret" disabled={isPending} />
                                {state?.errors?.values?.clientSecret && (<div className="text-red-500 text-sm">{state.errors.values?.clientSecret}</div>)}
                            </div>
                            <div className="grid gap-2">
                                <Label>Code</Label>
                                <Input placeholder="Code" name="code" disabled={isPending} />
                                {state?.errors?.values?.code && (<div className="text-red-500 text-sm">{state.errors.values?.code}</div>)}
                            </div>
                            <div className="grid gap-2">
                                <Label>Token</Label>
                                <Input placeholder="Token" name="token" disabled={isPending} />
                                {state?.errors?.values?.token && (<div className="text-red-500 text-sm">{state.errors.values?.token}</div>)}
                            </div>
                            <div className="grid gap-2">
                                <Label>Refresh Token</Label>
                                <Input placeholder="Refresh Token" name="refreshToken" disabled={isPending} />
                                {state?.errors?.values?.refreshToken && (<div className="text-red-500 text-sm">{state.errors.values?.refreshToken}</div>)}
                            </div>
                            <div className="grid gap-2">
                                <Label>Redirect URI</Label>
                                <Input placeholder="Redirect URI" name="redirectUri" disabled={isPending} />
                                {state?.errors?.values?.redirectUri && (<div className="text-red-500 text-sm">{state.errors.values?.redirectUri}</div>)}
                            </div>
                            {optionsInputs({ state, isPending })}
                            <div className="grid gap-2">
                                <Button disabled={isPending} type="submit" variant={"secondary"}>
                                    {isPending ? "Processing..." : "Create"}
                                </Button>
                            </div>
                        </form>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog >
    )
}

export const KeysShow = ({ data, children }: { data: any, children: React.ReactNode }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="max-w-xl" >
                <DialogHeader>
                    <DialogTitle>Integration Credential</DialogTitle>
                    <DialogDescription>
                        View the integration credential to connect third-party services.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                    <div className=" ">
                        <ul className="grid gap-3">
                            <li className="flex items-center justify-between">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span>$299.00</span>
                            </li>
                            <li className="flex items-center justify-between">
                                <span className="text-muted-foreground">Shipping</span>
                                <span>$5.00</span>
                            </li>
                            <li className="flex items-center justify-between">
                                <span className="text-muted-foreground">Tax</span>
                                <span>$25.00</span>
                            </li>
                            <li className="flex items-center justify-between font-semibold">
                                <span className="text-muted-foreground">Total</span>
                                <span>$329.00</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

// import {
//     ChevronLeft,
//     ChevronRight,
//     Copy,
//     CreditCard,
//     MoreVertical,
//     Truck,
// } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardFooter,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card"
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import {
//     Pagination,
//     PaginationContent,
//     PaginationItem,
// } from "@/components/ui/pagination"
// import { Separator } from "@/components/ui/separator"

// export default function Component() {
//     return (
//         <Card className="overflow-hidden">
//             <CardHeader className="flex flex-row items-start bg-muted/50">
//                 <div className="grid gap-0.5">
//                     <CardTitle className="group flex items-center gap-2 text-lg">
//                         Order Oe31b70H
//                         <Button
//                             size="icon"
//                             variant="outline"
//                             className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
//                         >
//                             <Copy className="h-3 w-3" />
//                             <span className="sr-only">Copy Order ID</span>
//                         </Button>
//                     </CardTitle>
//                     <CardDescription>Date: November 23, 2023</CardDescription>
//                 </div>
//                 <div className="ml-auto flex items-center gap-1">
//                     <Button size="sm" variant="outline" className="h-8 gap-1">
//                         <Truck className="h-3.5 w-3.5" />
//                         <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
//                             Track Order
//                         </span>
//                     </Button>
//                     <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                             <Button size="icon" variant="outline" className="h-8 w-8">
//                                 <MoreVertical className="h-3.5 w-3.5" />
//                                 <span className="sr-only">More</span>
//                             </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end">
//                             <DropdownMenuItem>Edit</DropdownMenuItem>
//                             <DropdownMenuItem>Export</DropdownMenuItem>
//                             <DropdownMenuSeparator />
//                             <DropdownMenuItem>Trash</DropdownMenuItem>
//                         </DropdownMenuContent>
//                     </DropdownMenu>
//                 </div>
//             </CardHeader>
//             <CardContent className="p-6 text-sm">
//                 <div className="grid gap-3">
//                     <div className="font-semibold">Order Details</div>
//                     <ul className="grid gap-3">
//                         <li className="flex items-center justify-between">
//                             <span className="text-muted-foreground">
//                                 Glimmer Lamps x <span>2</span>
//                             </span>
//                             <span>$250.00</span>
//                         </li>
//                         <li className="flex items-center justify-between">
//                             <span className="text-muted-foreground">
//                                 Aqua Filters x <span>1</span>
//                             </span>
//                             <span>$49.00</span>
//                         </li>
//                     </ul>
//                     <Separator className="my-2" />
//                     <ul className="grid gap-3">
//                         <li className="flex items-center justify-between">
//                             <span className="text-muted-foreground">Subtotal</span>
//                             <span>$299.00</span>
//                         </li>
//                         <li className="flex items-center justify-between">
//                             <span className="text-muted-foreground">Shipping</span>
//                             <span>$5.00</span>
//                         </li>
//                         <li className="flex items-center justify-between">
//                             <span className="text-muted-foreground">Tax</span>
//                             <span>$25.00</span>
//                         </li>
//                         <li className="flex items-center justify-between font-semibold">
//                             <span className="text-muted-foreground">Total</span>
//                             <span>$329.00</span>
//                         </li>
//                     </ul>
//                 </div>
//                 <Separator className="my-4" />
//                 <div className="grid grid-cols-2 gap-4">
//                     <div className="grid gap-3">
//                         <div className="font-semibold">Shipping Information</div>
//                         <address className="grid gap-0.5 not-italic text-muted-foreground">
//                             <span>Liam Johnson</span>
//                             <span>1234 Main St.</span>
//                             <span>Anytown, CA 12345</span>
//                         </address>
//                     </div>
//                     <div className="grid auto-rows-max gap-3">
//                         <div className="font-semibold">Billing Information</div>
//                         <div className="text-muted-foreground">
//                             Same as shipping address
//                         </div>
//                     </div>
//                 </div>
//                 <Separator className="my-4" />
//                 <div className="grid gap-3">
//                     <div className="font-semibold">Customer Information</div>
//                     <dl className="grid gap-3">
//                         <div className="flex items-center justify-between">
//                             <dt className="text-muted-foreground">Customer</dt>
//                             <dd>Liam Johnson</dd>
//                         </div>
//                         <div className="flex items-center justify-between">
//                             <dt className="text-muted-foreground">Email</dt>
//                             <dd>
//                                 <a href="mailto:">liam@acme.com</a>
//                             </dd>
//                         </div>
//                         <div className="flex items-center justify-between">
//                             <dt className="text-muted-foreground">Phone</dt>
//                             <dd>
//                                 <a href="tel:">+1 234 567 890</a>
//                             </dd>
//                         </div>
//                     </dl>
//                 </div>
//                 <Separator className="my-4" />
//                 <div className="grid gap-3">
//                     <div className="font-semibold">Payment Information</div>
//                     <dl className="grid gap-3">
//                         <div className="flex items-center justify-between">
//                             <dt className="flex items-center gap-1 text-muted-foreground">
//                                 <CreditCard className="h-4 w-4" />
//                                 Visa
//                             </dt>
//                             <dd>**** **** **** 4532</dd>
//                         </div>
//                     </dl>
//                 </div>
//             </CardContent>
//             <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
//                 <div className="text-xs text-muted-foreground">
//                     Updated <time dateTime="2023-11-23">November 23, 2023</time>
//                 </div>
//                 <Pagination className="ml-auto mr-0 w-auto">
//                     <PaginationContent>
//                         <PaginationItem>
//                             <Button size="icon" variant="outline" className="h-6 w-6">
//                                 <ChevronLeft className="h-3.5 w-3.5" />
//                                 <span className="sr-only">Previous Order</span>
//                             </Button>
//                         </PaginationItem>
//                         <PaginationItem>
//                             <Button size="icon" variant="outline" className="h-6 w-6">
//                                 <ChevronRight className="h-3.5 w-3.5" />
//                                 <span className="sr-only">Next Order</span>
//                             </Button>
//                         </PaginationItem>
//                     </PaginationContent>
//                 </Pagination>
//             </CardFooter>
//         </Card>
//     )
// }

// export const KeysForm2 = () => {
//     const types = [{ id: 1, label: "API Key", icon: KeyRoundIcon, }, { id: 2, label: "Client Key", icon: KeyIcon, }, { id: 3, label: "Password", icon: KeyIcon, }]
//     return (
//         <div className="grid gap-4">
//             <Card>
//                 <CardHeader>
//                     <CardTitle>
//                         API Keys & Clients Management
//                     </CardTitle>
//                     <CardDescription>
//                         Manage your API keys and clients
//                     </CardDescription>
//                 </CardHeader>
//                 <CardContent className="grid gap-4">
//                     {/* api key */} {/* platform, updated at */}
//                     {/* client key, client secret */}
//                     <Table>
//                         <TableHeader>
//                             <TableRow>
//                                 <TableHead className="w-[100px]">Type</TableHead>
//                                 <TableHead>Label</TableHead>
//                                 <TableHead>Platform</TableHead>
//                                 <TableHead>Status</TableHead>
//                                 <TableHead>Last Used</TableHead>
//                                 <TableHead>Last Updated</TableHead>
//                                 <TableHead className="text-right"></TableHead>
//                             </TableRow>
//                         </TableHeader>
//                         <TableBody>
//                             <TableRow className="bg-accent">
//                                 <TableCell>
//                                     <span>type icon</span>

//                                     {/* <div className="hidden text-sm text-muted-foreground md:inline">
//                                         liam@example.com
//                                     </div> */}
//                                 </TableCell>
//                                 <TableCell className="hidden sm:table-cell">
//                                     <Link href="/settings/integrations/keys/1" className=" w-fit">
//                                         <span> label</span>
//                                     </Link>
//                                 </TableCell>
//                                 <TableCell className="hidden sm:table-cell">
//                                     <Link href="/settings/integrations/keys/1" className=" w-fit">
//                                         <span> label</span>
//                                     </Link>
//                                 </TableCell>
//                                 <TableCell className="hidden sm:table-cell">
//                                     <Link href="/settings/integrations/keys/1" className=" w-fit">
//                                         <span> label</span>
//                                     </Link>
//                                 </TableCell>
//                                 <TableCell className="hidden sm:table-cell">
//                                     <Badge className="text-xs" variant="secondary">
//                                         platform icon
//                                     </Badge>
//                                 </TableCell>
//                                 <TableCell className="hidden md:table-cell">2023-06-23</TableCell>
//                                 <TableCell className="text-right justify-end ">
//                                     <MoreVertical className="w-5 h-5 hover:text-muted-foreground cursor-pointer" />
//                                 </TableCell>
//                             </TableRow>
//                         </TableBody>
//                     </Table>
//                 </CardContent>
//             </Card>
//         </div>
//     )
// }

