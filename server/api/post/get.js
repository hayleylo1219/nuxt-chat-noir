import prisma from "~/prisma/client.ts"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  let posts = await prisma.post.findMany({
    where: query.user_id ? { authorId: query.user_id } : {},
    orderBy: { id: 'desc' },
    include: { likes: true, author: { select: { name: true } } }
  })

  return posts
})

