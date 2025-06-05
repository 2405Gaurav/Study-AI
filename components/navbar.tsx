import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import Navitems from "@/components/Navitems"

function Navbar() {
  return (
    <nav className="flex items-center justify-between mx-auto w-full px-14 py-4 bg-white max-sm:px-4">
      <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
        <Image 
          src="/images/logo.svg" 
          alt="Converso logo" 
          width={46} 
          height={46}
          priority
        />
      </Link>
      <Navitems />
    </nav>
  )
}

export default Navbar