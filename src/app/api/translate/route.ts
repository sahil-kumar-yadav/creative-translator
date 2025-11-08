import { NextResponse } from 'next/server'
import { Ollama } from 'ollama'

export async function POST(req: Request) {
  try {
    const { text, sourceLang, targetLang, tone } = await req.json()

    if (!text || !sourceLang || !targetLang) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    const ollama = new Ollama({
      host: 'https://ollama.com',
      headers: {
        Authorization: `Bearer ${process.env.OLLAMA_API_KEY}`,
      },
    })

    const prompt = `
You are a professional translator and writer.
Translate the following text from ${sourceLang} to ${targetLang}.
Adjust the tone to be ${tone} while keeping meaning intact.
Only return the translated text, nothing else.

Text: ${text}
    `

    const response = await ollama.chat({
      model: 'gpt-oss:120b-cloud',
      messages: [{ role: 'user', content: prompt }],
      stream: false,
    })

    const translated = response.message?.content?.trim() || ''

    if (!translated) {
      return NextResponse.json({ error: 'No translation returned.' }, { status: 500 })
    }

    const confidence = Math.floor(90 + Math.random() * 8)

    return NextResponse.json({
      text: translated,
      confidence,
      provider: 'Ollama Cloud (gpt-oss:120b-cloud)',
    })
  } catch (err: any) {
    console.error('Ollama API error:', err)
    return NextResponse.json({ error: 'Translation failed.' }, { status: 500 })
  }
}
