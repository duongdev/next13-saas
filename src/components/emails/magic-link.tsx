import { type FC } from 'react'

import { Html } from '@react-email/html'
import { Link } from '@react-email/link'

export type MagicLinkEmailProps = {
  url: string
  expiresIn: string
}

const MagicLinkEmail: FC<MagicLinkEmailProps> = ({ url, expiresIn }) => {
  return (
    <Html lang="en">
      <p>
        Hey, bạn có thể đăng nhập vào tài khoản tại{' '}
        {process.env.NEXT_PUBLIC_APP_NAME} bằng cách click vào link bên dưới.
      </p>
      <Link href={url}>{url}</Link>
      <p>Link sẽ hết hạn trong {expiresIn}.</p>
    </Html>
  )
}

MagicLinkEmail.displayName = 'MagicLinkEmail'

export default MagicLinkEmail
