"use client";
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function ForgotPasswordPage(){
  const [email,setEmail]=useState('');
  const [msg,setMsg]=useState('');

  const sendReset = async ()=>{
    if(!email) return setMsg('Enter your email');
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` });
    if(error) setMsg(error.message); else setMsg('Password reset link sent to your email.');
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--background)]">
      <div className="bg-[var(--surface)] p-6 rounded w-full max-w-md">
        <h1 className="text-xl font-bold mb-3">Forgot password</h1>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Your email" className="w-full p-2 border rounded mb-3" />
        <button onClick={sendReset} className="bg-[var(--accent)] text-white px-4 py-2 rounded">Send reset link</button>
        {msg && <p className="mt-3 text-sm text-gray-700">{msg}</p>}
      </div>
    </main>
  );
}
