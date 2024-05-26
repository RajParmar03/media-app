"use server"

import prisma from "@/lib/prisma"
import { formDataToPlainObject } from "@/lib/utils"
import { revalidatePath } from "next/cache"
import { object, z } from "zod"
import { createId } from '@paralleldrive/cuid2';
import { CredentialsType } from "@/type.d"

const KeysSchema = z.object({
    id: z.string().optional(),
    code: z.string(),
    label: z.string().optional(),
    description: z.string().optional(),
    eId: z.string().optional(),
    note: z.string().optional(),
    type: z.nativeEnum(CredentialsType),
    platform: z.string().optional(),
    disabled: z.string().optional(),
    settings: z.object({
        country: z.string().optional(),
        language: z.string().optional(),
        timezone: z.string().optional(),
        ip: z.string().optional(),
        origin: z.string().optional(),
        proxy: z.string().optional(),
    }).optional(),
    key: z.string().optional(),
    clientId: z.string().optional(),
    clientSecret: z.string().optional(),
    token: z.string().optional(),
    refreshToken: z.string().optional(),
    redirectUri: z.string().optional(),
    username: z.string().optional(),
    password: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
})

// delete key
export async function deleteKey(prevState: any, formData: FormData) { }
// disable key
export async function disableKey(prevState: any, formData: FormData) { }

export async function createKey(prevState: any, formData: FormData) {
    const formDataObject = formDataToPlainObject(formData, KeysSchema)
    const validatedFields = KeysSchema.safeParse(formDataObject)
    // throw an error if the data is not valid
    if (!validatedFields.success) return { success: false, status: 401, errors: validatedFields.error.flatten().fieldErrors, data: formDataObject }

    try {
        const plt = await prisma.platform.findFirst({ where: { code: formDataObject.code } })
        // on keys, check if eid and type is unique
        // const typeIsAlreadyUsed = plt?.keys?.find((k) => k.type === formDataObject.type && k.eId === formDataObject.eId)
        // if (typeIsAlreadyUsed) {
        //     return { success: false, status: 401, message: "Key already exists" }
        // }

        if (plt?.keys && Array.isArray(plt?.keys)) {
            // add to value keys array
            const keys = Array.isArray(plt?.keys) ? plt?.keys : []
            // updatedat createdat
            const attr = {
                id: createId(),
                createdAt: new Date(), updatedAt: new Date(),
            }
            const updatedJson = [...keys, { ...validatedFields.data, ...attr }]
            const updated = await prisma.platform.update({
                where: { code: formDataObject.code },
                data: { keys: updatedJson },
            })
            revalidatePath("/settings")
            return { success: true, data: updated }
        }

        console.log("------------------------------------ plt?.keys", plt?.keys)

    } catch (error) {
        console.log("------------------------------------ error", error)
        return { success: false, status: 500, message: error?.message }
    }
}