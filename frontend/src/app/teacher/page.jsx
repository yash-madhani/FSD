import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

// This would typically come from your backend
const attendanceRequests = [
  { id: 1, student: "John Doe", class: "Class 1", lecture: "Lecture 1", date: "2025-02-05" },
  { id: 2, student: "Jane Smith", class: "Class 2", lecture: "Lecture 2", date: "2025-02-06" },
  // Add more mock data as needed
]

export default function TeacherDashboard() {
  return (
    (<div>
      <h2 className="text-2xl font-bold mb-4">Teacher Dashboard</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Lecture</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attendanceRequests.map((request) => (
            <TableRow key={request.id}>
              <TableCell>{request.student}</TableCell>
              <TableCell>{request.class}</TableCell>
              <TableCell>{request.lecture}</TableCell>
              <TableCell>{request.date}</TableCell>
              <TableCell>
                <Button size="sm">Approve</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>)
  );
}

