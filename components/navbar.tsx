import Link from 'next/link'
import Image from 'next/image'
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Navitems from "@/components/Navitems"

function Navbar() {
  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between bg-white shadow-md sticky top-0 z-50">
      {/* Logo Section */}
      <Link href="/" className="flex items-center gap-2 cursor-pointer">
        <Image
          src="/images/logo.svg"
          alt="Converso Logo"
          width={44}
          height={44}
        />
        <span className="text-xl font-semibold text-gray-800">Converso</span>
      </Link>

      {/* Navigation and Auth Buttons */}
      <div className="flex items-center gap-6">
        <Navitems />

        <SignedOut>
          <SignInButton>
            <button className="px-4 py-2 text-sm font-medium bg-primary-orange text-white rounded-md hover:bg-orange-600 transition duration-200">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </nav>
  )
}

export default Navbar
