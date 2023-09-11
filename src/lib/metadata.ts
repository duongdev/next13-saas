import { Metadata } from 'next'

export async function getMetadata(
  metadata: Metadata | (() => Promise<Metadata>),
): Promise<Metadata> {
  const metadataObject =
    typeof metadata === 'function' ? await metadata() : metadata
  return {
    ...metadataObject,
    title: `${metadataObject.title} | ${process.env.NEXT_PUBLIC_APP_NAME}`,
  }
}
