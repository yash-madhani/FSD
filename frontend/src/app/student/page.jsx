// "use client"

// import React, { useState } from "react"
// import { format } from "date-fns"
// import { Calendar as CalendarIcon, UploadCloud } from "lucide-react"

// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Calendar } from "@/components/ui/calendar"
// import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"

// // import { useSupabaseClient } from "@supabase/auth-helpers-react"

// export default function StudentView() {
// //   const supabase = useSupabaseClient()

//   const [mode, setMode] = useState("single")
//   const [startTime, setStartTime] = useState("")
// const [endTime, setEndTime] = useState("")

//   const [singleDate, setSingleDate] = useState(null)
//   const [range, setRange] = useState({ from: null, to: null })
//   const [reason, setReason] = useState("")
//   const [proof, setProof] = useState(null)
//   const [isSubmitting, setIsSubmitting] = useState(false)

// //   const handleSubmit = async (e) => {
// //     e.preventDefault()
// //     setIsSubmitting(true)

// //     let proofUrl = null

// //     if (proof) {
// //       const { data, error } = await supabase.storage
// //         .from("proofs")
// //         .upload(`proofs/${Date.now()}-${proof.name}`, proof)

// //       if (error) {
// //         alert("Failed to upload proof.")
// //         setIsSubmitting(false)
// //         return
// //       }

// //       const { data: publicData } = supabase.storage
// //         .from("proofs")
// //         .getPublicUrl(data.path)

// //       proofUrl = publicData?.publicUrl
// //     }

// //     const payload = {
// //       sap_id: "studentSapId", // replace with actual sap_id from session
// //       reason,
// //       proof_url: proofUrl,
// //       date_type: mode,
// //       single_date: mode === "single" && singleDate ? singleDate.toISOString() : null,
// //       start_date: mode === "range" && range.from ? range.from.toISOString() : null,
// //       end_date: mode === "range" && range.to ? range.to.toISOString() : null,
// //     }

// //     const { error } = await supabase.from("attendance_requests").insert(payload)

// //     if (error) {
// //       alert("Failed to submit request")
// //     } else {
// //       alert("Attendance request submitted successfully!")
// //       setSingleDate(null)
// //       setRange({ from: null, to: null })
// //       setReason("")
// //       setProof(null)
// //     }

// //     setIsSubmitting(false)
// //   }

//   return (
//     <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg">
//       <h1 className="text-2xl font-semibold mb-6">Submit Attendance Request</h1>

//       <div className="flex gap-4 mb-4">
//         <Button
//           variant={mode === "single" ? "default" : "outline"}
//           onClick={() => setMode("single")}
//         >
//           Single Day
//         </Button>
//         <Button
//           variant={mode === "range" ? "default" : "outline"}
//           onClick={() => setMode("range")}
//         >
//           Date Range
//         </Button>
//       </div>

//       <form className="space-y-4">
//         {/* Single Date Picker */}
//         {mode === "single" && (
//           <div>
//             <label className="mb-2 block text-sm font-medium">Pick a date</label>
//             <Popover>
//               <PopoverTrigger asChild>
//                 <Button
//                   variant="outline"
//                   className={cn(
//                     "w-full justify-start text-left font-normal",
//                     !singleDate && "text-muted-foreground"
//                   )}
//                 >
//                   <CalendarIcon className="mr-2 h-4 w-4" />
//                   {singleDate ? format(singleDate, "PPP") : "Pick a date"}
//                 </Button>
//               </PopoverTrigger>
//               <PopoverContent className="w-auto p-0">
//                 <Calendar
//                   mode="single"
//                   selected={singleDate}
//                   onSelect={setSingleDate}
//                   initialFocus
//                 />
//               </PopoverContent>
//             </Popover>

//             <div className="flex gap-4">
//       <div className="w-1/2">
//         <label className="block text-sm font-medium mb-1">Start Time</label>
//         <Input
//           type="time"
//           value={startTime}
//           onChange={(e) => setStartTime(e.target.value)}
//           required
//         />
//       </div>
//       <div className="w-1/2">
//         <label className="block text-sm font-medium mb-1">End Time</label>
//         <Input
//           type="time"
//           value={endTime}
//           onChange={(e) => setEndTime(e.target.value)}
//           required
//         />
//       </div>
//     </div>
//           </div>

          


//         )}

//         {/* Date Range Picker */}
//         {mode === "range" && (
//           <div>
//             <label className="mb-2 block text-sm font-medium">Pick date range</label>
//             <Popover>
//               <PopoverTrigger asChild>
//                 <Button
//                   variant="outline"
//                   className={cn(
//                     "w-full justify-start text-left font-normal",
//                     !range.from && "text-muted-foreground"
//                   )}
//                 >
//                   <CalendarIcon className="mr-2 h-4 w-4" />
//                   {range.from ? (
//                     range.to ? (
//                       `${format(range.from, "PPP")} - ${format(range.to, "PPP")}`
//                     ) : (
//                       `${format(range.from, "PPP")}`
//                     )
//                   ) : (
//                     "Pick a date range"
//                   )}
//                 </Button>
//               </PopoverTrigger>
//               <PopoverContent className="w-auto p-0">
//                 <Calendar
//                   mode="range"
//                   selected={range}
//                   onSelect={setRange}
//                   numberOfMonths={2}
//                   initialFocus
//                 />
//               </PopoverContent>
//             </Popover>
//           </div>
//         )}

//         {/* Reason */}
//         <div>
//           <label className="block text-sm font-medium mb-2">Reason</label>
//           <Textarea
//             value={reason}
//             onChange={(e) => setReason(e.target.value)}
//             placeholder="Provide your reason"
//             required
//           />
//         </div>

//         {/* Proof Upload */}
//         <div>
//           <label className="block text-sm font-medium mb-2">Proof (optional)</label>
//           <Input
//             type="file"
//             accept="image/*,application/pdf"
//             onChange={(e) => setProof(e.target.files?.[0] || null)}
//           />
//         </div>

//         {/* Submit */}
//         <Button type="submit" className="w-full mt-4" disabled={isSubmitting}>
//           {isSubmitting ? "Submitting..." : "Submit Request"}
//         </Button>
//       </form>
//     </div>
//   )
// }




"use client";

import React, { useState } from "react";
import { useEffect } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, UploadCloud } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";

const timetable = {
  Monday: [
    { time: "9:00 AM - 10:00 AM", subject: "Mathematics", teacher: "HD" },
    { time: "10:00 AM - 11:00 AM", subject: "Physics", teacher: "ARJ" },
    { time: "11:00 AM - 12:00 PM", subject: "Chemistry", teacher: "SK" },
    { time: "1:00 PM - 2:00 PM", subject: "English", teacher: "RK" },
    { time: "2:00 PM - 3:00 PM", subject: "Computer Science", teacher: "PL" },
  ],
  Tuesday: [
    { time: "9:00 AM - 10:00 AM", subject: "Physics", teacher: "ARJ" },
    { time: "10:00 AM - 11:00 AM", subject: "Chemistry", teacher: "SK" },
    { time: "11:00 AM - 12:00 PM", subject: "Mathematics", teacher: "HD" },
    { time: "1:00 PM - 2:00 PM", subject: "Computer Science", teacher: "PL" },
    { time: "2:00 PM - 3:00 PM", subject: "English", teacher: "RK" },
  ],
  Wednesday: [
    { time: "9:00 AM - 10:00 AM", subject: "Chemistry", teacher: "SK" },
    { time: "10:00 AM - 11:00 AM", subject: "Mathematics", teacher: "HD" },
    { time: "11:00 AM - 12:00 PM", subject: "Physics", teacher: "ARJ" },
    { time: "1:00 PM - 2:00 PM", subject: "English", teacher: "RK" },
    { time: "2:00 PM - 3:00 PM", subject: "Computer Science", teacher: "PL" },
  ],
  Thursday: [
    { time: "9:00 AM - 10:00 AM", subject: "Computer Science", teacher: "PL" },
    { time: "10:00 AM - 11:00 AM", subject: "English", teacher: "RK" },
    { time: "11:00 AM - 12:00 PM", subject: "Mathematics", teacher: "HD" },
    { time: "1:00 PM - 2:00 PM", subject: "Physics", teacher: "ARJ" },
    { time: "2:00 PM - 3:00 PM", subject: "Chemistry", teacher: "SK" },
  ],
  Friday: [
    { time: "9:00 AM - 10:00 AM", subject: "English", teacher: "RK" },
    { time: "10:00 AM - 11:00 AM", subject: "Computer Science", teacher: "PL" },
    { time: "11:00 AM - 12:00 PM", subject: "Chemistry", teacher: "SK" },
    { time: "1:00 PM - 2:00 PM", subject: "Mathematics", teacher: "HD" },
    { time: "2:00 PM - 3:00 PM", subject: "Physics", teacher: "ARJ" },
  ],
  Saturday: [
    { time: "9:00 AM - 10:00 AM", subject: "Mathematics", teacher: "HD" },
    { time: "10:00 AM - 11:00 AM", subject: "Physics", teacher: "ARJ" },
    { time: "11:00 AM - 12:00 PM", subject: "Chemistry", teacher: "SK" },
    { time: "1:00 PM - 2:00 PM", subject: "Computer Science", teacher: "PL" },
    { time: "2:00 PM - 3:00 PM", subject: "English", teacher: "RK" },
  ],
};

// import { useSupabaseClient } from "@supabase/auth-helpers-react"

export default function StudentView() {
  //   const supabase = useSupabaseClient()

  

  const [mode, setMode] = useState("single");
  const [singleDate, setSingleDate] = useState(null);
  const [range, setRange] = useState({ from: null, to: null });
const [sapId, setSapId] = useState("");
  const [reason, setReason] = useState("");
  const [proof, setProof] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedLectures, setSelectedLectures] = useState([]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setSelectedLectures([]); // Reset selected lectures when date changes
  };

  const handleLectureToggle = (index) => {
    setSelectedLectures((prev) => {
      if (prev.includes(index.toString())) {
        return prev.filter((i) => i !== index.toString());
      } else {
        return [...prev, index.toString()];
      }
    });
  };

  const getDayFromDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "EEEE");
  };

  const dayOfWeek = selectedDate ? getDayFromDate(selectedDate) : null;
  const dayTimetable = dayOfWeek ? timetable[dayOfWeek] : null;


  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !session) return;
  
        const email = session.user.email;
  
        const { data: student, error: studentError } = await supabase
          .from("students")
          .select("sap_id")
          .eq("email", email)
          .single();
  
        if (student) {
          setSapId(student.sap_id);
          return;
        }
  
        const { data: teacher, error: teacherError } = await supabase
          .from("teachers")
          .select("sap_id")
          .eq("email", email)
          .single();
  
        if (teacher) {
          setSapId(teacher.sap_id);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      }
    };
  
    fetchUserDetails();
  }, []);

  // const buildTimeRange = () => {
  //   if (mode === "range" && range.from && range.to) {
  //     const from = new Date(range.from);
  //     from.setHours(6, 0, 0, 0);
  //     const to = new Date(range.to);
  //     to.setHours(20, 0, 0, 0);
  //     return `[${from.toISOString()},${to.toISOString()}]`;
  //   }
  
  //   if (mode === "single" && selectedDate && selectedLectures.length > 0) {
  //     const times = selectedLectures.map((index) => {
  //       const lecture = dayTimetable?.[parseInt(index)];
  //       return lecture?.time;
  //     }).filter(Boolean);
  
  //     const startTimes = times.map((t) => new Date(`${selectedDate} ${t?.split(" - ")[0]}`));
  //     const endTimes = times.map((t) => new Date(`${selectedDate} ${t?.split(" - ")[1]}`));
  
  //     const start = new Date(Math.min(...startTimes));
  //     const end = new Date(Math.max(...endTimes));
  //     return `[${start.toISOString()},${end.toISOString()}]`;
  //   }
  
  //   return null;
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);
  
  //   const timeRange = buildTimeRange();
  //   if (!sapId || !reason || !timeRange) {
  //     alert("Missing required fields");
  //     setIsSubmitting(false);
  //     return;
  //   }
  
  //   const payload = {
  //     student_sap_id: sapId,
  //     // timetable_id: 1,
  //     document_id: null,
  //     admin_id: "1",
  //     reason,
  //     is_approved: false,
  //     time_range: timeRange,
  //   };
  
  //   const { error } = await supabase.from("attendancerequests").insert(payload);
  
  //   if (error) {
  //     alert("Failed to submit request");
  //     console.error(error);
  //   } else {
  //     alert("Attendance request submitted!");
  //     // Reset form
  //     setSelectedDate("");
  //     setSingleDate(null);
  //     setRange({ from: null, to: null });
  //     setSelectedLectures([]);
  //     setReason("");
  //     setProof(null);
  //   }
  
  //   setIsSubmitting(false);
  // };


  
  
  


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

  const buildTimeRanges = () => {
    if (mode === "range" && range.from && range.to) {
      // For date range mode
      const from = new Date(range.from);
      from.setHours(6, 0, 0, 0);
      const to = new Date(range.to);
      to.setHours(20, 0, 0, 0);
      
      return [{
        start: from.toISOString(),
        end: to.toISOString()
      }];
    }
  
    if (mode === "single" && selectedDate && selectedLectures.length > 0) {
      // Sort lectures by their index to maintain chronological order
      const sortedLectures = [...selectedLectures].sort((a, b) => parseInt(a) - parseInt(b));
      
      // Group consecutive lectures together
      const lectureGroups = [];
      let currentGroup = [];
      
      sortedLectures.forEach((lectureIndex, arrayIndex) => {
        const currentLectureIdx = parseInt(lectureIndex);
        
        // Start a new group if this is the first lecture or if not consecutive
        if (arrayIndex === 0 || currentLectureIdx !== parseInt(sortedLectures[arrayIndex - 1]) + 1) {
          if (currentGroup.length > 0) {
            lectureGroups.push([...currentGroup]);
          }
          currentGroup = [currentLectureIdx];
        } else {
          currentGroup.push(currentLectureIdx);
        }
      });
      
      // Add the last group
      if (currentGroup.length > 0) {
        lectureGroups.push(currentGroup);
      }
      
      // Create time ranges for each group
      return lectureGroups.map(group => {
        const groupLectures = group.map(index => dayTimetable?.[index]).filter(Boolean);
        
        if (groupLectures.length === 0) return null;
        
        // Get the time strings
        const startTimeStr = groupLectures[0].time.split(" - ")[0];
        const endTimeStr = groupLectures[groupLectures.length - 1].time.split(" - ")[1];
        
        // Convert to proper date objects with IST timezone consideration
        // Parse times in 24-hour format to ensure correct times
        const [startHour, startMinute] = convertTo24Hour(startTimeStr);
        const [endHour, endMinute] = convertTo24Hour(endTimeStr);
        
        // Create local date objects first
        const startDate = new Date(selectedDate);
        startDate.setHours(startHour, startMinute, 0, 0);
        
        const endDate = new Date(selectedDate);
        endDate.setHours(endHour, endMinute, 0, 0);
        
        return {
          start: startDate.toISOString(),
          end: endDate.toISOString()
        };
      }).filter(Boolean);
    }
  
    return [];
  };
  
  // Helper function to convert AM/PM time to 24-hour format
  const convertTo24Hour = (timeStr) => {
    // Check if already in 24-hour format
    if (!timeStr.includes("AM") && !timeStr.includes("PM")) {
      const [hours, minutes] = timeStr.split(":").map(Number);
      return [hours, minutes];
    }
    
    const isPM = timeStr.toUpperCase().includes("PM");
    const timeWithoutAMPM = timeStr.replace(/\s*[APap][Mm]\s*/, "");
    let [hours, minutes] = timeWithoutAMPM.split(":").map(Number);
    
    if (isPM && hours < 12) {
      hours += 12;
    } else if (!isPM && hours === 12) {
      hours = 0;
    }
    
    return [hours, minutes];
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    const timeRanges = buildTimeRanges();
    if (!sapId || !reason || timeRanges.length === 0) {
      alert("Missing required fields");
      setIsSubmitting(false);
      return;
    }
  
    try {
      // Create multiple database entries for non-consecutive lecture groups
      const requests = timeRanges.map(range => ({
        student_sap_id: sapId,
        document_id: null,
        admin_id: "1",
        reason,
        is_approved: false,
        // Format for tstzrange in PostgreSQL
        time_range: `[${range.start},${range.end}]`
      }));
  
      const { error } = await supabase.from("attendancerequests").insert(requests);
  
      if (error) {
        alert("Failed to submit request");
        console.error(error);
      } else {
        alert(`Attendance request${requests.length > 1 ? 's' : ''} submitted!`);
        // Reset form
        setSelectedDate("");
        setSingleDate(null);
        setRange({ from: null, to: null });
        setSelectedLectures([]);
        setReason("");
        setProof(null);
      }
    } catch (err) {
      alert("An error occurred");
      console.error(err);
    }
  
    setIsSubmitting(false);
  };

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

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Single Date Picker */}
        {mode === "single" && (
          <div>
            <div>
              <label className="mb-2 block text-sm font-medium">
                Pick a date
              </label>
              <Input
                id="date"
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </div>

            {dayTimetable && (
              <div>
                <h3 className="text-sm font-semibold my-2">
                  Timetable for {dayOfWeek}
                </h3>
                <div className="space-y-2">
                  {dayTimetable.map((lecture, index) => {
                    const isSelected = selectedLectures.includes(
                      index.toString()
                    );

                    return (
                      <div
                        key={index}
                        className={`flex items-center space-x-4 p-4 rounded-lg border ${
                          isSelected ? "bg-green-100" : "bg-white"
                        }`}
                      >
                        <Checkbox
                          id={`lecture-${index}`}
                          checked={isSelected}
                          onCheckedChange={() => handleLectureToggle(index)}
                        />
                        <Label htmlFor={`lecture-${index}`} className="flex-1">
                          <span className="text-sm">{lecture.time}</span> -{" "}
                          {lecture.subject} ({lecture.teacher})
                        </Label>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Date Range Picker */}
        {mode === "range" && (
          <div>
            <label className="mb-2 block text-sm font-medium">
              Pick date range
            </label>
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
                  {range.from
                    ? range.to
                      ? `${format(range.from, "PPP")} - ${format(
                          range.to,
                          "PPP"
                        )}`
                      : `${format(range.from, "PPP")}`
                    : "Pick a date range"}
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
          <label className="block text-sm font-medium mb-2">
            Proof (optional)
          </label>
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
  );
}
