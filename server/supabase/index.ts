import { createClient } from '@supabase/supabase-js'

// 初始化 Supabase 客戶端
// 初始化 Supabase 客戶端
const supabaseUrl = 'https://lotrdpnseqpxsnnjmvhp.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvdHJkcG5zZXFweHNubmptdmhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkxOTc0NTIsImV4cCI6MjA1NDc3MzQ1Mn0.ZdKWN2RM0AK-f26LovOGKPUWGpr0ciffJdODHwsBfws'

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase URL or Key in environment variables')
}

const supabaseServer = createClient(supabaseUrl, supabaseKey)

export default supabaseServer
