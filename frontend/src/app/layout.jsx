import RootLayoutClient from "./RootLayoutClient"

export const metadata = {
  title: "IT Attendance Portal",
  description: "Manage attendance regularization for committee work",
}

export default function Layout({ children }) {
  return <RootLayoutClient>{children}</RootLayoutClient>
}
