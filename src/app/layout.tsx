import type { Metadata } from "next";
import "./globals.css";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "AniPulse",
  description:
    "Latest anime news, streaming, trending anime and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >

      <body className="min-h-screen bg-background text-foreground antialiased">

        <div className="relative flex min-h-screen flex-col">

          {/* NAVBAR */}
          <Navbar />

          {/* PAGE CONTENT */}
          <main className="flex-1">
            {children}
          </main>

          {/* FOOTER */}
          <Footer />

        </div>

      </body>

    </html>

  );

}