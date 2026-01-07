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
  title: "O'zbekiston Iqtisodiyot Assambleyasi",
  description: "Tadbirkorlar Uchun Yagona Ekotizim",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      className={`scroll-smooth ${inter.variable} ${dmSerifDisplay.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
      style={{ backgroundColor: '#030712' }}
    >
      <body className="font-body bg-[#030712] text-white overflow-x-hidden antialiased" style={{ backgroundColor: '#030712' }}>
        {children}
      </body>
    </html>
  )
}
