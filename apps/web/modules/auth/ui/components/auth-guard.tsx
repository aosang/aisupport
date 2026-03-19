"use client"

import { useAuth } from "@clerk/nextjs"
import { AuthLayout } from "../layouts/auth-layout"
import { SignInView } from "../views/sign-in-view"

export const AuthGuard = ({children}: {children: React.ReactNode}) => {
  const { isLoaded, isSignedIn } = useAuth()

  if (!isLoaded) {
    return (
      <AuthLayout>
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