import LanguageSelector from "@/componenets/LanguageSelector";
import ToneSelector from "@/componenets/ToneSelector";
import { useState } from "react";


interface TranslationResult {
text: string
confidence: number
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


  const handleTranslateClick = () => {
    setError(null)
    setIsLoading(true)
    setTranslation(null)
    setTimeout(() => {
      setIsLoading(false)
      if (!sourceText.trim()) {
        setError('Please enter some text to translate.')
        return
      }
      setTranslation({
        text: `(${tone}) [${targetLang}] — ${sourceText.slice(0, 200)}...`,
        confidence: Math.round(60 + Math.random() * 30)
      })
    }, 900)
  }


  return (
    <div className="max-w-3xl mx-auto">
      <section className="bg-white p-6 rounded-2xl shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="text-xs text-gray-600">Source text</label>
            <textarea
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              rows={8}
              placeholder="Type or speak your text here..."
              className="mt-1 w-full rounded-lg border border-gray-200 p-3 text-sm shadow-sm resize-none"
            />
            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={() => setRecording((r) => !r)}
                className={`btn ${recording ? 'btn-primary' : 'btn-ghost'}`}
              >
                {recording ? 'Recording...' : 'Start speaking'}
              </button>
              <button disabled className="btn btn-ghost" title="Text-to-speech coming soon">
                Play translation
              </button>
              <div className="ml-auto text-sm text-gray-500">Preview only — GPT in Step 2</div>
            </div>
          </div>


          <aside className="space-y-4">
            <LanguageSelector value={sourceLang} onChange={setSourceLang} label="Source language" />
            <LanguageSelector value={targetLang} onChange={setTargetLang} label="Target language" />
            <ToneSelector value={tone} onChange={setTone} />


            <div className="pt-2">
              <button onClick={handleTranslateClick} className="btn btn-primary w-full" disabled={isLoading}>
                {isLoading ? 'Translating...' : 'Translate'}
              </button>
            </div>
          </aside>
        </div>
      </section>


      <section className="mt-6">
        <div className="bg-white p-6 rounded-2xl shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Translation</h3>
            <div className="text-xs text-gray-500">Powered by GPT (coming Step 2)</div>
          </div>


          <div className="mt-4 min-h-[120px] flex items-center">
            {isLoading && (
              <div className="flex items-center gap-3">
                <div className="loader" />
                <div className="text-sm text-gray-600">Thinking... sit tight</div>
              </div>
            )}


            {error && <div className="text-sm text-red-600">{error}</div>}


            {translation && (
              <div className="fade-in-up">
                <div className="text-lg font-semibold">{translation.text}</div>
                <div className="text-xs text-gray-500 mt-2">Source: GPT · Confidence: {translation.confidence}%</div>
              </div>
            )}


            {!isLoading && !translation && !error && (
              <div className="text-sm text-gray-500">No translation yet — enter text and choose tone, then press Translate.</div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}