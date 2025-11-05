"use client";
import Link from "next/link";
import { useContext } from "react";
import { ThemeContext } from "@/components/ThemeProvider";

export default function Header(){ 
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <header className="flex justify-between items-center p-4 border-b bg-white">
      <div className="flex items-center gap-4">
        <Link href="/" className="font-bold text-xl text-[var(--accent)]">bizInvoice</Link>
      </div>

      <nav className="flex items-center gap-4">
        <Link href="/features" className="hidden md:inline">Features</Link>
        <Link href="/pricing" className="hidden md:inline">Pricing</Link>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="px-3 py-1 rounded border text-sm">
          {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
        <Link href="/auth/login" className="bg-[var(--accent)] text-white px-3 py-1 rounded">Login</Link>
      </nav>
    </header>
  );
}
