import { createNextRouteHandler } from 'uploadthing/next'

import { uploadthingRouter } from '@/app/api/uploadthing/core'

// Export routes for Next App Router
export const { GET, POST } = createNextRouteHandler({
  router: uploadthingRouter,
})
