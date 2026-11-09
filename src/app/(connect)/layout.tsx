import type { Metadata, Viewport } from "next";
import "./connect.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://kashtieducare.com"),
  title: "Connect | Kashti Educare",
  description:
    "Everything Kashti Educare in one place: programmes, stories, social channels and the quickest ways to reach us. Real world, real learning, real impact.",
  alternates: { canonical: "/connect" },
  openGraph: {
    title: "Connect with Kashti Educare",
    description: "What if the classroom had no walls? Explore Kashti's experiences and start a conversation.",
    url: "/connect",
    siteName: "Kashti Educare",
    type: "website",
  },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0A1C48" };

// Third root layout: /connect is opened from a QR code on a phone, so it is deliberately light (no site chrome, no page engine).
export default function ConnectRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="cx-body">{children}</body>
    </html>
  );
}
