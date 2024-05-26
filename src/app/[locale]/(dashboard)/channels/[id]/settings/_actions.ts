"use server"

import prisma from "@/lib/prisma"
import { uploadFile } from "@/lib/uploads"
import { formDataToPlainObject } from "@/lib/utils"
import { ActionResponse } from "@/type"
import { revalidatePath } from "next/cache"
// zod schemas
import { z } from "zod"
const channelInfoSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    url: z.string().url().optional(),
    // platformId: z.string(),
})



// ------------------------------ Channel Info ------------------------------ //
export async function updateChannelInfo(prevState: any, formData: FormData): Promise<ActionResponse> {

    console.log("formData", formData)
    // validate the data
    const formDataObject = formDataToPlainObject(formData, channelInfoSchema)
    const validatedFields = channelInfoSchema.safeParse(formDataObject)
    // throw an error if the data is not valid
    if (!validatedFields.success) return { success: false, status: 401, errors: validatedFields.error.flatten().fieldErrors, data: formDataObject }

    try {
        // update the channel info
        const updatedChannel = await prisma.channel.update({
            where: { id: formData.get("id") as string, },
            data: validatedFields.data,
        })
        revalidatePath("/channels")
        return { success: true, data: updatedChannel }
    } catch (error) {
        console.error("Error updating channel info", error)
        return { success: false, status: 500, message: error.message, data: { formData } }
    }
}

// ------------------------------ Avatar ------------------------------ //
export async function updateAvatar(formData: FormData): Promise<ActionResponse> {
    const schema = z.object({
        // vlaidate the file blob
        id: z.string(),
        image: z.custom<Blob>().refine((blob) => blob instanceof Blob, {
            message: "Invalid file",
        }).refine((blob) => blob.size < 500000, {
            message: "File size is too large",
        }).refine((blob) => blob.type.startsWith("image/"), {
            message: "Invalid file type",
        }),
    })
    const valid = schema.safeParse({
        id: formData.get("id"),
        // file blob from the form data, 
        // this is the file that will be uploaded to the server and saving the file path to the database
        image: formData.get("image"),
    })
    if (!valid.success) return { success: false, status: 400, errors: valid.error.flatten().fieldErrors }
    try {
        const dir = "avatars2"
        // save the file to the server
        const savedFileUrl = await uploadFile({ file: valid.data.image, dir: dir })
        const channel = await prisma.channel.update({
            where: { id: valid.data.id as string, },
            data: { avatar: savedFileUrl },
        })
        revalidatePath("/channels")
        return { success: true, data: channel }
    } catch (error) {
        return { success: false, status: 500, errors: error }
    }
}
// ------------------------------ GeoLocation ------------------------------ //
export async function updateGeoLocationInfo(prevState: any, formData: FormData): Promise<ActionResponse> {
    const schema = z.object({
        country: z.string(),
        language: z.string(),
        currency: z.string(),
        timezone: z.string(),
    })
    const formDataObject = formDataToPlainObject(formData, schema)
    const validatedFields = schema.safeParse(formDataObject)
    // throw an error if the data is not valid
    if (!validatedFields.success) return { success: false, status: 401, errors: validatedFields.error.flatten().fieldErrors, data: formDataObject }
    try {
        const updatedChannel = await prisma.channel.update({
            where: { id: formData.get("id") as string, },
            data: validatedFields.data,
        })
        revalidatePath("/channels")
        return { success: true, data: updatedChannel }
    } catch (error) {
        return { success: false, status: 500, message: error?.message }
    }
}

// ------------------------------ Integration Info ------------------------------ //
const ApiKeySchema = z.object({ type: z.literal("apiKey"), key: z.string(), secret: z.string(), });
const OAuthSchema = z.object({ type: z.literal("oauth"), token: z.string(), refreshToken: z.string(), });
const PasswordSchema = z.object({ type: z.literal("password"), username: z.string(), password: z.string(), });

const AuthSchema = z.discriminatedUnion("type", [ApiKeySchema, OAuthSchema, PasswordSchema]);

export async function updateIntegrationInfo(prevState: any, formData: FormData): Promise<ActionResponse> {
    // const schema = z.object({
    //     type: z.enum(["apiKey", "oauth", "password"]),
    //     key: z.string().optional(),
    //     secret: z.string().optional(),
    //     token: z.string().optional(),
    //     refreshToken: z.string().optional(),
    //     username: z.string().optional(),
    //     password: z.string().optional(),
    // }).refine((data) => {
    //     if (data.type === "apiKey") {
    //         return data.key && data.secret
    //     } else if (data.type === "oauth") {
    //         return data.token && data.refreshToken
    //     } else if (data.type === "password") {
    //         return data.username && data.password
    //     }
    // }
    // )
    const formDataObject = formDataToPlainObject(formData, AuthSchema)
    const validatedFields = ApiKeySchema.safeParse(formDataObject)
    // throw an error if the data is not valid
    if (!validatedFields.success) return { success: false, status: 401, errors: validatedFields.error.flatten().fieldErrors, data: formDataObject }
    try {
        const updatedChannel = await prisma.channel.update({
            where: { id: formData.get("id") as string, },
            data: validatedFields.data,
        })
        revalidatePath("/channels")
        return { success: true, data: updatedChannel }
    } catch (error) {
        return { success: false, status: 500, message: error?.message }
    }
}