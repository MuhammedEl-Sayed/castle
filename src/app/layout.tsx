import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";
import FlameCanvas from "@/components/FlameCanvas";
import CustomCursor from "@/components/CustomCursor";

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata = {
  title: "Castle Muhammed - Portfolio",
  description: "A soft fantasy portfolio site built with Next.js & Tailwind CSS."
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lora.className} bg-parchment-texture min-h-screen text-parchment-ink antialiased`}
      >
                <CustomCursor />
        {children}
      </body>
    </html>
  );
}
