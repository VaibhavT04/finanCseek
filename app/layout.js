import { IBM_Plex_Sans_Thai_Looped } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const ibmPlexSansThaiLooped = IBM_Plex_Sans_Thai_Looped({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin', 'thai'],
  display: 'swap',
  variable: '--font-ibm-plex-sans-thai-looped',
})

export const metadata = {
  title: 'finanCseek | Seek clarity. Find growth.',
  description: 'Professional financial guidance for individuals and businesses.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={ibmPlexSansThaiLooped.variable}>
      <body className={ibmPlexSansThaiLooped.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
