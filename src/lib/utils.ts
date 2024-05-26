import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import numbro from "numbro"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Function to convert FormData to a plain object
export function formDataToPlainObject(formData: FormData, schema: z.ZodTypeAny): Record<string, any> {
  const schemaKeys = Object.keys(schema?.shape);
  const object: Record<string, any> = {};
  schemaKeys.forEach((key) => {
    const value = formData.get(key);
    if (value instanceof File) {
      // Handling files: store the filename
      object[key] = value.name; // Adjust as needed for your use case
    } else if (value !== null) {
      object[key] = value.toString();
    }
  });
  return object;
}

export function formatNumber(number: number) {
  return numbro(number).format({ average: true, mantissa: 1 });
}