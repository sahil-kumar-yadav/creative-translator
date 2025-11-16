import { useState } from 'react'

interface LanguageSelectorProps {
  value: string
  onChange: (value: string) => void
  label: string
}

// International Languages
const internationalLanguages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
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
]

// Indian Regional Languages
const indianLanguages = [
  { code: 'hi', name: 'हिंदी - Hindi' },
  { code: 'as', name: 'অসমীয়া - Assamese' },
  { code: 'bn', name: 'বাংলা - Bengali' },
  { code: 'brx', name: 'बोडो - Bodo' },
  { code: 'doi', name: 'डोगरी - Dogri' },
  { code: 'gu', name: 'ગુજરાતી - Gujarati' },
  { code: 'kn', name: 'ಕನ್ನಡ - Kannada' },
  { code: 'ks', name: 'کشمیری - Kashmiri' },
  { code: 'kok', name: 'कोंकणी - Konkani' },
  { code: 'mai', name: 'मैथिली - Maithili' },
  { code: 'ml', name: 'മലയാളം - Malayalam' },
  { code: 'mni', name: 'ମଣିପୁରୀ - Manipuri' },
  { code: 'mr', name: 'मराठी - Marathi' },
  { code: 'ne', name: 'नेपाली - Nepali' },
  { code: 'or', name: 'ଓଡ଼ିଆ - Odia' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ - Punjabi' },
  { code: 'sa', name: 'संस्कृत - Sanskrit' },
  { code: 'sat', name: 'संथाली - Santhali' },
  { code: 'sd', name: 'سندھی - Sindhi' },
  { code: 'ta', name: 'தமிழ் - Tamil' },
  { code: 'te', name: 'తెలుగు - Telugu' },
  { code: 'ur', name: 'اردو - Urdu' },
]

const allLanguages = [...internationalLanguages, ...indianLanguages]

export default function LanguageSelector({ value, onChange, label }: LanguageSelectorProps) {
  const [search, setSearch] = useState('')
  const [showIndian, setShowIndian] = useState(false)

  const filteredInternational = internationalLanguages.filter((o) =>
    o.name.toLowerCase().includes(search.toLowerCase())
  )

  const filteredIndian = indianLanguages.filter((o) =>
    o.name.toLowerCase().includes(search.toLowerCase())
  )

  const filteredAll = allLanguages.filter((o) =>
    o.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex flex-col w-full gap-2">
      <label className="text-xs text-gray-900 dark:text-gray-100 font-semibold">{label}</label>
      
      <input
        type="text"
        placeholder="Search language..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white transition"
      />

      {/* Toggle Button for Indian Languages */}
      <button
        onClick={() => setShowIndian(!showIndian)}
        className="w-full px-3 py-2 text-xs font-semibold rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 hover:bg-orange-200 dark:hover:bg-orange-900/50 transition border border-orange-300 dark:border-orange-700"
      >
        {showIndian ? '🇮🇳 Indian Languages ▼' : '🌍 All Languages ▼'}
      </button>

      {/* Select Dropdown */}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 px-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:text-white transition-all"
      >
        {showIndian ? (
          <>
            <optgroup label="🇮🇳 Indian Regional Languages">
              {filteredIndian.length > 0 ? (
                filteredIndian.map((o) => (
                  <option key={o.code} value={o.code}>
                    {o.name}
                  </option>
                ))
              ) : (
                <option disabled>No languages found</option>
              )}
            </optgroup>
          </>
        ) : (
          <>
            <optgroup label="🌍 International Languages">
              {filteredInternational.length > 0 ? (
                filteredInternational.map((o) => (
                  <option key={o.code} value={o.code}>
                    {o.name}
                  </option>
                ))
              ) : (
                <option disabled>No languages found</option>
              )}
            </optgroup>
            <optgroup label="🇮🇳 Indian Regional Languages">
              {filteredIndian.length > 0 ? (
                filteredIndian.map((o) => (
                  <option key={o.code} value={o.code}>
                    {o.name}
                  </option>
                ))
              ) : (
                <option disabled>No languages found</option>
              )}
            </optgroup>
          </>
        )}
      </select>
    </div>
  )
}
