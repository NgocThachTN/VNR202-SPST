import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ChatBox from './components/ChatBox'

const inter = Inter({ subsets: ['latin', 'vietnamese'] })

export const metadata = {
  title: 'Đường lối cách mạng 1930–1945',
  description: 'Website học tập về đường lối cách mạng của Đảng Cộng sản Việt Nam giai đoạn 1930–1945',
}

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <Navbar />
        <main className="pt-[140px] md:pt-[120px] min-h-screen">
          {children}
        </main>
        <Footer />
        <ChatBox />
      </body>
    </html>
  )
}
