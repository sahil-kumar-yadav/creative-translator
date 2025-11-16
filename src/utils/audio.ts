// ...new file...
export const languageMap: { [key: string]: string } = {
  hi: 'hi-IN',
  as: 'as-IN',
  bn: 'bn-IN',
  brx: 'hi-IN',
  doi: 'hi-IN',
  gu: 'gu-IN',
  kn: 'kn-IN',
  ks: 'ur-PK',
  kok: 'hi-IN',
  mai: 'hi-IN',
  ml: 'ml-IN',
  mni: 'hi-IN',
  mr: 'mr-IN',
  ne: 'ne-NP',
  or: 'or-IN',
  pa: 'pa-IN',
  sa: 'hi-IN',
  sat: 'hi-IN',
  sd: 'ur-PK',
  ta: 'ta-IN',
  te: 'te-IN',
  ur: 'ur-PK',
  en: 'en-US',
  es: 'es-ES',
  fr: 'fr-FR',
  de: 'de-DE',
  ja: 'ja-JP',
  ar: 'ar-SA',
  zh: 'zh-CN',
  ru: 'ru-RU',
  pt: 'pt-BR',
  it: 'it-IT',
  ko: 'ko-KR',
  tr: 'tr-TR',
  nl: 'nl-NL',
  sv: 'sv-SE',
  pl: 'pl-PL',
  vi: 'vi-VN',
  th: 'th-TH',
  id: 'id-ID',
}

export const getAudioLanguage = (langCode: string): string =>
  languageMap[langCode] || langCode

// Basic Devanagari -> Latin romanization (naive, for TTS fallback)
export const transliterateDevanagariToLatin = (text: string) => {
  const map: { [k: string]: string } = {
    'अ': 'a','आ': 'aa','इ': 'i','ई': 'ee','उ': 'u','ऊ': 'oo','ए': 'e','ऐ': 'ai','ओ': 'o','औ': 'au',
    'क': 'k','ख': 'kh','ग': 'g','घ': 'gh','ङ': 'ng',
    'च': 'ch','छ': 'chh','ज': 'j','झ': 'jh','ञ': 'ny',
    'ट': 't','ठ': 'th','ड': 'd','ढ': 'dh','ण': 'n',
    'त': 't','थ': 'th','द': 'd','ध': 'dh','न': 'n',
    'प': 'p','फ': 'ph','ब': 'b','भ': 'bh','म': 'm',
    'य': 'y','र': 'r','ल': 'l','व': 'v','श': 'sh','ष': 'sh','स': 's','ह': 'h',
    'ा': 'aa','ि': 'i','ी': 'ee','ु': 'u','ू': 'oo','े': 'e','ै': 'ai','ो': 'o','ौ': 'au',
    'ं': 'n','ः': 'h','्': '', 'ऽ': "'",
    '।': '.', '०': '0','१':'1','२':'2','३':'3','४':'4','५':'5','६':'6','७':'7','८':'8','९':'9'
  }
  return text.split('').map(ch => map[ch] ?? ch).join('').replace(/\s+/g, ' ')
}

const findVoiceForLocale = (locale: string) => {
  const voices = (speechSynthesis.getVoices() || [])
  return voices.find((v) => {
    const vlang = (v.lang || '').toLowerCase()
    return vlang.startsWith(locale.toLowerCase()) || vlang.startsWith(locale.split('-')[0].toLowerCase())
  })
}

/**
 * Speak text for targetLang. If a native voice for the locale exists, use it.
 * If not and the language is Devanagari-based, romanize text and speak with an English voice.
 * If voices haven't loaded yet, schedule after onvoiceschanged.
 */
export const speakText = (text: string, targetLang: string) => {
  if (!text) return

  const mappedLocale = getAudioLanguage(targetLang)
  const doSpeak = () => {
    const voice = findVoiceForLocale(mappedLocale)
    const utterance = new SpeechSynthesisUtterance()
    if (voice) {
      utterance.text = text
      utterance.lang = voice.lang
      utterance.voice = voice
    } else {
      const devanagariLangs = ['hi','mr','ne','sa','mai']
      if (devanagariLangs.includes(targetLang)) {
        utterance.text = transliterateDevanagariToLatin(text)
        utterance.lang = 'en-US'
      } else {
        utterance.text = text
        utterance.lang = 'en-US'
      }
    }
    speechSynthesis.cancel()
    speechSynthesis.speak(utterance)
  }

  if ((speechSynthesis.getVoices() || []).length === 0) {
    speechSynthesis.onvoiceschanged = () => doSpeak()
  } else {
    doSpeak()
  }
}