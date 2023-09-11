import { PrismaAdapter } from '@auth/prisma-adapter'
import { NextAuthOptions } from 'next-auth'
import Email from 'next-auth/providers/email'

import MagicLinkEmail from '@/components/emails/magic-link'
import prisma from '@/lib/prisma'

import { resend } from './resend'

export const authOptions: NextAuthOptions = {
  providers: [
    Email({
      from: `${process.env.NEXT_PUBLIC_APP_NAME} <noreply@withdustin.com>`,
      maxAge: 15 * 60, // 15 minutes
      async sendVerificationRequest({
        identifier: email,
        url,
        provider: { from },
      }) {
        try {
          await resend.emails.send({
            from,
            to: email,
            subject: 'Đăng nhập vào tài khoản của bạn',
            react: MagicLinkEmail({ url, expiresIn: '15 phút' }),
            text: `Đăng nhập vào tài khoản của bạn: ${url}`,
          })
        } catch (error) {
          console.log(error)
          throw new Error('Không thể gửi email')
        }
      },
    }),
  ],
  pages: {
    signIn: '/sign-in',
    verifyRequest: '/sign-in/verify-request',
    error: '/sign-in',
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
}

export const authErrors = {
  Verification: 'Liên kết không hợp lệ hoặc đã hết hạn. Vui lòng thử lại.',
} as Record<string, string>
