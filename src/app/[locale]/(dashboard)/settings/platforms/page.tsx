import PlatformIcon from "@/components/platform-icon";
import { Card, CardContent } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { Link } from "@/navigation";

const getData = async () => {
    const res = await prisma.platform.findMany({
        select: {
            code: true,
            label: true,
            disabled: true
        },
        orderBy: { createdAt: "asc" }
    });
    return res;
}
export default async function Page() {
    const data = await getData();
    return (
        <div className=" grid gap-4">
            <div className=" flex items-center justify-start">
                <h1 className="text-3xl font-semibold">Platforms</h1>
            </div>
            <div className=" grid grid-cols-6 gap-4">
                {data?.map((platform) => {
                    return (
                        <Link href={`/settings/platforms/${platform.code}`} key={platform.code} className=" relative flex flex-col items-center gap-2 justify-center p-4 rounded-lg bg-secondary hover:bg-background hover:cursor-pointer">
                            {!platform.disabled && <div className="absolute top-0 right-0 bg-green-500 text-white p-2 rounded-tr-full rounded-bl-full"></div>}
                            <PlatformIcon code={platform.code} hover={false} className="h-9 w-9" />
                            <h1>{platform.label}</h1>
                        </Link>
                    )
                }
                )}
            </div>
        </div >
    )
}