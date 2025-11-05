"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const cached = localStorage.getItem("profile");
    if (cached) setProfile(JSON.parse(cached));

    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user?.id) return;
      const { data } = await supabase.from("profiles").select("business_name,email,logo_url,plan").eq("id", user.id).single();
      if (data) {
        setProfile(data);
        localStorage.setItem("profile", JSON.stringify(data));
      }
    })();
  }, []);

  const logout = async () => {
    router.replace("/");
    await supabase.auth.signOut();
    localStorage.removeItem("profile");
  };

  return (
    <aside className="w-64 bg-white p-4 border-r h-screen flex flex-col justify-between">
      <div>
        <div className="text-center mb-4">
          {profile?.logo_url ? <img src={profile.logo_url} alt="logo" className="h-16 w-16 rounded-full mx-auto object-cover" /> : <div className="h-16 w-16 bg-gray-200 rounded-full mx-auto" />}
          <p className="font-semibold mt-2">{profile?.business_name || "Your Business"}</p>
          <p className="text-xs text-gray-500">{profile?.email}</p>
          {profile?.plan !== "pro" && <Link href="/pricing" className="block mt-2 text-sm text-[var(--accent)]">Go Pro</Link>}
        </div>

        <nav className="space-y-2">
          <Link href="/dashboard" className="block px-3 py-2 rounded hover:bg-gray-100">Overview</Link>
          <Link href="/dashboard/clients" className="block px-3 py-2 rounded hover:bg-gray-100">Clients</Link>
          <Link href="/dashboard/quotations" className="block px-3 py-2 rounded hover:bg-gray-100">Quotations</Link>
          <Link href="/dashboard/invoices" className="block px-3 py-2 rounded hover:bg-gray-100">Invoices</Link>
          <Link href="/dashboard/payments" className="block px-3 py-2 rounded hover:bg-gray-100">Payments</Link>
          <Link href="/dashboard/expenses" className="block px-3 py-2 rounded hover:bg-gray-100">Expenses</Link>
          <Link href="/dashboard/reports" className="block px-3 py-2 rounded hover:bg-gray-100">Reports</Link>
          <Link href="/dashboard/settings" className="block px-3 py-2 rounded hover:bg-gray-100">Settings</Link>
        </nav>
      </div>

      <div>
        <button onClick={logout} className="w-full bg-red-500 text-white py-2 rounded">Logout</button>
      </div>
    </aside>
  );
}
