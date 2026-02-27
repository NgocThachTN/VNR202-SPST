import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full bg-white/80 backdrop-blur-md text-black pt-16 pb-8 relative border-t-2 border-black overflow-hidden">
      {/* Bottom red accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#A61F2B]"></div>
      
      {/* Glassmorphism decorative elements */}
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#A61F2B]/10 rounded-full blur-3xl"></div>
      <div className="absolute top-40 right-16 w-80 h-80 bg-black/5 rounded-full blur-2xl"></div>
      <div className="absolute bottom-40 right-1/3 w-40 h-40 bg-[#A61F2B]/5 rounded-full blur-xl"></div>
      
      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        {/* Magazine Style Header */}
        <div className="text-center mb-12 pb-12 border-b border-black/20">
          <h2 className="font-bold text-3xl tracking-wider uppercase mb-4">
            <span className="text-black">CHỦ NGHĨA </span>
            <span className="text-[#A61F2B]">XÃ HỘI</span>
          </h2>
          <p className="italic text-lg max-w-2xl mx-auto text-black/70 p-4">
            &ldquo;Dân chủ xã hội chủ nghĩa là bản chất của chế độ ta, vừa là mục tiêu, 
            vừa là động lực của công cuộc xây dựng chủ nghĩa xã hội và bảo vệ Tổ quốc.&rdquo;
          </p>
          <div className="mt-4 flex justify-center items-center">
            <div className="w-6 h-[1px] bg-[#A61F2B]"></div>
            <p className="mx-3 text-sm font-medium uppercase">Lý luận chính trị & Thực tiễn</p>
            <div className="w-6 h-[1px] bg-[#A61F2B]"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-12 mb-16 border-b border-black/20 pb-16">
          {/* About Section */}
          <div className="md:col-span-5 space-y-6 p-6">
            <div className="heading-clean">
              <h3 className="text-lg font-medium text-black uppercase tracking-widest relative inline-block">
                Về Nền Tảng
                <span className="absolute -top-2 -right-2 text-[#A61F2B] text-[10px]">®</span>
              </h3>
              <div className="w-12 h-[1px] bg-[#A61F2B] mt-2"></div>
            </div>
            <p className="text-black/80 text-sm leading-relaxed">
              Hệ thống cung cấp kiến thức chuyên sâu về thời kỳ quá độ lên CNXH tại Việt Nam 
              và sự phát triển của các hình thái dân chủ. Chúng tôi hướng tới mục tiêu lan tỏa 
              giá trị lý luận khoa học, góp phần xây dựng đất nước phồn vinh và hạnh phúc.
            </p>
          </div>
          
          {/* Topics Section */}
          <div className="md:col-span-4 p-4">
            <div className="heading-clean">
              <h4 className="text-sm uppercase tracking-wide font-bold text-black">Nội Dung Chính</h4>
              <div className="w-6 h-[1px] bg-[#A61F2B] mt-2"></div>
            </div>
            <div className="space-y-3 mt-6">
              {[
                { name: "Quá độ lên CNXH ở Việt Nam", path: "/noi-dung-chinh?topic=1" },
                { name: "Dân chủ và sự ra đời, phát triển của dân chủ", path: "/noi-dung-chinh?topic=2" },
                { name: "Dân chủ xã hội chủ nghĩa", path: "/noi-dung-chinh?topic=3" },
                { name: "Tổng kết bài học", path: "/noi-dung-chinh#tong-ket" },
                { name: "Video bài giảng", path: "/on-tap-quiz" }
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className="block text-black/70 hover:text-[#A61F2B] transition-colors duration-200 text-sm"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Vietnamese Logo Section */}
          <div className="md:col-span-3 flex justify-center items-center p-4">
            <div className="text-center">
              <div className="w-32 h-20 mx-auto mb-4 bg-[#A61F2B]/10 flex items-center justify-center">
                <Image
                  src="/image.png"
                  alt="Vietnamese Emblem"
                  width={200}
                  height={160}
                  className="mx-auto mb-2"
                />
              </div>
              <p className="text-xs font-medium uppercase tracking-widest text-black/70">
                Việt Nam Thịnh Vượng
              </p>
              <p className="text-xs text-black/50 mt-1 italic">
                Khát vọng 2045
              </p>
            </div>
          </div>
        </div>
        
        {/* Bottom footer */}
        <div className="relative p-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-black/60">
            <div className="mb-4 md:mb-0">
              © {new Date().getFullYear()} Cổng thông tin Lý luận Chính trị. Tài liệu học tập và nghiên cứu.
            </div>
            <div className="flex space-x-6 items-center">
              <span className="font-medium text-xs tracking-widest uppercase flex items-center">
                <span className="w-3 h-[1px] bg-[#A61F2B] mr-2"></span>
                Độc lập - Tự do - Hạnh phúc
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;