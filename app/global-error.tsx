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
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-blue-50 flex items-center justify-center px-4">
          <div className="text-center">
            <div className="mb-8">
              <h1 className="text-6xl font-bold text-gradient mb-4">500</h1>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Something went wrong</h2>
              <p className="text-gray-600 mb-8 max-w-md">
                We&apos;re sorry, but something unexpected happened. Please try again.
              </p>
            </div>
            
            <div className="space-x-4">
              <button
                onClick={() => reset()}
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary-500 to-orange-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-glow transition-all duration-300 transform hover:scale-105"
              >
                Try Again
              </button>
              
              <a
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-accent-500 to-blue-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-blue-glow transition-all duration-300 transform hover:scale-105"
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