'use server'
import { auth } from "@clerk/nextjs/server"
import { createSupabaseClient } from "../supabase"


export const createCompanion = async (formData: CreateCompanion) => {
    const { userId: author } = await auth()
    const supabase = createSupabaseClient()
    const { data, error } = await supabase
        .from('companions')
        .insert({ ...formData, author })
        .select()
    if (error || !data) throw new Error(error?.message || 'failed to create acompanion')

    return data[0]
}

export const getAllCompanions = async ({ limit = 10, page = 1, subject, topic }: GetAllCompanions) => {
    const supabase = createSupabaseClient()
    
    let query = supabase
        .from('companions')
        .select('*')
    
    // Apply filters based on provided parameters
    if (subject && topic) {
        query = query
            .ilike('subject', `%${subject}%`)
            .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    }
    else if (subject) {
        query = query.ilike('subject', `%${subject}%`)
    }
    else if (topic) {
        query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    }
    
    // Apply pagination
    const from = (page - 1) * limit
    query = query
        .range(from, from + limit - 1)
        .limit(limit)
    
    // Execute query and handle response
    const { data:companions, error } = await query
    
    if (error) {
        throw new Error(`Failed to fetch companions: ${error.message}`)
    }
    
    return companions
}

export const  getCompanion=async(id:string)=>{
    const supabase = createSupabaseClient()
  const {data,error}= await supabase.from('companions').select('*').eq('id',id)
  if(error || !data) throw new Error(error?.message || 'failed to get companion')
  return data[0];

}
    
