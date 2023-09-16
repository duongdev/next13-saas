import { type FC } from 'react'

import BlurImage from '@/components/ui/blur-image'

export type VerifyRequestPageProps = {}

const VerifyRequestPage: FC<VerifyRequestPageProps> = () => {
  return (
    <div className="desktop-transparent grid min-h-screen place-content-center p-4 sm:p-0 md:bg-gray-100 md:dark:bg-default">
      <div className="w-[440px] max-w-[95vw] rounded-lg bg-default p-2 dark:bg-gray-950 sm:p-10 md:border md:p-4">
        <div className="flex flex-col items-center gap-2 text-center">
          <BlurImage
            priority
            alt="cute-dog"
            className="mb-4 h-auto dark:invert"
            height={240}
            src="/assets/illustrations/cute-dog.svg"
            width={240}
          />
          <h4>Đã gửi link đăng nhập</h4>
          <div>Vui lòng kiểm tra email và nhấn vào liên kết để đăng nhập.</div>
        </div>
      </div>
    </div>
  )
}

VerifyRequestPage.displayName = 'VerifyRequestPage'

export default VerifyRequestPage
