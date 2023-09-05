import * as icons from 'lucide-react'
import { type LucideProps } from 'lucide-react'

export type IconName = keyof typeof icons

interface LazyLucidIconProps extends LucideProps {
  name: IconName
}

const LazyLucidIcon = ({ name, ...props }: LazyLucidIconProps) => {
  const Icon = (icons as any)[name] as icons.LucideIcon

  return <Icon {...props} />
}

export default LazyLucidIcon
