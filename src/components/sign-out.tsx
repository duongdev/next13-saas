'use client'
import { ReactNode, type FC, useMemo, useCallback } from 'react'

import { signOut, useSession } from 'next-auth/react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog'

export type SignOutProps = {
  children?: ReactNode
  withConfirmation?: boolean
}

const SignOut: FC<SignOutProps> = ({ children, withConfirmation }) => {
  const { data } = useSession()

  const handleSignOut = useCallback(() => {
    signOut({
      callbackUrl: `/next?source=signed_out&email=${data?.user?.email}`,
    })
  }, [data?.user?.email])

  const signOutButton = useMemo(() => {
    return children ?? <div>Đăng xuất</div>
  }, [children])

  if (withConfirmation) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>{signOutButton}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Đăng xuất tài khoản?</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn đăng xuất tài khoản này?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Không</AlertDialogCancel>
            <AlertDialogAction onClick={handleSignOut}>
              Chắc chắn
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }

  return (
    <div className="font-sans" onClick={handleSignOut}>
      {signOutButton}
    </div>
  )
}

SignOut.displayName = 'SignOut'

export default SignOut
