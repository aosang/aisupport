import type { LucideIcon } from "lucide-react"
import { AudioLines, BookOpenText, MessageCircleMore } from "lucide-react"

export interface CardDescriptionProps {
  icon: LucideIcon
  title: string
  subTitle: string
}

export const CardDescription: CardDescriptionProps[] = [
  {
    icon: MessageCircleMore,
    title: "Inbox & conversations",
    subTitle: "Review and reply to customer threads in one shared inbox.",
  },
  {
    icon: BookOpenText,
    title: "Knowledge & content",
    subTitle: "Ground answers in your docs so replies stay accurate and on-brand.",
  },
  {
    icon: AudioLines,
    title: "Voice & integrations",
    subTitle: "Add voice experiences and connect the tools your team already uses.",
  },
]
