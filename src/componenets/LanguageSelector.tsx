import { useState } from 'react'

interface LanguageSelectorProps {
  value: string
  onChange: (value: string) => void
  label: string
}

// Full ISO 639-1 language list
const options = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'hi', name: 'Hindi' },
  { code: 'de', name: 'German' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ar', name: 'Arabic' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ru', name: 'Russian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'it', name: 'Italian' },
  { code: 'ko', name: 'Korean' },
  { code: 'tr', name: 'Turkish' },
  { code: 'nl', name: 'Dutch' },
  { code: 'sv', name: 'Swedish' },
  { code: 'pl', name: 'Polish' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'th', name: 'Thai' },
  { code: 'id', name: 'Indonesian' },
  // Add more languages as needed
]

export default function LanguageSelector({ value, onChange, label }: LanguageSelectorProps) {
  const [search, setSearch] = useState('')

  const filteredOptions = options.filter((o) =>
    o.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex flex-col w-full">
      <label className="text-xs text-gray-900 mb-1">{label}</label>
      <input
        type="text"
        placeholder="Search language..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full rounded-lg border border-gray-300 bg-black py-2 px-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
      >
        {filteredOptions.map((o) => (
          <option key={o.code} value={o.code}>
            {o.name}
          </option>
        ))}
      </select>
    </div>
  )
}
