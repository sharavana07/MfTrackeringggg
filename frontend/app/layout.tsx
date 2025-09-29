import "./globals.css";
import type { Metadata } from "next";
import Navbar from "../components/navabar";

export const metadata: Metadata = {
  title: "MF Dashboard",
  description: "Track mutual funds and stocks in real-time",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <Navbar />
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
