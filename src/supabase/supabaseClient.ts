import { createClient } from "@supabase/supabase-js"

const supabaseURL = 'https://bprnuutqwjxzkhignyjg.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseURL, supabaseKey as string)