"use client"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useRef } from "react"
import { useFormState } from "react-dom";
import { SubmitButton } from "@/components/submit-button";
import { appearance, profile } from "./_actions"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CheckCircleIcon } from "lucide-react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

export const ErorrLabel = ({ state, name }) => {
    if (state.error?.[name]) {
        return (
            <span className="text-sm text-destructive-500">{state.error[name]}</span>
        )
    }
    return null
}
// profile
export default function ProfileForm({ data }) {
    const formRef = useRef(null)
    const [state, formAction] = useFormState(profile, data);
    return (
        <form action={formAction}>
            <Card>
                <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                        Update your profile information
                    </CardDescription>
                    <CardDescription>
                        {state.type === 'success' && (
                            <div className="text-sm text-green-500 ">
                                <CheckCircleIcon className="h-6 w-6 inline-block me-2" />
                                {state.message}
                            </div>
                        )}
                        {state.type === 'error' && (
                            <div className="text-sm text-destructive-500">{state.message}</div>
                        )}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        {/* Name */}
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input name="name" id="name" type="text" value={state?.name} />
                            <span className="text-sm text-muted-foreground">Your name will be displayed on your profile.</span>
                            {state.error?.name && (
                                <span className="text-sm text-destructive-500">{state.error.name}</span>
                            )}
                        </div>
                        {/* Phone */}
                        <div className="grid gap-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input name="phone" id="phone" type="tel" required value={data?.phone} />
                            <span className="text-sm text-muted-foreground">Your phone number will be used to verify your account.</span>
                            {state.error?.phone && (
                                <span className="text-sm text-destructive-500">{state.error.phone}</span>
                            )}
                        </div>
                        {/* Avatar */}
                        <div className="grid gap-2">
                            <Label htmlFor="avatar">Avatar</Label>
                            <Input name="avatar" id="avatar" type="url" />
                            <span className="text-sm text-muted-foreground">Your avatar will be displayed on your profile.</span>
                            {state.error?.avatar && (
                                <span className="text-sm text-destructive-500">{state.error.avatar}</span>
                            )}
                        </div>

                        {/* Language */}
                        <div className="grid gap-2">
                            <Label htmlFor="language">Language</Label>
                            <Input name="language" id="language" type="text" value={data?.language} />
                            <span className="text-sm text-muted-foreground">Your preferred language.</span>
                            {state.error?.language && (
                                <span className="text-sm text-destructive-500">{state.error.language}</span>
                            )}
                        </div>
                        {/* Country */}
                        <div className="grid gap-2">
                            <Label htmlFor="country">Country</Label>
                            <Input name="country" id="country" type="text" required value={data?.country} />
                            <span className="text-sm text-muted-foreground">Your country of residence.</span>
                            {state.error?.country && (
                                <span className="text-sm text-destructive-500">{state.error.country}</span>
                            )}
                        </div>
                        {/* Timezone */}
                        <div className="grid gap-2">
                            <Label htmlFor="timezone">Timezone</Label>
                            <Input name="timezone" id="timezone" type="text" value={data?.timezone} />
                            <span className="text-sm text-muted-foreground">Your timezone.</span>
                            {state.error?.timezone && (
                                <span className="text-sm text-destructive-500">{state.error.timezone}</span>
                            )}
                        </div>

                        {/* Currency */}
                        <div className="grid gap-2">
                            <Label htmlFor="currency">Currency</Label>
                            <Input name="currency" id="currency" type="text" value={data?.currency} />
                            <span className="text-sm text-muted-foreground">A currency you prefer to use on your dashboard.</span>
                            {state.error?.currency && (
                                <span className="text-sm text-destructive-500">{state.error.currency}</span>
                            )}
                        </div>
                        {/* City */}
                        <div className="grid gap-2">
                            <Label htmlFor="city">City</Label>
                            <Input name="city" id="city" type="text" required />
                            <span className="text-sm text-muted-foreground">Your city of residence.</span>
                            {state.error?.city && (
                                <span className="text-sm text-destructive-500">{state.error.city}</span>
                            )}
                        </div>

                    </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <SubmitButton>
                        Save Changes
                    </SubmitButton>
                </CardFooter>
            </Card>
        </form>
    )
}

// appearance
export function AppearanceForm() {
    const formRef = useRef(null)
    const [state, formAction] = useFormState(appearance, {
        error: null
    });
    return (
        <form action={formAction}>
            <Card>
                <CardHeader>
                    <CardTitle>Appearance</CardTitle>
                    <CardDescription>
                        Update your appearance settings
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        {/* DarkMode */}
                        <div className="grid gap-2">
                            <RadioGroup name="darkMode" defaultValue="dark" className="grid max-w-md grid-cols-2 gap-8 pt-2">
                                <div>
                                    <Label className="[&:has([data-state=checked])>div]:border-primary">
                                        <RadioGroupItem value="light" className="sr-only" />
                                        <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                                            <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                                                <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                                                    <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                                                    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                                                </div>
                                                <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                                                    <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                                                    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                                                </div>
                                                <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                                                    <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                                                    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                                                </div>
                                            </div>
                                        </div>
                                        {/* <span className="block w-full p-2 text-center font-normal">
                                        Light
                                    </span> */}
                                    </Label>
                                </div>
                                <div>
                                    <Label className="[&:has([data-state=checked])>div]:border-primary">
                                        <RadioGroupItem value="dark" className="sr-only" />
                                        <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                                            <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                                                <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                                    <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                                                    <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                                                </div>
                                                <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                                    <div className="h-4 w-4 rounded-full bg-slate-400" />
                                                    <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                                                </div>
                                                <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                                    <div className="h-4 w-4 rounded-full bg-slate-400" />
                                                    <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                                                </div>
                                            </div>
                                        </div>
                                        {/* <span className="block w-full p-2 text-center font-normal">
                                        Dark
                                    </span> */}
                                    </Label>
                                </div>
                            </RadioGroup>
                            {state.error?.darkMode && (
                                <span className="text-sm text-destructive-500">{state.error.darkMode}</span>
                            )}
                        </div>
                    </div>
                </CardContent>
                {/* <CardFooter className="border-t px-6 py-4">
                    <SubmitButton>
                        Save Changes
                    </SubmitButton>
                </CardFooter> */}
            </Card>
        </form >
    )
}

// account form 
export function AccountForm() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>
                    Update your account settings
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    {/* Email */}
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input name="email" id="email" type="email" required />
                        <span className="text-sm text-muted-foreground">Your email address will be used to sign in.</span>
                    </div>
                    {/* Password */}
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input name="password" id="password" type="password" required />
                        <span className="text-sm text-muted-foreground">Your password must be at least 8 characters long.</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
                <SubmitButton>
                    Save Changes
                </SubmitButton>
            </CardFooter>
        </Card>
    )
}

// dnager zone
export function DangerZone() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Danger Zone</CardTitle>
                <CardDescription>
                    Delete your account
                </CardDescription>
                <CardDescription>
                    <span className="text-sm text-destructive-500">Once you delete your account, there is no going back. Please be certain.</span>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    <AlertDialog>
                        <AlertDialogTrigger>
                            <Button variant="destructive">Delete Account</Button>
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
                </div>
            </CardContent>
        </Card >
    )
}