import type { Metadata } from 'next'
import { Bebas_Neue, DM_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'

// ═══════════════════════════════════════════════════════════════
// OFFICIAL ASSEMBLY TYPOGRAPHY
// Source: Brend Qo'llanmasi - Tipografiya section
// ═══════════════════════════════════════════════════════════════

// Display font for headlines - Bebas Neue (Official Brand Font)
const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
})

// Body/Heading font - DM Sans (Clean, professional)
const dmSans = DM_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-dm-sans',
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
      className={`scroll-smooth ${bebasNeue.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
      style={{ backgroundColor: '#005E85' }}
    >
      <body className="font-body bg-primary-500 text-white overflow-x-hidden antialiased" style={{ backgroundColor: '#005E85' }}>
        {children}
      </body>
    </html>
  )
}
