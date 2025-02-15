import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const res = await prisma.user.create({
    data:
    {
      id: body.id,
      name: body.name,
      email: body.email,
    }
  })

  return res
})