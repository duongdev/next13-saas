'use client'
import { useSearchParams } from 'next/navigation'
import { type FC } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
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

export type EmailFormProps = {}

const formSchema = z.object({
  email: z.string().email({ message: 'Email không hợp lệ' }).optional(),
})

type FormValues = z.infer<typeof formSchema>

const EmailForm: FC<EmailFormProps> = () => {
  const searchParams = useSearchParams()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: searchParams.get('email') ?? '',
    },
  })
  const isSubmitting = form.formState.isSubmitting
  const rootErrorMessage =
    form.formState.errors.root?.message ?? searchParams.get('error')

  const handleSignIn = async ({ email }: FormValues) => {
    const { error } =
      (await signIn('email', {
        email,
        callbackUrl: '/sign-in/next?source=signed_in&provider=email',
      })) ?? {}

    if (error) {
      form.setError('root', { message: error })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSignIn)}>
        <div className="flex flex-1 flex-col gap-2 lg:gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Địa chỉ email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    autoFocus
                    disabled={isSubmitting}
                    placeholder="slay@withdustin.com"
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {rootErrorMessage && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Có lỗi xảy ra</AlertTitle>
              <AlertDescription>{rootErrorMessage}</AlertDescription>
            </Alert>
          )}

          <Button loading={isSubmitting} type="submit">
            Tiếp tục
          </Button>
        </div>
      </form>
    </Form>
  )
}

EmailForm.displayName = 'EmailForm'

export default EmailForm
