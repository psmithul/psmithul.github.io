'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center px-4">
          <div className="text-center">
            <div className="mb-8">
              <h1 className="text-6xl font-bold text-gray-800 mb-4">500</h1>
              <h2 className="text-2xl font-semibold text-gray-600 mb-4">Something went wrong</h2>
              <p className="text-gray-500 mb-8 max-w-md">
                We&apos;re sorry, but something unexpected happened. Please try again.
              </p>
            </div>
            
            <div className="space-x-4">
              <button
                onClick={() => reset()}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
              >
                Try Again
              </button>
              
              <a
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
              >
                Go Home
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
} 