"use client"
import { 
  GlobeIcon,
  PhoneCallIcon,
  PhoneIcon,
  WorkflowIcon
} from "lucide-react"
import {Feature, PluginCard } from "../components/plugin-card"

const vapiFeatures: Feature[] = [{
  icon: GlobeIcon,
  label: "Web voice calls",
  description: "Voice chat directly in your app"
}, {
  icon: PhoneIcon,
  label: "Phone numbers",
  description: "Get dedicated business lines"
}, {
  icon: PhoneCallIcon,
  label: "Outbound calls",
  description: "Automated customer outreach"
}, {
  icon: WorkflowIcon,
  label: "Workflows",
  description: "Custom conversation flows"
}]

export const VapiView = () => {
  return (
    <div className="flex min-h-screen flex-col bg-muted p-8">
      <div className="mx-auto w-full max-w-3xl">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-4xl">Vapo Plugin</h1>
          <p className="text-muted-foreground">Connect Vapi to enable AI voice calls and phone support</p>
        </div>
        <div className="mt-8">
          <PluginCard 
            serviceImage="/vapi.jpg"
            serviceName="vapi"
            features={vapiFeatures}
            isDisabled={false}
            onSubmit={() => {}}
          />
        </div>
      </div>
    </div> 
  )
}