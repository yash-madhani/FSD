import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    (<div className="flex flex-col items-center justify-center space-y-8">
      <h2 className="text-3xl font-bold text-center">Welcome to Attendance Regularization System</h2>
      <div className="flex flex-col gap-3 sm:items-center sm:justify-center sm:flex-row">
        <Link className="m-auto" href="/student">
          <Button size="lg">Student Portal</Button>
        </Link>
        <Link className="m-auto" href="/teacher">
          <Button size="lg" variant="outline">
            Teacher Dashboard
          </Button>
        </Link>
      </div>
    </div>)
  );
}

