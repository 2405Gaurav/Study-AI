'use client'
import { subjects } from '@/constants'
import { cn, getSubjectColor } from '@/lib/utils'
import { vapi } from '@/lib/vapi.sdk'
import { useEffect, useState } from 'react'
enum CallStatus{
   INACTIVE="INACTIVE",
   ACTIVE="ACTIVE",
   CONNECTING="CONNECTING",
   FINISHED="FINISHED" 
}



function CompanionComponent({companionID,userName,userImage,subject,style,vioce,}:CompanionComponentProps) {
    const [callStatus,setCallStatus]=useState<CallStatus>(CallStatus.INACTIVE)
    const [isSpeaking,setIsSpeaking]=useState(false)
    useEffect(()=>{
     const onCallStart=()=> setCallStatus(callStatus.ACTIVE)
     const onCallEnd=()=> setCallStatus(callStatus.FINISHED) 
     const onMessage=()=>console.log('message')
     const onError=(error:Error)=>console.log(error)  
     const onSpeechStart=()=>setIsSpeaking(true)
     const onSpeechEnd =()=>setIsSpeaking(false)
     vapi.on(event:'call-start',onCallStart) 
     vapi.on(event:'call-end',onCallEnd) 
     vapi.on(event:'message',onMessage) 
     vapi.on(event:'error',onError) 
     vapi.on(event:'Speech-start',onSpeechStart) 
     vapi.on(event:'Speech-End',onSpeechEnd) 

     return ()=>{
     vapi.off(event:'call-start',onCallStart) 
     vapi.off(event:'call-end',onCallEnd) 
     vapi.off(event:'message',onMessage) 
     vapi.off(event:'error',onError) 
     vapi.off(event:'Speech-start',onSpeechStart) 
     vapi.off(event:'Speech-End',onSpeechEnd)  
     }
    })
    
  return (
    <section className='flex flex-col h-[70vh]'>
        <section className='flex gap-8 max-sm:flex-col'>
            <div className='border-2 border-orange-500 w-2/3 max-sm:w-full flex flex-col gap-4 justify-center items-center rounded-lg'>
            <div className='size-[300px] flex items-center justify-center rounded-lg max-sm:size-[100px] mt-4' style={{backgroundColor:getSubjectColor(subject)}}>
       <div className={cn(...inputs:'absolute transition-opacity duration-1000')}>

       </div>
            </div>
            </div>

        </section>
    </section>
  )
}

export default CompanionComponent