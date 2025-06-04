import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">Page Not Found</h2>
          <p className="text-gray-500 mb-8 max-w-md">
            Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>
        
        <Link 
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
} 