import { generateComponents } from '@uploadthing/react'
import { generateReactHelpers } from '@uploadthing/react/hooks'

import { UploadthingRouter } from '../../app/api/uploadthing/core'

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<UploadthingRouter>()

export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<UploadthingRouter>()
