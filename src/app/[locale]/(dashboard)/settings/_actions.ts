"use server";
import { ActionResult } from "@/components/form";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { z } from "zod";

const profileSchema = z.object({
    name: z.string().min(3, {
        message: "Name must be at least 3 characters.",
    }),
    // phone
    // avatar
    // darkMode
    // language
    // country
    // timezone
    // currency
    // city
    // gender
    // dob
    // bio
    // social
    // phone: z.string().min(10, {
    //     message: "Phone number must be at least 10 characters.",
    // }),
    // avatar: z.string().url({
    //     message: "Please enter a valid URL.",
    // }),
    // darkMode: z.boolean(),
    // language: z.string(),
    // country: z.string(),
    // timezone: z.string(),
    // currency: z.string(),
    // city: z.string(),
    // gender: z.string(),
    // dob: z.string(),
    // bio: z.string(),
    // social: z.object({
    //     twitter: z.string().url({
    //         message: "Please enter a valid URL.",
    //     }),
    //     facebook: z.string().url({
    //         message: "Please enter a valid URL.",
    //     }),
    //     linkedin: z.string().url({
    //         message: "Please enter a valid URL.",
    //     }),
    //     instagram: z.string().url({
    //         message: "Please enter a valid URL.",
    //     }),
    // }),
})
export async function profile(_: any, formData: FormData): Promise<ActionResult> {

    const { isAuthenticated, user } = await auth()
    if (!isAuthenticated) {
        return {
            type: 'error',
            message: 'Unauthorized',
            status: 401,
        }
    }
    // sleep for 2 seconds to simulate a network request
    await new Promise((resolve) => setTimeout(resolve, 2000))
    // print the form data
    console.log("Form Data server", formData)
    const validatedFields = profileSchema.safeParse({
        name: formData.get('name'),
        // phone: formData.get('phone'),
        // avatar: formData.get('avatar'),
        // darkMode: formData.get('darkMode'),
        // language: formData.get('language'),
        // country: formData.get('country'),
        // timezone: formData.get('timezone'),
        // currency: formData.get('currency'),
        // city: formData.get('city'),
    })



    if (!validatedFields.success) {
        return {
            type: 'error',
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Invalid form data',
            status: 400,
        }
    }

    const updatedUser = await prisma.user.update({
        where: {
            id: user.id,
        },
        data: {
            name: validatedFields.data.name,
            // phone: validatedFields.data.phone,
            // avatar: validatedFields.data.avatar,
            // darkMode: validatedFields.data.darkMode,
            // language: validatedFields.data.language,
            // country: validatedFields.data.country,
            // timezone: validatedFields.data.timezone,
            // currency: validatedFields.data.currency,
            // city: validatedFields.data.city,
        },
    });

    return {
        type: 'success',
        message: 'Profile updated successfully',
        data: updatedUser,
    }
}


const appearanceSchema = z.object({
    darkMode: z.boolean(),
})
export async function appearance(_: any, formData: FormData): Promise<ActionResult> {

    // sleep for 2 seconds to simulate a network request
    await new Promise((resolve) => setTimeout(resolve, 2000))
    // print the form data
    console.log("Form Data server", formData)
    const validatedFields = appearanceSchema.safeParse({
        darkMode: formData.get('darkMode'),
    })

    if (!validatedFields.success) {
        return {
            type: 'error',
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Invalid form data',
            status: 400,
        }
    }

    const updatedUser = await prisma.user.update({
        where: {
            id: 1,
        },
        data: {
            darkMode: validatedFields.data.darkMode,
        },
    });

    return {
        type: 'success',
        message: 'Appearance updated successfully',
        data: updatedUser,
    }

}

