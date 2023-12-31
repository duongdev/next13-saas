'use client'
import { useCallback, type FC } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { useCurrentOrgMembership } from '@/lib/hooks/use-current-org-membership'
import { sleep } from '@/lib/utils'

const schema = z.object({
  name: z
    .string()
    .min(3, {
      message: 'Tên tổ chức phải có ít nhất 3 ký tự.',
    })
    .max(20, {
      message: 'Tên tổ chức không được quá 20 ký tự.',
    })
    .nonempty(),
  namespace: z
    .string()
    .nonempty()
    .regex(/^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/, {
      message: 'URL chỉ được chứa chữ cái, số và dấu "-".',
    }),
})

export type OrgSettingsFormValues = z.infer<typeof schema>

export type OrgSettingsFormProps = {
  defaultValues?: Partial<OrgSettingsFormValues>
}

const OrgSettingsForm: FC<OrgSettingsFormProps> = ({ defaultValues }) => {
  const { toast } = useToast()
  const orgMembership = useCurrentOrgMembership()

  const form = useForm<OrgSettingsFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: orgMembership?.org.name || '',
      namespace: orgMembership?.org.namespace || '',
      ...defaultValues,
    },
  })

  const handleUpdate = useCallback(
    async (_values: OrgSettingsFormValues) => {
      await sleep(2000)
      toast({
        title: 'Cập nhật thành công',
        description: 'Thông tin tổ chức đã được cập nhật.',
      })
    },
    [toast],
  )

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleUpdate)}>
        <div className="flex flex-1 flex-col gap-2 lg:gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên tổ chức</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="namespace"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL truy cập</FormLabel>
                <FormControl>
                  <div className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <div className="text-muted-foreground">
                      {process.env.NEXT_PUBLIC_SITE_URL ||
                        process.env.VERCEL_URL}
                      /
                    </div>
                    <input
                      {...field}
                      className="w-full border-none bg-background !outline-none"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="lg:mt-2">
            <Button
              loading={form.formState.isSubmitting}
              type="submit"
              disabled={
                !form.formState.isDirty ||
                (!form.formState.isValid && form.formState.submitCount > 0)
              }
            >
              Lưu thay đổi
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

OrgSettingsForm.displayName = 'OrgSettingsForm'

export default OrgSettingsForm
