import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Icons } from "@/components/icons"
import { AlertTriangle } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export type PlatformIconProps = {
    code: string | undefined
    label?: string
    mode?: "icon" | "text"
    href?: string
    hover?: boolean
    className?: React.ClassAttributes<HTMLAnchorElement>
}

// export default function PlatformIcon({ name, mode = "icon", href, hover = true, className }: PlatformIconProps) {
//     // name to lowercase
//     const Icon = Icons[name?.toLowerCase()] || AlertTriangle
//     // cpitlize first letter
//     name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()

//     return (
//         <TooltipProvider>
//             <Tooltip>
//                 <TooltipTrigger>
//                     {href ? (
//                         <Link href={href} className="flex items-center" target="_blank">
//                             {mode === "icon" ? <Icon className="w-5 h-5 fill-current me-1" /> : name}
//                         </Link>
//                     ) : mode === "icon" ? <Icon className="w-5 h-5 fill-current" /> : name}
//                 </TooltipTrigger>
//                 <TooltipContent className=" flex items-center justify-center ">
//                     <Icon className="w-4 h-4 fill-current me-1" /> {name}
//                 </TooltipContent>
//             </Tooltip>
//         </TooltipProvider>
//     )
// }


export default function PlatformIcon({ code, mode = "icon", href, hover = true, className, label = "" }: PlatformIconProps) {
    // name to lowercase
    const Icon = Icons[code] || AlertTriangle
    // cpitlize first letter
    return !hover ? <Icon className={cn("w-5 h-5 fill-current", className)} /> : (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <Icon className={cn("w-5 h-5 fill-current", className)} />
                </TooltipTrigger>
                <TooltipContent className=" flex items-center justify-center ">
                    <Icon className={cn("w-5 h-5 fill-current", className)} /> {label}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}