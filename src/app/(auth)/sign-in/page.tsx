import { Metadata } from 'next'
import Link from 'next/link'

import Zalo from '@/components/icons/zalo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

export const metadata: Metadata = {
  title: 'Đăng nhập',
}

export default function SignInPage() {
  return (
    <div className="desktop-transparent grid min-h-screen place-content-center bg-gray-100 dark:bg-default">
      <h4 className="mb-4 text-center font-title">Welcome back</h4>
      <div className="w-full min-w-[400px] rounded-lg border bg-default p-4 dark:bg-gray-950 sm:p-10">
        <form className="flex flex-col gap-2">
          <div className="flex flex-col gap-6">
            <div>
              <Label className="mb-2 block" htmlFor="email">
                Email
              </Label>
              <Input
                autoFocus
                required
                id="email"
                placeholder="Email"
                type="email"
              />
            </div>
            <div>
              <div className="flex justify-between gap-2 align-middle">
                <Label className="mb-2 block" htmlFor="password">
                  Mật khẩu
                </Label>
                <Button asChild size={null} variant="link">
                  <Link href="./reset-password">Quên mật khẩu?</Link>
                </Button>
              </div>
              <Input
                required
                id="password"
                placeholder="••••••••"
                type="password"
              />
            </div>
          </div>
          <Button asChild className="mt-4" type="button">
            <Link href="/org/withDustin">Đăng nhập</Link>
          </Button>

          <Separator className="my-4" />

          <Button className="align-center flex" type="button" variant="outline">
            <span>Đăng nhập bằng</span>{' '}
            <span className="ml-1.5 font-title text-base">Google</span>
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-500"
            type="button"
            variant="default"
          >
            Đăng nhập bằng
            <Zalo className="ml-1.5 h-8" />
          </Button>
        </form>
      </div>
      <Button asChild className="mt-2 text-muted-foreground" variant="link">
        <Link href="./sign-up">Chưa có tài khoản?</Link>
      </Button>
    </div>
  )
}
