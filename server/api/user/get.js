import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { user_id } = body

  let userInfo = await prisma.user.findMany({
    where: { id: user_id },
    // include: { likes: true, author: { select: { name: true } } }
  })

  return userInfo
})