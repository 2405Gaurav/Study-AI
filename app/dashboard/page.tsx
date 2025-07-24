import React from 'react'
import Dashboard from '@/components/DashBoard'

// Add this line to force dynamic rendering
export const dynamic = 'force-dynamic'

const page = () => {
  return (
    <div>
      <Dashboard/>
    </div>
  )
}

export default page