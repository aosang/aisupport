import { Geist, Geist_Mono } from "next/font/google"
import { Providers } from "@/components/provider"
import { ClerkProvider } from '@clerk/nextjs'
import "@workspace/ui/globals.css"

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
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
     <ClerkProvider
        signInUrl="/sign-in"
        signUpUrl="/sign-up"
        signInForceRedirectUrl="/org-selection"
        signUpForceRedirectUrl="/org-selection"
      >
        <Providers>
          {children}
        </Providers>
      </ClerkProvider>
      </body>
    </html>
  )
}
