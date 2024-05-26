import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/prisma"

const getData = async (code: string, id: string) => {
    const data = await prisma.platform.findUnique({
        where: {
            code: code
        }
    })
    return Array.isArray(data?.keys) ? data?.keys.find((key: any) => key?.id === id) : null;
}
export default async function Page({ params }: { params: { code: string, key: string } }) {
    const data = await getData(params?.code, params?.key)
    return (
        <>
            <p>code: {params?.code}</p> <p>id: {params?.key}</p>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <Card>
                <CardHeader>
                    <CardTitle></CardTitle>
                    <CardDescription></CardDescription>
                    <CardContent>
                        <div className=" grid gap-2">
                            <div className=" flex space-x-2 items-center justify-start">
                                <span className="text-muted-foreground font-medium">Key:</span> <span>{data?.key}</span>
                            </div>
                            <div className=" flex space-x-2 items-center justify-start">
                                <span className="text-muted-foreground font-medium">Value:</span> <span>{data?.value}</span>
                            </div>
                            <div className=" flex space-x-2 items-center justify-start">
                                <span className="text-muted-foreground font-medium">Description:</span> <span>{data?.description}</span>
                            </div>
                            <div className=" flex space-x-2 items-center justify-start">
                                <span className="text-muted-foreground font-medium">Created At:</span> <span>{data?.createdAt}</span>
                            </div>
                            <div className=" flex space-x-2 items-center justify-start">
                                <span className="text-muted-foreground font-medium">Updated At:</span> <span>{data?.updatedAt}</span>
                            </div>

                        </div>
                    </CardContent>
                </CardHeader>
            </Card>
        </>
    )
}