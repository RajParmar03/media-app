import prisma from "@/lib/prisma"

const getData = async () => {
    const res = await prisma.platform.findMany({
        orderBy: { createdAt: "asc" }
    });
    return res;
}

export default async function Layout({ children }: { children: React.ReactNode }) {
    const data = await getData();
    return (
        <div>
            {children}
        </div>
    )
}