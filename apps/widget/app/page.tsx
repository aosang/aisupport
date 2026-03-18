"use client"
import { useMutation, useQuery } from 'convex/react'
import { api } from '@workspace/backend/_generated/api'
import { Button } from '@workspace/ui/components/button'

export default function Page() {
  const users = useQuery(api.users.getMany)
  const add = useMutation(api.users.add)

  return (
    <div className="flex flex-col min-h-svh items-center justify-center">
      <p>app/widget</p>
      <div className='max-w-sm w-full mx-auto gap-y-4 flex flex-col'>
        {JSON.stringify(users, null, 2)}
      </div>
      <Button onClick={() => add()}>Add User</Button>
    </div>
  )
}
