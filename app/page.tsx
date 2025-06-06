import React from 'react'
import CompanionCard from "@/components/CompanionCard"
import CompanionList from '@/components/CompanionList'
import CTA from '@/components/CTA'
import { recentSessions } from '@/constants'

const Page = () => {
  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className='text-2xl underline mb-6'>Popular Companions</h1>

      <section className='home-section mb-8'>
        <CompanionCard
          id="1"
          subject="science"
          name="Neura the Brainy Explorer"
          topic="Neural Network of the Brain"
          duration={45}
          color="#E5D0FF"
        />
        <CompanionCard
          id="2"
          subject="maths" 
          name="Countsy the Number Wizard"
          topic="Derivatives & Integrals"
          duration={30}
          color="#FFDA6E"
        />
        <CompanionCard
          id="3"
          subject="English Literature"
          name="Verba the Vocabulary Builder"
          topic="English Literature"
          duration={30}
          color="#BDE7FF"
        />
      </section>

      <section className='home-section'>
        <CompanionList 
        title="Recently completed Sessions"
        companions={recentSessions}
        classNames="w-2/3 max-lg:w-full"
        />
        <CTA />
      </section>
    </main>
  )
}

export default Page