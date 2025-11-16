'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import LanguageSelector from '@/componenets/LanguageSelector'
import ToneSelector from '@/componenets/ToneSelector'
import ThemeToggle from '@/componenets/ThemeToggle'
import SpeechControls from '@/componenets/SpeechControls'
import TranslationOutput from '@/componenets/TranslationOutput'
import { speakText } from '@/utils/audio'
import { Sparkles } from 'lucide-react'

interface TranslationResult {
  text: string
  confidence: number
  provider?: string
}

export default function Home() {
  const [sourceText, setSourceText] = useState('')
  const [sourceLang, setSourceLang] = useState('en')
  const [targetLang, setTargetLang] = useState('es')
  const [tone, setTone] = useState('casual')
  const [isLoading, setIsLoading] = useState(false)
  const [translation, setTranslation] = useState<TranslationResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [recording, setRecording] = useState(false)
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition()
        recognition.lang = sourceLang
        recognition.interimResults = false
        recognition.continuous = false

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript
          setSourceText(transcript)
          setRecording(false)
        }

        recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error)
          setError('Speech recognition failed. Try again.')
          setRecording(false)
        }

        recognitionRef.current = recognition
      }
    }
  }, [sourceLang])

  const handleSpeechInput = () => {
    if (!recognitionRef.current) {
      setError('Speech recognition not supported in this browser.')
      return
    }
    if (recording) {
      recognitionRef.current.stop()
      setRecording(false)
    } else {
      setError(null)
      recognitionRef.current.start()
      setRecording(true)
    }
  }

  const handleSpeakTranslation = () => {
    if (!translation?.text) return
    // delegate to utils/audio speakText (handles voice presence and romanization fallback)
    speakText(translation.text, targetLang)
  }

  const handleTranslateClick = async () => {
    setError(null)
    setIsLoading(true)
    setTranslation(null)

    if (!sourceText.trim()) {
      setError('Please enter some text to translate.')
      setIsLoading(false)
      return
    }

    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: sourceText, sourceLang, targetLang, tone }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Translation failed.')

      setTranslation(data)
    } catch (err: any) {
      console.error(err)
      setError(err.message || 'Translation failed.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-start p-6 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-black transition-colors duration-300">
      <div className="w-full max-w-4xl space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-600 dark:text-indigo-400">
            Creative Translator _
          </h1>
          <ThemeToggle />
        </div>

        <section className="glass p-6 rounded-2xl border border-white/20 dark:border-gray-800/50 shadow-xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <label className="text-xs text-gray-600 dark:text-gray-400">Source text</label>
              <textarea
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                rows={8}
                placeholder="Type or speak your text here..."
                className="mt-1 w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-purple-600 transition"
              />

              <SpeechControls
                recording={recording}
                onSpeechInput={handleSpeechInput}
                onSpeakTranslation={handleSpeakTranslation}
                disabledSpeak={!translation}
              />
            </div>

            <aside className="space-y-4">
              <LanguageSelector value={sourceLang} onChange={setSourceLang} label="Source language" />
              <LanguageSelector value={targetLang} onChange={setTargetLang} label="Target language" />
              <ToneSelector value={tone} onChange={setTone} />

              <div className="pt-2">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleTranslateClick}
                  className="flex items-center justify-center gap-2 w-full py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 transition"
                  disabled={isLoading}
                >
                  <Sparkles size={18} />
                  {isLoading ? 'Translating...' : 'Translate'}
                </motion.button>
              </div>
            </aside>
          </div>
        </section>

        <TranslationOutput translation={translation} isLoading={isLoading} error={error} />

        <footer className="text-center text-xs text-gray-500 dark:text-gray-400 pt-4">
          © 2025 Creative Translator — Built with Next.js, Open AI, Tailwind, Framer Motion
        </footer>
      </div>
    </main>
  )
}
