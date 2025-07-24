'use client';

import { useEffect, useRef, useState } from 'react';
import { cn, configureAssistant, getSubjectColor } from '@/lib/utils';
import { vapi } from '@/lib/vapi.sdk';
import Image from 'next/image';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import soundwaves from '@/constants/soundwaves.json';
import { addToSessionHistory } from '@/lib/actions/companion.actions';

enum CallStatus {
  INACTIVE = 'INACTIVE',
  CONNECTING = 'CONNECTING',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
}

const CompanionComponent = ({
  companionId,
  subject,
  topic,
  name,
  userName,
  userImage,
  style,
  voice,
}: CompanionComponentProps) => {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (isSpeaking) {
      lottieRef.current?.play();
    } else {
      lottieRef.current?.stop();
    }
  }, [isSpeaking]);

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);

    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
      addToSessionHistory(companionId);
    };

    const onMessage = (message: Message) => {
      if (message.type === 'transcript' && message.transcriptType === 'final') {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [newMessage, ...prev]);
      }
    };

    const handleSpeechStart = () => setIsSpeaking(true);
    const handleSpeechEnd = () => setIsSpeaking(false);
    const handleError = (err: Error) => console.error('Vapi Error:', err);

    vapi.on('call-start', onCallStart);
    vapi.on('call-end', onCallEnd);
    vapi.on('message', onMessage);
    vapi.on('speech-start', handleSpeechStart);
    vapi.on('speech-end', handleSpeechEnd);
    vapi.on('error', handleError);

    return () => {
      vapi.off('call-start', onCallStart);
      vapi.off('call-end', onCallEnd);
      vapi.off('message', onMessage);
      vapi.off('speech-start', handleSpeechStart);
      vapi.off('speech-end', handleSpeechEnd);
      vapi.off('error', handleError);
    };
  }, [companionId]);

  const toggleMicrophone = () => {
    const newMuted = !vapi.isMuted();
    vapi.setMuted(newMuted);
    setIsMuted(newMuted);
  };

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);

    const assistantOverrides = {
      variableValues: { subject, topic, style },
      clientMessages: ['transcript'],
      serverMessages: [],
    };

    // @ts-expect-error - vapi.start is not typed
    vapi.start(configureAssistant(voice, style), assistantOverrides);
  };

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Main Session Interface */}
      <div className="flex flex-col h-[70vh] space-y-8">
        {/* Top Section - User and Companion */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center justify-items-center">
          {/* Companion Side */}
          <div className="flex flex-col items-center space-y-6 w-full max-w-sm">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
              <p className="text-gray-600 text-sm">AI Learning Companion</p>
            </div>
            
            <div
              className="relative size-44 flex items-center justify-center rounded-2xl shadow-lg transition-all duration-300"
              style={{ backgroundColor: getSubjectColor(subject) }}
            >
              {/* Subject Icon */}
              <Image
                src={`/icons/${subject}.svg`}
                alt={subject}
                width={120}
                height={120}
                className={cn(
                  'absolute transition-all duration-500 transform',
                  callStatus === CallStatus.ACTIVE ? 'opacity-0 scale-75' : 'opacity-100 scale-100',
                  callStatus === CallStatus.CONNECTING && 'animate-pulse'
                )}
              />
              {/* Soundwave animation */}
              <div
                className={cn(
                  'absolute transition-all duration-500',
                  callStatus === CallStatus.ACTIVE ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                )}
              >
                <Lottie
                  lottieRef={lottieRef}
                  animationData={soundwaves}
                  autoplay={false}
                  loop
                  className="w-40 h-40"
                />
              </div>
            </div>

            {/* Call Status Indicator */}
            <div className="flex items-center space-x-2">
              <div
                className={cn(
                  'w-3 h-3 rounded-full transition-colors duration-300',
                  callStatus === CallStatus.ACTIVE
                    ? 'bg-green-500 animate-pulse'
                    : callStatus === CallStatus.CONNECTING
                    ? 'bg-yellow-500 animate-pulse'
                    : 'bg-gray-300'
                )}
              />
              <span className="text-sm font-medium text-gray-600">
                {callStatus === CallStatus.ACTIVE
                  ? 'Connected'
                  : callStatus === CallStatus.CONNECTING
                  ? 'Connecting...'
                  : callStatus === CallStatus.FINISHED
                  ? 'Session Ended'
                  : 'Ready to Connect'}
              </span>
            </div>
          </div>

          {/* User Side */}
          <div className="flex flex-col items-center space-y-6 w-full max-w-sm">
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold text-gray-900">{userName}</h3>
              <p className="text-gray-600 text-sm">Student</p>
            </div>
            
            <div className="relative">
              <Image
                src={userImage}
                alt={userName}
                width={120}
                height={120}
                className="rounded-full border-4 border-white shadow-lg"
              />
              {callStatus === CallStatus.ACTIVE && (
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex flex-col space-y-3 w-full">
              {/* Microphone Toggle */}
              <button
                onClick={toggleMicrophone}
                disabled={callStatus !== CallStatus.ACTIVE}
                className={cn(
                  'flex items-center justify-center gap-3 border-2 rounded-xl px-4 py-3 transition-all duration-200',
                  callStatus === CallStatus.ACTIVE
                    ? 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                    : 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-50'
                )}
              >
                <Image
                  src={isMuted ? '/icons/mic-off.svg' : '/icons/mic-on.svg'}
                  alt="microphone"
                  width={20}
                  height={20}
                />
                <span className="text-sm font-medium">
                  {isMuted ? 'Unmute' : 'Mute'}
                </span>
              </button>

              {/* Main Call Button */}
              <button
                onClick={callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall}
                className={cn(
                  'rounded-xl px-6 py-4 text-white font-semibold text-base transition-all duration-200 transform hover:scale-105 active:scale-95',
                  callStatus === CallStatus.ACTIVE
                    ? 'bg-red-500 hover:bg-red-600 shadow-red-200'
                    : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200',
                  callStatus === CallStatus.CONNECTING && 'animate-pulse cursor-not-allowed transform-none hover:scale-100',
                  'shadow-lg'
                )}
                disabled={callStatus === CallStatus.CONNECTING}
              >
                {callStatus === CallStatus.ACTIVE
                  ? '🔴 End Session'
                  : callStatus === CallStatus.CONNECTING
                  ? '⏳ Connecting...'
                  : '🎙️ Start Session'}
              </button>
            </div>
          </div>
        </div>

        {/* Transcript Section */}
        <div className="flex-1 min-h-0">
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                📝 Session Transcript
              </h3>
              {messages.length > 0 && (
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {messages.length} messages
                </span>
              )}
            </div>
            
            <div className="relative flex-1 overflow-hidden rounded-xl border-2 border-gray-200 bg-gradient-to-b from-gray-50 to-white shadow-inner">
              <div className="h-full overflow-y-auto p-6 space-y-4 custom-scrollbar">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl">💬</span>
                    </div>
                    <p className="text-gray-500 text-lg font-medium">Ready for conversation</p>
                    <p className="text-gray-400 text-sm max-w-md">
                      Your conversation transcript will appear here once you start the session
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={cn(
                          'flex gap-3 p-4 rounded-xl transition-all duration-200 hover:shadow-sm',
                          message.role === 'assistant'
                            ? 'bg-blue-50 border border-blue-100'
                            : 'bg-green-50 border border-green-100'
                        )}
                      >
                        <div className={cn(
                          'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold',
                          message.role === 'assistant'
                            ? 'bg-blue-500 text-white'
                            : 'bg-green-500 text-white'
                        )}>
                          {message.role === 'assistant' ? '🤖' : '👤'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-gray-900">
                              {message.role === 'assistant'
                                ? name.split(' ')[0].replace(/[.,]/g, '')
                                : userName}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <p className="text-gray-700 leading-relaxed break-words">
                            {message.content}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Gradient fade at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 #f1f5f9;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
};

export default CompanionComponent;