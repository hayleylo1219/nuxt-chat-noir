import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {

  const deleted = await prisma.like.delete({
    where: {
      id: event.context.params.id
    }
  })

  return deleted
})