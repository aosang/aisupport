"use client"

import { OrganizationList } from "@clerk/nextjs"
import { useEffect, useState } from "react"

export const OrgSelectionView = () => {
  const [mounted, setMounted] = useState(false)
  const [isReloading, setIsReloading] = useState(true)

  useEffect(() => {
    setMounted(true)
    
    const hasReloaded = sessionStorage.getItem("org_selection_reloaded")
    if (!hasReloaded) {
      sessionStorage.setItem("org_selection_reloaded", "true")
      // 刷新前保持 isReloading 为 true，不渲染组件，避免闪烁
      window.location.reload()
    } else {
      // 已经刷新过了，可以显示组件
      setIsReloading(false)
    }
  }, [])

  useEffect(() => {
    return () => {
      sessionStorage.removeItem("org_selection_reloaded")
    }
  }, [])

  if (!mounted || isReloading) {
    // 在刷新完成前显示一个加载状态，或者直接返回 null 保持空白
    // 这样就不会先看到 Create 弹窗，再闪烁成 Choose 列表了
    return (
      <div className="flex justify-center p-8">
        <p className="text-muted-foreground text-sm animate-pulse">Loading...</p>
      </div>
    )
  }

  return (
    <OrganizationList 
      afterCreateOrganizationUrl="/"
      afterSelectOrganizationUrl="/"
      hidePersonal
      skipInvitationScreen 
    />
  )
}
