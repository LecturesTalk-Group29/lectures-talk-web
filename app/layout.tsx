import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from "./Header";
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme } from '@/mui-themes';
import CssBaseline from '@mui/material/CssBaseline';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lectures Talk',
  description: 'Studying - reinvented',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          {children}
        </body>
      </html>
    </ThemeProvider>
  )
}
