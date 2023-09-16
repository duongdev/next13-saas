import { type FC } from 'react'

import FullscreenLoading from '@/components/ui/fullscreen-loading'

export type LoadingProps = {}

const Loading: FC<LoadingProps> = () => {
  return <FullscreenLoading />
}

Loading.displayName = 'Loading'

export default Loading
