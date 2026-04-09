import { Show } from "@clerk/nextjs"
import { FilesView } from "@/modules/files/ui/views/files-view"
import { PremiumFeatureOverlay } from "@/modules/billing/ui/components/premium-feature-overlay"

const Page = () => {

  return (
    <Show 
      when={(has) => has({ plan: "pro" })}
      fallback={
        <PremiumFeatureOverlay> 
          <FilesView />
        </PremiumFeatureOverlay>
      }
    >
      <FilesView />
    </Show>
  )
}

export default Page