"use client";

import { ActionResponse } from "@/type";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "./ui/button";

export function Form({
    children,
    action,
    ...props
}: {
    children: React.ReactNode;
    action: (prevState: any, formData: FormData) => Promise<ActionResponse>;
    props?: any;
}) {
    const [state, formAction] = useFormState(action, {
        error: null
    });
    return (
        <form action={formAction} {...props}>
            {children}
        </form>
    );
}

type Props = {
    name: string
    errors: string[]
}
export function FormError({ name, errors }: Props) {
    // if there are no errors, return null
    if (!errors || errors?.length === 0) return null
    // if field has errors, return the error message
    // validatedFields.error.flatten().fieldErrors
    // use  name to get the error message
    return errors[name] ? <p className="text-red-500">{errors[name]}</p> : null

}

export function SubmitButton({ children }: Props) {
    const { pending, data } = useFormStatus();

    return (
        <Button
            type="submit"
            disabled={pending}
        >
            {pending ? "Processing..." : children}
        </Button>
    )
}




export function FormMessage({ state }: { state: ActionResponse | null }) {
    if (!state) return null
    const isError = state.success === false
    return (
        <div className={`text-${isError ? "red" : "green"}-500`}>
            {state.message}
        </div>
    )
}
