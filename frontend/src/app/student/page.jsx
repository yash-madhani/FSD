"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function StudentPortal() {
  const [file, setFile] = useState(null)
  const [selectedClass, setSelectedClass] = useState("")
  const [selectedLecture, setSelectedLecture] = useState("")

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would handle the file upload and form submission
    console.log("File:", file)
    console.log("Class:", selectedClass)
    console.log("Lecture:", selectedLecture)
    // You would typically send this data to your backend
  }

  return (
    (<div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Student Attendance Regularization</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="document">Upload Signed Document</Label>
          <Input id="document" type="file" onChange={handleFileChange} />
        </div>
        <div>
          <Label htmlFor="class">Select Your Class</Label>
          <Select onValueChange={setSelectedClass}>
            <SelectTrigger>
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="class1">Class 1</SelectItem>
              <SelectItem value="class2">Class 2</SelectItem>
              <SelectItem value="class3">Class 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="lecture">Select Lecture</Label>
          <Select onValueChange={setSelectedLecture}>
            <SelectTrigger>
              <SelectValue placeholder="Select lecture" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lecture1">Lecture 1</SelectItem>
              <SelectItem value="lecture2">Lecture 2</SelectItem>
              <SelectItem value="lecture3">Lecture 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit">Submit Request</Button>
      </form>
    </div>)
  );
}

