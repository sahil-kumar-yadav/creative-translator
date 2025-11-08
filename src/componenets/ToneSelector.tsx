interface ToneSelectorProps {
    value: string
    onChange: (value: string) => void
}


const tones = [
    { id: 'formal', label: 'Formal' },
    { id: 'casual', label: 'Casual' },
    { id: 'poetic', label: 'Poetic' },
    { id: 'funny', label: 'Funny' },
    { id: 'concise', label: 'Concise' }
]


export default function ToneSelector({ value, onChange }: ToneSelectorProps) {
    return (
        <div>
            <div className="text-xs text-gray-600 mb-2">Tone / Style</div>
            <div className="flex gap-2 flex-wrap">
                {tones.map((t) => (
                    <button
                        key={t.id}
                        onClick={() => onChange(t.id)}
                        className={`btn ${value === t.id ? 'btn-primary' : 'btn-ghost'}`}
                        aria-pressed={value === t.id}
                    >
                        {t.label}
                    </button>
                ))}
            </div>
        </div>
    )
}