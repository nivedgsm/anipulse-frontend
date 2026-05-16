import type { Metadata } from "next";
import "./globals.css";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: {
    default: "Anivoid",
    template: "%s | Anivoid",
  },
  description:
    "Latest anime news, manga updates, trailers, seasonal anime, and anime industry coverage.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://anivoid.com"
  ),
  openGraph: {
    title: "Anivoid",
    description:
      "Latest anime news, manga updates, trailers, seasonal anime, and anime industry coverage.",
    url: "/",
    siteName: "Anivoid",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Anivoid Anime News Network",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anivoid",
    description:
      "Latest anime news, manga updates, trailers, seasonal anime, and anime industry coverage.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="dark"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <div className="relative flex min-h-screen flex-col overflow-hidden">
          <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(79,125,254,0.12),transparent_34rem)]" />

          <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_18%_0%,rgba(47,67,206,0.18),transparent_34rem),radial-gradient(circle_at_88%_8%,rgba(79,125,254,0.12),transparent_30rem)]" />

          <Navbar />

          <main className="relative z-10 flex-1">{children}</main>

          <Footer />
        </div>
      </body>
    </html>
  );
}