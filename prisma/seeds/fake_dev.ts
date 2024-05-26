import { en, faker } from '@faker-js/faker';

import { Prisma, PrismaClient, RoleName } from '@prisma/client';
import type { Station, Role, User, Content, Item, Platform } from '@prisma/client';
import { randomRecord } from './utils';
import fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { Argon2id } from 'oslo/password';

export const fakeUsers = async (prisma: PrismaClient) => {
    const email = faker.internet.email();
    await prisma.user.upsert({
        where: {
            email: email
        },
        update: {
        },
        create: {
            email: email,
            name: faker.person.fullName(),
            phone: faker.phone.number(),
            avatar: faker.image.avatarGitHub(),
            // key for lucia-auth
            hashed_password: await new Argon2id().hash("12345678"),
            roles: {
                connect: {
                    name: await randomRecord<Role>("Role")?.then((role) => role?.name),
                },
            },
        },
    });
};

export const fakeStations = async (prisma: PrismaClient) => {
    const stations = await prisma.station.create({
        data: {
            id: faker.string.nanoid(9),
            name: faker.company.name(),
            description: faker.company.catchPhrase(),
            // logo: faker.image.urlPicsumPhotos(),
            members: {
                create: {
                    user: {
                        connect: {
                            id: await randomRecord<User>("User")?.then((user) => user?.id),
                        },
                    },
                    role: {
                        connect: {
                            name: await randomRecord<Role>("Role")?.then((role) => role?.name),
                        },
                    },
                },
            },
        },
    });
}

export const fakeChannels = async (prisma: PrismaClient) => {
    var metajson = {
        title: faker.company.name(),
        bio: faker.company.catchPhrase(),
        avatar: faker.image.urlPicsumPhotos(),
        language: "en",
        country: "US",
        subscribers: faker.number.int({ min: 0, max: 100000 }),
        views: faker.number.int({ min: 0, max: 300000 }),
    } as Prisma.JsonValue;
    // Generate data for linked channels asynchronously
    const linkedChannelsData = await Promise.all(
        Array.from({ length: 3 }, async () => ({
            id: faker.string.nanoid(9),
            metadata: JSON.stringify(metajson),
            platformId: await randomRecord<Platform>("Platform").then(platform => platform?.id) as string,
            settings: JSON.stringify({
                credentials: {
                    type: "password",
                    username: faker.internet.email(),
                    password: faker.internet.password(),
                },
            }),
        }))
    );
    const channel = await prisma.channel.create({
        data: {
            id: faker.string.nanoid(9),
            title: faker.company.name(),
            description: faker.company.catchPhrase(),
            avatar: faker.image.urlPicsumPhotos(),
            station: {
                connect: {
                    id: await randomRecord<Station>("Station")?.then((station) => station?.id),
                },
            },
            members: {
                create: {
                    user: {
                        connect: {
                            id: await randomRecord<User>("User")?.then((user) => user?.id),
                        },
                    },
                    role: {
                        connect: {
                            name: await randomRecord<Role>("Role")?.then((role) => role?.name),
                        },
                    },
                },
            },
            links: {
                createMany: {
                    data: linkedChannelsData,
                }
            }
        },
    });
}


export const fakeItems = async (prisma: PrismaClient) => {
    // find all json files that ends with info.json in the directory
    const currentModulePath = fileURLToPath(import.meta.url);
    const currentModuleDir = dirname(currentModulePath);
    const directoryPath = join(currentModuleDir, "..", "..", "public", "samples", "videos")
    const files = fs.readdirSync(directoryPath).filter((file) => file.endsWith("info.json"));
    // read the json files
    for (const file of files) {
        const data = JSON.parse(fs.readFileSync(join(directoryPath, file), "utf8"));
        // console.log(data);
        const subtitles = fs.readdirSync(directoryPath).filter((file) => file.startsWith(data.id) && file.endsWith("vtt"));
        console.log("subtitles", subtitles.map((s) => join("/", "samples", "videos", s)));
        // create the item
        const item = await prisma.item.create({
            data: {
                title: data.title,
                description: data.description,
                details: {
                    url: join("/", "samples", "videos", data.id + ".mp4"),
                    thumbnails: [join("/", "samples", "videos", data.id + ".webp")],
                    subtitles: subtitles.map((s) => join("/", "samples", "videos", s)),
                    duration: data.duration,
                    size: data.size,
                    bitrate: data.bitrate,
                    width: data.width,
                    height: data.height,
                },
                contents: {
                    connect: {
                        id: await randomRecord<Content>("Content")?.then((item) => item?.id),
                    },
                }
            },
        });
    }
}

export async function connectItemsToChannels(prisma: PrismaClient) {
    const channels = await prisma.channel.findMany({});

    for (const channel of channels) {
        await prisma.channel.update({
            where: {
                id: channel.id
            },
            data: {
                items: {
                    connect: {
                        id: await randomRecord<Item>("Item")?.then((item) => item?.id),
                    },
                },
            },
        });
    }
}