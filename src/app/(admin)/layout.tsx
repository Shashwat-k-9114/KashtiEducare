import type { Metadata, Viewport } from "next";
import { AdminSprite } from "@/components/admin/Icon";
import { Sprite } from "@/components/generated/Sprite";
import "./admin.css";

export const metadata: Metadata = {
  title: { default: "Admin | Kashti Educare", template: "%s | Kashti admin" },
  robots: { index: false, follow: false },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0B2A66" };

// Second root layout: the admin portal has its own <html> so it shares none of the public site's chrome or CSS.
export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
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
      <body className="a-body">
        <Sprite />
        <AdminSprite />
        {children}
      </body>
    </html>
  );
}
