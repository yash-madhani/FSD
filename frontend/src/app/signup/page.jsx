"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [userType, setUserType] = useState("student");
  const [sapId, setSapId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [classInfo, setClassInfo] = useState("");
  const [year, setYear] = useState("");
  const [branch, setBranch] = useState("");
  const [batch, setBatch] = useState("");
  const [timetableId, setTimetableId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: authError } = await supabase.auth.signUp({ email, password });

    if (authError) {
      setError(authError.message);
    } else {
      try {
        if (userType === "student") {
          const { error: studentError } = await supabase.from("students").insert([
            { sap_id: sapId, name, email, class: classInfo, year, branch, batch, timetable_id: timetableId || null }
          ]);
          if (studentError) throw studentError;
        } else {
          const { error: teacherError } = await supabase.from("teachers").insert([
            { sap_id: sapId, name, email, incharge_of_class: classInfo }
          ]);
          if (teacherError) throw teacherError;
        }
        router.push("/"); // Redirect to home page
      } catch (dbError) {
        setError(dbError.message);
      }
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>User Type</Label>
          <Select onValueChange={(value) => setUserType(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select user type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="teacher">Teacher</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>SAP ID</Label>
          <Input type="text" value={sapId} onChange={(e) => setSapId(e.target.value)} required />
        </div>
        <div>
          <Label>Name</Label>
          <Input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <Label>Email</Label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <Label>Password</Label>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {userType === "student" && (
          <>
            <div>
              <Label>Class</Label>
              <Input type="text" value={classInfo} onChange={(e) => setClassInfo(e.target.value)} required />
            </div>
            <div>
              <Label>Year</Label>
              <Input type="text" value={year} onChange={(e) => setYear(e.target.value)} required />
            </div>
            <div>
              <Label>Branch</Label>
              <Input type="text" value={branch} onChange={(e) => setBranch(e.target.value)} required />
            </div>
            <div>
              <Label>Batch</Label>
              <Input type="text" value={batch} onChange={(e) => setBatch(e.target.value)} required />
            </div>
            <div>
              <Label>Timetable ID (optional)</Label>
              <Input type="number" value={timetableId} onChange={(e) => setTimetableId(e.target.value)} />
            </div>
          </>
        )}
        {userType === "teacher" && (
          <div>
            <Label>Class/Batch</Label>
            <Input type="text" value={classInfo} onChange={(e) => setClassInfo(e.target.value)} />
          </div>
        )}
        <Button type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </Button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
      <p className="mt-4">
        Already have an account? <a href="/login" className="text-blue-500">Log in</a>
      </p>
    </div>
  );
}

