"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Define routes - Giữ nguyên object này để không hỏng link
const ROUTES = {
  HOME: "/",
  NOIDUNG: "/noi-dung-chinh",
  ONTAP: "/on-tap-quiz",
  QUIZ_HOST: "/quiz-host",
  QUIZ_JOIN: "/quiz-join",
  THANHVIEN: "/thanh-vien"
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMasthead, setShowMasthead] = useState(true);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    setShowMasthead(isHomePage && window.scrollY === 0);
  }, [pathname, isHomePage]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowMasthead(isHomePage && currentScrollY === 0);
    };

    const throttledHandleScroll = () => {
      window.requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [isHomePage]);

  return (
    <motion.nav 
      className="w-full fixed z-50 bg-white/80 backdrop-blur-md border-b-2 border-black"
      initial={false}
    >
      <div className="h-1 w-full bg-[#A61F2B]"></div>
    
      <div className="absolute top-12 left-16 w-32 h-32 bg-[#A61F2B]/10 rounded-full blur-2xl"></div>
      <div className="absolute top-8 right-16 w-24 h-24 bg-black/5 rounded-full blur-xl"></div>
      
      <motion.div
        className="overflow-hidden"
        animate={{ 
          height: showMasthead ? "auto" : 0,
          opacity: showMasthead ? 1 : 0,
        }} 
        transition={{
          height: { duration: 0.35, ease: [0.1, 0.9, 0.2, 1] },
          opacity: { duration: showMasthead ? 0.3 : 0.15 }
        }}
      >
        <div className="container mx-auto py-6 px-4 border-b border-black/40 relative">
          <div className="flex flex-col md:flex-row items-center justify-between text-center relative z-10">
            {/* Thay đổi Label trái */}
            <p className="text-xs uppercase tracking-widest mb-3 md:mb-0 font-medium">Lý Luận Chính Trị</p>

            {/* Centered Title - Thay đổi tiêu đề chính */}
            <Link href="/" className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 group mb-3 md:mb-0">
              <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl tracking-wider uppercase text-center inline-block relative">
                <span className="text-black">CHỦ NGHĨA </span>
                <span className="text-[#A61F2B]">XÃ HỘI</span>
                <span className="absolute -top-2 -right-2 text-[#A61F2B] text-xs">®</span>
              </h1>
            </Link>

            {/* Thay đổi Label phải */}
            <p className="text-xs uppercase tracking-widest font-medium">Dân Chủ Xã Hội Chủ Nghĩa</p>
          </div>
        </div>
      </motion.div>

      {/* Main navbar content */}
      <motion.div 
        className="container mx-auto px-4 lg:px-6 relative z-10"
        animate={{ 
          y: showMasthead ? 0 : 5,
        }}
        transition={{ duration: 0.35, ease: [0.1, 0.9, 0.2, 1] }}
      >
        <div className="flex justify-between items-center h-16 border-b border-black/20">
          <div className="hidden md:flex items-center">
            <div className="w-16 h-[1px] bg-black/60"></div>
            <motion.div
              className="ml-4"
              animate={{
                opacity: showMasthead ? 0 : 1,
                x: showMasthead ? -20 : 0,
              }}
            >
              <Link href="/" className="group">
                <h1 className="font-bold text-lg tracking-wider uppercase inline-block relative whitespace-nowrap">
                  <span className="text-black">CN </span>
                  <span className="text-[#A61F2B]">XÃ HỘI</span>
                  <span className="absolute -top-1 -right-1 text-[#A61F2B] text-[8px]">®</span>
                </h1>
              </Link>
            </motion.div>
          </div>

          {/* Desktop Navigation - Giữ nguyên logic Link */}
          <div className="hidden md:flex items-center justify-center space-x-8 mx-auto">
            {[
              { name: "Trang chủ", path: ROUTES.HOME },
              { name: "Nội dung học tập", path: ROUTES.NOIDUNG },
              { name: "Video bài giảng", path: ROUTES.ONTAP },
              { name: "Tạo Quiz", path: ROUTES.QUIZ_HOST },
              { name: "Tham gia", path: ROUTES.QUIZ_JOIN },
              { name: "Thành viên", path: ROUTES.THANHVIEN }
            ].map((item, index) => (
              <Link
                key={item.name}
                href={item.path}
                className={`group relative px-2 py-1 transition-colors font-medium tracking-widest text-xs ${
                  pathname === item.path ? 'text-[#A61F2B]' : 'text-black hover:text-[#A61F2B]'
                }`}
              >
                <span className="relative">
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 h-[1px] bg-[#A61F2B] transition-all duration-300 ${
                    pathname === item.path ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </span>
                {index < 5 && (
                  <span className="absolute -right-4 top-1/2 transform -translate-y-1/2 text-black/40">/</span>
                )}
              </Link>
            ))}
          </div>

          {/* Right side elements */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex flex-col items-end mr-2">
                <span className="text-[10px] font-bold text-black/40 leading-none">VIỆT NAM</span>
                <span className="text-[10px] font-bold text-[#A61F2B] leading-none">2045</span>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-5 flex items-center justify-center border border-black/10">
                <Image
                  src="/image.png"
                  alt="Vietnamese Emblem"
                  width={32}
                  height={20}
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex items-center justify-center p-2 text-black/80 hover:text-[#A61F2B]"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </motion.div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-black/10 shadow-lg"
          >
            <div className="container mx-auto px-4 py-6">
              <div className="space-y-0">
                {[
                  { name: "Trang chủ", path: ROUTES.HOME },
                  { name: "Nội dung học tập", path: ROUTES.NOIDUNG },
                  { name: "Ôn tập", path: ROUTES.ONTAP },
                  { name: "Tạo Quiz", path: ROUTES.QUIZ_HOST },
                  { name: "Tham gia", path: ROUTES.QUIZ_JOIN },
                  { name: "Thành viên & Báo cáo", path: ROUTES.THANHVIEN }
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    className={`flex items-center py-4 border-b border-black/5 font-medium ${
                      pathname === item.path ? 'text-[#A61F2B]' : 'text-black'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="mr-3 text-[#A61F2B]">—</span>
                    <span className="uppercase text-xs tracking-widest">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}