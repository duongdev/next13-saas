import { Suspense } from 'react'

import Zalo from '@/components/icons/zalo'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { authErrors } from '@/lib/auth'
import { getMetadata } from '@/lib/metadata'

import EmailForm from './email-form'

export const metadata = getMetadata({
  title: 'Đăng nhập',
})

export default function SignInPage() {
  return (
    <div className="desktop-transparent grid min-h-screen place-content-center p-4 sm:p-0 md:bg-gray-100 md:dark:bg-default">
      <h4 className="mb-4 text-center font-title">Welcome back</h4>
      <div className="w-[440px] max-w-[95vw] rounded-lg bg-default p-2 dark:bg-gray-950 sm:p-10 md:border md:p-4">
        <div className="flex flex-col gap-2">
          <Suspense fallback={<div>Loading...</div>}>
            <EmailForm authErrors={authErrors} />
          </Suspense>

          <Separator className="my-4" />

          <Button
            disabled
            className="align-center flex"
            type="button"
            variant="outline"
          >
            <span>Đăng nhập bằng</span>{' '}
            <span className="ml-1.5 font-title text-base">Google</span>
          </Button>
          <Button
            disabled
            className="bg-blue-600 hover:bg-blue-500"
            type="button"
            variant="default"
          >
            Đăng nhập bằng
            <Zalo className="ml-1.5 h-8" />
          </Button>
        </div>
      </div>
    </div>
  )
}
