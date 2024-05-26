import prisma from "@/lib/prisma";
import { MembersSettingsForm, DangerZone, IntegrationForm, ProfileForm, GeoLocationForm } from "./_forms";

const getData = async (id: string) => {
    const data = await prisma.channel.findUnique({
        where: {
            id,
        }
    })
    return data
}
const getPlatforms = async () => {
    const platforms = await prisma.platform.findMany({
        select: {
            id: true,
            code: true,
            label: true,
        }
    })
    return platforms
}
export default async function Page({ params: { id } }: { params: { id: string } }) {
    const data = await getData(id)
    const platforms = await getPlatforms()
    return (
        <div className=" grid gap-6">
            <ProfileForm id={id} data={data} platforms={platforms} />
            <GeoLocationForm id={id} data={data} />
            <IntegrationForm id={id} data={data} />
            <MembersSettingsForm id={id} />
            <DangerZone id={id} />
        </div>
    )
} 