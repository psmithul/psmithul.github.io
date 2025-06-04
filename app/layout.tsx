import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import React from 'react'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://thinkifylabs.com'),
  title: 'Thinkify Labs - Tech Hiring Simplified',
  description: 'Simplifying tech hiring for startups and engineers. Connect with top talent and exciting opportunities.',
  keywords: 'tech hiring, startups, engineers, recruitment, remote work',
  authors: [{ name: 'Thinkify Labs' }],
  openGraph: {
    title: 'Thinkify Labs - Tech Hiring Simplified',
    description: 'Simplifying tech hiring for startups and engineers',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thinkify Labs - Tech Hiring Simplified',
    description: 'Simplifying tech hiring for startups and engineers',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KVFT42X8');`
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-KVFT42X8"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        
        {children}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#fff',
              color: '#374151',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '500',
            },
            success: {
              iconTheme: {
                primary: '#50E3C2',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  )
} 