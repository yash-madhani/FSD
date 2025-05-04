"use client"

import React, { useState } from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, UploadCloud } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"

// import { useSupabaseClient } from "@supabase/auth-helpers-react"

export default function StudentView() {
//   const supabase = useSupabaseClient()

  const [mode, setMode] = useState("single")
  const [singleDate, setSingleDate] = useState(null)
  const [range, setRange] = useState({ from: null, to: null })
  const [reason, setReason] = useState("")
  const [proof, setProof] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setIsSubmitting(true)

//     let proofUrl = null

//     if (proof) {
//       const { data, error } = await supabase.storage
//         .from("proofs")
//         .upload(`proofs/${Date.now()}-${proof.name}`, proof)

//       if (error) {
//         alert("Failed to upload proof.")
//         setIsSubmitting(false)
//         return
//       }

//       const { data: publicData } = supabase.storage
//         .from("proofs")
//         .getPublicUrl(data.path)

//       proofUrl = publicData?.publicUrl
//     }

//     const payload = {
//       sap_id: "studentSapId", // replace with actual sap_id from session
//       reason,
//       proof_url: proofUrl,
//       date_type: mode,
//       single_date: mode === "single" && singleDate ? singleDate.toISOString() : null,
//       start_date: mode === "range" && range.from ? range.from.toISOString() : null,
//       end_date: mode === "range" && range.to ? range.to.toISOString() : null,
//     }

//     const { error } = await supabase.from("attendance_requests").insert(payload)

//     if (error) {
//       alert("Failed to submit request")
//     } else {
//       alert("Attendance request submitted successfully!")
//       setSingleDate(null)
//       setRange({ from: null, to: null })
//       setReason("")
//       setProof(null)
//     }

//     setIsSubmitting(false)
//   }

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg">
      <h1 className="text-2xl font-semibold mb-6">Submit Attendance Request</h1>

      <div className="flex gap-4 mb-4">
        <Button
          variant={mode === "single" ? "default" : "outline"}
          onClick={() => setMode("single")}
        >
          Single Day
        </Button>
        <Button
          variant={mode === "range" ? "default" : "outline"}
          onClick={() => setMode("range")}
        >
          Date Range
        </Button>
      </div>

      <form className="space-y-4">
        {/* Single Date Picker */}
        {mode === "single" && (
          <div>
            <label className="mb-2 block text-sm font-medium">Pick a date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !singleDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {singleDate ? format(singleDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={singleDate}
                  onSelect={setSingleDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        )}

        {/* Date Range Picker */}
        {mode === "range" && (
          <div>
            <label className="mb-2 block text-sm font-medium">Pick date range</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !range.from && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {range.from ? (
                    range.to ? (
                      `${format(range.from, "PPP")} - ${format(range.to, "PPP")}`
                    ) : (
                      `${format(range.from, "PPP")}`
                    )
                  ) : (
                    "Pick a date range"
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="range"
                  selected={range}
                  onSelect={setRange}
                  numberOfMonths={2}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        )}

        {/* Reason */}
        <div>
          <label className="block text-sm font-medium mb-2">Reason</label>
          <Textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Provide your reason"
            required
          />
        </div>

        {/* Proof Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">Proof (optional)</label>
          <Input
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => setProof(e.target.files?.[0] || null)}
          />
        </div>

        {/* Submit */}
        <Button type="submit" className="w-full mt-4" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Request"}
        </Button>
      </form>
    </div>
  )
}
