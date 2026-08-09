import './globals.css'
import { Providers } from './providers'

export const metadata = {
  title: 'Northstar Financial | Clear advice for important decisions',
  description: 'A professional financial consultancy website architecture with structured service pages.',
}

export default function RootLayout({ children }) {
  return <html lang="en"><body><Providers>{children}</Providers></body></html>
}
