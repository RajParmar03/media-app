import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { redirect, Link } from "@/navigation"
import { Plus } from "lucide-react";
import prisma from "@/lib/prisma";
import { Separator } from "@/components/ui/separator";

const getData = async () => {
    const res = await prisma.content.findMany({
        where: {
            parentId: null
        },
    });
    return res;
}
export default async function Page() {
    const { isAuthenticated } = await auth()
    if (!isAuthenticated) {
        redirect('/signin')
    }
    const data = await getData();

    return <div className=" flex flex-col space-y-3">
        <div className=" flex items-center justify-between p-2 border-b">
            <div className=" flex items-start justify-start flex-col space-y-1">
                <h1 className="text-xl font-semibold">Media Content</h1>
                <p className="text-sm text-muted-foreground">Media content library</p>
            </div>
            {/* <Button variant={"secondary"}>
                <Plus className="w-6 h-6" />
            </Button> */}
        </div>
        <Separator />
        {data.map((item, i) => SectionComponent({ item, key: i }))}
    </div>
}

function SectionComponent({ item, key }) {
    return (
        <div className=" flex flex-col space-y-3">

            <div className="flex items-center justify-between p-2 border-b">
                <div className=" flex items-start justify-start flex-col space-y-1">
                    <Link href={`/content/${item.id}`} className=" flex items-center justify-start hover:text-muted-foreground">
                        <h1 className="text-md font-semibold">{item.title}</h1>
                    </Link>
                    <p className="text-sm  text-muted-foreground">Page description</p>
                </div>
                <Button variant={"secondary"}>
                    <Plus className="w-6 h-6" />
                </Button>
            </div>
            <div className="grid  grid-cols-7 gap-2">
                {Array.from({ length: 7 }).map((_, i) => <Card key={i}>
                    <CardHeader>
                        <CardTitle>Card Title</CardTitle>
                    </CardHeader>
                    <CardDescription>
                        Card Description
                    </CardDescription>
                </Card>)}
            </div>
        </div>
    )
} 