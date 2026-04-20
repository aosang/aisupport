import { Id } from '@workspace/backend/_generated/dataModel'
import { ConversationIdView } from '@/modules/dashboard/ui/views/conversation-id-view'
import { isLikelyConvexDocumentId } from '@/lib/convex-route-params'
import { notFound } from 'next/navigation'

const Page = async ({
  params
} : {
  params: Promise<{
    conversationId: string
  }>
}) => {
  const { conversationId } = await params

  if (!isLikelyConvexDocumentId(conversationId)) {
    notFound()
  }

  return (
    <ConversationIdView conversationId={conversationId as Id<'conversations'>} />
  )
}

export default Page