'use server'

import { revalidatePath } from 'next/cache'

import { Org, Prisma } from '@prisma/client'

import { zCreateOrg } from '../schemas/org'

import { action } from '.'

export const createOrg = action<Org, typeof zCreateOrg>(
  { schema: zCreateOrg, session: { required: true } },
  async ({ values, $session: { user } }) => {
    try {
      const org = await prisma.org.create({
        data: {
          name: values.name,
          namespace: values.namespace,
          orgMemberships: {
            create: {
              owner: true,
              userId: user.id,
            },
          },
        },
      })

      revalidatePath('/')

      return { data: org }
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          const target = (error.meta as any)?.target
          if (target && target.includes('namespace')) {
            return {
              errors: {
                namespace: {
                  type: 'manual',
                  message: 'Địa chỉ URL này đã được sử dụng.',
                },
              },
            }
          }
        }
      }

      console.error(error)

      return {
        errors: {
          root: {
            message: 'Đã có lỗi xảy ra. Vui lòng thử lại sau.',
          },
        },
      }
    }
  },
)
