import { AlertCircle, AlertTriangle } from "lucide-react"


export type NoDataProps = {
    show?: boolean
    message?: string
    create?: React.ReactNode
    back?: React.ReactNode
    children?: React.ReactNode
}

export default function NoData({ children, show = false, message = "There is no data to display yet", create }: NoDataProps) {
    return show ? (
        <div className="flex items-center justify-center h-[20vh] w-full border rounded-lg">
            {children ? children : (
                <div className=" flex flex-col items-center justify-center gap-4">
                    <AlertTriangle className="w-10 h-10 text-warning" />
                    <div className=" flex items-center justify-center gap-1">
                        <p className=" text-muted-foreground">{message}</p>
                        {create && create}
                    </div>
                </div>
            )}
        </div>
    ) : null
}