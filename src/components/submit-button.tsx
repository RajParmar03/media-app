import { useFormStatus } from "react-dom"
import { Button } from "./ui/button";

export type Props = {
    children: React.ReactNode
    props?: React.ButtonHTMLAttributes<HTMLButtonElement>
}
export function SubmitButton({ children, ...props }: Props) {
    const { pending, data } = useFormStatus();

    return (
        <Button
            type="submit"
            disabled={pending}
            {...props}
        >
            {pending ? "Processing..." : children}
        </Button>
    )
}