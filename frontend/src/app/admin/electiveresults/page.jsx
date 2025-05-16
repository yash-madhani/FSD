"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28CF6", "#FF6699"];



function analyzeElectives(data, key) {
  const counts = {};
  data.forEach((row) => {
    const elective = row[key];
    if (elective) counts[elective] = (counts[elective] || 0) + 1;
  });
  return Object.entries(counts).map(([name, value]) => ({ name, value }));
}



export default function Page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { data: rows, error } = await supabase.from("elective").select("*");
      if (!error) setData(rows || []);
      setLoading(false);
    }
    fetchData();
  }, []);

  const elective1 = analyzeElectives(data, "selected_elective1");
  const elective2 = analyzeElectives(data, "selected_elective2");
  const elective3 = analyzeElectives(data, "selected_elective3");

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Elective Results Analysis</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-4">
            <h2 className="font-semibold mb-2">Selected Elective 1</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={elective1}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {elective1.map((entry, idx) => (
                    <Cell key={entry.name} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
          <Card className="p-4">
            <h2 className="font-semibold mb-2">Selected Elective 2</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={elective2}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {elective2.map((entry, idx) => (
                    <Cell key={entry.name} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
          <Card className="p-4">
            <h2 className="font-semibold mb-2">Selected Elective 3</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={elective3}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {elective3.map((entry, idx) => (
                    <Cell key={entry.name} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>
      )}
    </div>
  );
}