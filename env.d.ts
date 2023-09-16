/* eslint-disable no-unused-vars */
namespace NodeJS {
  interface ProcessEnv {
    VERCEL_URL?: string

    NEXT_PUBLIC_APP_NAME: string
    NEXT_PUBLIC_SITE_URL: string
    RESEND_API_KEY: string
    NEXTAUTH_URL: string
    NEXTAUTH_SECRET: string
    UPLOADTHING_SECRET: string
    UPLOADTHING_APP_ID: string
  }
}
