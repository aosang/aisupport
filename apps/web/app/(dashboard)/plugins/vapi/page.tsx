import { Show } from "@clerk/nextjs"
import { PremiumFeatureOverlay } from "@/modules/billing/ui/components/premium-feature-overlay"
import { VapiView } from "@/modules/plugins/ui/views/vapi-view"

const Page = () => {
  return (
    <Show 
      when={(has) => has({ plan: "pro" })}
      fallback={
        <PremiumFeatureOverlay> 
          <VapiView />
        </PremiumFeatureOverlay>
      }
    >
      <VapiView />
    </Show>
  )
}

export default Page