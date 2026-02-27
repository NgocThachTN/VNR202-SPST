"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

const sections = [
  {
    id: 1,
    title: "Quá độ lên CNXH ở Việt Nam",
    image: "https://llct.1cdn.vn/2022/04/11/lyluanchinhtri.vn-home-media-k2-items-cache-_e91f5df61683ad642f80f8746e777635_l.jpg",
    summary: "Đặc điểm nổi bật: Bỏ qua chế độ tư bản chủ nghĩa.",
    content: (
      <>
        Việt Nam tiến lên <b>chủ nghĩa xã hội (CNXH)</b> trong điều kiện vừa có những thuận lợi, vừa có những khó khăn đan xen. Đặc điểm nổi bật nhất là <b>bỏ qua chế độ tư bản chủ nghĩa</b>.
        <br /> • <b>Đặc điểm bối cảnh:</b> Việt Nam xuất thân từ một xã hội vốn là thuộc địa, nửa phong kiến, lực lượng sản xuất rất thấp, lại trải qua chiến tranh ác liệt kéo dài. Đồng thời, cuộc cách mạng khoa học và công nghệ hiện đại đang diễn ra mạnh mẽ, tạo ra cả thời cơ phát triển nhanh và những thách thức gay gắt.
        <br /> • <b>Về việc "bỏ qua chế độ tư bản chủ nghĩa":</b> 
        <br /> ◦ Đây là sự <b>lựa chọn duy nhất đúng đắn, khoa học</b>, phản ánh đúng quy luật phát triển khách quan của cách mạng Việt Nam trong thời đại ngày nay. 
        <br /> ◦ <b>"Bỏ qua"</b> không phải là bỏ qua những thành tựu, giá trị văn minh mà nhân loại đã đạt được trong thời kỳ tư bản chủ nghĩa, đặc biệt là về khoa học và công nghệ. 
        <br /> ◦ Nội dung thực chất là <b>bỏ qua việc xác lập vị trí thống trị của quan hệ sản xuất và kiến trúc thượng tầng tư bản chủ nghĩa</b>. Điều này đòi hỏi phải tiếp thu, kế thừa những thành tựu của nhân loại dưới chế độ tư bản để phát triển nhanh lực lượng sản xuất và xây dựng nền kinh tế hiện đại.
        <br /> • <b>Mục tiêu và phương hướng:</b> Đảng ta xác định mục tiêu phấn đấu đến năm <b>2030</b> là nước đang phát triển có công nghiệp hiện đại, thu nhập trung bình cao; và đến năm <b>2045</b> trở thành nước phát triển, thu nhập cao. Để đạt được điều này, cần thực hiện đồng bộ 12 định hướng phát triển đất nước giai đoạn 2021 - 2030, bao gồm đổi mới mạnh mẽ tư duy, hoàn thiện thể chế kinh tế thị trường định hướng xã hội chủ nghĩa và phát triển nguồn nhân lực chất lượng cao.
      </>
    )
  },
  {
    id: 2,
    title: "Dân chủ và sự ra đời, phát triển của dân chủ",
    image: "https://baothainguyen.vn/file/oldimage/baothainguyen/UserFiles/image/pl2(23).jpg",
    summary: "Nhân dân là chủ thể của quyền lực nhà nước.",
    content: (
      <>
        Dân chủ là một <b>giá trị nhân loại chung</b>, nhưng cũng mang <b>tính giai cấp sâu sắc</b> tùy theo hình thái kinh tế - xã hội.
        <br /> • <b>Quan niệm về dân chủ:</b> Thuật ngữ dân chủ ra đời vào khoảng thế kỷ VII - VI trước Công nguyên, từ tiếng Hy Lạp là <b>demokratos</b> (trong đó demos là nhân dân và kratos là cai trị). Theo nghĩa gốc, dân chủ có nghĩa là <b>quyền lực thuộc về nhân dân</b>.
        <br /> • <b>Lịch sử phát triển của dân chủ:</b>
        <br /> 1. <b>Dân chủ nguyên thủy:</b> Xuất hiện trong xã hội cộng sản nguyên thủy với hình thức sơ khai là "Đại hội nhân dân", nơi mọi người có quyền bầu ra thủ lĩnh quân sự.
        <br /> 2. <b>Dân chủ chủ nô:</b> Đây là nền dân chủ đầu tiên trong lịch sử có giai cấp. Tuy nhiên, quyền dân chủ chỉ dành cho thiểu số là giai cấp chủ nô và các công dân tự do; đại đa số cư dân là nô lệ không được coi là "người" và không có quyền dân chủ.
        <br /> 3. <b>Thời kỳ phong kiến:</b> Ý thức về dân chủ và đấu tranh cho dân chủ không có bước tiến đáng kể do sự thống trị của chế độ độc tài chuyên chế phong kiến.
        <br /> 4. <b>Dân chủ tư bản chủ nghĩa:</b> Là một bước tiến lớn của nhân loại với các giá trị về tự do, bình đẳng, dân chủ. Song, trên thực tế, đây vẫn là nền dân chủ của thiểu số những người nắm giữ tư liệu sản xuất đối với đại đa số nhân dân lao động.
        <br /> 5. <b>Dân chủ xã hội chủ nghĩa:</b> Là nền dân chủ cao hơn về chất, nơi quyền lực thực sự thuộc về nhân dân lao động.
      </>
    )
  },
  {
    id: 3,
    title: "Dân chủ xã hội chủ nghĩa",
    image: "https://tuyenquang.dcs.vn/Image/Large/20218278521_48282.jpg",
    summary: "Dựa trên chế độ công hữu về tư liệu sản xuất.",
    content: (
      <>
        Dân chủ xã hội chủ nghĩa là nền dân chủ cao nhất trong lịch sử, nhằm mục tiêu <b>giải phóng con người</b>.
        <br /> • <b>Sự ra đời:</b> Được phôi thai từ thực tiễn đấu tranh của Công xã Pari (1871) và chính thức được xác lập sau thắng lợi của <b>Cách mạng Tháng Mười Nga (1917)</b> với sự ra đời của nhà nước xã hội chủ nghĩa đầu tiên trên thế giới.
        <br /> • <b>Bản chất của nền dân chủ xã hội chủ nghĩa:</b>
        <br /> ◦ <b>Bản chất chính trị:</b> Là sự lãnh đạo chính trị của giai cấp công nhân thông qua Đảng Cộng sản đối với toàn xã hội, nhưng nhằm thực hiện quyền lực và lợi ích của toàn thể nhân dân. Trong nền dân chủ này, <b>nhân dân là chủ thể của quyền lực</b>, thực hiện quyền làm chủ thông qua nhà nước pháp quyền xã hội chủ nghĩa. 
        <br /> ◦ <b>Bản chất kinh tế:</b> Dựa trên chế độ <b>công hữu về tư liệu sản xuất chủ yếu</b> và thực hiện nguyên tắc phân phối lợi ích theo kết quả lao động là chủ yếu. Nó hướng tới việc thỏa mãn nhu cầu vật chất và tinh thần ngày càng cao của nhân dân.
        <br /> ◦ <b>Bản chất tư tưởng - văn hóa - xã hội:</b> Lấy hệ tư tưởng <b>Mác - Lênin</b> làm chủ đạo; kế thừa và phát huy những tinh hoa văn hóa truyền thống dân tộc và nhân loại. Nó kết hợp hài hòa giữa lợi ích cá nhân, lợi ích tập thể và lợi ích toàn xã hội.
        <br /> Tóm lại, nền dân chủ xã hội chủ nghĩa là một tiến trình lâu dài, càng hoàn thiện bao nhiêu thì nền dân chủ đó lại càng tự tiêu vong bấy nhiêu (theo nghĩa tính chính trị của nó sẽ mất đi khi xã hội đã tự quản lý).
        <br /> Để dễ hình dung về sự phát triển của dân chủ, có thể xem nó như <b>một dòng sông không ngừng mở rộng</b>: khởi đầu từ những con suối nhỏ (dân chủ nguyên thủy), trải qua những đoạn bị ngăn đập bởi thiểu số (dân chủ chủ nô, tư bản), và cuối cùng hòa vào biển cả, nơi mọi giọt nước đều có vị trí và quyền lợi ngang nhau (dân chủ xã hội chủ nghĩa).
      </>
    )
  }
];

export default function HomeWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Home />
    </Suspense>
  );
}

function Home() {
  const searchParams = useSearchParams();
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const topic = searchParams.get("topic");
    if (topic && swiperInstance) {
      const targetIndex = parseInt(topic) - 1;
      if (!isNaN(targetIndex) && targetIndex >= 0 && targetIndex < sections.length) {
        swiperInstance.slideTo(targetIndex);
        setActiveIndex(targetIndex);
      }
    }
  }, [searchParams, swiperInstance]);

  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);

  const summaryImage = "/unnamed.png";

  return (
    <div className="min-h-screen bg-transparent text-[#1C1C1C]">
      
      {/* Header Section với Khung bảo vệ màu sắc */}
      <div className="pt-16 pb-8 flex justify-center">
        <div className="bg-[#f1e5e5] backdrop-blur-md border border-white/30 rounded-2xl p-8 max-w-[800px] w-full mx-4 text-center shadow-lg">
          <h1 className="text-3xl md:text-4xl font-bold text-[#000000] mb-4 uppercase tracking-wider">
            Chủ nghĩa xã hội khoa học
          </h1>
          <p className="text-[#000000] font-medium">
            Hệ thống hóa kiến thức dựa trên Giáo trình và tài liệu MLN131.
          </p>
        </div>
      </div>

      {/* Swiper Section - Đã thêm Navigation (mũi tên) */}
      <div className="w-full py-10 overflow-hidden relative group">
        <Swiper
          onSwiper={setSwiperInstance}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          navigation={{
            prevEl,
            nextEl,
          }} // Bật phím điều hướng
          coverflowEffect={{
            rotate: 0,  
            stretch: 0,
            depth: 150,
            modifier: 2.5,
            slideShadows: false,
          }}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Pagination, Navigation]}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="w-full max-w-[1200px] !py-10 relative"
        >
          {sections.map((item, index) => (
            <SwiperSlide key={item.id} className="w-[300px] md:w-[500px]">
              <div className={`relative aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 ${index === activeIndex ? 'ring-4 ring-[#A61F2B]' : 'opacity-50 scale-90'}`}>
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                  <h3 className="text-white text-xl font-bold">{item.title}</h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div 
            ref={(node) => setPrevEl(node)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 cursor-pointer text-[#A61F2B] hover:scale-110 transition-all bg-white/70 p-2 rounded-full backdrop-blur-md border border-white/50 shadow-lg"
          >
            <ChevronLeft size={32} />
          </div>

          <div 
            ref={(node) => setNextEl(node)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 cursor-pointer text-[#A61F2B] hover:scale-110 transition-all bg-white/70 p-2 rounded-full backdrop-blur-md border border-white/50 shadow-lg"
          >
            <ChevronRight size={32} />
          </div>
        </Swiper>
      </div>

      {/* Dynamic Content Section */}
      <div className="max-w-[860px] mx-auto px-6 mb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-[#f1e5e5] backdrop-blur-md border border-white/30 rounded-3xl p-8 md:p-10 shadow-xl"
          >
            <div className="inline-block px-4 py-1 bg-[#A61F2B]/20 text-[#A61F2B] rounded-full text-sm font-semibold mb-4">
              Chủ đề {sections[activeIndex].id}
            </div>
            <h2 className="text-2xl font-bold mb-4 text-[#1C1C1C]">{sections[activeIndex].title}</h2>
            <p className="text-[#333] leading-relaxed text-justify whitespace-pre-line">{sections[activeIndex].content}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* --- PHẦN TỔNG KẾT CHUNG (CỐ ĐỊNH) --- */}
      <div id="tong-ket" className="scroll-mt-24 max-w-[1000px] mx-auto px-6 pb-20">
        <div className="bg-white/30 backdrop-blur-lg border border-white/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row items-stretch">
          
          <div className="md:w-1/2 relative group overflow-hidden cursor-zoom-in" onClick={() => setIsZoomed(true)}>
            <img src={summaryImage} alt="Tổng kết" className="w-full h-full min-h-[300px] object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors flex items-center justify-center">
                <div className="bg-white/80 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 size={24} className="text-[#A61F2B]" />
                </div>
            </div>
          </div>

          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center text-[#1C1C1C]">
            <h2 className="text-2xl font-bold text-[#A61F2B] mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-[#A61F2B]"></span>
              TỔNG KẾT THỰC TIỄN
            </h2>
            <p className="font-semibold italic mb-4 italic">"Con đường đi lên CNXH là sự lựa chọn duy nhất đúng đắn."</p>
            <p className="text-gray-800 text-justify">Đảng ta xác định mục tiêu đến năm 2030 là nước đang phát triển có công nghiệp hiện đại, thu nhập trung bình cao; và đến năm 2045 trở thành nước phát triển, thu nhập cao.</p>
          </div>
        </div>
      </div>

      {/* Modal Phóng To */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsZoomed(false)} className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 cursor-zoom-out">
            <button className="absolute top-10 right-10 text-white hover:text-[#A61F2B] transition-colors"><X size={40} /></button>
            <motion.img initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} src={summaryImage} className="max-w-full max-h-full rounded-lg shadow-2xl border-2 border-white/20" />
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        /* Tùy chỉnh mũi tên Swiper */
        .swiper-button-next, .swiper-button-prev {
          color: #A61F2B !important; /* Màu đỏ đô */
          background: rgba(255, 255, 255, 0.3); /* Nền mờ nhẹ */
          width: 50px !important;
          height: 50px !important;
          border-radius: 50%;
          backdrop-filter: blur(5px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          transition: all 0.3s ease;
        }
        .swiper-button-next:after, .swiper-button-prev:after {
          font-size: 20px !important;
          font-weight: bold;
        }
        .swiper-button-next:hover, .swiper-button-prev:hover {
          background: rgba(166, 31, 43, 0.1);
          transform: scale(1.1);
        }
        .swiper-pagination-bullet-active {
          background: #A61F2B !important;
        }
      `}</style>
    </div>
  );
}