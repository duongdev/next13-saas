import { Metadata } from 'next'
import { Suspense, type FC } from 'react'

import { Container } from '@/components/ui/container'
import { ContentGroup } from '@/components/ui/content-group'
import { PageHeader } from '@/components/ui/page-header'

import DeleteOrg from './components/delete-org'
import OrgSettingsForm from './components/org-settings-form'

export const metadata: Metadata = {
  title: 'Cài đặt tổ chức',
  description: 'Cài đặt thông tin chung của tổ chức',
}

export type OrgGeneralSettingsPageProps = {}

const OrgGeneralSettingsPage: FC<OrgGeneralSettingsPageProps> = () => {
  return (
    <Container>
      <PageHeader
        subtitle={metadata.description as string}
        title={metadata.title as string}
      />

      <div className="flex flex-col gap-5 lg:gap-7">
        <ContentGroup
          subtitle="Chọn một logo cho tổ chức của bạn. Kích thước khuyến cáo là 256×256px."
          title="Logo"
        >
          Logo
        </ContentGroup>

        <ContentGroup title="Thông tin chung">
          <Suspense fallback={null}>
            <OrgSettingsForm />
          </Suspense>
        </ContentGroup>

        <ContentGroup title="Xoá tổ chức">
          <p className="mb-4 text-sm text-muted-foreground">
            Xoá hoàn toàn tổ chức sẽ xoá tất cả các dữ liệu của tổ chức, không
            thể khôi phục.
          </p>
          <DeleteOrg />
        </ContentGroup>
      </div>
    </Container>
  )
}

OrgGeneralSettingsPage.displayName = 'OrgGeneralSettingsPage'

export default OrgGeneralSettingsPage
