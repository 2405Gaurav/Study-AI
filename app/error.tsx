'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-orange-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-orange-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Something went wrong!</h2>
        <p className="text-gray-600 mb-8">
          We encountered an error while rendering this page. This might be due to a connection issue or a temporary problem.
        </p>
        {error.digest && (
          <p className="text-xs text-gray-400 mb-6">
            Error Digest: <span className="font-mono">{error.digest}</span>
          </p>
        )}
        <div className="flex flex-col gap-4">
          <Button
            onClick={() => reset()}
            className="bg-gradient-to-r from-orange-600 to-amber-700 hover:from-orange-700 hover:to-amber-800 text-white py-6 rounded-xl font-bold"
          >
            Try again
          </Button>
          <Button
            variant="outline"
            onClick={() => window.location.href = '/'}
            className="border-orange-200 text-orange-700 hover:bg-orange-50 py-6 rounded-xl font-bold"
          >
            Go to Home
          </Button>
        </div>
      </div>
    </div>
  )
}
