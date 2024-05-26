"use server"

import prisma from "@/lib/prisma"
import { ActionResponse } from "@/type"
import { z } from "zod"

const schema = z.object({
    platform: z.enum(["twitter", "facebook", "linkedin"])
})

export async function createLink(prevState: any, formData: FormData): Promise<ActionResponse> {
    const validatedFields = schema.safeParse({
        platform: formData.get("platform")
    })

    if (!validatedFields.success) {
        return {
            success: false,
            status: 400,
            errors: validatedFields.error.flatten().fieldErrors
        }
    }

    // create the link
    const newLink = await prisma.linkedChannel.create({
        data: {
            platform: {
                connect: {
                    id: formData.get("platformId") as string
                }
            },
            channel: {
                connect: {
                    id: formData.get("id") as string
                }
            }
        }
    })

    return {
        success: true,
        data: newLink
    }

}