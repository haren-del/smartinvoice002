import "./globals.css";
import Link from "next/link";
import { Inter } from "next/font/google";
import { SupabaseProvider } from "@/components/SupabaseProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SmartInvoice",
  description: "Modern invoicing made simple",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[var(--background)] text-[var(--text-primary)]`}>
        <SupabaseProvider>
          <header className="flex justify-between items-center p-4 border-b bg-white">
            <Link href="/" className="font-bold text-xl text-[var(--accent)]">SmartInvoice</Link>
            <nav className="flex gap-4">
              <Link href="/">Home</Link>
              <Link href="/features">Features</Link>
              <Link href="/pricing">Pricing</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/auth/login" className="bg-[var(--accent)] text-white px-3 py-1 rounded">Login</Link>
            </nav>
          </header>

          <main className="p-6">{children}</main>
        </SupabaseProvider>
      </body>
    </html>
  );
}
