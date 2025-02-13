"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";

// Mock timetable data
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
}

export default function StudentPortal() {
  const [file, setFile] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedLectures, setSelectedLectures] = useState([]);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("File:", file);
    console.log("Date:", selectedDate);
    console.log("Selected Lectures:", selectedLectures);
    // You would typically send this data to your backend
  };

  const getDayFromDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "EEEE");
  };

  const dayOfWeek = selectedDate ? getDayFromDate(selectedDate) : null;
  const dayTimetable = dayOfWeek ? timetable[dayOfWeek] : null;

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Student Attendance Regularization</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="document">Upload Signed Document</Label>
          <Input id="document" type="file" onChange={handleFileChange} />
        </div>
        <div>
          <Label htmlFor="date">Select Date</Label>
          <Input id="date" type="date" value={selectedDate} onChange={handleDateChange} />
        </div>
        {dayTimetable && (
  <div>
    <h3 className="text-lg font-semibold mb-2">Timetable for {dayOfWeek}</h3>
    <div className="space-y-2">
      {dayTimetable.map((lecture, index) => {
        const isSelected = selectedLectures.includes(index.toString());

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
              <span className="font-medium">{lecture.time}</span> - {lecture.subject} ({lecture.teacher})
            </Label>
          </div>
        );
      })}
    </div>
  </div>
)}

        <Button type="submit">Submit Request</Button>
      </form>
    </div>
  );
}
