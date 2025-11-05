export default function BlogPage() {
  return (
    <main className="min-h-screen p-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Blog</h1>
      <p className="mb-6">Insights and updates from SmartInvoice.</p>

      <div className="space-y-4">
        <article className="border-b pb-4">
          <h2 className="text-xl font-semibold">Why Freelancers Love SmartInvoice</h2>
          <p className="text-gray-600 text-sm">October 1, 2025</p>
        </article>

        <article className="border-b pb-4">
          <h2 className="text-xl font-semibold">How to Automate Client Billing</h2>
          <p className="text-gray-600 text-sm">September 15, 2025</p>
        </article>
      </div>
    </main>
  );
}
