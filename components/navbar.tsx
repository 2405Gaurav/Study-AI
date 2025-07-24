import Link from 'next/link'
import Image from 'next/image'
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Navitems from "@/components/Navitems"
import { Menu, X } from "lucide-react"
import { useState } from "react"

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className="w-full px-4 sm:px-6 py-4 flex items-center justify-between bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-100">
      {/* Logo Section */}
      <Link href="/" className="flex items-center gap-2 cursor-pointer group">
        <div className="relative overflow-hidden rounded-xl p-1 bg-gradient-to-r from-orange-400 to-amber-500 shadow-lg group-hover:scale-105 transition-transform duration-300">
          <Image
            src="/images/logo.svg"
            alt="Converso Logo"
            width={36}
            height={36}
            className="relative z-10"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-300 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent group-hover:from-orange-700 group-hover:to-amber-700 transition-all duration-300">
          Converso
        </span>
      </Link>

      {/* Desktop Navigation and Auth Buttons */}
      <div className="hidden md:flex items-center gap-6">
        <Navitems />

        <SignedOut>
          <SignInButton>
            <button className="group relative px-6 py-2.5 text-sm font-semibold bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out" />
              
              {/* Button text */}
              <span className="relative z-10 flex items-center gap-2">
                Sign In
                <div className="w-2 h-2 bg-white/70 rounded-full group-hover:bg-white transition-colors duration-300" />
              </span>
              
              {/* Border glow */}
              <div className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-r from-orange-300/50 to-amber-300/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-300 blur-sm" />
            <UserButton 
              afterSignOutUrl="/" 
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10 ring-2 ring-orange-200 hover:ring-orange-300 transition-all duration-300"
                }
              }}
            />
          </div>
        </SignedIn>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center gap-3">
        <SignedIn>
          <UserButton 
            afterSignOutUrl="/" 
            appearance={{
              elements: {
                avatarBox: "w-9 h-9 ring-2 ring-orange-200"
              }
            }}
          />
        </SignedIn>
        
        <button
          onClick={toggleMobileMenu}
          className="group relative p-2.5 bg-gradient-to-r from-orange-100 to-amber-100 hover:from-orange-200 hover:to-amber-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          aria-label="Toggle mobile menu"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-300/20 to-amber-300/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
          {isMobileMenuOpen ? (
            <X className="w-5 h-5 text-orange-700 relative z-10 group-hover:rotate-90 transition-transform duration-300" />
          ) : (
            <Menu className="w-5 h-5 text-orange-700 relative z-10 group-hover:scale-110 transition-transform duration-300" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-2xl border-t border-gray-100 animate-in slide-in-from-top-2 duration-300">
          <div className="px-4 py-6 space-y-4">
            <div className="pb-4 border-b border-gray-100">
              <Navitems />
            </div>
            
            <SignedOut>
              <SignInButton>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="group relative w-full px-6 py-3 text-base font-semibold bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 overflow-hidden"
                >
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out" />
                  
                  {/* Button text */}
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Sign In
                    <div className="w-2 h-2 bg-white/70 rounded-full group-hover:bg-white transition-colors duration-300" />
                  </span>
                  
                  {/* Border glow */}
                  <div className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-r from-orange-300/50 to-amber-300/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar