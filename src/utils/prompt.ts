export function buildTranslationPrompt(
    text: string,
    sourceLang: string,
    targetLang: string,
    tone: string
): string {
    return `You are a professional multilingual translator with deep cultural knowledge.
Your task is to translate the following text from ${sourceLang} to ${targetLang}.
Maintain the original meaning but adjust the tone/style to be ${tone}.
Include only the translation — no extra commentary.

Text: ${text}`
}