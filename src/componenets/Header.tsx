export default function Header() {
    return (
        <header className="bg-white border-b">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center text-white font-bold">CT</div>
                    <div>
                        <div className="font-semibold">Creative Translator</div>
                        <div className="text-xs text-gray-500">Translate with style — powered by GPT</div>
                    </div>
                </div>
                <div className="text-sm text-gray-600">No account — private, local only</div>
            </div>
        </header>
    )
}