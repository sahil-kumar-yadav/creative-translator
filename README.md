# 🎨 Creative Translator App

A **modern, interactive translator web app** built with **Next.js 14**, **TailwindCSS**, and **OpenAI GPT**. Translate text creatively with style and tone options, **voice input/output**, and smooth **animated UI interactions** — all **without a database**.

---

## 🚀 Features

* **Text Translation**

  * Translate any text between multiple languages.
  * Choose creative tones: formal, casual, poetic, funny, etc.
  * Powered by **OpenAI GPT API** for intelligent, context-aware translations.

* **Voice Features**

  * **Speech-to-text**: Speak your input, automatically captured.
  * **Text-to-speech**: Hear translations read aloud in the target language.
  * Uses modern Web Speech API for lightweight, fast voice interactions.

* **Animated UI**

  * Smooth transitions when translations appear.
  * Loading animations while translation is in progress.
  * Interactive micro-animations for buttons, tone selection, and voice controls.

* **No Database Required**

  * Fully functional **serverless** design using Next.js API routes.
  * Minimal setup — just environment variables for API keys.

---

## 💻 Tech Stack

* **Frontend**: React, TailwindCSS, Framer Motion
* **Backend**: Next.js API routes
* **Translation Engine**: OpenAI GPT (GPT-4o-mini recommended)
* **Voice**: Web Speech API (speech recognition & synthesis)
* **Animations**: Framer Motion for modern UI transitions

---

## 🛠 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/creative-translator.git
cd creative-translator
```

### 2. Install Dependencies

```bash
npm install
# or
yarn
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root:

```env
OPENAI_API_KEY=sk-your-openai-key-here
NEXT_PUBLIC_DEFAULT_SOURCE_LANG=en
NEXT_PUBLIC_DEFAULT_TARGET_LANG=es
```

> Make sure you have a valid **OpenAI API key**.

### 4. Run the App

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🎨 Usage

1. Select **source and target languages**.
2. Choose a **tone/style** for translation.
3. Type your text or click the **microphone button** to speak.
4. Press **Translate** and watch the translation appear with smooth animations.
5. Click the **speaker button** to hear the translation aloud.

---

## ⚡ Features in Detail

| Feature                 | Description                                                |
| ----------------------- | ---------------------------------------------------------- |
| Tone Selector           | Choose creative styles like formal, casual, poetic, funny. |
| Voice Input             | Speech-to-text capture for hands-free typing.              |
| Voice Output            | Listen to translated text with native pronunciation.       |
| Animated UI             | Engaging animations for translation results and buttons.   |
| GPT-powered Translation | High-quality creative translations via OpenAI.             |

---

## 🌟 Future Enhancements

* Add **user preferences** for favorite tones or languages.
* Save **translation history** locally (no DB required).
* Mobile-first optimizations with advanced gestures.
* Offline voice input/output caching for PWA mode.
* More animation effects with **Framer Motion** or **Lottie**.

---

## 📂 Project Structure

```
creative-translator/
├─ app/
│  ├─ api/translate/route.ts      # GPT translation API route
│  ├─ page.tsx                     # Main UI page
│  └─ components/
│     ├─ TranslationForm.tsx       # Input + tone selector
│     ├─ TranslationResult.tsx     # Animated translation display
│     ├─ VoiceInputButton.tsx      # Microphone input
│     └─ VoiceOutputButton.tsx     # Speaker output
├─ styles/
│  └─ globals.css                  # TailwindCSS base styles
├─ .env.local                       # Environment variables
└─ package.json
```

---

## 🔗 References

* [Next.js Documentation](https://nextjs.org/docs)
* [TailwindCSS](https://tailwindcss.com/)
* [Framer Motion](https://www.framer.com/motion/)
* [OpenAI API](https://platform.openai.com/docs)
* [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)

---

## 📝 License

This project is **MIT Licensed**. Feel free to use, modify, and distribute.
