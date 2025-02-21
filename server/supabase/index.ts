import { createClient } from '@supabase/supabase-js'

// 初始化 Supabase 客戶端
// 初始化 Supabase 客戶端
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase URL or Key in environment variables')
}

const supabaseServer = createClient(supabaseUrl, supabaseKey)

export default supabaseServer
