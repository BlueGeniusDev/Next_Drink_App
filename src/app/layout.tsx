import './globals.css'
import { Inter } from 'next/font/google'
import {DrinkContextProvider} from "@/context/DrinkContext";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Drinks Search'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <DrinkContextProvider>
            <body className={inter.className}>{children}</body>
        </DrinkContextProvider>
    </html>
  )
}
