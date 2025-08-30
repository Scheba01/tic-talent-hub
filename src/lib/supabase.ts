import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

console.log('Supabase URL:', supabaseUrl ? 'Set' : 'Missing')
console.log('Supabase Key:', supabaseKey ? 'Set' : 'Missing')

if (!supabaseUrl || !supabaseKey) {
  console.error('Environment variables status:', {
    VITE_SUPABASE_URL: supabaseUrl ? 'Available' : 'Missing',
    VITE_SUPABASE_ANON_KEY: supabaseKey ? 'Available' : 'Missing'
  })
  throw new Error('Missing Supabase environment variables. Please ensure Supabase is properly connected to your Lovable project.')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// File upload helper
export const uploadFile = async (bucket: string, path: string, file: File) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false
    })

  if (error) throw error
  return data
}

// Get file URL helper
export const getFileUrl = (bucket: string, path: string) => {
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path)
  
  return data.publicUrl
}