"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const ELECTIVES = [
  "Data Science",
  "Artificial Intelligence",
  "Cyber Security"
];

export default function ElectiveSelection({ sap_id: propSapId }) {
  const [selected1, setSelected1] = useState("");
  const [selected2, setSelected2] = useState("");
  const [selected3, setSelected3] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [sapId, setSapId] = useState(propSapId || "");

  useEffect(() => {
    if (!propSapId) {
      const fetchSapId = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session && session.user) {
          let { data: student } = await supabase
            .from("students")
            .select("sap_id")
            .eq("email", session.user.email)
            .single();
          if (student && student.sap_id) {
            setSapId(student.sap_id);
            return;
          }
          let { data: teacher } = await supabase
            .from("teachers")
            .select("sap_id")
            .eq("email", session.user.email)
            .single();
          if (teacher && teacher.sap_id) {
            setSapId(teacher.sap_id);
          }
        }
      };
      fetchSapId();
    }
  }, [propSapId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selected1 || !selected2 || !selected3 || !sapId) {
      setMessage("Please select all three preferences and ensure you are logged in.");
      return;
    }
    if (new Set([selected1, selected2, selected3]).size !== 3) {
      setMessage("Please select different electives for each preference.");
      return;
    }
    setLoading(true);
    const { error } = await supabase
      .from("elective")
      .insert([{ selected_elective1: selected1, selected_elective2: selected2, selected_elective3: selected3, sap_id: sapId, class: "I2" }]);
    setLoading(false);
    if (error) {
      setMessage("Error submitting preferences. Please try again.");
    } else {
      setMessage("Preferences submitted successfully!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Select Your Elective Preferences</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
        <label className="flex flex-col gap-2">
          1st Preference:
          <select value={selected1} onChange={e => setSelected1(e.target.value)} required>
            <option value="">Select elective</option>
            {ELECTIVES.map(subject => (
              <option key={subject} value={subject} disabled={selected2 === subject || selected3 === subject}>{subject}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-2">
          2nd Preference:
          <select value={selected2} onChange={e => setSelected2(e.target.value)} required>
            <option value="">Select elective</option>
            {ELECTIVES.map(subject => (
              <option key={subject} value={subject} disabled={selected1 === subject || selected3 === subject}>{subject}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-2">
          3rd Preference:
          <select value={selected3} onChange={e => setSelected3(e.target.value)} required>
            <option value="">Select elective</option>
            {ELECTIVES.map(subject => (
              <option key={subject} value={subject} disabled={selected1 === subject || selected2 === subject}>{subject}</option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
        {message && <p className="text-center mt-2">{message}</p>}
      </form>
      {sapId && (
        <p className="mt-4 text-gray-500 text-sm">Your SAP ID: {sapId}</p>
      )}
    </div>
  );
}