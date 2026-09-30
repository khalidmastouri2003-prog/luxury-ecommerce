import type { Metadata, Viewport } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Aurelia Maison — Fine Jewelry",
  description: "A quiet luxury jewelry house shaped by light, form, and permanence.",
}

export const viewport: Viewport = {
  themeColor: "#171716",
  colorScheme: "dark light",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>
}
