'use client'
import { useRef, type FC, useState, ChangeEvent } from 'react'

import LoadingCircle from '@/components/icons/loading-circle'
import OrgLogo from '@/components/org-logo'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { useCurrentOrgMembership } from '@/lib/hooks/use-current-org-membership'
import { useUploadThing } from '@/lib/uploadthing'
import { cn } from '@/lib/utils'

export type OrgLogoUpdateProps = {}

const OrgLogoUpdate: FC<OrgLogoUpdateProps> = () => {
  const { toast } = useToast()
  const orgMembership = useCurrentOrgMembership()
  const inputRef = useRef<HTMLInputElement>(null)
  const [fileUrl, setFileUrl] = useState<string | null>(
    orgMembership?.org.logoUrl ?? null,
  )

  const { startUpload, isUploading } = useUploadThing('orgLogoUploader', {
    onClientUploadComplete: (uploadedFiles) => {
      if (!orgMembership?.org) return

      const uploadedFile = uploadedFiles?.[0]
      if (!uploadedFile) return

      if (fileUrl?.startsWith('blob')) URL.revokeObjectURL(fileUrl)

      setFileUrl(uploadedFile.url)
      toast({
        title: 'Cập nhật logo thành công',
      })
    },
  })

  const handleSelectFile = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files?.[0]) {
      return
    }

    if (fileUrl?.startsWith('blob')) URL.revokeObjectURL(fileUrl)
    setFileUrl(URL.createObjectURL(files[0]))

    startUpload([files[0]], { orgId: orgMembership?.orgId! })
  }

  if (!orgMembership) {
    return null
  }

  const { org } = orgMembership

  return (
    <>
      <Input
        accept="image/*"
        className="hidden"
        id="picture"
        ref={inputRef}
        type="file"
        onChange={handleSelectFile}
      />
      <div
        className="group relative h-[120px] w-[120px] cursor-pointer overflow-hidden rounded-lg lg:h-[160px] lg:w-[160px]"
        onClick={() => inputRef.current?.click()}
      >
        <OrgLogo
          className="h-full w-full text-[40px] lg:text-[60px]"
          org={{ ...org, logoUrl: fileUrl }}
        />

        <div
          className={cn(
            'absolute bottom-0 left-0 right-0 top-0 z-10 hidden bg-slate-200 opacity-75 group-hover:block dark:bg-slate-500',
            {
              block: isUploading,
            },
          )}
        />
        <div className="absolute left-0 top-0 z-10 hidden h-full w-full place-items-center font-title text-xl group-hover:grid">
          Thay đổi
        </div>

        {isUploading && (
          <div className="absolute bottom-0 left-0 right-0 top-0 z-10 grid place-items-center">
            <LoadingCircle className="h-[80px] w-[80px]" />
          </div>
        )}
      </div>
    </>
  )
}

OrgLogoUpdate.displayName = 'OrgLogoUpdate'

export default OrgLogoUpdate
