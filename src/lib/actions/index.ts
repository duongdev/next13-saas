import { ErrorOption, FieldPath, FieldValues } from 'react-hook-form'
import { z } from 'zod'

import { Session, getSession } from '../auth'

export interface ActionResponse<
  Data = any,
  TFieldValues extends FieldValues = FieldValues,
> {
  errors?: Partial<
    Record<FieldPath<TFieldValues> | `root.${string}` | 'root', ErrorOption>
  >
  data?: Data | null
}

type SchemaType<T extends FieldValues = FieldValues> =
  | z.ZodObject<T>
  | z.ZodEffects<z.ZodObject<T>>

/**
 * Create an action handler. This function is used to create a handler for
 * `useForm`'s `handleSubmit` function.
 */
export function action<
  Data = any,
  Schema extends SchemaType<FieldValues> = SchemaType<FieldValues>,
  Values extends FieldValues = z.TypeOf<Schema>,
>(
  {
    schema,
    skipValidation = false,
    session: sessionOptions = {},
  }: {
    schema?: Schema
    skipValidation?: boolean
    session?: {
      required?: true
      orgId?: string
    }
  },
  handler: (_args: {
    values: Values
    session: Session | null
    $session: NonNullable<Session>
  }) => Promise<ActionResponse<Data, Values>>,
) {
  return async (values: Values): Promise<ActionResponse<Data, Values>> => {
    if (schema && !skipValidation) {
      try {
        values = schema.parse(values) as Values
      } catch (error: any) {
        return {
          errors: {
            ...error.flatten().fieldErrors,
          },
        } as any
      }
    }

    const session = await getSession()

    if (sessionOptions.required && !session) {
      return {
        errors: {
          root: {
            message: 'Bạn cần đăng nhập để thực hiện hành động này.',
          },
        },
      } as any
    }

    if (
      sessionOptions.orgId &&
      !session?.orgMemberships.find(
        (orgMem) => orgMem.orgId === sessionOptions.orgId,
      )
    ) {
      return {
        errors: {
          root: {
            message: 'Bạn không có quyền thực hiện hành động này.',
          },
        },
      } as any
    }

    return handler({ values, session, $session: session! })
  }
}
