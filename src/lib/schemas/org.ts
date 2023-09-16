import { z } from 'zod'

export const zOrgName = z
  .string()
  .min(3, {
    message: 'Tên tổ chức phải có ít nhất 3 ký tự.',
  })
  .max(20, {
    message: 'Tên tổ chức không được quá 20 ký tự.',
  })

export const zOrgNamespace = z
  .string()
  .regex(/^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/, {
    message: 'URL chỉ được chứa chữ cái, số và dấu "-".',
  })

export const zCreateOrg = z.object({
  name: zOrgName.nonempty(),
  namespace: zOrgNamespace.nonempty(),
})

export type CreateOrgFormValues = z.infer<typeof zCreateOrg>
