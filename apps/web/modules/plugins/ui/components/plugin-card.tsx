import { ArrowLeftRightIcon, type LucideIcon, PlugIcon  } from "lucide-react";

import Image from "next/image";
import { Button } from "@workspace/ui/components/button";

export interface Feature {
  icon: LucideIcon
  label: string
  description: string
}

interface PluginCardProps {
  serviceName: string,
  serviceImage: string,
  features: Feature[],
  isDisabled?: boolean,
  onSubmit: () => void
}

export const PluginCard = ({
  serviceName,
  serviceImage,
  features,
  isDisabled,
  onSubmit,
} : PluginCardProps) => {
  return (
    <div className="h-fit w-full rounded-lg border bg-background p-8">
      <div className="flex items-center mb-6 justify-center gap-6">
        <div className="flex felx-col items-center">
          <Image 
            alt={serviceName}
            className="rounded object-contain"
            height={40}
            width={40}
            src={serviceImage}
          />
        </div>

        <div className="flex flex-col items-center gap-1">
          <ArrowLeftRightIcon />
        </div>

        <div className="flex felx-col items-center">
          <Image 
            alt="Plantform"
            className="object-contain"
            height={40}
            width={40}
            src="/mylogo.svg"
          />
        </div>
      </div>

      <div className="mb-6 text-center">
        <div className="text-lg">
          <span>
            Connect your {serviceName} account
          </span>
        </div>
      </div>

      <div className="mb-6">
        <div className="space-y-4">
          {features.map((feature) => (
            <div className="flex items-center gap-3" key={feature.label}>
              <div className="flex size-8 items-center justify-center rounded-lg border bg-muted">
                <feature.icon className="size-4 text-muted-foreground" />
              </div>
              <div>
                <div className="font-medium text-sm">{feature.label}</div>
                <div className="text-muted-foreground text-xs">{feature.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center">
        <Button
          className="h-10 w-full gap-2"
          disabled={isDisabled}
          onClick={onSubmit}
          variant="default"
        >
          Connect
          <PlugIcon className="size-4" />
        </Button>
      </div>
    </div>
  )
}