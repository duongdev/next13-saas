'use client'
import Link from 'next/link'

import OrgLogo from '@/components/org-logo'
import SignOut from '@/components/sign-out'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { Session } from '@/lib/auth'
import { useCurrentOrgMembership } from '@/lib/hooks/use-current-org-membership'

import OrgMembers from './org-members'

export default function OrgProfile({ session }: { session: Session }) {
  const currentOrgMembership = useCurrentOrgMembership()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="flex items-center gap-2 overflow-hidden p-1"
          variant="ghost"
        >
          {currentOrgMembership ? (
            <OrgLogo
              className="h-6 w-6 text-xs"
              org={currentOrgMembership.org}
            />
          ) : (
            <div className="grid h-6 w-6 flex-shrink-0 place-items-center rounded-md bg-red-300 p-0.5 font-title text-xs">
              ?
            </div>
          )}
          <div className="truncate">
            {currentOrgMembership?.org.name ?? 'Unknown'}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <OrgMembers
          email={session.user.email}
          orgMemberships={session.orgMemberships}
        />

        <Separator className="my-2" />

        <DropdownMenuItem>Cài đặt tổ chức</DropdownMenuItem>
        <DropdownMenuItem>Mời & quản lý thành viên</DropdownMenuItem>

        <Separator className="my-2" />

        <Link passHref href="/next">
          <DropdownMenuItem className="cursor-pointer">
            Tạo hoặc tham gia tổ chức mới
          </DropdownMenuItem>
        </Link>
        <SignOut>
          <DropdownMenuItem>Đăng xuất</DropdownMenuItem>
        </SignOut>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
