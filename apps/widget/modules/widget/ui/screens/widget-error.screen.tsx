"use client"
import { useAtomValue } from "jotai"
import { AlertTriangleIcon  } from "lucide-react"
import { errorMessageAtom } from "@/modules/widget/atoms/widget-atoms"
import { WidgetHeader } from "@/modules/widget/ui/components/widget-header"

export const WidgetErrorScreen = () => {
  const errorMessage = useAtomValue(errorMessageAtom)

  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col gap-y-2 justify-center px-2 py-6">
          <p className="text-3xl">Hi there! ✋</p>
          <p className="text-lg">Let&apos;s get you started</p>
        </div>
      </WidgetHeader>
      <div className="flex flex-1 flex-col items-center justify-center gap-y-4 p-4 text-muted-foreground">
        <AlertTriangleIcon />
        <p className="text-sm">{errorMessage || 'Invaild Configuration'}</p>
      </div>
    </>
  )
} 