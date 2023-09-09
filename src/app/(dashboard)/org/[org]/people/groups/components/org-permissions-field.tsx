import { type FC } from 'react'

import { Checkbox } from '@/components/ui/checkbox'
import { type OrgPermission } from '@/lib/services/org-member-group'

export type OrgPermissionsFieldProps = {
  permissions: Record<string, OrgPermission>
  prefix?: string
}

const OrgPermissionsField: FC<OrgPermissionsFieldProps> = ({
  permissions,
  prefix = '',
}) => {
  return (
    <div className="flex flex-col gap-2">
      {Object.entries(permissions).map(
        ([permission, { description, children }]) => (
          <div key={permission}>
            <div className="items-top flex gap-2">
              <Checkbox id={permission} />
              <div className="grid gap-1.5 leading-none">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor={permission}
                >
                  {description}
                </label>
                <p className="font-mono text-xs text-muted-foreground">
                  {permission.replace(RegExp(`^${prefix}:`), '')}
                </p>
              </div>
            </div>
            {children && (
              <div className="mt-2 pl-6">
                <OrgPermissionsField
                  permissions={children}
                  prefix={permission}
                />
              </div>
            )}
          </div>
        ),
      )}
    </div>
  )
}

OrgPermissionsField.displayName = 'OrgPermissionsField'

export default OrgPermissionsField
