// plugins/supabase.ts
// import { createClient } from "@supabase/supabase-js";
// import { defineNuxtPlugin, useRuntimeConfig } from "nuxt/app";

// export default defineNuxtPlugin(() => {
//   const config = useRuntimeConfig();
//   const supabaseUrl = config.public.supabaseUrl || ''
//   const supabaseKey = config.public.supabaseKey || ''
//   const supabase = createClient(supabaseUrl, supabaseKey);
//   return { provide: { supabase } };
// });


// import { createClient } from '@supabase/supabase-js'

// const config = useRuntimeConfig();
// // 初始化 Supabase 客戶端
// const supabaseUrl = config.public.supabaseUrl || ''
// const supabaseKey = config.public.supabaseKey || ''

// if (!supabaseUrl || !supabaseKey) {
//   throw new Error('Missing Supabase URL or Key in environment variables')
// }

// const supabase = createClient(supabaseUrl, supabaseKey)

// export default supabase

