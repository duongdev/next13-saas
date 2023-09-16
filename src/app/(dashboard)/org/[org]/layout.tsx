import { Suspense } from 'react'

import AuthRedirect from '@/components/auth-redirect'
import SidebarNav from '@/components/navigation/sidebar-nav'
import { getSession } from '@/lib/auth'
import { getOrgNavMenu } from '@/lib/fetchers/org'
import { devDelay } from '@/lib/utils'

import OrgProfile from './components/org-profile'
import UserProfile from './components/user-profile'

export default async function OrgLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { org: string }
}) {
  const session = await devDelay(await getSession(), 2000)

  if (!session?.user) {
    return <AuthRedirect />
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarNav
        menus={await getOrgNavMenu(params.org)}
        orgProfile={
          <Suspense>
            <OrgProfile session={session} />
          </Suspense>
        }
        userProfile={
          <Suspense>
            <UserProfile />
          </Suspense>
        }
      />
      <div className="flex min-h-screen flex-1 flex-col overflow-auto">
        <div className="flex-1">{children}</div>

        <div className="w-full px-4 py-2 text-center text-sm font-medium text-muted-foreground md:mx-auto md:max-w-5xl md:py-4">
          Slay &copy; 2023 - v0.0.1 (#13)
        </div>
      </div>
    </div>
  )
}

OrgLayout.displayName = 'OrgLayout'
