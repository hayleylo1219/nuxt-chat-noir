import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const res = await prisma.post.create({
    data:
    {
      authorId: body.authorId,
      // name: body.name,
      published: true,
      content: body.content,
      // created_at: new Date(),
    }
  })

  return res
})