"use client"

import {
  type LucideIcon,
  BookOpenIcon,
  BotIcon,
  GemIcon,
  MicIcon,
  PaletteIcon,
  PhoneIcon,
  UsersIcon,
} from "lucide-react"

import { useRouter } from "next/navigation"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { cn } from "@workspace/ui/lib/utils"

interface Feature {
  icon: LucideIcon
  label: string
  description: string
}

interface PremiumFeatureOverlayProps {
  children: React.ReactNode
  /** 未订阅时底部主按钮文案 */
  ctaLabel?: string
  className?: string
}

const features: Feature[] = [
  {
    icon: BotIcon,
    label: "AI Customer Support",
    description: "Intelligent automated response 24/7",
  },
  {
    icon: MicIcon,
    label: "AI Voice Agent",
    description: "Natural voice conversations with customers",
  },
  {
    icon: PhoneIcon,
    label: "Phone System",
    description: "Inbound & outbound calling capabilities",
  },
  {
    icon: BookOpenIcon,
    label: "Knowledge Base",
    description: "Train AI on your documentation",
  },
  {
    icon: UsersIcon,
    label: "Team Access",
    description: "Up to 5 operators per organization",
  },
  {
    icon: PaletteIcon,
    label: "Widget Customization",
    description: "Customize your chat widget appearance",
  },
]

export const PremiumFeatureOverlay = ({
  children,
  ctaLabel = "View Plans",
  className,
}: PremiumFeatureOverlayProps) => {
  const router = useRouter()

  return (
    <div
      className={cn(
        "relative flex min-h-0 w-full min-w-0 flex-1 flex-col",
        className,
      )}
    >
      {/* 背景：模糊占位，避免未订阅时空白过扁 */}
      <div
        aria-hidden
        className="pointer-events-none min-h-[min(420px,55vh)] select-none blur-[1.5px] opacity-90"
      >
        {children}
      </div>

      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-b from-background/80 via-background/60 to-muted/80"
      />
      <div aria-hidden className="absolute inset-0 bg-black/45 backdrop-blur-[3px]" />

      <div className="absolute inset-0 z-40 flex items-center justify-center overflow-y-auto p-4 sm:p-6">
        <Card className="w-full max-w-md border border-border/80 bg-card shadow-xl sm:max-w-lg">
          <CardHeader className="space-y-3 border-b border-border/60 pb-4 text-center">
            <div className="flex justify-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-muted/80">
                <GemIcon className="size-6 text-primary" />
              </div>
            </div>
            <CardTitle className="text-xl font-semibold tracking-tight sm:text-2xl">
              Premium Feature
            </CardTitle>
            <CardDescription className="text-balance text-sm leading-relaxed text-muted-foreground">
              This feature requires a Pro subscription.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5 pt-5">
            <ul className="max-h-[min(52vh,420px)] space-y-4 overflow-y-auto pr-1 sm:max-h-none sm:overflow-visible">
              {features.map((feature) => (
                <li key={feature.label}>
                  <div className="flex gap-3 text-left">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-md border border-border bg-muted/40">
                      <feature.icon className="size-4 text-muted-foreground" />
                    </div>
                    <div className="min-w-0 flex-1 space-y-0.5">
                      <p className="text-sm font-semibold leading-snug text-foreground">
                        {feature.label}
                      </p>
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <Button
              className="h-11 w-full rounded-lg text-base font-semibold shadow-sm"
              size="lg"
              onClick={() => router.push("/billing")}
            >
              {ctaLabel}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
