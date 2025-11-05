"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Bar } from "recharts"; // but we will use a simple chart with Recharts

// Install: npm i recharts

import { BarChart, Bar as BarComp, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function Overview() {
  const [data, setData] = useState<any[]>([]);

  useEffect(()=>{ loadData() },[]);

  async function loadData(){
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    // fetch invoices/expenses by month (simple approach)
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    // mock data for demo — replace with aggregated SQL that groups by month
    setData(months.slice(0,6).map((m,i)=>({name:m,income: (i+1)*200, expense: (i+1)*100})));
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Overview</h1>
      <div className="bg-white p-4 rounded shadow h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name"/>
            <YAxis />
            <Tooltip />
            <BarComp dataKey="income" />
            <BarComp dataKey="expense" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
