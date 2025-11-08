interface ToneSelectorProps {
  value: string
  onChange: (value: string) => void
}

const tones = [
  { id: 'formal', label: 'Formal' },
  { id: 'casual', label: 'Casual' },
  { id: 'poetic', label: 'Poetic' },
  { id: 'funny', label: 'Funny' },
  { id: 'concise', label: 'Concise' },
  { id: 'friendly', label: 'Friendly' },
  { id: 'professional', label: 'Professional' },
  { id: 'enthusiastic', label: 'Enthusiastic' }
]

export default function ToneSelector({ value, onChange }: ToneSelectorProps) {
  return (
    <div className="flex flex-col w-full">
      <div className="text-xs text-gray-600 mb-2">Tone / Style</div>
      <div className="flex flex-wrap gap-2">
        {tones.map((t) => (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            aria-pressed={value === t.id}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition 
                        ${value === t.id ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                        focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  )
}
