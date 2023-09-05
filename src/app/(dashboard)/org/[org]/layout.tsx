import { Suspense } from 'react'

import OrgProfile from './components/org-profile'
import SidebarNav from './components/sidebar-nav'
import UserProfile from './components/user-profile'

export default function OrgLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen overflow-hidden">
      <SidebarNav
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
      <div>{children}</div>
    </div>
  )
}
