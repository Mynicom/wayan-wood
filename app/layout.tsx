import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import ClientProviders from "@/components/cart/ClientProviders";
import AuthProviders from "@/components/auth/Providers";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Wayan Wood Work - Timeless Woodcraft for Modern Living",
    template: "%s | Wayan Wood Work",
  },
  description:
    "Handcrafted wooden furniture and home decor from Bali. Each piece carries its own distinct character with precisely crafted, comfortable, and flawlessly smooth surfaces.",
  keywords: [
    "wooden furniture",
    "handcrafted",
    "bali woodwork",
    "home decor",
    "woodcraft",
    "rattan furniture",
    "bamboo decor",
    "kitchen accessories",
    "bathroom accessories",
    "outdoor furniture",
  ],
  authors: [{ name: "Wayan Wood Work" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://wayanwoodwork.com",
    siteName: "Wayan Wood Work",
    title: "Wayan Wood Work - Timeless Woodcraft for Modern Living",
    description:
      "Handcrafted wooden furniture and home decor from Bali. Each piece carries its own distinct character.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Wayan Wood Work",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wayan Wood Work - Timeless Woodcraft for Modern Living",
    description:
      "Handcrafted wooden furniture and home decor from Bali.",
    images: ["https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&h=630&fit=crop"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Wayan Wood Work",
    description: "Handcrafted wooden furniture and home decor from Bali",
    url: "https://wayanwoodwork.com",
    logo: "/logo.png",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Br Tengah, Batuan, Kec. Sukawati",
      addressLocality: "Kabupaten Gianyar",
      addressRegion: "Bali",
      postalCode: "80582",
      addressCountry: "ID",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "081320325102554",
      contactType: "customer service",
      email: "wayanwoodwork@gmail.com",
    },
    sameAs: ["https://www.facebook.com/wayan.woodwork", "https://www.instagram.com/wayanwoodworkk/"],
  };

  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", inter.variable, playfair.variable, "font-sans")}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <AuthProviders>
          <ClientProviders>{children}</ClientProviders>
        </AuthProviders>
      </body>
    </html>
  );
}
