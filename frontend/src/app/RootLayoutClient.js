"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { supabase } from "../lib/supabase";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayoutClient({ children }) {
  const [sapId, setSapId] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          console.error("Session Error:", sessionError);
          return;
        }

        if (session && session.user) {
          console.log("User session found:", session);
          const { user } = session;

          // Fetch student SAP ID using email
          const { data: student, error: studentError } = await supabase
            .from("students")
            .select("sap_id")
            .eq("email", user.email) // Match by email
            .single();

          if (studentError && studentError.code !== "PGRST116") {
            console.error("Student fetch error:", studentError);
          }

          if (student) {
            console.log("Student SAP ID found:", student.sap_id);
            setSapId(student.sap_id);
            return;
          }

          // Fetch teacher SAP ID using email
          const { data: teacher, error: teacherError } = await supabase
            .from("teachers")
            .select("sap_id")
            .eq("email", user.email) // Match by email
            .single();

          if (teacherError) {
            console.error("Teacher fetch error:", teacherError);
          }

          if (teacher) {
            console.log("Teacher SAP ID found:", teacher.sap_id);
            setSapId(teacher.sap_id);
          } else {
            console.log("No matching SAP ID found for this user.");
          }
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout failed:", error.message);
    } else {
      setSapId(null); // Reset SAP ID state after logout
      window.location.reload(); // Reload to update UI
    }
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <header className="bg-primary text-primary-foreground p-4">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-2xl font-bold">
                IT Attendance Portal
              </h1>
              <nav>
                <ul className="flex justify-center items-center space-x-4">
                  {sapId ? (
                    <>
                      <li>
                        <span className="text-lg font-medium">
                          SAP ID: {sapId}
                        </span>
                      </li>
                      <li>
                        <Button variant="destructive" onClick={handleLogout}>
                          Log out
                        </Button>
                      </li>
                    </>
                  ) : (
                    <li>
                      <Link href="/login">
                        <Button variant="secondary">Log in</Button>
                      </Link>
                    </li>
                  )}
                </ul>
              </nav>
            </div>
          </header>
          <main className="flex-grow container mx-auto p-4">{children}</main>
          <footer className="bg-muted p-4 text-center">
            <p>&copy; 2025 DJSCE IT Department</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
