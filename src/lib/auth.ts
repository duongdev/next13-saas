import { PrismaAdapter } from '@auth/prisma-adapter'
import { Org, OrgMembership, User } from '@prisma/client'
import { NextAuthOptions, getServerSession } from 'next-auth'
import Email from 'next-auth/providers/email'

import MagicLinkEmail from '@/components/emails/magic-link'
import prisma from '@/lib/prisma'

import { resend } from './resend'

/** Use to translate next-auth errors */
export const authErrors = {
  Verification: 'Liên kết không hợp lệ hoặc đã hết hạn. Vui lòng thử lại.',
} as Record<string, string>

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
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user
      }

      return token
    },
    session: async ({ session, token }) => {
      // @ts-expect-error
      session.user = token.user

      const orgMemberships = await prisma.orgMembership.findMany({
        where: { userId: token.sub },
        include: { org: true },
      })

      // @ts-expect-error
      session.orgMemberships = orgMemberships

      return session
    },
  },
}

export async function getSession() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return null
  }

  return {
    ...(session as any),
    // @ts-expect-error
    orgMemberships: session.orgMemberships || [],
  } as {
    user: User
    orgMemberships: (OrgMembership & {
      org: Org
    })[]
  }
}

export type Session = NonNullable<Awaited<ReturnType<typeof getSession>>>
