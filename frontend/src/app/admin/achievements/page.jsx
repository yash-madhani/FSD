"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28CF6", "#FF6699"];

function getTypeAnalytics(data) {
  const counts = {};
  data.forEach((row) => {
    const type = row.type;
    if (type) counts[type] = (counts[type] || 0) + 1;
  });
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  return Object.entries(counts).map(([name, value]) => ({
    name,
    value,
    percent: ((value / total) * 100).toFixed(1),
  }));
}

export default function AchievementsAnalytics() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { data: rows, error } = await supabase.from("achievements").select("*");
      if (!error) setData(rows || []);
      setLoading(false);
    }
    fetchData();
  }, []);

  const analytics = getTypeAnalytics(data);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Achievements Type Analytics</h1>
      <Card className="p-4">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analytics}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percent }) => `${name}: ${percent}%`}
              >
                {analytics.map((entry, idx) => (
                  <Cell key={entry.name} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name, props) => [`${value} (${props.payload.percent}%)`, name]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </Card>
    </div>
  );
}
