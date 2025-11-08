

interface LanguageSelectorProps {
    value: string
    onChange: (value: string) => void
    label: string
}


const options = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'hi', name: 'Hindi' },
    { code: 'de', name: 'German' },
    { code: 'ja', name: 'Japanese' }
]


export default function LanguageSelector({ value, onChange, label }: LanguageSelectorProps) {
    return (
        <label className="flex flex-col">
            <span className="text-xs text-gray-600">{label}</span>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="mt-1 block w-full rounded-lg border-gray-200 bg-white py-2 px-3 text-sm shadow-sm"
            >
                {options.map((o) => (
                    <option key={o.code} value={o.code}>
                        {o.name}
                    </option>
                ))}
            </select>
        </label>
    )
}