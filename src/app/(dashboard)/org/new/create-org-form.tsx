'use client'
import { useRouter } from 'next/navigation'
import { useEffect, type FC } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  setErrors,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { createOrg } from '@/lib/actions/org'
import { CreateOrgFormValues, zCreateOrg } from '@/lib/schemas/org'
import { slugify } from '@/lib/utils'

export type CreateOrgFormProps = {}

const CreateOrgForm: FC<CreateOrgFormProps> = () => {
  const { replace } = useRouter()
  const { toast } = useToast()

  const form = useForm({
    resolver: zodResolver(zCreateOrg),
    defaultValues: {
      name: '',
      namespace: '',
    },
  })

  const handleCreateOrg = async (values: CreateOrgFormValues) => {
    const { data, errors } = await createOrg(values)

    if (errors) {
      setErrors(form.setError, errors)
    }

    if (data) {
      toast({
        title: 'Tạo tổ chức thành công',
        description: 'Đang chuyển hướng đến trang quản lý tổ chức...',
      })
      replace(`/org/${data.namespace}`)
    }
  }

  const name = form.watch('name')

  useEffect(() => {
    if (form.getFieldState('namespace').isDirty) return
    form.setValue('namespace', slugify(name))
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleCreateOrg)}>
        <div className="flex flex-1 flex-col gap-3 lg:gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên tổ chức</FormLabel>
                <FormControl>
                  <Input autoFocus placeholder="Slay with Dustin" {...field} />
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
                      className="w-full border-none bg-background !outline-none"
                      placeholder="withDustin"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.formState.errors.root && (
            <Alert variant="destructive">
              {form.formState.errors.root.message}
            </Alert>
          )}
          <div className="mt-2 lg:mt-0">
            <Button
              loading={form.formState.isSubmitting}
              type="submit"
              disabled={
                !form.formState.isValid && form.formState.submitCount > 0
              }
            >
              Tiếp tục
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

CreateOrgForm.displayName = 'CreateOrgForm'

export default CreateOrgForm
