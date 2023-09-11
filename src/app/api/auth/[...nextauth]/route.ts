import NextAuth from 'next-auth'
import Email from 'next-auth/providers/email'

const handler = NextAuth({
  providers: [
    Email({
      from: `${process.env.NEXT_PUBLIC_APP_NAME} <noreply@withdustin.com>`,
      sendVerificationRequest({ identifier: email, url }) {},
    }),
  ],
})

export { handler as GET, handler as POST }
