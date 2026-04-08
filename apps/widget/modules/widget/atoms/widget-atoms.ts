import { atom } from "jotai"
import { atomFamily } from 'jotai-family'
import { atomWithStorage } from 'jotai/utils'
import { WidgetScreen } from "@/modules/widget/types"
import { CONTACT_SESSION_KEY } from "../constants"
import { Id, Doc } from '@workspace/backend/_generated/dataModel'

// Basic widget state atoms
export const screenAtom = atom<WidgetScreen>('loading')
export const organizationIDAtom = atom<string | null>(null)

// organization-scoped contact session atom
export const contactSessionIdAtomFamily = atomFamily((organizationID: string) => { 
  return atomWithStorage<Id<'contactSessions'> | null>(`${CONTACT_SESSION_KEY}_${organizationID}`, null)
}) 

// error
export const errorMessageAtom = atom<string | null>(null)
export const loadingMessageAtom = atom<string | null>(null)

export const conversationIdAtom = atom<Id<"conversations"> | null>(null)

export const widgetSettingsAtom = atom<Doc<"widgetSettings"> | null>(null)
export const vapiSecretsAtom = atom<{
  publicApiKey: string
} | null>(null)

export const hasVapiSecretsAtom = atom((get) => get(vapiSecretsAtom) !== null)
