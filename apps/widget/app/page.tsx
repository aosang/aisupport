"use client"
import { useVapi } from '@/modules/widget/hooks/use-vapi'
import { Button } from '@workspace/ui/components/button'

export default function Page() {
  const { startCall, endCall, isConnected, isConnecting, isSpeaking, transcript } = useVapi()

  return (
    <div className="flex flex-col min-h-svh items-center justify-center max-w-md mx-auto w-full">
      <Button onClick={() => startCall()}>Start call</Button>
      <Button onClick={() => endCall()} variant="destructive">End call</Button>
      <p>isConnected: {`${isConnected}`}</p>
      <p>isConnecting: {`${isConnecting}`}</p>
      <p>isSpeaking: {`${isSpeaking}`}</p>
      <p>transcript: {JSON.stringify(transcript, null, 2)}</p>
    </div>
  )
}
