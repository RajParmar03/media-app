
import { PrismaClient } from "@prisma/client";

import { initUsers, initRolesAndPermissions, initPlatforms } from "./initial_data";
import { fakeChannels, fakeItems, fakeStations, fakeUsers, connectItemsToChannels } from "./fake_dev";
import { newEnforcer } from 'casbin';
import { PrismaAdapter } from 'casbin-prisma-adapter';
import path from "path";
import { initContent } from "./classifiactions";



const prisma = new PrismaClient();


async function main() {
    const a = await PrismaAdapter.newAdapter();
    // // path to model file and policy file.
    const p = path.join(path.resolve(), './rbac_model.conf');
    const e = await newEnforcer(p, a)

    // ----------------------------------------------------------------- //
    await initRolesAndPermissions(prisma);
    await initUsers(prisma);
    await initPlatforms(prisma);
    // initial media categories 
    await initContent(prisma);

    // ----------------------------------------------------------------- //
    // ---------------------  Only for development --------------------- //
    // ---------------------      FAKE DATA      --------------------- //
    // ----------------------------------------------------------------- //

    for (let i = 0; i < 10; i++) {
        await fakeUsers(prisma);
        await fakeStations(prisma);
        await fakeChannels(prisma);
    }
    await e.addPolicy('admin', 'station', 'create');

    await fakeItems(prisma);

    // ----------------------------------------------------------------- //
    // add items to channel
    await connectItemsToChannels(prisma);
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })