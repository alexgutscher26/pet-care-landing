import './globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Pet Care - Your Pet Management Solution',
    template: '%s | Pet Care'
  },
  description: 'Pet Care helps you manage your pets\' health, schedules, and important information all in one place. Track vaccinations, appointments, and more.',
  keywords: ['pet care', 'pet management', 'pet health', 'pet tracking', 'veterinary appointments', 'pet records'],
  authors: [{ name: 'Pet Care Team' }],
  creator: 'Pet Care',
  publisher: 'Pet Care',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://petcare.com',
    siteName: 'Pet Care',
    title: 'Pet Care - Your Pet Management Solution',
    description: 'Pet Care helps you manage your pets\' health, schedules, and important information all in one place.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Pet Care - Your Pet Management Solution'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pet Care - Your Pet Management Solution',
    description: 'Pet Care helps you manage your pets\' health, schedules, and important information all in one place.',
    images: ['/twitter-image.jpg'],
    creator: '@petcare'
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: 'your-google-site-verification',
  },
  category: 'Pet Management'
}

import ClientLayout from '@/components/client-layout'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
