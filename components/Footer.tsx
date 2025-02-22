import { logoutAccount } from '@/lib/action/user.action';
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
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
} from "@/components/ui/alert-dialog"

const Footer = ({ user, type = 'desktop' }: FooterProps) => {
  const router = useRouter();

  const handleLogOut = async () => {
    const response  = await logoutAccount()

    if(response) router.push('/sign-in')

  }

  return (
    <>
    <AlertDialog>
    <footer className="footer">
      <div className={type === 'mobile' ? 'footer_name-mobile' : 'footer_name'}>
        <p className="text-xl font-bold text-gray-700">
          {user?.name[0]}
        </p>
      </div>

      <div className={type === 'mobile' ? 'footer_email-mobile' : 'footer_email'}>
          <h1 className="text-14 truncate text-gray-700 font-semibold">
            {user?.name}
          </h1>
          <p className="text-14 truncate font-normal text-gray-600">
            {user?.email}
          </p>
      </div>

      <AlertDialogTrigger>
      <div className="footer_image" onClick={handleLogOut}>
        <Image src="icons/logout.svg" fill alt="jsm" />
      </div>
      </AlertDialogTrigger>
    </footer>

  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

    </>
  )
}

export default Footer