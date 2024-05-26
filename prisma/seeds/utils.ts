import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// get a random enum value from an enum object
// usage: randomEnum(RoleName) => "ADMIN"
export const randomEnum = (enumObj: any): string => {
  const enumValues = Object.values(enumObj);
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  return enumValues[randomIndex] as string;
};

// async repeat
export const repeat = async (
  count: number,
  fn: (i: number) => Promise<any>
) => {
  const arr = [];
  for (let i = 0; i < count; i++) {
    // @ts-ignore
    arr.push(await fn(i));
  }
  return arr;
};

// get a random record from the database table
// usage: await randomRecord("User")
export const randomRecord = async <T>(model: string, schema = "public"): Promise<T | undefined> => {
  const result = await prisma.$queryRawUnsafe<T[]>(
    `SELECT * FROM ${schema}."${model}" ORDER BY RANDOM() LIMIT 1`
  )
  return result[0] as T | undefined;
};

// get a random item from an array
export function getRandomFromArray(array: any[]) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
// export const randomRecord = async (model: string, schema = "public") =>  {
//   return await prisma.$queryRawUnsafe(
//     `SELECT * FROM ${schema}."${model}" ORDER BY RANDOM() LIMIT 1`
//   );
// };

// export const createManyData = async (i: number, aa: Function) => {
//   let data = [];
//   for (i; i < 10; i++) {
//     data.push(aa());
//   }
//   return data;  
// }