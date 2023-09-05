import { ExternalLink } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'

import ThemeMenu from './theme-menu'

export default function UserProfile() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-min p-1" variant="ghost">
          <Avatar className="h-6 w-6">
            <AvatarImage src="https://github.com/duongdev.png" />
            <AvatarFallback>DD</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-40">
        <DropdownMenuItem>Xem hồ sơ</DropdownMenuItem>
        <DropdownMenuItem>Cài đặt tài khoản</DropdownMenuItem>

        <Separator className="my-2" />

        <DropdownMenuItem>Trợ giúp</DropdownMenuItem>
        <DropdownMenuItem>
          Lịch sử cập nhật <ExternalLink className="ml-2 w-3.5" />
        </DropdownMenuItem>
        <ThemeMenu />

        <Separator className="my-2" />

        <DropdownMenuItem>Đăng xuất</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
