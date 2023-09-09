import { Suspense } from 'react'

import SidebarNav from '@/components/navigation/sidebar-nav'

import OrgProfile from './components/org-profile'
import UserProfile from './components/user-profile'

export default function OrgLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { org: string }
}) {
  return (
    <div className="flex min-h-screen overflow-hidden">
      <SidebarNav
        menus={[
          {
            label: 'Dashboard',
            icon: 'Home',
            href: `/org/${params.org}`,
          },
          {
            label: 'Thành viên',
            icon: 'User',
            // href: `./${params.org}/users`,
            items: [
              {
                label: 'Danh sách thành viên',
                href: `/org/${params.org}/members`,
              },
              {
                label: 'Quản lý nhóm',
                href: `/org/${params.org}/members/groups`,
              },
              {
                label: 'Cài đặt',
                href: `/org/${params.org}/members/settings`,
              },
            ],
          },
          {
            label: 'Quản lý tổ chức',
            icon: 'Building2',
            items: [
              {
                label: 'Thông tin tổ chức',
              },
              {
                label: 'Cài đặt chức năng',
                items: [
                  {
                    label: 'Quản lý khách hàng',
                  },
                  {
                    label: 'Đặt lịch dịch vụ',
                  },
                  {
                    label: 'Quản lý tồn kho',
                  },
                  {
                    label: 'Thương mại điện tử',
                  },
                  {
                    label: 'Xây dựng website',
                  },
                ],
              },
              {
                label: 'Tích hợp',
                items: [
                  {
                    label: 'Sapo',
                  },
                  {
                    label: 'Zalo',
                  },
                ],
              },
            ],
          },
        ]}
        orgProfile={
          <Suspense>
            <OrgProfile />
          </Suspense>
        }
        userProfile={
          <Suspense>
            <UserProfile />
          </Suspense>
        }
      />
      <div className="flex min-h-screen flex-1 flex-col">
        <div className="flex-1">{children}</div>

        <div className="w-full px-4 py-2 text-center text-sm font-medium text-muted-foreground md:mx-auto md:max-w-5xl md:py-4">
          Slay &copy; 2023 - v0.0.1 (#13)
        </div>
      </div>
    </div>
  )
}
