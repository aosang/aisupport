import { Geist, Geist_Mono } from "next/font/google"

import "@workspace/ui/globals.css"
import { Providers } from "@/components/provider"

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  /**
   * 关闭预加载可避免 DevTools “preloaded but not used” 警告（开发模式/HMR 下很常见）。
   * 字体仍会通过 @font-face 正常加载，首屏可能极短暂地用回退字体。
   */
  preload: false,
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  /** 首屏很少用到 mono，避免预加载 woff2 却未在几秒内使用时的控制台警告 */
  preload: false,
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}
    >
      <body className="bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
