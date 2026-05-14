import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VOLTEX | Table Tennis Live Intelligence",
  description: "AI-powered live match intelligence dashboard exclusively for Table Tennis. Real-time tactical analysis, player telemetry, win probability, and live prediction powered by Google Gemini.",
  keywords: ["table tennis", "ping pong", "ITTF", "AI sports", "live match analysis", "Gemini AI"],
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
