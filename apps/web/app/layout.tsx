import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Providers } from "@/components/provider"
import { Toaster } from "@workspace/ui/components/sonner"
import { ClerkProvider } from "@clerk/nextjs"
import "@workspace/ui/globals.css"

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  preload: false,
})

export const metadata: Metadata = {
  title: {
    default: "AISupport",
    template: "%s · AISupport",
  },
  description: "Customer support dashboard and knowledge base for your team.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontMono.variable} h-full font-sans antialiased`}
    >
      <body className="h-full bg-background text-foreground">
      <ClerkProvider
        appearance={{
          variables: {
            colorPrimary: "#3c82f6"
          }
        }}
      >
        <Providers>
          <Toaster />
          {children}
        </Providers>
      </ClerkProvider>
      </body>
    </html>
  )
}
