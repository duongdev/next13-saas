import './globals.css'

import type { Metadata } from 'next'
import { Suspense } from 'react'

import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin'
import { extractRouterConfig } from 'uploadthing/server'

import { uploadthingRouter } from '@/app/api/uploadthing/core'
import FullscreenLoading from '@/components/ui/fullscreen-loading'
import { titleFont, monoFont, sansFont } from '@/fonts'

import Providers from './providers'

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME,
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
        <NextSSRPlugin routerConfig={extractRouterConfig(uploadthingRouter)} />
        <Suspense fallback={<FullscreenLoading />}>
          <Providers>{children}</Providers>
        </Suspense>
      </body>
    </html>
  )
}
