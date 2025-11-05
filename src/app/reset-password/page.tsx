"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async () => {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) setMsg(error.message);
    else {
      setMsg("Password set. Redirecting to login...");
      setTimeout(()=>router.push("/auth/login"),1500);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--background)]">
      <div className="bg-[var(--surface)] p-6 rounded w-full max-w-md">
        <h1 className="text-xl font-bold mb-3">Set a new password</h1>
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="New password" className="w-full p-2 border rounded mb-3"/>
        <button onClick={submit} className="bg-[var(--accent)] text-white px-4 py-2 rounded">Set Password</button>
        {msg && <p className="mt-2">{msg}</p>}
      </div>
    </main>
  );
}
