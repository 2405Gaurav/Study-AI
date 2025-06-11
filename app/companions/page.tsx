import React from 'react'
import { getAllCompanions } from '@/lib/actions/companion.actions'
import CompanionCard from '@/components/CompanionCard'
import { getSubjectColor } from '@/lib/utils'
import { SubjectFilter } from '@/components/SubjectFilter'
import { SearchInput } from '@/components/SearchInput'

async function page({searchParams}: SearchParams) {
  const filters=await searchParams
  const subject=filters.subject? filters.subject:"" 
  const topic=filters.topic? filters.topic:""
  const companions=await getAllCompanions({subject,topic}) 
  // console.log(companions)

  return (
   <main>
    <section className='flex justify-center gap-4 max-sm:flex-col'>
      <h1>Companion Library</h1>
      <div className='flex gap-4'>
        <SubjectFilter/>
        <SearchInput/>
      </div>
    </section>
    <section className='flex flex-wrap gap-4 w-full max-md:justify-center justify-between'>
      {companions.map((companion)=>(
        <CompanionCard key={companion.id} {...companion} color={getSubjectColor(companion.subject)}/>
        ))}
    </section>

   </main>
  )
}

export default page
