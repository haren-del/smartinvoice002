"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) router.replace("/dashboard");
    })();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setMsg(error.message);
    else router.replace("/dashboard");
  };

  const forgot = async () => {
    if (!email) return setMsg("Enter email to reset password");
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` });
    if (error) setMsg(error.message);
    else setMsg("Password reset link sent to your email.");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--background)]">
      <form onSubmit={handleLogin} className="bg-[var(--surface)] p-8 rounded-lg w-full max-w-md">
        <h1 className="text-xl font-bold mb-4">Login</h1>
        <input className="w-full mb-2 p-2 border rounded" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" required />
        <div className="flex items-center gap-2 mb-2">
          <input type={show ? "text": "password"} className="flex-1 p-2 border rounded" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" required />
          <button type="button" onClick={()=>setShow(s=>!s)} className="text-sm">{show ? "Hide":"Show"}</button>
        </div>

        <div className="flex justify-between items-center mb-4">
          <button className="bg-[var(--accent)] text-white px-4 py-2 rounded">Login</button>
          <button type="button" onClick={forgot} className="text-sm text-blue-600">Forgot password?</button>
        </div>

        <p className="text-sm">Don't have an account? <Link href="/auth/signup" className="text-[var(--accent)]">Sign up</Link></p>
        {msg && <p className="mt-3 text-sm text-gray-700">{msg}</p>}
      </form>
    </main>
  );
}
