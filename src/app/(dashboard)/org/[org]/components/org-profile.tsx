'use client'
import Link from 'next/link'

import { Check } from 'lucide-react'

import SignOut from '@/components/sign-out'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'

export default function OrgProfile() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="flex items-center gap-2 overflow-hidden p-1"
          variant="ghost"
        >
          <div className="grid h-6 w-6 flex-shrink-0 place-items-center rounded-md bg-red-300 p-0.5 font-title text-xs">
            WD
          </div>
          <div className="truncate">withDustin</div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuLabel className="font-title">
          dustin.do95@gmail.com
        </DropdownMenuLabel>
        <DropdownMenuItem>
          <div className="flex w-full items-center gap-2">
            <div className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-red-300 p-0.5 font-title text-xs">
              WD
            </div>
            <div className="flex-1 truncate">withDustin</div>
            <Check className="w-4 text-primary" />
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="flex w-full items-center gap-2">
            <div className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-teal-600 p-0.5 font-title text-[0.65rem] text-primary-foreground">
              TLM
            </div>
            <div className="flex-1 truncate">Thích Làm Mộc</div>
          </div>
        </DropdownMenuItem>

        <DropdownMenuLabel className="font-title">
          dustin.do@coderschool.vn
        </DropdownMenuLabel>
        <DropdownMenuItem>
          <div className="flex w-full items-center gap-2">
            <div className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-red-500 p-0.5 font-title text-[0.65rem] text-primary-foreground">
              CSP
            </div>
            <div className="flex-1 truncate">CoderSchool Platform</div>
          </div>
        </DropdownMenuItem>

        <Separator className="my-2" />

        <DropdownMenuItem>Cài đặt tổ chức</DropdownMenuItem>
        <DropdownMenuItem>Mời & quản lý thành viên</DropdownMenuItem>

        <Separator className="my-2" />

        <Link passHref href="/next">
          <DropdownMenuItem className="cursor-pointer">
            Tạo hoặc tham gia tổ chức mới
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem>Thêm tài khoản</DropdownMenuItem>
        <SignOut>
          <DropdownMenuItem>Đăng xuất</DropdownMenuItem>
        </SignOut>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
