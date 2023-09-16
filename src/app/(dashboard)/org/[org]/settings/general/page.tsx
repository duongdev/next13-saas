import { Suspense, type FC } from 'react'

import { Container } from '@/components/ui/container'
import { ContentGroup } from '@/components/ui/content-group'
import { PageHeader } from '@/components/ui/page-header'
import { getMetadata } from '@/lib/metadata'

import DeleteOrg from './delete-org'
import OrgLogoUpdate from './org-logo-update'
import OrgSettingsForm from './org-settings-form'

export const metadata = getMetadata({
  title: 'Cài đặt tổ chức',
  description: 'Cài đặt thông tin chung của tổ chức',
})

export type OrgGeneralSettingsPageProps = {}

const OrgGeneralSettingsPage: FC<OrgGeneralSettingsPageProps> = async () => {
  return (
    <Container>
      <PageHeader
        subtitle="Cài đặt thông tin chung của tổ chức"
        title="Cài đặt tổ chức"
      />

      <div className="flex flex-col gap-5 lg:gap-7">
        <ContentGroup
          subtitle="Chọn một logo cho tổ chức của bạn. Kích thước khuyến cáo là 256×256px."
          title="Logo"
        >
          <Suspense>
            <OrgLogoUpdate />
          </Suspense>
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
