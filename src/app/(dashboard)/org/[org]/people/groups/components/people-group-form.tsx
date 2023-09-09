'use client'

import { ReactNode, type FC } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { ContentGroup } from '@/components/ui/content-group'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { type OrgPermission } from '@/lib/services/org-member-group'

import OrgPermissionsField from './org-permissions-field'

/* cSpell:disable */
const formSchema = z.object({
  name: z
    .string()
    .describe('Tên nhóm')
    .nonempty('Tên nhóm không được để trống')
    .min(3, { message: 'Tên nhóm phải có ít nhất 3 ký tự' })
    .max(50, { message: 'Tên nhóm không được quá 50 ký tự' }),
  description: z
    .string()
    .describe('Mô tả')
    .max(200, { message: 'Mô tả không được quá 200 ký tự' })
    .optional(),
})
/* cSpell:enable */

export type PeopleGroupFormValues = z.infer<typeof formSchema>

/* eslint-disable no-unused-vars */
export type PeopleGroupFormProps = {
  defaultValues?: Partial<PeopleGroupFormValues>
  onSubmit: (values: PeopleGroupFormValues) => void | Promise<void>
  children: (props: { fields: ReactNode }) => ReactNode
  permissions: Record<string, OrgPermission>
}
/* eslint-enable no-unused-vars */

const PeopleGroupForm: FC<PeopleGroupFormProps> = ({
  defaultValues,
  onSubmit,
  children,
  permissions,
}) => {
  const form = useForm<PeopleGroupFormValues>({
    defaultValues: {
      name: '',
      description: '',
      ...defaultValues,
    },
    resolver: zodResolver(formSchema),
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {children({
          fields: (
            <div className="flex flex-col gap-6 lg:gap-8">
              <ContentGroup title="Thông tin nhóm">
                <div className="flex flex-1 flex-col gap-3 lg:gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tên nhóm</FormLabel>
                        <FormControl>
                          <Input
                            autoFocus
                            {...field}
                            placeholder="VD: Marketing, Nhân sự, Kỹ thuật viên, ..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mô tả</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Mô tả sơ lược về nhóm thành viên"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </ContentGroup>

              <ContentGroup
                subtitle="Chọn các quyền mà nhóm thành viên này có thể thực hiện"
                title="Phân quyền"
              >
                <OrgPermissionsField permissions={permissions} />
              </ContentGroup>
            </div>
          ),
        })}
      </form>
    </Form>
  )
}

PeopleGroupForm.displayName = 'PeopleGroupForm'

export default PeopleGroupForm
