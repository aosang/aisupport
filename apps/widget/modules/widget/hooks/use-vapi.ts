import Vapi from "@vapi-ai/web";
import { useEffect, useState } from "react";

interface TranscriptMessage {
  role: 'user' | 'assistant',
  text: string
}

export const useVapi = () => {
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);

  useEffect(() => {
    // only for testing the vapi key, otherwise customers will provide their own IDs
    const vapiInstance = new Vapi('b90cf887-dcd6-421e-b21d-4763901a8e8d')
    setVapi(vapiInstance);

    vapiInstance.on('call-start', () => {
      setIsConnected(false)
      setIsConnecting(false)
      setTranscript([])
    })

    vapiInstance.on('call-end', () => {
      setIsConnected(false)
      setIsConnecting(false)
      setIsSpeaking(false)
    })

    vapiInstance.on('speech-start', () => {
      setIsSpeaking(true)
    })

    vapiInstance.on('speech-end', () => {
      setIsSpeaking(false)
    })

    vapiInstance.on('error', (error) => {
      console.error(error, 'Vapi error')
      setIsConnecting(false)
    })

    vapiInstance.on('message', (message) => {
      if(message.type === 'transcript' && message.transcriptType === 'final') {
        setTranscript((prev) => [
          ...prev,
          {
            role: message.role === 'user' ? 'user' : 'assistant',
            text: message.transcript,
          }
        ])
      }
    })

    return () => {
      vapiInstance?.stop()
    }

  }, [])

  const startCall = () => {
    setIsConnecting(true)
    if(vapi) { 
      // only for testing the vapi key, otherwise customers will provide their own IDs
      vapi.start('7bff405b-5c04-4a7b-9210-2cb1d93e8b7d')
    }
  }

  const endCall = () => {
    if(vapi) { 
      vapi.stop()
    }
  }

  return {
    isSpeaking,
    isConnecting,
    isConnected,
    transcript,
    startCall,
    endCall
  }
}