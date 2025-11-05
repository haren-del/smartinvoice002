import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800">
      <h1 className="text-4xl font-bold mb-4">Welcome to SmartInvoice</h1>
      <p className="text-gray-600 mb-8">
        Simplify your invoicing and get paid faster.
      </p>

      <div className="flex gap-4">
        {/* ✅ Updated signup link */}
        <Link
          href="/auth/signup"
          className="bg-yellow-500 text-white px-5 py-2 rounded-lg font-medium hover:bg-yellow-600"
        >
          Get Started Free
        </Link>

        {/* ✅ Updated login link */}
        <Link
          href="/auth/login"
          className="border border-gray-300 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-100"
        >
          Login / Sign-Up
        </Link>
      </div>
    </main>
  );
}
