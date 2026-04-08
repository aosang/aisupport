"use client"
import { useAtomValue } from "jotai"
import { WidgetAuthScreen } from "@/modules/widget/ui/screens/widget-auth-screen"
import { WidgetErrorScreen } from "@/modules/widget/ui/screens/widget-error-screen"
import { WidgetLoadingScreen } from "@/modules/widget/ui/screens/widget-loading-screen"
import { WidgetChatScreen } from "@/modules/widget/ui/screens/widget-chat-screen"
import { WidgetSelectionScreen } from "@/modules/widget/ui/screens/widget-selection-screen"
import { WidgetInboxScreen } from "@/modules/widget/ui/screens/widget-inbox-screen"
import { screenAtom } from "@/modules/widget/atoms/widget-atoms"
import { WidgetVoiceScreen } from "../screens/widget-voice-screen"
import { WidgetContactScreen } from "../screens/widget-contact-screen"

interface Props {
  organizationID: string | null
}

export const WidgetView = ({ organizationID }: Props) => {
  const screen = useAtomValue(screenAtom)

  const screenComponents = {
    error: <WidgetErrorScreen />,  
    loading: <WidgetLoadingScreen organizationID={organizationID} />,
    voice: <WidgetVoiceScreen />,
    auth: <WidgetAuthScreen />,
    inbox: <WidgetInboxScreen />,
    chat: <WidgetChatScreen />,
    contact: <WidgetContactScreen />,
    selection: <WidgetSelectionScreen />
  }

  return (
    <main className="flex h-full w-full flex-col overflow-hidden rounded-xl border bg-muted">
      {screenComponents[screen]}
    </main>
  )
}