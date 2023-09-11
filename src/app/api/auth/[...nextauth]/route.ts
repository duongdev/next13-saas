import NextAuth from 'next-auth'
import Email from 'next-auth/providers/email'
import { Resend } from 'resend'

import MagicLinkEmail from '@/components/emails/magic-link'

const resend = new Resend(process.env.RESEND_API_KEY)

const handler = NextAuth({
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
})

export { handler as GET, handler as POST }
