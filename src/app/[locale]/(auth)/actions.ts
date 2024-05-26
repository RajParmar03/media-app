'use server'


import { z } from "zod";
import { Argon2id } from "oslo/password";
import { cookies } from "next/headers";
import { lucia, validateRequest } from "@/lib/lucia-auth"
import { RedirectType, redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { ActionResult } from "@/components/form";

const signinSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
})

const signupSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
})

const resetPasswordSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
})


export async function signin(_: any, formData: FormData): Promise<ActionResult> {

    // sleep for 2 seconds to simulate a network request
    await new Promise((resolve) => setTimeout(resolve, 2000))
    // print the form data
    console.log("Form Data server", formData)
    const validatedFields = signinSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    })



    if (!validatedFields.success) {
        return {
            type: 'error',
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Invalid form data',
            status: 400,
        }
    }
    // exsiting user check 
    const existingUser = await prisma.user.findUnique({
        where: {
            email: validatedFields.data.email,
            deletedAt: null,
        }
    });
    // if user does not exist
    if (!existingUser) {
        return {
            type: 'error',
            message: "Incorrect username or password",
            status: 400,
        };
    }

    // check password
    console.log("Existing User", existingUser)

    const validPassword = await new Argon2id().verify(existingUser.hashed_password, validatedFields.data.password);
    if (!validPassword) {
        return {
            type: 'error',
            message: "Incorrect username or password",
            status: 400,
        };
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return redirect("/");
}

export async function signup(_: any, formData: FormData): Promise<ActionResult> {
    // sleep for 2 seconds to simulate a network request
    await new Promise((resolve) => setTimeout(resolve, 2000))
    // print the form data
    console.log("Form Data server", formData)
    const validatedFields = signupSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    })

    if (!validatedFields.success) {
        return {
            type: 'error',
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Invalid form data',
            status: 400,
        }
    }
    // exsiting user check 
    const existingUser = await prisma.user.findUnique({
        where: {
            email: validatedFields.data.email,
            deletedAt: null,
        }
    });
    // if user does not exist
    if (existingUser) {
        return {
            type: 'error',
            message: "User already exists",
            status: 400,
        };
    }

    const hashedPassword = await new Argon2id().hash(validatedFields.data.password);
    const user = await prisma.user.create({
        data: {
            email: validatedFields.data.email,
            hashed_password: hashedPassword,
        }
    });

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return redirect("/");
}

export async function resetPassword(_: any, formData: FormData): Promise<ActionResult> {
    // sleep for 2 seconds to simulate a network request
    await new Promise((resolve) => setTimeout(resolve, 2000))
    // print the form data
    console.log("Form Data server", formData)
    const validatedFields = resetPasswordSchema.safeParse({
        email: formData.get('email'),
    })

    if (!validatedFields.success) {
        return {
            type: 'error',
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Invalid form data',
            status: 400,
        }
    }
    // exsiting user check 
    const existingUser = await prisma.user.findUnique({
        where: {
            email: validatedFields.data.email,
            deletedAt: null,
        }
    });
    // if user does not exist
    if (!existingUser) {
        return {
            type: 'error',
            message: "User does not exist",
            status: 400,
        };
    }

    // TODO: send password reset email
    // sendPasswordResetEmail(existingUser.email)

    return {
        type: 'success',
        message: "Password reset email sent",
    }
}

export async function signout(): Promise<ActionResult> {
    const { session } = await validateRequest();
    if (!session) {
        return {
            type: "error",
            message: "Unauthorized",
            status: 401,
        };
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return redirect("/auth/signin", RedirectType.replace)
}