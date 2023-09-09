import { type NavMenuProps } from '@/components/navigation/nav-menu'

export async function getOrgNavMenu(org: string): Promise<NavMenuProps[]> {
  return [
    {
      label: 'Dashboard',
      icon: 'Home',
      href: `/org/${org}`,
    },
    {
      label: 'Thành viên',
      icon: 'User',
      items: [
        {
          label: 'Danh sách thành viên',
          href: `/org/${org}/people`,
        },
        {
          label: 'Quản lý nhóm',
          href: `/org/${org}/people/groups`,
          matchChildren: [`/org/${org}/people/groups/create`],
        },
        {
          label: 'Cài đặt',
          href: `/org/${org}/people/settings`,
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
  ]
}
