import { revalidatePath } from 'next/cache'

import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { utapi } from 'uploadthing/server'
import { z } from 'zod'

import { getSession } from '../../../lib/auth'

const f = createUploadthing()

const auth = async (_req: Request) => {
  const session = await getSession()

  return session ?? null
} // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const uploadthingRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  orgLogoUploader: f({ image: { maxFileSize: '1MB' } })
    .input(z.object({ orgId: z.string() }))
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req, input }) => {
      // This code runs on your server before upload
      const session = await auth(req)

      // If you throw, the user will not be able to upload
      if (!session) throw new Error('Unauthorized')

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { session, input }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const { orgId } = metadata.input
      console.log('Upload complete for userId:', metadata.session.user.id)
      console.log('File url', file.url)

      const org = await prisma.org.findUnique({
        where: { id: orgId },
      })

      if (!org) throw new Error('Không tìm thấy tổ chức')

      // Delete the old logo if it exists
      if (org.logoFileKey) {
        try {
          await utapi.deleteFiles(org.logoFileKey)
        } catch (error) {
          console.warn(
            `Unable to delete existing org logo ${org.logoFileKey}`,
            error,
          )
        }
      }

      // Update the org with the new logo
      await prisma.org.update({
        where: { id: orgId },
        data: {
          logoFileKey: file.key,
          logoUrl: file.url,
        },
      })

      // Revalidate the org page
      revalidatePath(`/org/${org.namespace}`)
    }),
} satisfies FileRouter

export type UploadthingRouter = typeof uploadthingRouter
