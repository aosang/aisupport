import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage 
} 
from "@workspace/ui/components/form";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { WidgetHeader } from "@/modules/widget/ui/components/widget-header";
import { api } from "@workspace/backend/_generated/api";
import { Doc } from "@workspace/backend/_generated/dataModel";
import { useMutation } from 'convex/react'
import { useAtomValue, useSetAtom } from 'jotai';
import { contactSessionIdAtomFamily, organizationIDAtom, screenAtom } from '@/modules/widget/atoms/widget-atoms';

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
})

export const WidgetAuthScreen = () => {
  const setScreen = useSetAtom(screenAtom)

  const organizationID = useAtomValue(organizationIDAtom)
  const setContactSessionId = useSetAtom(
    contactSessionIdAtomFamily(organizationID || "")
  )

  // form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    }
  })

  const createContactSession = useMutation(api.public.contactSessions.create)

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if(!organizationID) {
      return
    }

    const metadata: Doc<"contactSessions">["metadata"] = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      languages: navigator.languages.join(','),
      platform: navigator.platform,
      vendor: navigator.vendor,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      viewportSize: `${window.innerWidth}x${window.innerHeight}`,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timeZoneOffset: new Date().getTimezoneOffset(),
      cookiesEnabled: navigator.cookieEnabled,
      referrer: document.referrer || 'direct',
      currentUrl: window.location.href,
    }

    const contactSessionId = await createContactSession({
      ...values,
      organizationID,
      metadata,
    })

    setContactSessionId(contactSessionId)
    setScreen("selection")
  }

  return (
    <>
      <WidgetHeader>　
        <div className="flex flex-col gap-y-2 justify-center px-2 py-6">
          <p className="text-3xl">Hi there! ✋</p>
          <p className="text-lg">Let&apos;s get you started</p>
        </div>
      </WidgetHeader>
      <Form {...form}>
        <form 
          className='flex flex-1 flex-col gap-y-4 p-4'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className='h-10 bg-background'
                    placeholder='e.g. Miles Wang'
                    type='text'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className='h-10 bg-background'
                    placeholder='e.g. Miles.Wang@example.com'
                    type='email'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button 
            disabled={form.formState.isSubmitting} 
            size='lg' 
            type='submit'
          >
            Continue
          </Button>
        </form> 
      </Form>
    </>
  )
}
