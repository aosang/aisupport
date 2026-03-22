"use client"
import { WidgetView } from "@/modules/widget/ui/views/widget-view"
import { use } from "react"

interface Porps {
  searchParams: Promise<{ orgnizationID: string }>
}

 const Page = ({searchParams}: Porps) => {
  const {orgnizationID} = use(searchParams)
  return (
    <WidgetView orgnizationID={orgnizationID} />
  )
}

export default Page
