"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Client = { id: string; name: string; email: string; phone?: string; company?: string; address?: string };

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    fetchClients();
  }, []);

  async function fetchClients() {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data } = await supabase.from("clients").select("*").eq("profile_id", user.id).order("created_at", { ascending: false });
    setClients(data || []);
    setLoading(false);
  }

  async function addClient() {
    if (!name || !email) return;
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from("clients").insert([{ profile_id: user.id, name, email, phone }]);
    if (error) return alert(error.message);
    setName(""); setEmail(""); setPhone("");
    fetchClients();
  }

  async function deleteClient(id: string) {
    if (!confirm("Delete client?")) return;
    const { error } = await supabase.from("clients").delete().eq("id", id);
    if (error) return alert(error.message);
    fetchClients();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Clients</h1>
      <div className="mb-4 bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Add Client</h3>
        <div className="flex gap-2">
          <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Name" className="border p-2 rounded flex-1"/>
          <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="border p-2 rounded flex-1"/>
          <input value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Phone" className="border p-2 rounded w-40"/>
          <button onClick={addClient} className="bg-[var(--accent)] text-white px-3 rounded">Add</button>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        {loading ? <p>Loading...</p> : (
          <table className="w-full text-left">
            <thead className="text-sm text-gray-500"><tr><th>Name</th><th>Email</th><th>Phone</th><th></th></tr></thead>
            <tbody>
              {clients.map(c => (
                <tr key={c.id} className="border-t">
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                  <td><button onClick={()=>deleteClient(c.id)} className="text-red-500">Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
