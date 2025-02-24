import prisma from "~/prisma/client.ts"

export default defineEventHandler(async (event) => {

  try {
    const query = getQuery(event)
    let posts = await prisma.post.findMany({
      where: query.user_id ? { authorId: query.user_id } : {},
      orderBy: { id: 'desc' },
      include: { likes: true, author: { select: { name: true } } }
    })

    return posts
  } catch (error) {
    console.error('Prisma Error:', error)
    return { error: 'Server Error: ' + error.message }
  }


})

