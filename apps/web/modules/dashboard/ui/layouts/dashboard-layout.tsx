import { AuthGuard } from "@/modules/auth/ui/components/auth-guard"
import { DashboardSidebar } from "@/modules/dashboard/components/dashboard-sidebar"
import { OrganizationGuard } from "@/modules/auth/ui/components/organization-guard"
import { SidebarProvider } from "@workspace/ui/components/sidebar"
import { cookies } from 'next/headers'

export const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies()
  const sidebarCookie = cookieStore.get("sidebar_state")?.value
  // 无 cookie 时默认展开；仅有明确写入 "false" 时才折叠（与 shadcn SidebarProvider 默认一致）
  const defaultOpen = sidebarCookie === undefined ? true : sidebarCookie === "true"

  return (
    <AuthGuard>   
      <OrganizationGuard>
        <SidebarProvider defaultOpen={defaultOpen}>
          <DashboardSidebar />
          <main className="flex flex-col flex-1">
            {children}
          </main>
        </SidebarProvider>
      </OrganizationGuard>
    </AuthGuard>
  )
}