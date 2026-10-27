import { NextRequest, NextResponse } from 'next/server'
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
])

const isOrgFreeRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/org-selection(.*)",
])

function redirectTo(path: string, req: NextRequest, extra?: Record<string, string>) {
  const url = new URL(path, req.url)
  if (extra) {
    for (const [key, value] of Object.entries(extra)) {
      url.searchParams.set(key, value)
    }
  }
  return NextResponse.redirect(url, {
    headers: { "Cache-Control": "private, no-store" },
  })
}

export default clerkMiddleware(async (auth, req: NextRequest) => {
  if (isPublicRoute(req)) return

  const { userId, orgId } = await auth()

  if (!userId) {
    return redirectTo("/sign-in", req, { redirect_url: req.url })
  }

  if (!orgId && !isOrgFreeRoute(req)) {
    return redirectTo("/org-selection", req, { redirectUrl: req.url })
  }
})

export const config = {
  matcher: [
    '/((?!_next|monitoring|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
