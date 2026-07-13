import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/AppShell.jsx"; // Adjust the import path based on your folder structure

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Safai · Corporate Building1",
  description: "Facility Management App",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body 
        className="font-sans text-safai-text min-h-screen flex items-center justify-center p-4"
        style={{
          background: `
            radial-gradient(circle at 12% 8%, rgba(59,130,246,.16), transparent 42%),
            radial-gradient(circle at 88% 14%, rgba(56,189,248,.14), transparent 40%),
            radial-gradient(circle at 50% 100%, rgba(29,78,216,.10), transparent 55%),
            radial-gradient(circle at 50% 45%, rgba(255,255,255,.35), transparent 60%),
            #EAF1EE
          `
        }}
      >
        <AppShell>
          {children}
        </AppShell>
      </body>
    </html>
  );
}