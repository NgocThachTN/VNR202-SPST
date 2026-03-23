'use client';

import { useRef, useState, useEffect } from 'react';
import { ShieldAlert, Globe, Bookmark, FileText, Scale, ChevronLeft, ChevronRight, ArrowRight, X, Stamp, Search, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const cases = [
  {
    name: "Đại án Tamexco",
    year: "1997",
    category: "Quản trị và Định giá Tài sản",
    image: "/images/cases/tamexco.jpg",
    context: "Công ty Sản xuất Kinh doanh Dịch vụ Xuất nhập khẩu Quận 1 (Tamexco) là DNNN. Giai đoạn 1997, hệ thống pháp luật tín dụng còn rất lỏng lẻo.",
    details: "Phạm Huy Phước khởi xướng nâng khống giá trị các lô đất để thế chấp vay vốn ngân hàng, có sự làm ngơ của công chứng.",
    consequence: "4 án tử hình được tuyên. Công ty Tamexco phá sản năm 1999.",
    fullDetails: [
      {
        title: "Bối cảnh lịch sử",
        content: "Vụ án Tamexco xảy ra vào những năm đầu mở cửa, khi quy trình quản lý doanh nghiệp Nhà nước và thẩm định tài sản tín dụng tại các ngân hàng thương mại còn bộc lộ rất nhiều kẽ hở. Tamexco dù chỉ là công ty thuộc quận nhưng lại nắm quyền vay vốn khổng lồ."
      },
      {
        title: "Hành vi phá hoại",
        content: "Nhân vật trung tâm là Phạm Huy Phước (Giám đốc Tamexco) đã cùng các đồng phạm thực hiện hành vi cố ý làm trái các quy định quản lý kinh tế và tham ô. Thủ đoạn chính là mua rẻ các khu đất tại Bà Rịa - Vũng Tàu và TP.HCM, sau đó móc nối với các cán bộ ngân hàng và cán bộ công chứng (do Lê Đức Cảnh làm Trưởng phòng Công chứng) để 'thổi giá' tài sản lên gấp hàng chục lần giá trị thực nhằm hợp thức hóa hồ sơ vay số tiền lớn từ Vietcombank và đem tiêu xài, bù đắp lỗ..."
      },
      {
        title: "Hậu quả và Phán quyết",
        content: "Phiên tòa xét xử Tamexco từng gây chấn động dư luận thập niên 90 vì tính chất nghiêm khắc. Tòa đã tuyên phạt 4 bản án tử hình đối với: Phạm Huy Phước, Trần Quang Vinh, Lê Đức Cảnh và Lê Minh Hải (Hải sau này được ân xá xuống chung thân). Vụ án để lại khoản nợ xấu khổng lồ hàng nghìn tỷ đồng không thể thu hồi nguyên vẹn do vướng mắc pháp lý tài sản thế chấp."
      }
    ]
  },
  {
    name: "Đại án EPCO - Minh Phụng",
    year: "1997",
    category: "Bong bóng Tín dụng Bất động sản",
    image: "/images/cases/epco.jpg",
    context: "Giai đoạn thị trường nhà đất hình thành các đợt sốt ảo đầu tiên, tín dụng ngân hàng bị lợi dụng.",
    details: "Tăng Minh Phụng cấu kết với Liên Khui Thìn (EPCO) lập công ty ma để quay vòng tín dụng cực khủng.",
    consequence: "Hệ thống ngân hàng tê liệt tạm thời. Tăng Minh Phụng lĩnh án tử hình.",
    fullDetails: [
      {
        title: "Quy mô đế chế",
        content: "Tăng Minh Phụng ban đầu là một doanh nhân vô cùng thành đạt trong lĩnh vực may mặc, giày dép xuất khẩu tạo ra hàng chục ngàn việc làm. Khi thị trường bất động sản chớm nở, ông chuyển hướng đầu tư ồ ạt vào việc thâu tóm đất đai khắp cả nước bằng cách sử dụng đòn bẩy tài chính cực lớn."
      },
      {
        title: "Cơ chế bơm vốn",
        content: "Tăng Minh Phụng cấu kết với Liên Khui Thìn (Giám đốc EPCO - thời điểm đó là DNNN). Họ thành lập hàng chục công ty vệ tinh (công ty con) chỉ để đứng tên vay vốn Incombank (Vietinbank nay) và Vietcombank. Tiền vay được mang đi mua các khu đất vàng, tiếp đó lại lấy chính các mảnh đất đó định giá ảo, đi thế chấp vay thêm khoản tiền lớn hơn. Sự luân chuyển 'vay - mua - thế chấp - vay' tạo nên bong bóng."
      },
      {
        title: "Sụp đổ dây chuyền",
        content: "Khi thị trường BĐS chững lại đóng băng, khối tài sản đồ sộ mất thanh khoản. Ngân hàng không thể thu hồi nợ, làm tê liệt một phần nguồn tín dụng của hệ thống ngân hàng quốc gia. Tòa án đã tuyên tử hình Tăng Minh Phụng và nhiều quan chức ngân hàng ngã ngựa, để lại khối tài sản xiết nợ vĩ đại tốn hàng chục năm giải quyết."
      }
    ]
  },
  {
    name: "Vụ án PMU 18",
    year: "2006",
    category: "Thất thoát Nguồn lực Quốc gia",
    image: "/images/cases/pmu18.jpg",
    context: "Ban Quản lý các dự án 18 trực thuộc Bộ Giao thông Vận tải điều hành nguồn vốn khổng lồ.",
    details: "Bùi Tiến Dũng dùng tiền nhà nước cá độ bóng đá triệu USD và cho mượn xe công trái quy định.",
    consequence: "Bùi Tiến Dũng án 23 năm tù. Dàn lãnh đạo GTVT bị xáo trộn nghiêm trọng.",
    fullDetails: [
      {
        title: "Quyền lực PMU 18",
        content: "PMU 18 (Project Management Unit 18) là 'siêu ban' thuộc Bộ Giao thông Vận tải, nắm trong tay quyền quản lý hàng tỷ USD nguồn vốn ODA và ngân sách quốc gia chuyên dùng để xây dựng các công trình trọng điểm như cầu Bãi Cháy, Quốc lộ 18..."
      },
      {
        title: "Sự tha hóa tột cùng",
        content: "Tổng Giám đốc Bùi Tiến Dũng đã thể hiện lối sống suy đồi khi dùng số tiền có nguồn gốc từ dự án và những khoản 'ban bệ' để cá độ bóng đá giải ngoại hạng Anh lên đến hàng triệu USD mỗi đêm. Ngoài ra, phát hiện sai phạm chi tiêu lãng phí, biến hàng chục chiếc xe công (ô tô xịn) của dự án thành của riêng hoặc phân phát, cho mượn vô tổ chức cho nhiều nhân vật quyền lực khác."
      },
      {
        title: "Trừng phạt pháp luật",
        content: "Vụ việc vỡ lở gây sốc toàn xã hội. Hàng loạt lãnh đạo Bộ GTVT phải hầu tra. Bùi Tiến Dũng nhận tổng mức hình phạt 23 năm tù giam (các tội đánh bạc, đưa hối lộ, lợi dụng chức vụ quyền hạn). Vụ án PMU 18 trở thành bài học rúng động về sự suy thoái đạo đức và kiểm soát vốn ODA."
      }
    ]
  },
  {
    name: "Đại án PCI",
    year: "2003-2008",
    category: "Hối lộ Xuyên quốc gia & Khủng hoảng ODA",
    image: "/images/cases/pci.jpg",
    context: "Dự án Đại lộ Đông - Tây TP.HCM do phía Nhật Bản tài trợ ODA, một dự án mang tính biểu tượng.",
    details: "Huỳnh Ngọc Sĩ ép công ty tư vấn Nhật 'lại quả' hàng triệu USD.",
    consequence: "Đóng băng 700 triệu USD tiền ODA. Quan chức bị khép tội hối lộ.",
    fullDetails: [
      {
        title: "Cái bắt tay dưới bàn",
        content: "Dự án Đại lộ Đông - Tây và Môi trường nước TP.HCM là công trình hạ tầng trọng điểm do dòng vốn ODA Nhật Bản tài trợ. Huỳnh Ngọc Sĩ - Giám đốc Ban quản lý dự án đã có những cuộc 'mặc cả' trơ trẽn với công ty tư vấn thiết kế Nhật PCI (Pacific Consultants International)."
      },
      {
        title: "Vali tiền tới tận cửa",
        content: "Sĩ ép PCI phải chia chác 11% giá trị hợp đồng (khoảng 1,7 triệu USD) để đổi lấy việc phê duyệt suôn sẻ. Quá trình điều tra xác minh Sĩ đã nhận ít nhất 820.000 USD tiền mặt. Có lần các lãnh đạo tư vấn Nhật Bản trực tiếp xách vali đựng 262.000 USD vào tận phòng làm việc để hối lộ Sĩ."
      },
      {
        title: "Cái giá tổn thương thể diện",
        content: "Vụ hối lộ bị cảnh sát Tokyo (Nhật Bản) phanh phui trước cả Việt Nam. Cuối năm 2008, phía Nhật tuyên bố tạm dừng toàn bộ nguồn vốn ODA cấp cho Việt Nam (đóng băng lô 700 triệu USD), tạo ra cuộc khủng hoảng ngoại giao kinh tế cục bộ. Huỳnh Ngọc Sĩ chịu án tù 20 năm, yêu cầu chấn chỉnh kỷ cương ngay lập tức."
      }
    ]
  },
  {
    name: "Tập Đoàn Vinashin",
    year: "2011",
    category: "Thất bại Quản trị Doanh nghiệp",
    image: "/images/cases/vinashin.jpg",
    context: "Giấc mộng lớn về đóng tàu và trở thành tập đoàn đa ngành kinh tế.",
    details: "Phạm Thanh Bình đầu tư dàn trải, mua tàu cũ nát, quản lý vốn Nhà nước yếu kém gây nợ nần kinh hoàng.",
    consequence: "Nợ 96.000 tỷ, mất vốn 5.000 tỷ. Báo động toàn bộ hệ thống DNNN.",
    fullDetails: [
      {
        title: "Thâm hụt vì tham vọng",
        content: "Vinashin từng được ví như 'Nắm đấm thép' tiên phong đưa Việt Nam thành cường quốc đóng tàu biển. Tuy nhiên, dưới quyền sinh sát của Phạm Thanh Bình, tập đoàn đã vẽ dự án sai lầm nghiêm trọng khi 'vươn vòi bạch tuộc' sang các ngành không đúng cốt lõi như khách sạn, sàn cao su, chứng khoán..."
      },
      {
        title: "Hồ sơ tàu Hoa Sen",
        content: "Một trong những sai phạm phẫn nộ là việc bỏ ra nguồn tiền khổng lồ mua tàu Hoa Sen (tàu nhập khẩu cũ nát của nước ngoài) bất chấp lời khuyên của chuyên gia. Tàu về nước không sử dụng được, chỉ để nằm phơi sương rỉ sét, gây thiệt hại nhà nước cỡ 470 tỷ đồng trong chớp mắt."
      },
      {
        title: "Hệ lụy vĩ mô",
        content: "Vinashin lún trong khối nợ 96.000 tỷ VNĐ (tương đương hơn 4 tỷ USD lúc bấy giờ), ngân sách phải gánh thiệt hại cực lớn để giải cứu, tái cơ cấu. Đây là án điểm báo trước về sự lỏng lẻo của Nhà nước khi ủy quyền số vốn vĩ đại cho một vài cá nhân không đủ năng lực quản trị thực sự."
      }
    ]
  },
  {
    name: "Đại Án Vạn Thịnh Phát",
    year: "2022",
    category: "Đại án Tài chính Lớn Nhất Châu Á",
    image: "/images/cases/vtp.jpg",
    context: "Lỗ hổng thanh tra và sự câu kết tinh vi giữa bất động sản - ngân hàng.",
    details: "Trương Mỹ Lan lập 1.000 công ty ma thao túng SCB, rút ruột hơn 300.000 tỷ đồng và hối lộ thanh tra tiền tỷ USD.",
    consequence: "Trương Mỹ Lan nhận án tử hình. Trở thành hệ lụy kinh tế tồi tệ bậc nhất.",
    fullDetails: [
      {
        title: "Bóng ma ở SCB",
        content: "Trương Mỹ Lan – Chủ tịch Vạn Thịnh Phát tuy không giữ chức vụ trực tiếp tại Ngân hàng TMCP Sài Gòn (SCB), nhưng nhờ thủ đoạn gom mua và cho người khác đứng tên hộ, bà đã thâu tóm trên 90% cổ phần SCB, biến hệ thống tín dụng này thành 'kho tiền' cá nhân."
      },
      {
        title: "Bộ phim chết chóc",
        content: "Trong một thập kỷ, Lan chỉ đạo thành lập hơn 1.000 công ty 'ma', vẽ ra 916 hồ sơ vay vốn hoàn toàn khống để tẩu tán và chiếm đoạt của SCB hơn 304.096 tỷ đồng (khoảng hơn 12 tỷ USD). Đi kèm là việc lừa đảo bán lô trái phiếu trái phép, cuỗm hơn 30.000 tỷ đồng của hơn 35.000 nạn nhân nhỏ lẻ. Để bịt mắt cơ quan chức năng, bị cáo đã đem hối lộ 5,2 triệu USD giấu bằng thùng xốp cho Đỗ Thị Nhàn (Cục trưởng Thanh tra NHNN)."
      },
      {
        title: "Bản án lịch sử",
        content: "Thiệt hại kinh tế của một mình vụ án này tiệm cận bằng hàng phần trăm GDP của quốc gia, một con số khó tin đối với nhân loại. Tòa án đã tuyên mức tử hình nhằm trừng trị loại tội phạm dùng tiền tha hóa thể chế và hủy hoại an ninh tài chính quốc gia."
      }
    ]
  },
  {
    name: "Đại án Việt Á",
    year: "2021",
    category: "Trục lợi trong mùa Đại dịch",
    image: "/images/cases/vieta.jpg",
    context: "Thời điểm Covid-19, nền kinh tế và y tế đứng trước nguy cơ sụp đổ, sinh mạng người dân đe dọa từng ngày.",
    details: "Công ty Việt Á cấu kết với các cán bộ hợp thức hóa nghiên cứu rồi nâng khống giá kit test Covid bán cho CDC cả nước.",
    consequence: "Khởi tố cấp Bộ trưởng, hàng loạt Giám đốc CDC vào tù.",
    fullDetails: [
      {
        title: "Sự chiếm đoạt thành quả khoa học",
        content: "Lợi dụng tình hình dịch bệnh căng thẳng, Phan Quốc Việt (GĐ Việt Á) cấu kết chặt chẽ với lãnh đạo Bộ Khoa học và Công nghệ và Bộ Y tế để 'hô biến' đề tài nghiên cứu Test-Kit bằng vốn ngân sách Nhà nước thành sản phẩm độc quyền của DNTN Việt Á."
      },
      {
        title: "Cơn mưa hoa hồng nhơ bẩn",
        content: "Việt Á thổi phồng hàng trăm phần trăm giá trị xuất xưởng của Kit Test rồi cung ứng ồ ạt cho Trung tâm Kiểm soát bệnh tật (CDC) và các bệnh viện tại 62 tỉnh/thành. Đổi lại việc 'ưu tiên mua hàng', Việt Á đã lại quả, chi 'hoa hồng rếch' hàng triệu USD và hàng chục tỷ đồng cho các Giám đốc CDC và quan chức đứng đầu."
      },
      {
        title: "Sụp đổ niềm tin",
        content: "Danh sách lãnh án kéo dài gọi tên cựu Bộ trưởng Y tế Nguyễn Thanh Long và cựu Bộ trưởng KH&CN Chu Ngọc Anh (nhận hối lộ và vi phạm quy định). Ở thời khắc cả dân tộc oằn mình vì sinh mạng nhỏ nhoi, đây được xem là đại án tội ác mất nhân tính nhất trong thời kỳ bình thường mới."
      }
    ]
  }
];

export default function HistoricalReport() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedCase, setSelectedCase] = useState<typeof cases[0] | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth * 0.8 : scrollLeft + clientWidth * 0.8;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedCase(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section className="mt-16 space-y-12 mb-16 relative">
      {/* Header Info */}
      <div className="bg-[#FAF3EB] border-2 border-[#2C2A29] p-6 lg:p-10 shadow-[8px_8px_0px_0px_#2C2A29] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#DA251D]/5 rounded-bl-full pointer-events-none"></div>
        <h2 className="text-3xl md:text-5xl lg:text-7xl font-serif-heading font-black text-[#2C2A29] uppercase tracking-tighter leading-none mb-6 border-b-4 border-double border-[#2C2A29] pb-6">
          Hồ Sơ Các Đại Án: <br/><span className="text-[#DA251D] text-2xl md:text-5xl tracking-normal">Sự Tha Hóa & Lỗ Hổng Quản Trị</span>
        </h2>
        <div className="prose prose-sm max-w-none font-serif-body text-[#333] leading-relaxed">
          <p className="first-letter:text-6xl first-letter:font-black first-letter:float-left first-letter:mr-3 first-letter:text-[#DA251D] text-justify md:text-lg">
            Nhìn lại chặng đường phát triển kinh tế, bên cạnh những bước tiến thần tốc, quốc gia cũng đối diện với những sự kiện tham nhũng chấn động. Từ các âm mưu "thổi giá" bằng đất đai của thời kỳ Tamexco, đến liên minh lũng đoạn dòng tiền ngân hàng ở Vạn Thịnh Phát. Gõ vào từng hồ sơ để khám phá cặn kẽ chân tướng của những kỷ lục đáng buồn nhất.
          </p>
        </div>
      </div>

      {/* Horizontal Timeline Container */}
      <div className="relative pt-12 pb-4 -mx-4 md:mx-0 px-4 md:px-0">
        <button 
            onClick={() => scroll('left')}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -ml-6 z-30 bg-[#2C2A29] text-[#FAF3EB] p-4 rounded-full hover:bg-[#DA251D] hover:scale-110 transition-all shadow-[4px_4px_0px_0px_rgba(218,37,29,0.4)] border-2 border-[#FAF3EB]"
        >
            <ChevronLeft size={28} />
        </button>
        <button 
            onClick={() => scroll('right')}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 -mr-6 z-30 bg-[#2C2A29] text-[#FAF3EB] p-4 rounded-full hover:bg-[#DA251D] hover:scale-110 transition-all shadow-[4px_4px_0px_0px_rgba(218,37,29,0.4)] border-2 border-[#FAF3EB]"
        >
            <ChevronRight size={28} />
        </button>

        <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 md:gap-10 pb-16 pt-10 px-4 md:px-8 snap-x snap-mandatory hide-scrollbar relative scroll-smooth bg-white/40 border-y-2 border-[#2C2A29] shadow-inner"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
            <div className="absolute top-[52px] left-0 right-0 h-1 bg-[#2C2A29]/20 border-t-2 border-dashed border-[#2C2A29]/40 z-0 hidden md:block"></div>

            {cases.map((c, index) => (
                <div 
                  key={index} 
                  className="relative w-[300px] min-w-[300px] md:w-[420px] md:min-w-[420px] shrink-0 snap-center flex flex-col group mt-10 md:mt-0 cursor-pointer"
                  onClick={() => setSelectedCase(c)}
                >
                    <div className="absolute -top-[45px] md:-top-[28px] left-1/2 -translate-x-1/2 flex flex-col items-center z-10 group-hover:-translate-y-3 transition-transform duration-300">
                        <div className="w-5 h-5 rounded-full bg-[#DA251D] border-4 border-[#FAF3EB] shadow-[0_0_0_2px_#2C2A29] mb-3 group-hover:scale-125 transition-transform"></div>
                        <div className="bg-[#2C2A29] text-[#FAF3EB] font-sans font-black text-sm lg:text-base px-5 py-1 border-2 border-[#2C2A29] shadow-[3px_3px_0px_0px_#DA251D]">
                           {c.year}
                        </div>
                    </div>

                    {/* Basic Card Overview */}
                    <div className="bg-[#FAF3EB] border-2 border-[#2C2A29] h-full shadow-[6px_6px_0px_0px_#2C2A29] flex-1 flex flex-col mt-4 group-hover:bg-[#FDF9F3] transition-all relative overflow-hidden group-hover:-translate-y-2 duration-300">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-8 bg-white/40 border border-white/50 rotate-3 z-20 shadow-sm backdrop-blur-sm"></div>
                        
                        <div className="p-6 md:p-8 flex-1 flex flex-col border-b-4 border-double border-[#2C2A29]/10">
                            <div className="flex items-center gap-2 mb-4">
                                <FileText size={16} className="text-[#DA251D]" />
                                <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#5C554E] border-b border-[#2C2A29]/20 pb-1 flex-1">
                                  {c.category}
                                </span>
                            </div>

                            <h3 className="text-2xl lg:text-3xl font-serif-heading font-black text-[#2C2A29] uppercase mb-4 leading-tight group-hover:text-[#DA251D] transition-colors">
                                {c.name}
                            </h3>

                            <p className="font-serif-body text-sm text-[#5C554E] italic mb-6 line-clamp-2">{c.context}</p>

                            {/* Added Image Thumbnail logic in the preview card */}
                            {c.image && (
                              <div className="h-24 md:h-32 bg-[#2C2A29] mb-4 border border-[#2C2A29] relative overflow-hidden group-hover:shadow-inner transition-all flex items-center justify-center">
                                 <img src={c.image} alt={c.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity mix-blend-luminosity sepia" />
                                 <div className="absolute inset-0 bg-[#DA251D]/10 pattern-diagonal-lines mix-blend-overlay"></div>
                              </div>
                            )}

                            <div className="mt-auto mb-2 flex items-center gap-2">
                              <span className="bg-[#2C2A29] text-white text-[10px] font-sans font-bold uppercase px-3 py-1.5 shadow-[2px_2px_0px_0px_#DA251D] group-hover:bg-[#DA251D] group-hover:shadow-[2px_2px_0px_0px_#2C2A29] transition-all flex items-center gap-1">
                                <Search size={14} /> Wiki: Mở chi tiết
                              </span>
                            </div>
                        </div>

                        <div className="bg-[#2C2A29] p-4 px-6 text-[#FAF3EB] relative overflow-hidden">
                            <div className="absolute inset-0 bg-[#DA251D]/10 pattern-diagonal-lines opacity-20"></div>
                            <span className="relative z-10 font-sans font-black uppercase text-[10px] tracking-widest text-[#DA251D] mb-1 flex items-center gap-2">
                                <ShieldAlert size={14} /> Án Tuyên
                            </span>
                            <p className="relative z-10 text-xs italic opacity-90 truncate">{c.consequence}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <div className="text-center mt-6 flex items-center justify-center gap-3 text-[#5C554E] font-sans text-xs uppercase tracking-widest font-bold bg-[#F5E6D3] inline-flex mx-auto px-6 py-2 rounded-full border border-[#D1C2A5] left-1/2 -translate-x-1/2 absolute bottom-0 shadow-sm pointer-events-none">
            <span className="md:hidden">Vuốt sang ngang & chạm vào hồ sơ</span>
            <span className="hidden md:inline">Click vào từng hồ sơ để mở định dạng Wikipedia</span>
            <ArrowRight size={14} className="animate-pulse text-[#DA251D]" />
        </div>
      </div>

      {/* POPUP MODAL - WIKIPEDIA STYLE (HORIZONTAL) */}
      <AnimatePresence>
        {selectedCase && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-6 bg-black/70 backdrop-blur-md"
            onClick={() => setSelectedCase(null)}
          >
            <motion.div 
              initial={{ y: 50, scale: 0.95, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 20, scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white w-full max-w-7xl max-h-[95vh] md:max-h-[90vh] flex flex-col border border-gray-300 shadow-[0_0_40px_rgba(0,0,0,0.5)] relative overflow-hidden"
              onClick={e => e.stopPropagation()} // Prevent closing when clicking inside
            >
               {/* WIKI TOP NAVBAR */}
               <div className="bg-[#F8F9FA] border-b border-[#A2A9B1] px-4 py-3 flex items-center justify-between z-20 shrink-0">
                 <div className="flex items-center gap-3">
                   <Globe size={24} className="text-gray-700" />
                   <span className="font-sans text-sm text-gray-800 hidden md:inline"><span className="font-serif italic font-bold">Bách khoa toàn thư mở</span> — Dự án Tổng hợp Lịch sử</span>
                   <span className="font-sans text-sm text-gray-800 md:hidden font-serif italic font-bold">Bách khoa Lịch sử</span>
                 </div>
                 
                 <div className="flex items-center gap-4">
                   <div className="hidden md:flex bg-white border border-[#A2A9B1] rounded-sm px-2 py-1 items-center gap-2">
                     <Search size={14} className="text-gray-400" />
                     <span className="text-xs text-gray-400 italic font-sans pr-8">Tìm kiếm trong bài...</span>
                   </div>
                   <button 
                     onClick={() => setSelectedCase(null)}
                     className="bg-gray-200 text-gray-700 p-1.5 rounded hover:bg-red-500 hover:text-white transition-colors"
                     title="Đóng cửa sổ (Esc)"
                   >
                     <X size={18} />
                   </button>
                 </div>
               </div>

               {/* TWO-COLUMN WIKI LAYOUT */}
               <div className="flex-1 flex flex-col-reverse md:flex-row overflow-hidden relative bg-white">
                 
                 {/* LEFT SIDEBAR / INFOBOX (Scrollable independently) */}
                 <div className="w-full md:w-[320px] lg:w-[380px] bg-[#F8F9FA] md:border-r border-[#A2A9B1] p-5 shrink-0 overflow-y-auto">
                    
                    {/* INFOBOX - THÔNG TIN TÓM TẮT & ẢNH */}
                    <div className="bg-[#FDFDFD] border border-[#A2A9B1] p-3 shadow-sm mb-6">
                      <div className="bg-[#EAECF0] text-center font-bold font-serif px-2 py-2 mb-2 border-b border-[#A2A9B1]">
                        {selectedCase.name}
                      </div>
                      
                      {/* Thêm hình ảnh minh hoạ vào Infobox */}
                      {selectedCase.image && (
                        <div className="mb-4 border border-[#A2A9B1] bg-white p-1 pb-4">
                           <img src={selectedCase.image} alt={selectedCase.name} className="w-full h-auto object-cover max-h-48" />
                           <p className="text-[10px] text-gray-500 text-center mt-2 italic font-sans px-2">Hình ảnh mang tính minh họa liên quan đến vụ án {selectedCase.year}.</p>
                        </div>
                      )}
                      
                      <table className="w-full text-sm font-sans text-left">
                        <tbody>
                          <tr className="border-b border-[#EAECF0]">
                            <th className="py-2.5 px-2 text-[#54595D] font-normal w-2/5">Thời gian</th>
                            <td className="py-2.5 px-2 font-bold text-gray-800">{selectedCase.year}</td>
                          </tr>
                          <tr className="border-b border-[#EAECF0]">
                            <th className="py-2.5 px-2 text-[#54595D] font-normal align-top">Thuộc thể loại</th>
                            <td className="py-2.5 px-2 text-gray-800"><a href="#" className="text-[#0645AD] hover:underline">{selectedCase.category}</a></td>
                          </tr>
                          <tr className="border-b border-[#EAECF0]">
                            <th className="py-2.5 px-2 text-[#54595D] font-normal align-top">Mức độ thiệt hại</th>
                            <td className="py-2.5 px-2 text-gray-800">Đặc biệt nghiêm trọng</td>
                          </tr>
                          <tr>
                            <th className="py-2.5 px-2 text-[#54595D] font-normal align-top">Kết án</th>
                            <td className="py-2.5 px-2 text-[#DA251D] font-bold">{selectedCase.consequence}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* MỤC LỤC - TABLE OF CONTENTS */}
                    <div className="bg-[#F8F9FA] border border-[#A2A9B1] p-4 text-[13px] font-sans">
                      <div className="font-bold mb-3 flex items-center justify-between">
                         <span>Mục lục</span>
                         <span className="text-[#0645AD] font-normal text-xs cursor-pointer">[ẩn]</span>
                      </div>
                      <ul className="space-y-1.5">
                        <li>
                           <a href="#tong-quan" className="text-[#0645AD] hover:underline flex items-start gap-2">
                             <span className="text-gray-900 w-4 text-right">1</span> Tổng quan
                           </a>
                        </li>
                        {selectedCase.fullDetails.map((detail, idx) => (
                          <li key={idx}>
                             <a href={`#chi-tiet-${idx}`} className="text-[#0645AD] hover:underline flex items-start gap-2">
                               <span className="text-gray-900 w-4 text-right">{idx + 2}</span> {detail.title}
                             </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                 </div>

                 {/* MAIN WIKI CONTENT (Right container) */}
                 <div className="w-full flex-1 overflow-y-auto bg-white p-6 md:p-10 lg:p-12 relative text-[#202122] scroll-smooth">
                    <div className="max-w-4xl mx-auto">
                      
                      <h1 className="font-serif text-4xl lg:text-5xl font-normal text-black mb-1 border-b border-[#A2A9B1] pb-2" id="tong-quan">
                        {selectedCase.name}
                      </h1>
                      <div className="text-[13px] text-gray-500 font-sans mb-5 pb-4">Từ Bách khoa toàn thư Lịch sử, bách khoa toàn thư mở</div>
                      
                      {selectedCase.image && (
                         <div className="float-right ml-6 mb-4 w-64 border border-[#A2A9B1] bg-[#F8F9FA] p-1 flex flex-col sm:hidden">
                            {/* Mobile inline image fallback if needed */}
                           <img src={selectedCase.image} alt={selectedCase.name} className="w-full h-auto" />
                         </div>
                      )}

                      {/* Lead Paragraph */}
                      <p className="font-serif text-[15px] lg:text-[16px] leading-relaxed mb-8 text-justify">
                        <b>{selectedCase.name}</b> (phát hiện và đưa ra xét xử vào năm <b>{selectedCase.year}</b>) là một trong những đại án kinh tế và tham nhũng đặc biệt nghiêm trọng trong lịch sử quá trình phát triển của Việt Nam. Các sai phạm trong vụ việc này chủ yếu thuộc nhóm <a href="#" className="text-[#0645AD] hover:underline">{selectedCase.category.toLowerCase()}</a>. {selectedCase.context} 
                        <br/><br/>
                        Vụ án trở thành tâm điểm của dư luận và truyền thông khi cơ quan điều tra phanh phui ra rằng <span className="bg-yellow-100">{selectedCase.details.charAt(0).toLowerCase() + selectedCase.details.slice(1)}</span> Điều này đã trực tiếp dẫn đến bản án: {selectedCase.consequence}
                      </p>

                      {/* Content Sections */}
                      <div className="space-y-8">
                        {selectedCase.fullDetails.map((detail, idx) => (
                           <section key={idx} id={`chi-tiet-${idx}`}>
                             <h2 className="font-serif text-2xl font-normal flex items-center border-b border-[#A2A9B1] pb-1 mb-4 mt-8">
                               <span className="text-black">{detail.title}</span>
                               <button className="text-[#0645AD] text-[11px] font-sans ml-4 hover:underline select-none tracking-normal font-normal opacity-80">
                                 [sửa | sửa mã nguồn]
                               </button>
                             </h2>
                             
                             <p className="font-serif text-[15px] lg:text-[16px] leading-relaxed text-justify relative">
                               {idx === 0 ? (
                                 <span className="float-left text-4xl lg:text-5xl font-serif pr-2 pt-1 font-bold text-gray-800 leading-none">
                                   {detail.content.charAt(0)}
                                 </span>
                               ) : null}
                               {idx === 0 ? detail.content.slice(1) : detail.content}
                             </p>
                           </section>
                        ))}
                      </div>

                      {/* Nguồn và Trích dẫn WIKI */}
                      <section className="mt-16 bg-[#F8F9FA] border border-[#A2A9B1] p-6 text-[13px] mb-10">
                        <h3 className="font-sans font-bold text-sm mb-3 border-b border-gray-300 pb-2">Tham khảo & Chỉ mục</h3>
                        <div className="columns-1 md:columns-2 gap-8">
                          <ol className="list-decimal pl-5 font-sans space-y-2 text-[#0645AD]">
                            <li id="cite_note-1">
                              <span className="text-gray-800">^ Tổng hợp từ <i className="text-black">Hồ sơ Xét xử Tòa án Nhân dân Tối cao</i>. (Truy cập: tháng 3/2026).</span>
                            </li>
                            <li id="cite_note-2">
                              <span className="text-gray-800">^ Các báo cáo điều tra và dữ liệu phân tích kinh tế vĩ mô thời kỳ {selectedCase.year}. <a href="#" className="text-[#0645AD] hover:underline">[Lưu trữ]</a></span>
                            </li>
                            <li id="cite_note-3">
                              <span className="text-gray-800">^ Bộ Công an. "Chuyên án kinh tế lịch sử". <i className="text-black">Báo điện tử Chính phủ</i>.</span>
                            </li>
                          </ol>
                        </div>
                      </section>

                      {/* Thể loại */}
                      <div className="border border-[#A2A9B1] bg-[#F8F9FA] px-4 py-2 flex items-center gap-2 text-[13px] font-sans mb-8">
                        <span className="text-[#0645AD] font-bold">Thể loại:</span>
                        <a href="#" className="text-[#0645AD] hover:underline">Sự kiện năm {selectedCase.year}</a> | 
                        <a href="#" className="text-[#0645AD] hover:underline">Án kinh tế Việt Nam</a> | 
                        <a href="#" className="text-[#0645AD] hover:underline">Lịch sử tư pháp</a>
                      </div>

                      {/* Footer bài viết Wiki */}
                      <div className="border-t border-[#A2A9B1] pt-4 font-sans text-xs text-gray-500 mb-8 flex flex-col md:flex-row justify-between items-center gap-2">
                        <div className="flex gap-2">
                          <span className="hover:text-[#0645AD] cursor-pointer">Trang này được sửa đổi lần cuối vào {new Date().toLocaleDateString('vi-VN')}</span>
                        </div>
                        <div className="flex gap-4">
                          <span className="hover:text-[#0645AD] cursor-pointer">Chính sách bảo mật</span>
                          <span className="hover:text-[#0645AD] cursor-pointer">Về dự án Lịch sử</span>
                          <span className="hover:text-[#0645AD] cursor-pointer">Cảnh báo</span>
                        </div>
                      </div>
                    </div>
                 </div>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
