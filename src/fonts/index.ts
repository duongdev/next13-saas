import { Manrope } from 'next/font/google'
import localFont from 'next/font/local'

export const sansFont = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

export const titleFont = localFont({
  src: './assets/CalSans-SemiBold.otf',
  variable: '--font-title',
  weight: '600',
  display: 'swap',
})

export const monoFont = localFont({
  src: './assets/DMMono-Medium.woff',
  display: 'swap',
  variable: '--font-mono',
})
