// import { defineEventHandler, readBody } from 'h3';
// import supabaseServer from '~/server/supabase/index.ts';

// export default defineEventHandler(async (event) => {
//   // 取得請求的 Body 內容
//   const body = await readBody(event);
//   const { postId } = body;

//   // 確保 postId 存在
//   if (!postId) {
//     return { error: 'postId is required' };
//   }

//   // 取得 Supabase Client
//   const supabase = supabaseServer as any;

//   // 更新 likes 欄位 +1
//   const { data, error } = await supabase.rpc('increment_likes', { post_id: postId })
//     .select();

//   // 若有錯誤，回傳錯誤資訊
//   if (error) {
//     return { error: error.message };
//   }

//   return { message: 'Liked successfully!', likes: data };
// });

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { post_id, user_id } = body

  if (!body || !body.post_id || !body.user_id) {
    return createError({ statusCode: 400, message: "Missing post_id or user_id" })
  }

  // const res = await prisma.like.create({
  //   data: {
  //     postId: body.post_id,
  //     userId: body.user_id
  //   }
  // })

  // return res
  // 檢查用戶是否已經按過讚
  const existingLike = await prisma.like.findFirst({
    where: { postId: post_id, userId: user_id }
  })

  if (existingLike) {
    // 如果已經點讚，則取消按讚
    await prisma.like.delete({ where: { id: existingLike.id } })
  } else {
    // 如果還沒點讚，則新增
    await prisma.like.create({ data: { postId: post_id, userId: user_id } })
  }

  // 取得最新的讚數
  const likesCount = await prisma.like.count({ where: { postId: post_id } })

  return { likes: likesCount }
})