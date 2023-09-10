'use client'
import { useState, type FC } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
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
import { sleep } from '@/lib/utils'

export type DeleteOrgProps = {}

const formSchema = z.object({
  verificationCode: z.string().nonempty('Vui lòng nhập mã để xác nhận'),
  acknowledged: z.boolean().refine((v) => v, {
    message: 'Vui lòng đồng ý với điều khoản',
  }),
})

export type DeleteOrgFormValues = z.infer<typeof formSchema>

const DeleteOrg: FC<DeleteOrgProps> = () => {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  const form = useForm<DeleteOrgFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      verificationCode: '',
      acknowledged: false,
    },
  })

  const handleDelete = async ({ verificationCode }: DeleteOrgFormValues) => {
    await sleep(2000)
    if (verificationCode !== 'delete') {
      form.setError('verificationCode', {
        type: 'value',
        message: 'Mã xác nhận không đúng',
      })
      form.setValue('acknowledged', false)
      form.setFocus('verificationCode')
      return
    }

    toast({
      title: 'Đã yêu cầu xoá tổ chức thành công',
      description:
        'Tổ chức sẽ được xoá hoàn toàn. Thời gian xoá có thể mất 1-2 giờ tuỳ vào số lượng dữ liệu.',
    })
    form.reset()
    setOpen(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <Form {...form}>
        <AlertDialogTrigger asChild>
          <Button className="font-title" variant="destructive">
            Xoá tổ chức
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(handleDelete)}
          >
            <AlertDialogHeader>
              <AlertDialogTitle>Xác nhận yêu cầu xoá tổ chức</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription>
              <p>
                Nếu bạn chắc chắn về việc xoá tổ chức <b>Slay with Dustin</b>{' '}
                này, vui lòng tiếp tục bên dưới.
              </p>
              <p className="mt-2">
                Tất cả dữ liệu của tổ chức sẽ bị xoá hoàn toàn và không thể khôi
                phục.
              </p>
            </AlertDialogDescription>

            <FormField
              control={form.control}
              name="verificationCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Nhập mã xác nhận đã được gửi đến{' '}
                    <b>dustin.do95@gmail.com</b>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Mã xác nhận xoá tổ chức" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="acknowledged"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md bg-destructive/10 p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked)
                      }}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">
                    Tôi đã được thông báo và hiểu rằng tất cả dữ liệu của tổ
                    chức sẽ bị xoá hoàn toàn và không thể khôi phục.
                  </FormLabel>
                </FormItem>
              )}
            />

            <AlertDialogFooter>
              <AlertDialogCancel
                className="font-title"
                disabled={form.formState.isSubmitting}
              >
                Huỷ
              </AlertDialogCancel>
              <Button
                className="font-title"
                loading={form.formState.isSubmitting}
                type="submit"
                variant="destructive"
                disabled={
                  !form.formState.isDirty ||
                  (!form.formState.isValid && form.formState.submitCount > 0)
                }
              >
                Tiếp tục
              </Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </Form>
    </AlertDialog>
  )
}

DeleteOrg.displayName = 'DeleteOrg'

export default DeleteOrg
