import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@workspace/ui/components/resizable"
import { ConversationsPanel } from "../components/conversations-panel"

export const ConversationsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ResizablePanelGroup
      className="flex h-full min-h-0 flex-1 overflow-hidden"
      orientation="horizontal"
    >
      <ResizablePanel className="min-h-0" defaultSize="30%" minSize="20%" maxSize="30%">
        <ConversationsPanel />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel className="h-full min-h-0 overflow-hidden" defaultSize="70%">
        {children}
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}