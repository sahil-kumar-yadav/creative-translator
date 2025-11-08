// components/ThemeToggle.tsx
"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full bg-muted hover:bg-muted/80 transition"
            aria-label="Toggle theme"
        >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </motion.button>
    );
}
