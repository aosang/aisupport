"use client"
import { WidgetHeader } from "@/modules/widget/ui/components/widget-header"
import { Button } from "@workspace/ui/components/button"
import { useAtomValue, useSetAtom } from "jotai"
import { ArrowLeftIcon, MenuIcon } from 'lucide-react'
import { contactSessionIdAtomFamily, conversationIdAtom, organizationIDAtom, screenAtom } from "../../atoms/widget-atoms"
import { useQuery } from "convex/react"
import { api } from "@workspace/backend/_generated/api"

export const WidgetChatScreen = () => {
  const setScreen = useSetAtom(screenAtom)
  const setConversationId = useSetAtom(conversationIdAtom)

  const conversationId = useAtomValue(conversationIdAtom)
  const organizationID = useAtomValue(organizationIDAtom)
  const contactSessionId = useAtomValue(
    contactSessionIdAtomFamily(organizationID || "")
  )
  const conversation = useQuery(
    api.public.conversations.getOne,
    conversationId && contactSessionId
    ? {
        conversationId,
        contactSessionId,
    } : "skip"
  )

  const onBack = () => {
    setConversationId(null)
    setScreen("selection")
  }

  return (
    <>
      <WidgetHeader className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <Button
            onClick={onBack}
            size="icon"
            variant="transparent"
          >
            <ArrowLeftIcon />
          </Button>
          <p>Chat</p>
        </div>
        <Button size="icon" variant="transparent">
          <MenuIcon />
        </Button>
      </WidgetHeader>
      <div className="flex flex-1 flex-col gap-y-4 p-4">
        <p className="text-sm">
          {JSON.stringify(conversation)}
        </p>
      </div>
    </>
  )
} 