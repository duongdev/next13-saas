import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

export default function SignInPage() {
  return (
    <div className="desktop-transparent grid min-h-screen place-content-center bg-gray-100">
      <h4 className="mb-4 text-center">Welcome back</h4>
      <div className="w-full min-w-[400px] rounded-lg border bg-default p-4 sm:p-10">
        <form className="flex flex-col gap-4">
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
            <Label className="mb-2 block" htmlFor="password">
              Mật khẩu
            </Label>
            <Input
              required
              id="password"
              placeholder="••••••••"
              type="password"
            />
          </div>
          <Button className="mt-4" type="submit">
            Đăng nhập
          </Button>

          <Separator className="my-4" />

          <Button variant="outline">Đăng nhập bằng Google</Button>
          <Button className="bg-blue-600 hover:bg-blue-500" variant="default">
            Đăng nhập bằng Zalo
          </Button>
        </form>
      </div>
      <Button asChild className="mt-2 text-muted-foreground" variant="link">
        <Link href="./sign-up">Chưa có tài khoản?</Link>
      </Button>
    </div>
  )
}
