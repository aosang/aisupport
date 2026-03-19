import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/org-selection(.*)",
])

export default clerkMiddleware(async (auth, req) => {
  const { userId, orgId } = await auth()
  const pathname = req.nextUrl.pathname

  // 未登录访问受保护路由 -> 重定向到 sign-in
  if (!isPublicRoute(req)) {
    await auth.protect()
    // auth.protect() 会处理重定向，若已通过则继续
  }

  // 已登录但无组织，且不在 org-selection -> 重定向到 org-selection
  if (userId && !orgId && !pathname.startsWith("/org-selection")) {
    const redirectUrl = new URL("/org-selection", req.url)
    // 只使用 pathname 作为 redirect_url，避免嵌套
    redirectUrl.searchParams.set("redirect_url", pathname || "/")
    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
})



export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
