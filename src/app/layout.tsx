import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Creative Translator",
  description: "AI-powered multilingual translation assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground transition-colors duration-300`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
