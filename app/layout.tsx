import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Oryvn — AI retouching for Photoshop",
  description:
    "A senior retoucher inside Photoshop. Tell it what you need — frequency separation, Camera Raw, smart objects, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-bg text-text-muted">
        <Nav />
        {children}
      </body>
    </html>
  );
}
