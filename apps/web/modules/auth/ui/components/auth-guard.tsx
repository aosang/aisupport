"use client"

import { useAuth } from "@clerk/nextjs"
import { AuthLayout } from "../layouts/auth-layout"
import { SignInView } from "../views/sign-in-view"
import Image from "next/image"

export const AuthGuard = ({children}: {children: React.ReactNode}) => {
  const { isLoaded, isSignedIn } = useAuth()

  if (!isLoaded) {
    return (
      <AuthLayout>
        <Image width={36} height={36} alt="logo" src="/mylogo.svg" className="mb-1" />
        <p>Loading...</p>
      </AuthLayout>
    )
  }

  if (!isSignedIn) {
    return (
      <AuthLayout>
        <SignInView />
      </AuthLayout>
    )
  }

  return <>{children}</>
}