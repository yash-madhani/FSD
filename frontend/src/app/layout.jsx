import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "College Attendance Regularization",
  description: "Manage attendance regularization for committee work",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <header className="bg-primary text-primary-foreground p-4">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-2xl font-bold">College Attendance Regularization</h1>
              <nav>
                <ul className="flex space-x-4">
                  <li>
                    <Link href="/login">
                      <Button variant="secondary">Log in</Button>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </header>
          <main className="flex-grow container mx-auto p-4">{children}</main>
          <footer className="bg-muted p-4 text-center">
            <p>&copy; 2025 DJSCE IT Departent</p>
          </footer>
        </div>
      </body>
    </html>
  )
}

