import { AuthGuard } from "@/modules/auth/ui/components/auth-guard"
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboard-sidebar"
import { OrganizationGuard } from "@/modules/auth/ui/components/organization-guard"
import { SidebarProvider } from "@workspace/ui/components/sidebar"
import { cookies } from 'next/headers'
import { Provider } from "jotai"

export const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies()
  const sidebarCookie = cookieStore.get("sidebar_state")?.value
  
  const defaultOpen = sidebarCookie === undefined ? true : sidebarCookie === "true"

  return (
    <AuthGuard>   
      <OrganizationGuard>
      <Provider>
        <SidebarProvider className="h-svh overflow-hidden" defaultOpen={defaultOpen}>
          <DashboardSidebar />
          <main className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-muted">
            {children}
          </main>
        </SidebarProvider>
      </Provider>
      </OrganizationGuard>
    </AuthGuard>
  )
}