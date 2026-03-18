"use client"
import { useQuery, useMutation, Authenticated, Unauthenticated  } from 'convex/react'
import { api } from '@workspace/backend/_generated/api'
import { Button } from '@workspace/ui/components/button'
import { SignInButton, UserButton } from '@clerk/nextjs'

export default function Page() {
  const users = useQuery(api.users.getMany)
  const add = useMutation(api.users.add)

  return (
    <>
      <Authenticated>
        <div className="flex flex-col min-h-svh items-center justify-center">
          <p>app/webs</p>
          <UserButton />
          <div className='max-w-sm w-full mx-auto gap-y-4 flex flex-col'>
            {JSON.stringify(users, null, 2)}
          </div>
          <Button onClick={() => add()}>Add User</Button>
        </div>
      </Authenticated>
      <Unauthenticated>
        <p>Must be logged in to see this</p>
        <SignInButton>Sign In!</SignInButton>
      </Unauthenticated>
    </>
  )
}
