
type Props = {
    name: string
    errors: string[]
}
export function FormError({ name, errors }: Props) {
    // if there are no errors, return null
    if (!errors || errors?.length === 0) return null
    // if field has errors, return the error message
    // validatedFields.error.flatten().fieldErrors
    // use  name to get the error message
    return errors[name] ? <p className="text-red-500">{errors[name]}</p> : null

}
