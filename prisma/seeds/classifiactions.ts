import { da, en, fa, faker } from '@faker-js/faker';
import { Prisma, PrismaClient } from '@prisma/client';
import { randomEnum, randomRecord } from './utils';
import content from '../seeds/data/content.json';
import { nanoid } from 'nanoid'

// insert content (media categories) into database
export const initContent = async (prisma: PrismaClient) => {
  // work around for preventing duplicate content in database 
  // check if content is already in database
  const allContents = await prisma.content.findMany();
  // only insert content if there is no content in database
  if (allContents.length > 0) {
    return;
  }

  async function insertContent(node, parentId = null, name = null) {
    console.log(Object.keys(node));
    const created = await prisma.content.create({
      data: {
        id: nanoid(10),
        name: name || Object.keys(node)[0],
        title: node.title, // Use the key as title if not provided
        description: node.description,
        order: node?.order,
        icon: node?.icon,
        parentId: parentId,
      },
    });

    if (node.children) {
      await Promise.all(
        Object.keys(node.children).map((childKey) =>
          insertContent(node.children[childKey], created.id, childKey)
        )
      );
    }
  }

  Object.keys(content).map((key) => insertContent(content[key], null, key));

}