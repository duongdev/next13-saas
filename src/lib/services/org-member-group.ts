import { pick } from 'lodash-es'

export type OrgPermission = {
  description: string
  requires?: string[]
  children?: Record<string, OrgPermission>
}
/* cSpell:disable */
export const ORG_PERMISSIONS: Record<string, OrgPermission> = {
  'org:admin': {
    description: 'Toàn quyền quản trị tổ chức',
    children: {
      info: {
        description: 'Quản lý thông tin tổ chức',
        children: {
          edit: {
            description: 'Sửa thông tin tổ chức',
          },
        },
      },
      member: {
        description: 'Quản lý thành viên tổ chức',
        children: {
          list: {
            description: 'Xem danh sách thành viên',
          },
          create: {
            description: 'Thêm thành viên',
            requires: ['org:admin:member:list'],
          },
          edit: {
            description: 'Sửa thông tin thành viên',
            requires: ['org:admin:member:list'],
          },
          delete: {
            description: 'Xóa thành viên',
            requires: ['org:admin:member:list'],
          },
        },
      },
      'member:group': {
        description: 'Quản lý nhóm thành viên',
        children: {
          list: {
            description: 'Xem danh sách nhóm thành viên',
          },
          create: {
            description: 'Tạo nhóm thành viên',
            requires: ['org:member:group:list'],
          },
          edit: {
            description: 'Sửa nhóm thành viên',
            requires: ['org:member:group:list'],
          },
          delete: {
            description: 'Xóa nhóm thành viên',
            requires: ['org:member:group:list'],
          },
        },
      },
    },
  },
}
/* cSpell:enable */

export function getFlattenPermissionDescription() {
  const result: Record<string, string> = {}
  function flatten(
    permissions: Record<string, any>,
    prefix: string[] = [],
  ): void {
    Object.entries(permissions).forEach(([key, value]) => {
      if (typeof value === 'string') {
        result[
          prefix
            .concat(key)
            .filter((k) => k !== 'description')
            .join(':')
        ] = value
      } else if (key !== 'requires') {
        flatten(value, prefix.concat(key))
      }
    })
  }
  flatten(ORG_PERMISSIONS)
  return result
}

export const PERMISSION_DESCRIPTION = getFlattenPermissionDescription()

export async function flattenPermissions(
  permissions = ORG_PERMISSIONS,
  prefix = '',
) {
  let result: Record<string, OrgPermission> = {}

  for (const [key, value] of Object.entries(permissions)) {
    const path = prefix ? `${prefix}:${key}` : key
    const flattened =
      value.children && Object.values(value.children).length > 0
        ? await flattenPermissions(value.children, path)
        : undefined
    result[path] = {
      ...value,
      ...(flattened
        ? {
            children: flattened,
            requires: [...(value.requires ?? []), ...Object.keys(flattened)],
          }
        : {}),
    }
    result = {
      ...result,
      ...(flattened ?? {}),
    }
  }

  return result
}

export async function getOrgPermissions(_org: string) {
  const permissions = await flattenPermissions(ORG_PERMISSIONS)

  return pick(permissions, [
    'org:admin:info',
    'org:admin:member',
    'org:admin:member:group',
  ])
}
