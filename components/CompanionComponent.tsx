'use client'

import { useEffect, useState } from 'react'
import { subjects } from '@/constants'
import { cn, getSubjectColor } from '@/lib/utils'
import { vapi } from '@/lib/vapi.sdk'

// Enum for call status
enum CallStatus {
  INACTIVE = "INACTIVE",
  ACTIVE = "ACTIVE",
  CONNECTING = "CONNECTING",
  FINISHED = "FINISHED"
}

// Optional: If CompanionComponentProps is not defined elsewhere
type CompanionComponentProps = {
  companionID: string
  userName: string
  userImage: string
  subject: string
  style?: string
  vioce?: string
}

function CompanionComponent({ companionID, userName, userImage, subject, style, vioce }: CompanionComponentProps) {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE)
  const [isSpeaking, setIsSpeaking] = useState(false)

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE)
    const onCallEnd = () => setCallStatus(CallStatus.FINISHED)
    const onMessage = () => console.log('message')
    const onError = (error: Error) => console.log(error)
    const onSpeechStart = () => setIsSpeaking(true)
    const onSpeechEnd = () => setIsSpeaking(false)

    vapi.on('call-start', onCallStart)
    vapi.on('call-end', onCallEnd)
    vapi.on('message', onMessage)
    vapi.on('error', onError)
    vapi.on('speech-start', onSpeechStart)
    vapi.on('speech-end', onSpeechEnd)

    return () => {
      vapi.off('call-start', onCallStart)
      vapi.off('call-end', onCallEnd)
      vapi.off('message', onMessage)
      vapi.off('error', onError)
      vapi.off('speech-start', onSpeechStart)
      vapi.off('speech-end', onSpeechEnd)
    }
  }, []) // <-- Add dependency array

  return (
    <section className='flex flex-col h-[70vh]'>
      <section className='flex gap-8 max-sm:flex-col'>
        <div className='border-2 border-orange-500 w-2/3 max-sm:w-full flex flex-col gap-4 justify-center items-center rounded-lg'>
          <div
            className='size-[300px] flex items-center justify-center rounded-lg max-sm:size-[100px] mt-4'
            style={{ backgroundColor: getSubjectColor(subject) }}
          >
            <div className={cn('absolute', 'transition-opacity', 'duration-1000')}>
              {/* Some animated content here */}
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}

export default CompanionComponent
