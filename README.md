# 🪄 Creative Translator Web App

### *Translate smarter, sound better, and express creatively with AI*

![Translator Demo Banner](https://dummyimage.com/1200x500/1e293b/ffffff\&text=Creative+Translator+Web+App)

---

### 🌍 Overview

**Creative Translator** is a modern, interactive web app that goes beyond literal translation.
Powered by **OpenAI GPT**, it captures the **tone**, **style**, and **emotion** of your message — helping you translate text *creatively* across languages.

Speak, type, or listen — everything happens with delightful animations and a smooth UX built with **Next.js 15**, **TailwindCSS**, and **Framer Motion**.

---

### ✨ Features

| Feature                       | Description                                                           |
| ----------------------------- | --------------------------------------------------------------------- |
| 🧠 **AI-Powered Translation** | Uses **OpenAI GPT** for natural, context-aware translations.          |
| 🎤 **Speech-to-Text**         | Speak directly — the app captures your voice and converts it to text. |
| 🔊 **Text-to-Speech**         | Listen to your translated result in the target language.              |
| 🎨 **Tone Selector**          | Choose a translation style — *formal, casual, poetic, funny*, etc.    |
| ⚡ **Animations**              | Smooth transitions and micro-interactions using **Framer Motion**.    |
| 🌓 **Dark Mode**              | Auto-detect or toggle dark mode for a premium experience.             |
| 🧩 **No Database Needed**     | Fully client-driven; OpenAI API handles the intelligence.             |

---

### 🧑‍💻 Tech Stack

* **Framework:** [Next.js 15 (App Router)](https://nextjs.org)
* **Language:** TypeScript
* **Styling:** [TailwindCSS](https://tailwindcss.com)
* **AI:** [OpenAI GPT API](https://platform.openai.com)
* **Animations:** [Framer Motion](https://www.framer.com/motion/)
* **Speech:** Browser Web Speech API (SpeechRecognition + SpeechSynthesis)

---

### ⚙️ Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/creative-translator.git
cd creative-translator

# 2. Install dependencies
npm install

# 3. Set environment variable
#   Replace <YOUR_OPENAI_API_KEY> with your actual OpenAI key
echo "OPENAI_API_KEY=<YOUR_OPENAI_API_KEY>" > .env.local

# 4. Run the development server
npm run dev
```

Then open **[http://localhost:3000](http://localhost:3000)** 🚀

---

### 🧠 How It Works

1. **Input Text / Speak:**
   Enter text manually or use speech-to-text recording.

2. **Select Tone & Languages:**
   Choose source and target languages, plus a tone.

3. **AI Translation (OpenAI GPT):**
   The backend route (`/api/translate`) sends a structured prompt to GPT, returning natural translations with confidence scoring.

4. **Playback & Share:**
   Listen to your translated text with text-to-speech.

---

### 🎬 Demo Preview

```text
You speak:   "Can you make this sound poetic?"
App replies: "Could you render this as a gentle verse of words and wonder?"
```

---

### 🛠️ Folder Structure

```
src/
 ├─ app/
 │   ├─ api/
 │   │   └─ translate/route.ts    # OpenAI API route
 │   ├─ page.tsx                  # Main translator page
 │   └─ layout.tsx
 ├─ components/
 │   ├─ LanguageSelector.tsx
 │   ├─ ToneSelector.tsx
 │   ├─ ThemeToggle.tsx
 │   └─ UI.tsx
 ├─ styles/
 │   └─ globals.css
 └─ utils/
     └─ promptTemplate.ts
```

---

### 💬 Example Prompt to OpenAI

```ts
Translate the following text from ${sourceLang} to ${targetLang} in a ${tone} tone.
Text: "${text}"
Return only the translated result, naturally phrased.
```

---

### 🎨 UI Sneak Peek

![Dark Mode Preview](https://dummyimage.com/800x400/111827/ffffff\&text=Dark+Mode+Preview)

A minimalistic layout with glowing hover effects, smooth transitions, and adaptive color schemes.

---

### 🔒 Environment Variables

| Key              | Description                             |
| ---------------- | --------------------------------------- |
| `OPENAI_API_KEY` | Your OpenAI API key for GPT translation |

---

### 🧭 Roadmap

* [ ] Multi-sentence context enhancement
* [ ] Save & export translation history (optional local storage)
* [ ] Share or copy translation to clipboard
* [ ] Mobile PWA support
* [ ] AI voice tone matching

---

### 👏 Credits

Built with ❤️ using
**Next.js 15**, **TailwindCSS**, **Framer Motion**, and **OpenAI GPT API**.

---

### 📜 License

This project is released under the [MIT License](LICENSE).

