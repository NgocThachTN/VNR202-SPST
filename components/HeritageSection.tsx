'use client';

import { motion } from 'framer-motion';
import { BookOpen, Star, ArrowRight, Target } from 'lucide-react';
import Link from 'next/link';

export default function HeritageSection() {
  return (
    <section className="bg-[#F5E6D3] py-24 relative overflow-hidden border-b-4 border-[#2C2A29]">
      <div className="absolute inset-0 opacity-40 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
      
      <div className="container-custom relative mx-auto px-6">
        {/* Newspaper Masthead */}
        <div className="text-center mb-16 border-b-4 border-double border-[#2C2A29] pb-8">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.3em] text-[#2C2A29] mb-4">
            <span>SỐ CHUYÊN ĐỀ: GIẢI MÃ VĂN KIỆN</span>
            <span className="hidden md:block">TƯ DUY ĐỔI MỚI - GEN Z CONNECT</span>
            <span>VIỆT NAM 2026</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-serif-heading font-black text-[#2C2A29] uppercase tracking-tighter leading-none mb-4">
            Góc Nhìn <span className="text-[#DA251D]">Di Sản</span>
          </h2>
          <p className="font-serif-body text-xl italic text-[#5C554E] max-w-2xl mx-auto">
            "Những trang văn kiện tưởng chừng khô khan lại chứa đựng những quyết sách thay đổi vận mệnh hàng chục triệu con người."
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Column - Editorial */}
          <div className="lg:col-span-2 space-y-8">
            <div className="relative border-4 border-double border-[#2C2A29] bg-[#FAF3EB] shadow-[8px_8px_0px_0px_#2C2A29] overflow-hidden">
              {/* Newspaper header */}
              <div className="px-8 pt-6 pb-5 border-b-4 border-double border-[#2C2A29] bg-[#F5E6D3]">
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#5C554E] mb-2">
                  Chuyên đề · Văn kiện Đảng
                </p>
                <h3 className="text-2xl md:text-3xl font-serif-heading font-black text-[#2C2A29] uppercase leading-tight mb-2">
                  Ba Bước Chuyển Mình Định Hình Lại Nền Kinh Tế
                </h3>
                <p className="font-serif-body text-sm italic text-[#5C554E]">
                  Từ khủng hoảng thiếu gạo đến mở cửa thị trường — hiểu rõ từng quyết định then chốt.
                </p>
              </div>

              {/* 3 articles */}
              <div className="divide-y divide-[#2C2A29]/15">

                {/* Article 1 */}
                <div className="flex gap-5 px-8 py-6 hover:bg-[#F0E7D8] transition-colors group">
                  <div className="shrink-0 flex flex-col items-center gap-1.5 pt-0.5">
                    <div className="border-2 border-[#2C2A29] overflow-hidden w-14 text-center shadow-[2px_2px_0px_0px_#2C2A29]">
                      <div className="bg-[#2C2A29] text-[#FAF3EB] text-[8px] font-bold uppercase tracking-wider px-1 py-0.5">NĂM</div>
                      <div className="font-serif-heading font-black text-lg text-[#DA251D] py-1 leading-none">1976</div>
                    </div>
                    <span className="text-[8px] font-bold uppercase tracking-wider text-[#2C2A29] text-center leading-tight">Đường Lối</span>
                  </div>
                  <div>
                    <h4 className="font-serif-heading font-black text-base md:text-lg text-[#2C2A29] uppercase leading-tight mb-1.5 group-hover:text-[#DA251D] transition-colors">
                      Nghị Quyết Đảng — Kim Chỉ Nam Quốc Gia
                    </h4>
                    <p className="font-serif-body text-sm text-[#5C554E] leading-relaxed text-justify">
                      Cuối thập niên 70, Việt Nam đối mặt với thiếu lương thực, lạm phát gần <strong className="text-[#2C2A29]">700%</strong>, hàng hóa khan hiếm toàn diện. Thay vì chờ khủng hoảng tự tan, Đảng dùng Nghị quyết như một <strong className="text-[#2C2A29]">kế hoạch hành động rõ ràng</strong> — xác định đúng vấn đề, đặt mục tiêu cụ thể, phân công trách nhiệm từng cấp. Nhờ đó cả hệ thống vận hành cùng một hướng thay vì mỗi nơi làm một kiểu.
                    </p>
                  </div>
                </div>

                {/* Article 2 */}
                <div className="flex gap-5 px-8 py-6 hover:bg-[#F0E7D8] transition-colors group">
                  <div className="shrink-0 flex flex-col items-center gap-1.5 pt-0.5">
                    <div className="border-2 border-[#2C2A29] overflow-hidden w-14 text-center shadow-[2px_2px_0px_0px_#2C2A29]">
                      <div className="bg-[#2C2A29] text-[#FAF3EB] text-[8px] font-bold uppercase tracking-wider px-1 py-0.5">NĂM</div>
                      <div className="font-serif-heading font-black text-lg text-[#DA251D] py-1 leading-none">1981</div>
                    </div>
                    <span className="text-[8px] font-bold uppercase tracking-wider text-[#2C2A29] text-center leading-tight">Nông Nghiệp</span>
                  </div>
                  <div>
                    <h4 className="font-serif-heading font-black text-base md:text-lg text-[#2C2A29] uppercase leading-tight mb-1.5 group-hover:text-[#DA251D] transition-colors">
                      Khoán 100 — Trao Quyền Cho Người Nông Dân
                    </h4>
                    <p className="font-serif-body text-sm text-[#5C554E] leading-relaxed text-justify">
                      Trước 1981, nông dân làm chung trong hợp tác xã — <strong className="text-[#2C2A29]">ai làm ít hay làm nhiều đều nhận phần bằng nhau</strong>. Không ai có động lực làm thêm nên năng suất rất thấp. Khoán 100 phá vỡ điều đó: khoán thẳng sản lượng tới từng hộ gia đình — <strong className="text-[#DA251D]">làm nhiều hưởng nhiều, làm ít hưởng ít</strong>. Chỉ một vụ sau khi áp dụng, sản lượng lương thực tăng vọt rõ rệt.
                    </p>
                  </div>
                </div>

                {/* Article 3 */}
                <div className="flex gap-5 px-8 py-6 hover:bg-[#F0E7D8] transition-colors group">
                  <div className="shrink-0 flex flex-col items-center gap-1.5 pt-0.5">
                    <div className="border-2 border-[#2C2A29] overflow-hidden w-14 text-center shadow-[2px_2px_0px_0px_#2C2A29]">
                      <div className="bg-[#2C2A29] text-[#FAF3EB] text-[8px] font-bold uppercase tracking-wider px-1 py-0.5">NĂM</div>
                      <div className="font-serif-heading font-black text-lg text-[#DA251D] py-1 leading-none">1985</div>
                    </div>
                    <span className="text-[8px] font-bold uppercase tracking-wider text-[#2C2A29] text-center leading-tight">Kinh Tế</span>
                  </div>
                  <div>
                    <h4 className="font-serif-heading font-black text-base md:text-lg text-[#2C2A29] uppercase leading-tight mb-1.5 group-hover:text-[#DA251D] transition-colors">
                      Hội Nghị TW 8 — Xóa Bao Cấp, Mở Thị Trường
                    </h4>
                    <p className="font-serif-body text-sm text-[#5C554E] leading-relaxed text-justify">
                      Thời bao cấp, Nhà nước định giá mọi thứ và phân phối qua tem phiếu — <strong className="text-[#2C2A29]">giá không phản ánh cung cầu thực tế</strong>, doanh nghiệp không có lợi nhuận để tái đầu tư. Hội nghị TW 8 quyết định để <strong className="text-[#DA251D]">thị trường tự định giá</strong>, doanh nghiệp tự hạch toán lãi lỗ. Lần đầu tiên Nhà nước thừa nhận kinh tế phải vận hành theo quy luật cung — cầu, dọn đường thẳng cho Đổi Mới 1986.
                    </p>
                  </div>
                </div>

              </div>

              {/* Footer */}
              <div className="px-8 py-4 bg-[#E8D9C5] border-t-2 border-[#2C2A29]/20 flex items-center justify-between">
                <span className="font-serif-body text-[11px] italic text-[#5C554E]">
                  Nguồn: tulieuvankien.dangcongsan.vn
                </span>
                <Link href="/noi-dung-chinh" className="flex items-center gap-1.5 text-[#DA251D] font-black uppercase text-[11px] tracking-widest hover:gap-3 transition-all">
                  Xem tư liệu đầy đủ <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Sub-articles */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="border-l-4 border-[#DA251D] pl-6 hover:bg-[#2C2A29]/5 p-4 transition-colors group">
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#DA251D] mb-1">1976</p>
                <h4 className="font-serif-heading font-black text-lg text-[#2C2A29] mb-2 uppercase group-hover:text-[#DA251D] transition-colors">Đại hội IV — Thống Nhất Nhà Nước</h4>
                <p className="font-serif-body text-xs text-[#5C554E] leading-relaxed">
                  Tổng tuyển cử 25/4/1976 lần đầu tiên hợp nhất hai hệ thống chính quyền Bắc – Nam thành một nhà nước duy nhất. Đây là nền móng pháp lý vững chắc để cả nước cùng đi một hướng trong công cuộc xây dựng đất nước.
                </p>
              </div>
              <div className="border-l-4 border-[#DA251D] pl-6 hover:bg-[#2C2A29]/5 p-4 transition-colors group">
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#DA251D] mb-1">1986</p>
                <h4 className="font-serif-heading font-black text-lg text-[#2C2A29] mb-2 uppercase group-hover:text-[#DA251D] transition-colors">Đại hội VI — Dũng Cảm Nhìn Thẳng Sự Thật</h4>
                <p className="font-serif-body text-xs text-[#5C554E] leading-relaxed">
                  Phương châm "Nhìn thẳng vào sự thật" buộc toàn Đảng thẳng thắn thừa nhận những yếu kém trong quản lý kinh tế. Chính sự dũng cảm đó đã mở ra cuộc Đổi Mới toàn diện — bước ngoặt lớn nhất của lịch sử kinh tế Việt Nam hiện đại.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar - Stamped Cards/Badge */}
          <div className="space-y-8">
            <div className="bg-[#FAF3EB] border-2 border-dashed border-[#2C2A29] p-6 text-center rotate-1 shadow-sm">
              <div className="text-[#DA251D] mb-4">
                <Target size={32} className="mx-auto" />
              </div>
              <h4 className="font-serif-heading font-black text-xl text-[#2C2A29] mb-2 uppercase tracking-tighter">
                Bài Học Cốt Lõi
              </h4>
              <ul className="text-left space-y-3 font-serif-body text-xs text-[#333]">
                <li className="flex items-start gap-2">
                  <Star size={12} className="mt-1 shrink-0 text-[#DA251D]" />
                  <span>Văn kiện là nền tảng định hướng cho mọi quyết sách lớn của đất nước.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Star size={12} className="mt-1 shrink-0 text-[#DA251D]" />
                  <span>Dám thừa nhận sai lầm và sửa đổi kịp thời là bản lĩnh của một Đảng mạnh.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Star size={12} className="mt-1 shrink-0 text-[#DA251D]" />
                  <span>Mỗi đổi mới lớn trong lịch sử đều bắt đầu từ việc lắng nghe thực tiễn.</span>
                </li>
              </ul>
            </div>

            {/* "Clipping" Style Call to Action */}
            <div className="relative group overflow-hidden">
               <div className="absolute inset-0 bg-[#2C2A29] translate-x-1 translate-y-1 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform" />
               <div className="relative bg-[#DA251D] border-2 border-[#2C2A29] p-6 text-[#FAF3EB]">
                 <BookOpen size={24} className="mb-4" />
                 <h4 className="text-xl font-serif-heading font-black uppercase mb-2">Bạn đã sẵn sàng?</h4>
                 <p className="text-xs font-serif-body italic mb-6 opacity-90">Cùng lật lại những trang hồ sơ "quyền lực" nhất lịch sử dân tộc.</p>
                 <Link href="/noi-dung-chinh" className="inline-block bg-[#FAF3EB] text-[#2C2A29] px-6 py-2 font-black text-xs uppercase tracking-widest hover:bg-[#F4D03F] transition-colors">
                   Khám phá ngay
                 </Link>
               </div>
            </div>

            <div className="pt-4 text-center">
            
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
