import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";

const getData = async ({ id }: { id: string }) => {
    const res = await prisma.content.findUnique({
        where: {
            id: id,
        },
        include: {
            children: true,
        },
    });
    return res;
}

export default async function Layout({ params, children }: { params: any, children: React.ReactNode }) {
    const data = await getData({ id: params.slug });
    console.log(data);
    return (
        <div className="flex flex-col gap-y-3 ">
            <h1 className="text-2xl font-bold">{data?.title}</h1>
            <div className="py-2 space-x-2 flex items-center justify-start">
                {data?.children.map((_, i) => (
                    <Button key={i} variant={"secondary"} size={"sm"}>
                        {_.title}
                    </Button>
                ))}
            </div>
            <div className="flex-1 overflow-y-auto">{children}</div>
        </div>
    )
}