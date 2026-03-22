"use client"
import { WidgetHeader } from "../components/widget-header"
import { WidgetFooter } from "../components/widget-footer"

interface Props {
  orgnizationID: string
}

export const WidgetView = ({ orgnizationID }: Props) => {
  return (
    <main className="min-h-screen min-w-screen flex h-full w-full flex-col overflow-hidden rounded-xl border bg-muted">
      <WidgetHeader>　
        <div className="flex flex-col gap-y-2 justify-center px-2 py-6">
          <p className="text-3xl">Hi there! ✋</p>
          <p className="text-lg">How can we help you today?</p>
        </div>
      </WidgetHeader>
      <div className="flex flex-1">
        Wiget View: {orgnizationID}
      </div>
      <WidgetFooter />
    </main>
  )
}