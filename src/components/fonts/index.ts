import { Manrope, Poppins } from 'next/font/google'
import localFont from 'next/font/local'

export const sansFont = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

export const headingFont = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
  weight: ['400', '500', '600', '700'],
})

export const monoFont = localFont({
  src: './assets/DMMono-Medium.woff',
  display: 'swap',
  variable: '--font-mono',
})
