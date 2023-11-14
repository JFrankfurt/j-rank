import type { Metadata } from 'next'
import { Work_Sans } from 'next/font/google'
import styles from './layout.module.scss'
import './globals.css'

// Font files can be colocated inside of `app`
const workSans = Work_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'J-Rank',
  description: 'bjj ranking system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${workSans.className} ${styles.body}`}>
        {children}
      </body>
    </html>
  )
}
