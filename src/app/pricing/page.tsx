"use client";
import Link from "next/link";

export default function PricingPage(){
  return (
    <main className="min-h-screen p-8 bg-[var(--background)]">
      <h1 className="text-3xl font-bold mb-6">Pricing</h1>
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
        <div className="bg-[var(--surface)] p-6 rounded shadow">
          <h2 className="text-xl font-semibold">Free</h2>
          <p className="text-sm mb-4">5 invoices / month, basic features.</p>
          <p className="text-2xl font-bold">$0</p>
          <Link href="/auth/signup" className="inline-block mt-4 bg-gray-300 px-4 py-2 rounded">Sign up Free</Link>
        </div>

        <div className="bg-[var(--surface)] p-6 rounded shadow">
          <h2 className="text-xl font-semibold">Pro</h2>
          <p className="text-sm mb-4">Unlimited invoices, logo on invoices, reminders, reports.</p>
          <p className="text-2xl font-bold">$5<span className="text-base">/month</span></p>
          <button onClick={()=>alert("Checkout coming soon (LemonSqueezy).")} className="mt-4 bg-[var(--accent)] text-white px-4 py-2 rounded">Go Pro (Coming soon)</button>
        </div>
      </div>
    </main>
  );
}
