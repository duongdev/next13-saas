'use client'

import { type ReactNode, type FC } from 'react'

import { SessionProvider } from 'next-auth/react'

import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'

export type ProvidersProps = {
  children: ReactNode
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider enableSystem attribute="class" defaultTheme="system">
      <SessionProvider>
        <main>
          {children}
          <Toaster />
        </main>
      </SessionProvider>
    </ThemeProvider>
  )
}

Providers.displayName = 'Providers'

export default Providers
