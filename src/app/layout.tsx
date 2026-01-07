import type { Metadata } from 'next'
import { Inter, DM_Serif_Display, DM_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'

// Primary body font - clean, professional, highly readable
const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
})

// Display font for headlines - elegant, authoritative
const dmSerifDisplay = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

// Heading font - modern, professional
const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

// Monospace for numbers/data
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "O'zbekiston Iqtisodiyot Assambleyasi | Tadbirkorlar Uchun Yagona Ekotizim",
  description: "O'zbekiston Iqtisodiyot Assambleyasi — 46+ sanoat assotsiatsiyasini birlashtiruvchi, 8 ta strategik xizmat yo'nalishi va $20B+ investitsiya loyihalarini boshqaruvchi tashkilot. Smart City, GR, FR, BR xizmatlari.",
  keywords: [
    "O'zbekiston",
    'Iqtisodiyot',
    'Assambleyasi',
    'Tadbirkorlik',
    'Investitsiya',
    'Smart City',
    'Biznes',
    'GR',
    'Government Relations',
    'Assotsiatsiyalar'
  ],
  authors: [{ name: "O'zbekiston Iqtisodiyot Assambleyasi" }],
  openGraph: {
    title: "O'zbekiston Iqtisodiyot Assambleyasi",
    description: "Tadbirkorlar Uchun Yagona Ekotizim — 8 ta strategik yo'nalish, 46+ assotsiatsiya",
    type: 'website',
    locale: 'uz_UZ',
    siteName: "Assembly.uz",
  },
  twitter: {
    card: 'summary_large_image',
    title: "O'zbekiston Iqtisodiyot Assambleyasi",
    description: "Tadbirkorlar Uchun Yagona Ekotizim",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="uz"
      className={`scroll-smooth ${inter.variable} ${dmSerifDisplay.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-body bg-navy-900 text-white overflow-x-hidden antialiased">
        {children}
      </body>
    </html>
  )
}
