"use client"
import { WidgetAuthScreen } from "@/modules/widget/ui/screens/widget-auth-screen"
// import { WidgetFooter } from "../components/widget-footer"

interface Props {
  organizationID: string
}

export const WidgetView = ({ organizationID }: Props) => {
  return (
    <main className="min-h-screen min-w-screen flex h-full w-full flex-col overflow-hidden rounded-xl border bg-muted">
      <WidgetAuthScreen />
      {/* <WidgetFooter /> */}
    </main>
  )
}