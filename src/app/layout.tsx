/* eslint-disable no-unused-vars */

import Navbar from '@/components/Navbar'
import Providers from '@/components/Providers';
import { cn } from '@/lib/utils'
import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast';
import { ToastContainer } from 'react-toastify';

export const metadata = {
  title: 'Reddit 2.0',
  description: 'A Reddit clone built with Next.js and TypeScript.',
}

const inter = Inter({
  subsets: ['latin']
})

export default function RootLayout({
  children,
  authModel
}: {
  children: React.ReactNode,
  authModel: React.ReactNode
}) {
  return (
    <html lang='en' className={cn('bg-white text-slate-900 antialiased light', inter.className)}>
      <body className='min-h-screen pt-12 bg-slate-50 antialiased'>
        <Providers>
         
          <Navbar />
          {authModel}
          <div className='container max-w-7xl mx-auto h-full pt-12'>
            {children}
          </div>
        </Providers>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
        <ToastContainer />
      </body>
    </html>
  )
}
