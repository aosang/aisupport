"use client"

import * as React from "react"
import { Label as LabelPrimitive } from "radix-ui"

import { cn } from "@workspace/ui/lib/utils"

type LabelRootProps = Omit<
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
  "htmlFor" | "children"
>

export type LabelProps = LabelRootProps & {
  /** Standard `<label htmlFor="...">`; some Radix re-exports use `never` here. */
  htmlFor?: React.LabelHTMLAttributes<HTMLLabelElement>["htmlFor"]
}

function Label({ className, children, ...props }: React.PropsWithChildren<LabelProps>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </LabelPrimitive.Root>
  )
}

export { Label }
