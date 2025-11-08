'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LanguageSelector from '@/componenets/LanguageSelector'
import ToneSelector from '@/componenets/ToneSelector'
import { Mic, Volume2, Sparkles } from 'lucide-react'
import ThemeToggle from '@/componenets/ThemeToggle'

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

  // 🎙 Initialize Speech Recognition
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
    const utterance = new SpeechSynthesisUtterance(translation.text)
    utterance.lang = targetLang
    speechSynthesis.speak(utterance)
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
         <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-600 dark:text-indigo-400 
               drop-shadow-[0_4px_6px_rgba(0,0,0,0.2)] 
               relative after:content-['✨'] after:absolute after:-right-6 after:top-0 
               tracking-wide animate-pulse">
  Creative Translator _
</h1>


          <ThemeToggle />
        </div>

        {/* Main Card */}
        <section className="glass p-6 rounded-2xl border border-white/20 dark:border-gray-800/50 shadow-xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Input Side */}
            <div className="md:col-span-2">
              <label className="text-xs text-gray-600 dark:text-gray-400">Source text</label>
              <textarea
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                rows={8}
                placeholder="Type or speak your text here..."
                className="mt-1 w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-purple-600 transition"
              />

              <div className="flex items-center gap-3 mt-3">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSpeechInput}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${recording
                    ? 'bg-red-500 text-white animate-pulse'
                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200'
                    }`}
                >
                  <Mic size={18} />
                  {recording ? 'Listening...' : 'Speak'}
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSpeakTranslation}
                  disabled={!translation}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 transition"
                >
                  <Volume2 size={18} />
                  Speak Translation
                </motion.button>

                <div className="ml-auto text-xs text-gray-500 dark:text-gray-400">
                  Powered by GPT-5
                </div>
              </div>
            </div>

            {/* Sidebar Controls */}
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

        {/* Translation Output */}
        <section className="glass p-6 rounded-2xl border border-white/20 dark:border-gray-800/50 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">Translation</h3>
            <div className="text-xs text-gray-500 dark:text-gray-400">Voice + AI Enabled</div>
          </div>

          <div className="mt-4 min-h-[120px] flex items-center justify-center text-center">
            <AnimatePresence mode="wait">
              {isLoading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-gray-500 dark:text-gray-400"
                >
                  ⏳ Translating with AI...
                </motion.div>
              )}

              {error && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-red-500"
                >
                  {error}
                </motion.div>
              )}

              {translation && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="text-lg font-semibold whitespace-pre-wrap">{translation.text}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Confidence: {translation.confidence}% | {translation.provider}
                  </p>
                </motion.div>
              )}

              {!isLoading && !translation && !error && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-gray-400"
                >
                  No translation yet — speak or type and click Translate.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        <footer className="text-center text-xs text-gray-500 dark:text-gray-400 pt-4">
          © 2025 Creative Translator — Built with Next.js,Open AI, Tailwind, Framer Motion
        </footer>
      </div>
    </main>
  )
}
