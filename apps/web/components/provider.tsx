"use client"
import * as React from "react"
import { ConvexReactClient } from "convex/react"
import { ConvexProviderWithClerk } from 'convex/react-clerk'
import { useAuth } from '@clerk/nextjs'
import { TooltipProvider } from "@workspace/ui/components/tooltip"

if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
  throw new Error('Missing NEXT_PUBLIC_CONVEX_URL in your .env file')
}

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      <TooltipProvider>
        <div className="flex h-full min-h-0 flex-col overflow-hidden">
          <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
            {children}
          </div>
        </div>
      </TooltipProvider>
    </ConvexProviderWithClerk>
  )
}