import './globals.css'

import type { Metadata } from 'next'

import { titleFont, monoFont, sansFont } from '@/fonts'

import Providers from './providers'

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME,
  description: 'Slayyyyyyyy',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      suppressHydrationWarning
      className={`${sansFont.variable} ${titleFont.variable} ${monoFont.variable} overflow-hidden antialiased`}
      lang="vi"
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
