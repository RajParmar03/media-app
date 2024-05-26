
1. Define zod schema
2. Create a server action to handle form submission
3. Create a form component (client side)

## 1. Define zod schema
```ts
// /settings/schema.ts
import { z } from 'zod';
export const userSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
});

export type UserSchema = z.infer<typeof userSchema>;
```

## 2. Create a server action to handle form submission

```ts
// /settings/actions.ts
"use server";
import prisma from "@/lib/prisma"
import { formDataToPlainObject } from "@/lib/utils"
import { ActionResponse } from "@/type"
import { revalidatePath } from "next/cache"
// ------------------------------ Channel Info ------------------------------ //
export async function submitAction(prevState: any, formData: FormData): Promise<ActionResponse> {
    // validate the data
    const formDataObject = formDataToPlainObject(formData, channelInfoSchema)
    const validatedFields = channelInfoSchema.safeParse(formDataObject)
    // throw an error if the data is not valid
    if (!validatedFields.success) return { success: false, status: 401, errors: validatedFields.error.flatten().fieldErrors, data: formDataObject }

    try {
        // db operation, logic, etc 
        // ...
        revalidatePath("/path/to/revalidate")
        return { success: true, data: {} }
    } catch (error) {
        return { success: false, status: 500, message: error.message, data: { formData } }
    }
}
```

## 3. Create a form component (client side)

```tsx
"use client";

import { useActionState } from 'react';
import { action } from './actions.js';

function MyComponent() {
  const [state, formAction, isPending] = useActionState(action, null);
  
//   if user feedback is needed after form submission, uncomment the following code
//   useEffect(() => {
//         if (state?.success) toast.success("form submitted")
//     }, [state]);
  // ...

  return (
    <form action={formAction}>
      <div className="grid gap-4">
        {state?.success === false && (<div className="text-red-500">{state?.error.message}</div>)}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
            //   defaultValue={state?.data?.email} // uncomment this line if you want to prefill the form with data from the server ig. when editing a form
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              disabled={isPending}
            />
            {state?.error?.email && (<div className="text-red-500">{state?.error.email}</div>)}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input name="password" id="password" type="password" required  disabled={isPending}/>
            {state?.error?.password && (<div className="text-red-500">{state?.error.password}</div>)}
          </div>
          <Button type="submit" disabled={isPending} variant="default"> 
            {isPending ? "Submitting..." : "Submit"}
          </Button>
    </form>
  );
}
```


## Resources
- [Server actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [useActionState hook](https://react.dev/reference/react/useActionState)
