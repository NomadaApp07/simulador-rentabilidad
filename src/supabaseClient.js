import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pwpnlnhperzmkutkrwpc.supabase.co'
const supabaseAnonKey = 'sb_publishable_zGTp7NxZ9D978Ah6hnjctA_RAKzvz0e'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)