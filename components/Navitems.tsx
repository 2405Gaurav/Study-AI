"use client";
import { cn } from '@/lib/utils';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const navitems = [
    { label: 'Home', href: '/' },
    { label: 'Companion', href: '/companion' },
    { label: 'My Journey', href: '/my-journey' },
    { label: 'Sign Up', href: '/sign-in' }, // Added this since it was in your original Navbar
]

function Navitems() {
    const pathname=usePathname()
    return (
        <div className='flex items-center gap-8'>
            {navitems.map(({ label, href }) => (
                <Link 
                    href={href} 
                    key={label}
                    className={cn(pathname === href && 'text-primary font-semibold')}>
                
                    {label}
                </Link>
            ))}
        </div>
    )
}

export default Navitems