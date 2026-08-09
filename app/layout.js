import './globals.css'
import { Providers } from './providers'

export const metadata = {
  title: 'finanCseek | Seek clarity. Find growth.',
  description: 'Professional financial guidance for individuals and businesses.',
}

export default function RootLayout({ children }) {
  return <html lang="en"><body><Providers>{children}</Providers></body></html>
}
