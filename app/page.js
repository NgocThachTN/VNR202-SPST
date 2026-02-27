'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-white/95 backdrop-blur-sm border-b border-[#E5E5E5]">
        <div className="max-w-[860px] mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl font-bold text-[#1C1C1C] mb-6 leading-tight">
            CHỦ NGHĨA XÃ HỘI KHOA HỌC
          </h1>
          <p className="text-lg text-[#585858] leading-relaxed mb-8 max-w-[680px] mx-auto">
            Nghiên cứu các quy luật khách quan của quá trình cách mạng, bản chất của nền dân chủ 
            và thực tiễn thời kỳ quá độ lên chủ nghĩa xã hội tại Việt Nam.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/noi-dung-chinh"
              className="px-6 py-3 bg-[#A61F2B] text-white rounded-lg hover:bg-[#8B1923] transition-colors duration-200"
            >
              Khám phá lý luận chính trị
            </Link>
            <button
              onClick={() => document.querySelector('.fixed.bottom-6.right-6 button')?.click()}
              className="px-6 py-3 border border-[#E5E5E5] text-[#1C1C1C] rounded-lg hover:border-[#A61F2B] hover:text-[#A61F2B] transition-colors duration-200"
            >
              Hỏi nhanh AI
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-[860px] mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-[#FFFFFF] mb-8 text-center">
          Nội dung học tập
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/noi-dung-chinh"
            className="bg-white border border-[#E5E5E5] rounded-lg p-6 hover:border-[#A61F2B] transition-colors duration-200 group"
          >
            <h3 className="text-lg font-semibold text-[#1C1C1C] mb-2 group-hover:text-[#A61F2B]">
              Lý luận cốt lõi
            </h3>
            <p className="text-[#585858] text-sm leading-relaxed">
              4 chủ đề trọng tâm về CNXH khoa học và thực tiễn Việt Nam
            </p>
          </Link>
          
          <Link
            href="/on-tap-quiz"
            className="bg-white border border-[#E5E5E5] rounded-lg p-6 hover:border-[#A61F2B] transition-colors duration-200 group"
          >
            <h3 className="text-lg font-semibold text-[#1C1C1C] mb-2 group-hover:text-[#A61F2B]">
              Video Tổng Hợp
            </h3>
            <p className="text-[#585858] text-sm leading-relaxed">
              Xem video tổng hợp kiến thức về dân chủ và thời kỳ quá độ
            </p>
          </Link>

          <Link
            href="/quiz-host"
            className="bg-white border border-[#E5E5E5] rounded-lg p-6 hover:border-[#A61F2B] transition-colors duration-200 group"
          >
            <h3 className="text-lg font-semibold text-[#1C1C1C] mb-2 group-hover:text-[#A61F2B]">
              Quiz real-time
            </h3>
            <p className="text-[#585858] text-sm leading-relaxed">
              Tạo phòng, phát câu hỏi trắc nghiệm lý luận; tham gia tại /quiz-join
            </p>
          </Link>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="max-w-[860px] mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-[#FFFFFF] mb-8 text-center">
          Gợi ý sử dụng website
        </h2>
        <div className="bg-white border border-[#E5E5E5] rounded-lg p-8">
          <ul className="space-y-4 text-[#1C1C1C] leading-relaxed">
            <li className="flex items-start gap-3">
              <span className="text-[#A61F2B] font-bold flex-shrink-0">•</span>
              <span>Truy cập <strong>Nội dung chính</strong> để nghiên cứu sâu về sứ mệnh lịch sử của giai cấp công nhân</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#A61F2B] font-bold flex-shrink-0">•</span>
              <span>Sử dụng Trợ lý AI chuyên sâu để giải thích các khái niệm như "Bỏ qua chế độ TBCN"</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#A61F2B] font-bold flex-shrink-0">•</span>
              <span>Truy cập <strong>Video Tổng Hợp</strong> để nắm bắt trực quan các hình thái dân chủ trong lịch sử</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#A61F2B] font-bold flex-shrink-0">•</span>
              <span>Hệ thống hóa các luận điểm về bản chất chính trị, kinh tế, văn hóa của nền dân chủ XHCN</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}