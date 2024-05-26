import { Argon2id } from "oslo/password";
import authzData from "./data/authz.json" assert { type: "json" };
import platformsData from "./data/platforms.json" assert { type: "json" };
import { PrismaClient, Prisma, RoleName } from "@prisma/client";
import { createId } from "@paralleldrive/cuid2";

export const initUsers = async (prisma: PrismaClient) => {

    const admin = await prisma.user.upsert({
        where: {
            email: "admin@admin.com"
        },
        update: {
        },
        create: {
            email: "admin@admin.com",
            hashed_password: await new Argon2id().hash("12345678"),
            roles: {
                connect: {
                    name: "ADMIN",
                },
            },
        },
    });
};

export const initRolesAndPermissions = async (prisma: PrismaClient) => {

    // read json file with roles and permissions
    // const roles = authzData.roles;
    const roles = Object
        .keys(RoleName)
        .filter((v) => isNaN(Number(v)))

    const permissions = authzData.permissions;

    // create permissions
    for (const permission of permissions) {
        await prisma.permission.upsert({
            where: {
                name: permission
            },
            update: {},
            create: {
                name: permission,
            },
        });
    }

    // create roles
    for (const role of roles) {
        await prisma.role.upsert({
            where: {
                name: role as RoleName
            },
            update: {},
            create: {
                name: role as RoleName,
                label: role.charAt(0).toUpperCase() + role.toLowerCase().slice(1),
                // TODO: connect permissions
                // permissions: {
                //     connect: role.permissions.map((permission) => ({
                //         name: permission.name,
                //     })),
                // },
            },
        });
    }
};


// platforms
export const initPlatforms = async (prisma: PrismaClient) => {
    const platforms = platformsData;
    // create platforms
    for (const platform of platforms) {
        console.log("platform", platform);
        await prisma.platform.upsert({
            where: {
                code: platform.code
            },
            update: {},
            create: {
                id: createId(),
                code: platform.code,
                label: platform.label,
                url: platform.url,
                abbr: platform.abbr,
                disabled: platform.disabled,
            },
        });
    }
    console.log("Platforms created");
}



