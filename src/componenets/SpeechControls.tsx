// ...new file...
import React from 'react'
import { Mic, Volume2 } from 'lucide-react'

interface Props {
  recording: boolean
  onSpeechInput: () => void
  onSpeakTranslation: () => void
  disabledSpeak: boolean
}

export default function SpeechControls({ recording, onSpeechInput, onSpeakTranslation, disabledSpeak }: Props) {
  return (
    <div className="flex items-center gap-3 mt-3">
      <button
        onClick={onSpeechInput}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${recording
          ? 'bg-red-500 text-white animate-pulse'
          : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200'
        }`}
      >
        <Mic size={18} />
        {recording ? 'Listening...' : 'Speak'}
      </button>

      <button
        onClick={onSpeakTranslation}
        disabled={disabledSpeak}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 transition"
      >
        <Volume2 size={18} />
        Speak Translation
      </button>
    </div>
  )
}