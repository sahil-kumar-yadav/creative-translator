// ...new file...
import React from 'react'

interface TranslationResult {
  text: string
  confidence: number
  provider?: string
}

interface Props {
  translation: TranslationResult | null
  isLoading: boolean
  error: string | null
}

export default function TranslationOutput({ translation, isLoading, error }: Props) {
  return (
    <section className="glass p-6 rounded-2xl border border-white/20 dark:border-gray-800/50 shadow-xl">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">Translation</h3>
        <div className="text-xs text-gray-500 dark:text-gray-400">Voice + AI Enabled</div>
      </div>

      <div className="mt-4 min-h-[120px] flex items-center justify-center text-center">
        {isLoading && <div className="text-sm text-gray-500 dark:text-gray-400">⏳ Translating with AI...</div>}
        {error && <div className="text-sm text-red-500">{error}</div>}
        {!isLoading && !translation && !error && (
          <div className="text-sm text-gray-400">No translation yet — speak or type and click Translate.</div>
        )}
        {translation && (
          <div>
            <p className="text-lg font-semibold whitespace-pre-wrap">{translation.text}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Confidence: {translation.confidence}% | {translation.provider}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}