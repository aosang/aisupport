"use client"
import { WidgetView } from "@/modules/widget/ui/views/widget-view"
import { use } from "react"

interface Porps {
  searchParams: Promise<{ organizationID: string }>
}

 const Page = ({searchParams}: Porps) => {
  const {organizationID} = use(searchParams)
  return (
    <WidgetView organizationID={organizationID} />
  )
}

export default Page
