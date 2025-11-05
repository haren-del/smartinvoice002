"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) router.replace("/dashboard");
    })();
  }, [router]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      const user = data.user;
      if (!user) throw new Error("User not created");

      await supabase.from("profiles").insert([{
        id: user.id, email, phone, name, company, address, created_at: new Date()
      }]);

      setMsg("Account created. Please check your email for confirmation.");
      setTimeout(() => router.push("/auth/login"), 1500);
    } catch (err: any) {
      setMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--background)]">
      <form onSubmit={handleSignup} className="bg-[var(--surface)] p-8 rounded-lg w-full max-w-md">
        <h1 className="text-xl font-bold mb-4">Create your SmartInvoice account</h1>

        <input className="w-full mb-2 p-2 border rounded" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Full name" required />
        <input className="w-full mb-2 p-2 border rounded" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Phone number" required />
        <input className="w-full mb-2 p-2 border rounded" value={company} onChange={(e)=>setCompany(e.target.value)} placeholder="Company name" />
        <input className="w-full mb-2 p-2 border rounded" value={address} onChange={(e)=>setAddress(e.target.value)} placeholder="Address" />
        <input type="email" className="w-full mb-2 p-2 border rounded" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" className="w-full mb-2 p-2 border rounded" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" required />

        <button className="w-full bg-[var(--accent)] text-white py-2 rounded" disabled={loading}>
          {loading ? "Creating..." : "Create your SmartInvoice account"}
        </button>

        {msg && <p className="mt-3 text-sm text-gray-700">{msg}</p>}
      </form>
    </main>
  );
}
