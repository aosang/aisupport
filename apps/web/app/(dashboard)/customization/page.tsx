import { Show } from "@clerk/nextjs"
import { PremiumFeatureOverlay } from "@/modules/billing/ui/components/premium-feature-overlay"
import { CustomizationView } from "@/modules/customization/ui/views/customization-view"

const Page = () => {
  return (
    <Show 
      when={(has) => has({ plan: "pro" })}
      fallback={
        <PremiumFeatureOverlay> 
          <CustomizationView />
        </PremiumFeatureOverlay>
      }
    >
      <CustomizationView />
    </Show>
  )
}

export default Page