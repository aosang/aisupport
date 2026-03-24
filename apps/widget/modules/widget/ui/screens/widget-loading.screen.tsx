"use client"
import { useAtomValue, useSetAtom } from "jotai"
import { LoaderIcon } from "lucide-react"
import { errorMessageAtom, loadingMessageAtom, screenAtom, organizationIDAtom, contactSessionIdAtomFamily } from "@/modules/widget/atoms/widget-atoms"
import { WidgetHeader } from "@/modules/widget/ui/components/widget-header"
import { useEffect, useState } from "react"
import { useAction, useMutation } from "convex/react"
import { api } from "@workspace/backend/_generated/api"

type InitStep = 'storage' | 'org' | 'session' | 'settings' | 'vapi' | 'done'

export const WidgetLoadingScreen = ({organizationID}: {organizationID: string | null}) => {
  const [step, setStep] = useState<InitStep>('org')
  const [sessionValid, setSessionValid] = useState(false)

  const loadingMessage = useAtomValue(loadingMessageAtom)
  const setOrganizationID = useSetAtom(organizationIDAtom)
  const setLoadingMessage = useSetAtom(loadingMessageAtom)
  const setErrorMessage = useSetAtom(errorMessageAtom)
  const setScreen = useSetAtom(screenAtom)

  const contactSessionId = useAtomValue(contactSessionIdAtomFamily(organizationID || ""))

  // setp1: validdate organization
  const validateOrganization = useAction(api.public.organizations.validate)
  useEffect(() => {
    if (step !== "org") {
      return
    }

    setLoadingMessage("Finding Organization ID")

    if (!organizationID) {
      setErrorMessage("Organization ID is required")
      setScreen("error")
      return
    }

    setLoadingMessage('Verifying Organization...')
    validateOrganization({organizationID})
    .then(result => {
      if(result.valid) {
        setOrganizationID(organizationID)
        setStep('session')
      }else {
        setErrorMessage(result.reason || 'Invalid configuration')
        setScreen('error')
      }
    })
    .catch(() => {
      setErrorMessage('Unable to vertify organization')
      setScreen('error')
    })

  }, [
    step, 
    organizationID, 
    setErrorMessage, 
    setScreen,
    setOrganizationID,
    setStep, 
    validateOrganization,
    setLoadingMessage
  ])

  // step2: Validate session (if exits)
  const validateContactSession = useMutation(api.public.contactSessions.validate)
  useEffect(() => {
    if(step !== 'session') return

    setLoadingMessage("Finding contact session ID")

    if(!contactSessionId) {
      setSessionValid(false)
      setStep('done')
      return
    }
     
    setLoadingMessage('Validating session...')

    validateContactSession({contactSessionID: contactSessionId})
    .then(result => {
      setSessionValid(result.valid)
      setStep('done')
    })
    .catch(() => {
      setSessionValid(false)
      setStep("done")
    })
  }, [step, contactSessionId, validateContactSession, setLoadingMessage])

  useEffect(() => {
    if(step !== 'done') return 

    const hasValidSession = contactSessionId && sessionValid
    setScreen(hasValidSession? 'selection' : 'auth')
  }, [step, sessionValid, contactSessionId, setScreen])
 
  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col gap-y-2 justify-center px-2 py-6">
          <p className="text-3xl">Hi there! ✋</p>
          <p className="text-lg">Let&apos;s get you started</p>
        </div>
      </WidgetHeader>
      <div className="flex flex-1 flex-col items-center justify-center gap-y-4 p-4 text-muted-foreground">
        <LoaderIcon className="animate-spin" />
        <p className="text-sm">{loadingMessage || 'Loading...'}</p>
      </div>
    </>
  )
} 