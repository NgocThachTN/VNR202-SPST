"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import {
  ChevronRight,
  ChevronLeft,
  Star,
  Shield,
  Flag,
  Zap,
  BookOpen,
  CheckCircle,
  Circle,
  Swords,
  Vote,
  Landmark,
  Wheat,
  TrendingUp,
  Scale,
  Award,
  Target,
  ArrowRight,
  Sparkles,
  Trophy,
  RotateCcw,
  X,
  Calendar,
  MapPin,
  Info,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════ */
/*  DATA                                                              */
/* ═══════════════════════════════════════════════════════════════════ */

interface Milestone {
  year: string;
  label: string;
  icon: React.ReactNode;
  accent: string;
  headline: string;
  body: string;
  highlight?: string;
  image: string;
  imageCaption: string;
  detailContent: string[];
  detailBullets: string[];
}

const PHASE_1: Milestone[] = [
  {
    year: "1975",
    label: "30 / 4",
    icon: <Flag size={28} />,
    accent: "#A61F2B",
    headline: "Giải phóng miền Nam",
    body: "Chiến dịch Hồ Chí Minh toàn thắng. Xe tăng húc đổ cổng Dinh Độc Lập, kết thúc 21 năm đất nước bị chia cắt. Non sông thu về một mối.",
    highlight: "Đất nước thống nhất",
    image: "/images/giai-phong-mien-nam.jpg",
    imageCaption: "Xe tăng T-54B số hiệu 843 — một trong hai chiếc húc đổ cổng Dinh Độc Lập ngày 30/4/1975",
    detailContent: [
      "Chiến dịch Hồ Chí Minh là chiến dịch cuối cùng trong cuộc kháng chiến chống Mỹ cứu nước, diễn ra từ ngày 26 đến 30 tháng 4 năm 1975. Đây là chiến dịch quân sự lớn nhất trong lịch sử Việt Nam, huy động 5 quân đoàn chủ lực cùng lực lượng vũ trang địa phương.",
      "Lúc 10 giờ 45 phút ngày 30/4/1975, xe tăng T-54B mang số hiệu 843 do Đại đội trưởng Bùi Quang Thận chỉ huy húc đổ cổng chính Dinh Độc Lập. Tổng thống Dương Văn Minh tuyên bố đầu hàng vô điều kiện, chấm dứt chế độ Sài Gòn.",
      "Chiến thắng 30/4/1975 đánh dấu sự kết thúc 21 năm đất nước bị chia cắt (1954–1975), mở ra kỷ nguyên hòa bình, thống nhất và đi lên chủ nghĩa xã hội trên phạm vi cả nước.",
    ],
    detailBullets: [
      "Huy động 5 quân đoàn chủ lực + lực lượng địa phương",
      "Xe tăng T-54B số 843 húc đổ cổng Dinh Độc Lập lúc 10:45",
      "Tổng thống Dương Văn Minh tuyên bố đầu hàng vô điều kiện",
      "Kết thúc 21 năm đất nước bị chia cắt (1954–1975)",
      "Mở ra kỷ nguyên hòa bình, thống nhất, đi lên CNXH",
    ],
  },
  {
    year: "1975",
    label: "Tháng 8",
    icon: <Star size={28} />,
    accent: "#c0392b",
    headline: "Hội nghị TW 24",
    body: "Ban Chấp hành Trung ương Đảng khóa III họp Hội nghị lần thứ 24, chốt chủ trương cấp bách: Phải thống nhất đất nước về mặt Nhà nước ngay lập tức!",
    highlight: "Quyết sách lịch sử",
    image: "/images/hoi-nghi-tw24.jpg",
    imageCaption: "Hội trường Ba Đình — nơi diễn ra các kỳ họp quan trọng của Đảng và Nhà nước",
    detailContent: [
      "Sau đại thắng mùa Xuân 1975, vấn đề cấp bách nhất là thống nhất đất nước về mặt Nhà nước. Tháng 8/1975, Ban Chấp hành Trung ương Đảng khóa III họp Hội nghị lần thứ 24 tại Hà Nội.",
      "Hội nghị nhận định rằng dù chiến tranh đã kết thúc, hai miền vẫn tồn tại hai chính quyền khác nhau. Việc thống nhất về mặt Nhà nước là nhiệm vụ hàng đầu, không thể trì hoãn.",
      "Hội nghị TW 24 đã đề ra chủ trương tổ chức Hội nghị Hiệp thương chính trị giữa đại biểu hai miền, tiến tới Tổng tuyển cử bầu Quốc hội chung cho cả nước. Đây là bước đi quyết định mở đường cho sự thống nhất toàn vẹn.",
    ],
    detailBullets: [
      "Hội nghị Trung ương 24 — Ban Chấp hành TW Đảng khóa III",
      "Xác định thống nhất Nhà nước là nhiệm vụ cấp bách hàng đầu",
      "Đề ra chủ trương tổ chức Hội nghị Hiệp thương chính trị",
      "Chuẩn bị cho Tổng tuyển cử bầu Quốc hội chung cả nước",
      "Bước ngoặt quyết định cho tiến trình thống nhất đất nước",
    ],
  },
  {
    year: "1975",
    label: "Tháng 11",
    icon: <Landmark size={28} />,
    accent: "#e74c3c",
    headline: "Hiệp thương Bắc – Nam",
    body: "Đại biểu hai miền tề tựu tại Sài Gòn, thống nhất ý chí: Tổ chức Tổng tuyển cử bầu Quốc hội chung cho cả nước.",
    highlight: "Đoàn kết dân tộc",
    image: "/images/hiep-thuong-bac-nam.jpg",
    imageCaption: "Dinh Thống Nhất (Dinh Độc Lập cũ) tại TP. Hồ Chí Minh — nơi diễn ra Hội nghị Hiệp thương",
    detailContent: [
      "Ngày 15–21/11/1975, Hội nghị Hiệp thương chính trị thống nhất đất nước được tổ chức tại Sài Gòn (nay là TP. Hồ Chí Minh), với sự tham gia của 25 đại biểu miền Bắc và 25 đại biểu miền Nam.",
      "Hội nghị đã thảo luận và nhất trí cao về việc tổ chức Tổng tuyển cử trong cả nước để bầu ra Quốc hội chung — cơ quan quyền lực nhà nước cao nhất của nước Việt Nam thống nhất.",
      "Cuộc Hiệp thương thể hiện ý chí thống nhất mãnh liệt của nhân dân hai miền sau hơn 20 năm chia cắt. Đây là bước đi quan trọng, đặt nền tảng pháp lý cho cuộc Tổng tuyển cử ngày 25/4/1976.",
    ],
    detailBullets: [
      "Diễn ra từ 15–21/11/1975 tại Sài Gòn",
      "25 đại biểu miền Bắc + 25 đại biểu miền Nam",
      "Nhất trí tổ chức Tổng tuyển cử bầu Quốc hội chung",
      "Thể hiện ý chí thống nhất mãnh liệt của nhân dân cả nước",
      "Đặt nền tảng pháp lý cho Tổng tuyển cử 25/4/1976",
    ],
  },
  {
    year: "1976",
    label: "25 / 4",
    icon: <Vote size={28} />,
    accent: "#A61F2B",
    headline: "Tổng Tuyển Cử",
    body: "Hơn 23 triệu cử tri (98,77%) nô nức bầu Quốc hội chung — lần đầu sau hơn 20 năm, cả nước cùng cầm lá phiếu.",
    highlight: "98,77% cử tri",
    image: "/images/tong-tuyen-cu.jpg",
    imageCaption: "Kỷ niệm ngày thống nhất đất nước — biểu ngữ chào mừng tại TP. Hồ Chí Minh",
    detailContent: [
      "Ngày 25/4/1976, cuộc Tổng tuyển cử bầu Quốc hội chung được tổ chức trên phạm vi cả nước. Đây là lần đầu tiên sau hơn 20 năm chia cắt, nhân dân hai miền Nam–Bắc cùng thực hiện quyền công dân thiêng liêng.",
      "Cuộc bầu cử thu hút sự tham gia nhiệt tình của hơn 23 triệu cử tri, đạt tỷ lệ 98,77% — con số thể hiện nguyện vọng thống nhất mãnh liệt. 492 đại biểu được bầu vào Quốc hội khóa VI.",
      "Tổng tuyển cử 25/4/1976 có ý nghĩa lịch sử vô cùng to lớn: khẳng định ý chí thống nhất của toàn dân tộc, tạo cơ sở pháp lý vững chắc để hoàn thành thống nhất đất nước về mặt Nhà nước.",
    ],
    detailBullets: [
      "Ngày 25/4/1976 — Tổng tuyển cử trên phạm vi cả nước",
      "Hơn 23 triệu cử tri tham gia (tỷ lệ 98,77%)",
      "Bầu ra 492 đại biểu Quốc hội khóa VI",
      "Lần đầu tiên sau 20 năm cả nước cùng cầm lá phiếu",
      "Cơ sở pháp lý hoàn thành thống nhất Nhà nước",
    ],
  },
  {
    year: "1976",
    label: "24/6 – 3/7",
    icon: <Award size={28} />,
    accent: "#c0392b",
    headline: "Quốc hội khóa VI",
    body: "Quốc hiệu: CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM. Thủ đô: Hà Nội. Sài Gòn → TP. Hồ Chí Minh. Cờ đỏ sao vàng. Tiến quân ca.",
    highlight: "Khai sinh quốc hiệu mới",
    image: "/images/quoc-hoi-khoa-vi.jpg",
    imageCaption: "Tòa nhà Quốc hội Việt Nam tại Hà Nội",
    detailContent: [
      "Từ ngày 24/6 đến 3/7/1976, Quốc hội khóa VI — Quốc hội đầu tiên của nước Việt Nam thống nhất — họp kỳ đầu tiên tại Hà Nội. 492 đại biểu đại diện cho nhân dân cả nước tham dự.",
      "Quốc hội quyết định những vấn đề trọng đại: Quốc hiệu là CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM. Thủ đô đặt tại Hà Nội. Sài Gòn – Gia Định được đổi tên thành Thành phố Hồ Chí Minh. Quốc kỳ là cờ đỏ sao vàng. Quốc ca là bài Tiến quân ca.",
      "Kỳ họp cũng bầu ra các vị trí lãnh đạo cao nhất: Chủ tịch nước Tôn Đức Thắng, Thủ tướng Phạm Văn Đồng, Chủ tịch Quốc hội Trường Chinh. Đây là dấu mốc hoàn thành thống nhất đất nước về mặt Nhà nước.",
    ],
    detailBullets: [
      "Kỳ họp 24/6 – 3/7/1976, 492 đại biểu tham dự",
      "Quốc hiệu: CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM",
      "Thủ đô: Hà Nội | Sài Gòn → TP. Hồ Chí Minh",
      "Quốc kỳ: Cờ đỏ sao vàng | Quốc ca: Tiến quân ca",
      "Hoàn thành thống nhất đất nước về mặt Nhà nước",
    ],
  },
  {
    year: "1976",
    label: "Tháng 12",
    icon: <Star size={28} />,
    accent: "#e74c3c",
    headline: "Đại hội IV",
    body: "Chính thức đổi tên thành Đảng Cộng sản Việt Nam. Tiến hành đồng thời 3 cuộc cách mạng: Quan hệ sản xuất — Khoa học kỹ thuật — Tư tưởng văn hóa.",
    highlight: "Đảng Cộng sản VN",
    image: "/images/dai-hoi-iv.jpg",
    imageCaption: "Biển hiệu tặng Đại hội IV của Đảng — từ công nhân Nhà máy Cơ khí Nam Định",
    detailContent: [
      "Đại hội đại biểu toàn quốc lần thứ IV của Đảng diễn ra từ ngày 14–20/12/1976 tại Hà Nội, với sự tham dự của 1.008 đại biểu. Đây là Đại hội đầu tiên sau khi đất nước thống nhất.",
      "Đại hội quyết định đổi tên Đảng Lao động Việt Nam thành Đảng Cộng sản Việt Nam — phản ánh đúng bản chất và sứ mệnh lịch sử của Đảng trong giai đoạn mới.",
      "Đại hội đề ra đường lối chung: tiến hành đồng thời ba cuộc cách mạng — Cách mạng quan hệ sản xuất, Cách mạng khoa học kỹ thuật, và Cách mạng tư tưởng văn hóa. Trong đó, cách mạng khoa học kỹ thuật là then chốt. Mục tiêu là đưa cả nước tiến nhanh, tiến mạnh, tiến vững chắc lên CNXH.",
    ],
    detailBullets: [
      "14–20/12/1976 tại Hà Nội, 1.008 đại biểu tham dự",
      "Đổi tên: Đảng Lao động VN → Đảng Cộng sản Việt Nam",
      "3 cuộc cách mạng đồng thời: QHSX – KHKT – TTVH",
      "KHKT là then chốt trong ba cuộc cách mạng",
      "Mục tiêu: tiến nhanh, mạnh, vững chắc lên CNXH",
    ],
  },
  {
    year: "1979",
    label: "7 / 1",
    icon: <Swords size={28} />,
    accent: "#A61F2B",
    headline: "Chiến thắng Tây Nam",
    body: "Quân tình nguyện Việt Nam cùng lực lượng cách mạng Campuchia giải phóng Phnôm Pênh, lật đổ chế độ diệt chủng Khmer Đỏ.",
    highlight: "Giải phóng Campuchia",
    image: "/images/chien-thang-tay-nam.jpg",
    imageCaption: "Bản đồ chiến dịch phản công biên giới Tây Nam và giải phóng Campuchia (1978–1979)",
    detailContent: [
      "Từ năm 1975, chế độ Khmer Đỏ do Pol Pot cầm đầu liên tục gây chiến tranh biên giới Tây Nam, tàn sát hàng nghìn dân thường Việt Nam. Trong nước Campuchia, Khmer Đỏ thực hiện chính sách diệt chủng, giết hại gần 2 triệu người dân vô tội.",
      "Trước tình hình đó, quân tình nguyện Việt Nam phối hợp với lực lượng cách mạng Campuchia (Mặt trận Đoàn kết Dân tộc Cứu nước Campuchia) mở chiến dịch phản công. Ngày 7/1/1979, thủ đô Phnôm Pênh được giải phóng, chế độ diệt chủng Pol Pot bị lật đổ.",
      "Chiến thắng biên giới Tây Nam không chỉ bảo vệ chủ quyền lãnh thổ Việt Nam mà còn cứu nhân dân Campuchia khỏi thảm họa diệt chủng. Đây là nghĩa vụ quốc tế cao cả, thể hiện truyền thống tương thân tương ái giữa các dân tộc Đông Dương.",
    ],
    detailBullets: [
      "Khmer Đỏ liên tục xâm phạm biên giới Tây Nam từ 1975",
      "Pol Pot thực hiện diệt chủng, giết gần 2 triệu người Campuchia",
      "Ngày 7/1/1979: giải phóng thủ đô Phnôm Pênh",
      "Phối hợp với Mặt trận Đoàn kết Dân tộc Cứu nước Campuchia",
      "Bảo vệ chủ quyền VN + cứu nhân dân Campuchia",
    ],
  },
  {
    year: "1979",
    label: "17 / 2",
    icon: <Shield size={28} />,
    accent: "#c0392b",
    headline: "Bảo vệ biên giới Bắc",
    body: "Quân dân biên giới phía Bắc anh dũng chiến đấu bảo vệ chủ quyền lãnh thổ, thể hiện ý chí kiên cường bất khuất.",
    highlight: "Bất khuất kiên cường",
    image: "/images/bien-gioi-phia-bac.jpg",
    imageCaption: "Dấu tích chiến tranh biên giới 1979 tại Lạng Sơn — minh chứng cho sự tàn khốc của cuộc chiến",
    detailContent: [
      "Sáng ngày 17/2/1979, quân đội nước ngoài đồng loạt tấn công trên toàn tuyến biên giới phía Bắc Việt Nam, từ Quảng Ninh đến Lai Châu, với lực lượng khoảng 600.000 quân. Đây là cuộc chiến tranh bảo vệ biên giới quy mô lớn.",
      "Quân và dân các tỉnh biên giới phía Bắc đã anh dũng chiến đấu, kiên cường bảo vệ từng tấc đất thiêng liêng của Tổ quốc. Các địa danh như Lạng Sơn, Cao Bằng, Lào Cai, Hà Giang trở thành biểu tượng cho tinh thần bất khuất.",
      "Cuộc chiến đấu bảo vệ biên giới phía Bắc thể hiện ý chí \"không có gì quý hơn độc lập tự do\" — sẵn sàng đánh bại mọi kẻ xâm lược để giữ vững chủ quyền, toàn vẹn lãnh thổ, dù phải đối mặt với hy sinh to lớn.",
    ],
    detailBullets: [
      "17/2/1979: tấn công đồng loạt 6 tỉnh biên giới phía Bắc",
      "Khoảng 600.000 quân tấn công từ Quảng Ninh đến Lai Châu",
      "Quân dân biên giới kiên cường bảo vệ từng tấc đất",
      "Lạng Sơn, Cao Bằng, Lào Cai — biểu tượng bất khuất",
      "Khẳng định ý chí bảo vệ chủ quyền, toàn vẹn lãnh thổ",
    ],
  },
  {
    year: "1979",
    label: "Tháng 8",
    icon: <Zap size={28} />,
    accent: "#e74c3c",
    headline: 'TW 6 — "Sản xuất bung ra"',
    body: "Bước đột phá tư duy đầu tiên: Thừa nhận cơ chế cũ kìm hãm sản xuất, cho phép \"sản xuất bung ra\" — luồng gió mới cho nền kinh tế.",
    highlight: "Đột phá #1",
    image: "/images/san-xuat-bung-ra.jpg",
    imageCaption: "Biểu ngữ Đại hội Đảng Cộng sản Việt Nam — biểu tượng cho đường lối đổi mới",
    detailContent: [
      "Hội nghị Ban Chấp hành Trung ương lần thứ 6 (khóa IV) họp tháng 8/1979 đánh dấu bước đột phá tư duy đầu tiên trong tiến trình đổi mới kinh tế Việt Nam.",
      "Hội nghị thừa nhận một thực tế đau xót: cơ chế quản lý tập trung quan liêu bao cấp đã kìm hãm sản xuất, gây ra tình trạng trì trệ kinh tế nghiêm trọng. Lần đầu tiên, Đảng chính thức nêu phương châm \"sản xuất bung ra\" — cho phép các đơn vị kinh tế chủ động hơn trong sản xuất và tiêu thụ sản phẩm.",
      "Đây là bước ngoặt quan trọng, mở đường cho Chỉ thị 100 (Khoán 100) trong nông nghiệp và các cải cách kinh tế tiếp theo. Tinh thần \"sản xuất bung ra\" như luồng gió mới thổi vào nền kinh tế đang trì trệ, báo hiệu sự chuyển đổi từ cơ chế cũ sang tư duy mới.",
    ],
    detailBullets: [
      "Hội nghị TW 6 khóa IV — tháng 8/1979",
      "Thừa nhận cơ chế tập trung bao cấp kìm hãm sản xuất",
      "Nêu phương châm \"sản xuất bung ra\" — đột phá tư duy",
      "Cho phép đơn vị kinh tế chủ động sản xuất & tiêu thụ",
      "Mở đường cho Khoán 100 và các cải cách tiếp theo",
    ],
  },
  {
    year: "1981",
    label: "Tháng 1",
    icon: <Wheat size={28} />,
    accent: "#A61F2B",
    headline: "Khoán 100",
    body: "Chỉ thị 100-CT/TW khoán sản phẩm đến người lao động trong HTX nông nghiệp. Nông dân lần đầu \"làm chủ\" sản phẩm — sức sống mới bùng lên đồng ruộng.",
    highlight: "Đổi mới nông nghiệp",
    image: "/images/khoan-100.jpg",
    imageCaption: "Nông dân Việt Nam canh tác lúa — hình ảnh tiêu biểu cho tinh thần đổi mới nông nghiệp",
    detailContent: [
      "Ngày 13/1/1981, Ban Bí thư Trung ương Đảng ban hành Chỉ thị số 100-CT/TW về \"Cải tiến công tác khoán, mở rộng khoán sản phẩm đến nhóm lao động và người lao động trong hợp tác xã nông nghiệp\" — thường gọi là \"Khoán 100\".",
      "Nội dung cốt lõi: thay vì khoán theo công điểm (người lao động chỉ nhận công, không quan tâm kết quả), Khoán 100 cho phép khoán sản phẩm trực tiếp đến người lao động. Sau khi hoàn thành phần khoán cho HTX, nông dân được giữ lại phần dư — lần đầu tiên \"làm chủ\" thành quả lao động của mình.",
      "Kết quả: sản lượng lương thực tăng vọt, nông dân hào hứng sản xuất, đồng ruộng bừng sức sống mới. Khoán 100 là minh chứng rõ ràng nhất rằng đổi mới cơ chế quản lý sẽ giải phóng sức sản xuất, và là tiền đề quan trọng cho Khoán 10 (1988) sau này.",
    ],
    detailBullets: [
      "Chỉ thị 100-CT/TW ban hành ngày 13/1/1981",
      "Khoán sản phẩm đến nhóm và người lao động trong HTX",
      "Nông dân lần đầu được \"làm chủ\" thành quả lao động",
      "Sản lượng lương thực tăng vọt sau khi áp dụng",
      "Tiền đề cho Khoán 10 (1988) — đổi mới sâu rộng hơn",
    ],
  },
];

const PHASE_2: Milestone[] = [
  {
    year: "1982",
    label: "Tháng 3",
    icon: <Landmark size={28} />,
    accent: "#1a5276",
    headline: "Đại hội V",
    body: "Nhìn thẳng sự thật: đất nước ở \"chặng đường đầu tiên\" đầy khó khăn. Hai nhiệm vụ: Xây dựng CNXH & Bảo vệ Tổ quốc. Nông nghiệp = mặt trận hàng đầu.",
    highlight: "Nhìn thẳng sự thật",
    image: "/images/dai-hoi-v.jpg",
    imageCaption: "Biểu ngữ Đại hội Đảng Cộng sản Việt Nam — thể hiện quyết tâm xây dựng đất nước",
    detailContent: [
      "Đại hội đại biểu toàn quốc lần thứ V của Đảng Cộng sản Việt Nam diễn ra từ ngày 27–31/3/1982 tại Hà Nội. Đại hội có 1.033 đại biểu tham dự, đại diện cho gần 1,73 triệu đảng viên.",
      "Đại hội thẳng thắn nhìn nhận đất nước đang ở \"chặng đường đầu tiên\" của thời kỳ quá độ — đầy khó khăn và thử thách. Hai nhiệm vụ chiến lược được xác định: Xây dựng CNXH và Bảo vệ Tổ quốc. Nông nghiệp được xác định là \"mặt trận hàng đầu\".",
      "Đại hội V cũng chỉ ra nhiều khuyết điểm trong quản lý kinh tế: nóng vội, chủ quan duy ý chí, vi phạm quy luật khách quan. Tinh thần \"nhìn thẳng sự thật\" bắt đầu hình thành — dù chưa đủ mạnh mẽ để tạo đột phá toàn diện như Đại hội VI sau này.",
    ],
    detailBullets: [
      "27–31/3/1982, 1.033 đại biểu — gần 1,73 triệu đảng viên",
      "Thừa nhận đất nước ở \"chặng đường đầu tiên\" đầy khó khăn",
      "Hai nhiệm vụ: Xây dựng CNXH & Bảo vệ Tổ quốc",
      "Nông nghiệp = mặt trận hàng đầu",
      "Chỉ ra khuyết điểm: nóng vội, chủ quan duy ý chí",
    ],
  },
  {
    year: "1982–85",
    label: "Khủng hoảng",
    icon: <TrendingUp size={28} />,
    accent: "#2c3e50",
    headline: "Lạm phát 774%",
    body: "Đời sống cực kỳ khó khăn. Tem phiếu bao cấp bộc lộ bất cập: hàng hóa khan hiếm, xếp hàng dài mua gạo, thịt, vải. Áp lực buộc phải đổi mới.",
    highlight: "774% lạm phát",
    image: "/images/lam-phat-bao-cap.jpg",
    imageCaption: "Biển số phương tiện thời bao cấp tại TP. Hồ Chí Minh — dấu ấn của thời kỳ khó khăn",
    detailContent: [
      "Giai đoạn 1982–1985 là thời kỳ khủng hoảng kinh tế – xã hội trầm trọng nhất trong lịch sử nước Việt Nam thống nhất. Lạm phát phi mã leo thang từ vài chục phần trăm lên con số kỷ lục 774%.",
      "Cuộc sống người dân cực kỳ khó khăn dưới chế độ tem phiếu bao cấp: mỗi tháng một người chỉ được mua vài kg gạo, vài lạng thịt, vài mét vải theo phiếu phân phối. Hàng hóa khan hiếm trầm trọng, người dân phải xếp hàng dài từ tờ mờ sáng để mua lương thực.",
      "Khủng hoảng bao cấp bộc lộ rõ ràng sự bất cập của cơ chế quản lý tập trung quan liêu. Thực tế đau đớn này tạo ra áp lực không thể cưỡng lại, buộc Đảng và Nhà nước phải tìm đường đổi mới — từ đó thai nghén các bước đột phá tiếp theo.",
    ],
    detailBullets: [
      "Lạm phát phi mã: lên tới 774% — kỷ lục lịch sử",
      "Tem phiếu bao cấp: vài kg gạo, vài lạng thịt/tháng/người",
      "Xếp hàng từ tờ mờ sáng để mua lương thực, nhu yếu phẩm",
      "Cơ chế tập trung quan liêu bao cấp bộc lộ bất cập nghiêm trọng",
      "Áp lực buộc phải tìm đường đổi mới cơ chế quản lý",
    ],
  },
  {
    year: "1985",
    label: "Tháng 6",
    icon: <Scale size={28} />,
    accent: "#1a5276",
    headline: "TW 8 — Giá · Lương · Tiền",
    body: "\"Khai tử\" cơ chế bao cấp. Chọn Giá – Lương – Tiền làm khâu đột phá. Lần đầu thừa nhận quy luật giá trị và hàng hóa – tiền tệ.",
    highlight: "Đột phá #2",
    image: "/images/gia-luong-tien.jpg",
    imageCaption: "Tiền giấy Việt Nam — biểu tượng cho cuộc cải cách Giá–Lương–Tiền",
    detailContent: [
      "Hội nghị Ban Chấp hành Trung ương lần thứ 8 (khóa V) họp tháng 6/1985 đánh dấu bước đột phá thứ hai trong tư duy kinh tế. Hội nghị quyết định \"khai tử\" cơ chế bao cấp và chọn Giá – Lương – Tiền làm khâu đột phá.",
      "Nội dung cốt lõi: Lần đầu tiên Đảng chính thức thừa nhận quy luật giá trị, quy luật hàng hóa – tiền tệ trong nền kinh tế XHCN. Giá cả phải phản ánh đúng giá trị hàng hóa, không thể áp đặt giá bao cấp phi thực tế. Lương phải đảm bảo đời sống người lao động.",
      "Đây là bước chuyển tư duy rất lớn — từ phủ nhận kinh tế thị trường sang thừa nhận các quy luật kinh tế khách quan. Tuy thực hiện còn nhiều vấp váp (dẫn đến đổi tiền thất bại 9/1985), nhưng tinh thần \"Giá – Lương – Tiền\" đặt nền tảng tư duy cho Đổi Mới toàn diện.",
    ],
    detailBullets: [
      "Hội nghị TW 8 khóa V — tháng 6/1985",
      "\"Khai tử\" cơ chế bao cấp — xóa bỏ giá bao cấp phi thực tế",
      "Thừa nhận quy luật giá trị, quy luật hàng hóa – tiền tệ",
      "Chọn Giá – Lương – Tiền làm khâu đột phá",
      "Nền tảng tư duy cho Đổi Mới toàn diện (Đại hội VI)",
    ],
  },
  {
    year: "1985",
    label: "Tháng 9",
    icon: <Zap size={28} />,
    accent: "#2c3e50",
    headline: "Đổi tiền",
    body: "Đổi tiền (1 mới = 10 cũ) kết hợp điều chỉnh giá–lương–tiền. Thiếu đồng bộ khiến lạm phát bùng mạnh hơn — bài học đau đớn nhưng quý giá.",
    highlight: "Bài học cải cách",
    image: "/images/doi-tien.jpg",
    imageCaption: "Tiền giấy Việt Nam thời kỳ trước đổi mới — biểu tượng cho cuộc đổi tiền 1985",
    detailContent: [
      "Ngày 14/9/1985, Nhà nước tiến hành đổi tiền trên phạm vi cả nước: 1 đồng mới bằng 10 đồng cũ. Đây là cuộc cải cách tiền tệ nhằm thực hiện chủ trương Giá – Lương – Tiền đã đề ra tại TW 8.",
      "Tuy nhiên, việc thực hiện thiếu đồng bộ và chuẩn bị chưa kỹ lưỡng. Giá cả tăng vọt sau đổi tiền, lạm phát không những không được kiểm soát mà còn bùng phát mạnh hơn. Đời sống nhân dân càng thêm khó khăn.",
      "Cuộc đổi tiền 9/1985 trở thành bài học đau đớn nhưng vô cùng quý giá: cải cách kinh tế phải có lộ trình, phải đồng bộ, không thể nóng vội. Thất bại này càng thôi thúc Đảng tìm kiếm giải pháp đổi mới toàn diện và triệt để hơn.",
    ],
    detailBullets: [
      "14/9/1985: đổi tiền toàn quốc — 1 đồng mới = 10 đồng cũ",
      "Thực hiện thiếu đồng bộ, chuẩn bị chưa kỹ lưỡng",
      "Lạm phát bùng phát mạnh hơn sau đổi tiền",
      "Bài học: cải cách phải có lộ trình, đồng bộ, không nóng vội",
      "Thất bại thôi thúc tìm kiếm đổi mới toàn diện hơn",
    ],
  },
  {
    year: "1986",
    label: "Tháng 8",
    icon: <Target size={28} />,
    accent: "#1a5276",
    headline: "Bộ Chính trị — Đột phá kinh tế",
    body: "Kết luận nền tảng: Đổi mới cơ cấu sản xuất, đổi mới quản lý, cải tạo XHCN theo hướng mới — định hình tư duy cho Đại hội VI.",
    highlight: "Đột phá #3",
    image: "/images/bo-chinh-tri-1986.jpg",
    imageCaption: "Dinh Thống Nhất tại TP. Hồ Chí Minh — biểu tượng của sự thống nhất và đổi mới",
    detailContent: [
      "Tháng 8/1986, Bộ Chính trị ra kết luận quan trọng đánh dấu bước đột phá thứ ba trong tư duy kinh tế. Sau những bài học đau đớn từ khủng hoảng và đổi tiền thất bại, Đảng quyết tâm đổi mới tư duy một cách căn bản.",
      "Kết luận nêu rõ: Phải đổi mới cơ cấu sản xuất (không chỉ tập trung công nghiệp nặng mà phải phát triển nông nghiệp, công nghiệp nhẹ, hàng tiêu dùng). Phải đổi mới cơ chế quản lý (xóa bỏ quan liêu bao cấp, thừa nhận kinh tế nhiều thành phần). Phải cải tạo XHCN theo hướng mới — phù hợp thực tiễn.",
      "Đây là bước đột phá tư duy cuối cùng, trực tiếp định hình nội dung cho Đại hội VI. Từ đột phá này, toàn bộ hệ thống quan điểm kinh tế mới được hình thành, chuẩn bị cho Đường lối Đổi Mới toàn diện ra đời vào tháng 12/1986.",
    ],
    detailBullets: [
      "Tháng 8/1986 — Kết luận của Bộ Chính trị",
      "Đổi mới cơ cấu sản xuất: nông nghiệp, CN nhẹ, hàng tiêu dùng",
      "Đổi mới cơ chế quản lý: xóa quan liêu bao cấp",
      "Thừa nhận kinh tế nhiều thành phần",
      "Trực tiếp định hình nội dung cho Đại hội VI — Đổi Mới",
    ],
  },
  {
    year: "1986",
    label: "Tháng 12",
    icon: <Star size={28} />,
    accent: "#e74c3c",
    headline: "Đại hội VI — ĐỔI MỚI",
    body: "\"Nhìn thẳng vào sự thật, đánh giá đúng sự thật, nói rõ sự thật.\" Khai sinh Đường lối Đổi mới toàn diện — kỷ nguyên mới cho Việt Nam.",
    highlight: "Khởi đầu Đổi Mới",
    image: "/images/dai-hoi-vi-doi-moi.jpg",
    imageCaption: "Nông dân Việt Nam — hình ảnh biểu tượng cho tinh thần đổi mới và sức sống mới của đất nước",
    detailContent: [
      "Đại hội đại biểu toàn quốc lần thứ VI của Đảng Cộng sản Việt Nam diễn ra từ ngày 15–18/12/1986 tại Hà Nội. Đại hội có 1.129 đại biểu tham dự, đại diện cho gần 1,9 triệu đảng viên.",
      "Với phương châm \"Nhìn thẳng vào sự thật, đánh giá đúng sự thật, nói rõ sự thật\", Đại hội VI dũng cảm chỉ ra những sai lầm nghiêm trọng trong quản lý kinh tế: nóng vội, chủ quan duy ý chí, bao cấp — và quyết tâm đổi mới toàn diện.",
      "Đại hội đề ra Đường lối Đổi mới toàn diện: Đổi mới tư duy trước hết là tư duy kinh tế. Phát triển kinh tế nhiều thành phần. Xóa bỏ cơ chế tập trung quan liêu bao cấp, chuyển sang hạch toán kinh doanh XHCN. Ba chương trình kinh tế lớn: Lương thực – Thực phẩm, Hàng tiêu dùng, Hàng xuất khẩu.",
      "Đại hội VI được coi là \"Đại hội của Đổi Mới\" — mở ra kỷ nguyên phát triển mới cho đất nước. 11 năm thai nghén (1975–1986) với máu, mồ hôi và trí tuệ đã kết tinh thành Đường lối Đổi mới — di sản quý giá nhất của giai đoạn này.",
    ],
    detailBullets: [
      "15–18/12/1986, 1.129 đại biểu — gần 1,9 triệu đảng viên",
      "Phương châm: \"Nhìn thẳng vào sự thật, đánh giá đúng sự thật\"",
      "Đổi mới tư duy kinh tế — phát triển kinh tế nhiều thành phần",
      "3 chương trình: Lương thực, Hàng tiêu dùng, Hàng xuất khẩu",
      "Khai sinh Đường lối Đổi Mới toàn diện — kỷ nguyên mới",
    ],
  },
];

interface QuizItem {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const quizData: QuizItem[] = [
  { question: "Hội nghị nào chốt chủ trương thống nhất đất nước về mặt Nhà nước?", options: ["Hội nghị TW 21", "Hội nghị TW 24 (8/1975)", "Hội nghị TW 6 (8/1979)", "Đại hội V (3/1982)"], correctIndex: 1, explanation: "Tháng 8/1975, Hội nghị Trung ương 24 chốt chủ trương cấp bách: thống nhất đất nước về mặt Nhà nước." },
  { question: "Tổng tuyển cử bầu Quốc hội chung diễn ra ngày nào?", options: ["2/9/1975", "25/4/1976", "24/6/1976", "30/4/1975"], correctIndex: 1, explanation: "Ngày 25/4/1976, hơn 23 triệu cử tri (98,77%) tham gia Tổng tuyển cử bầu Quốc hội chung." },
  { question: "Quốc hội khóa VI đổi tên Sài Gòn thành gì?", options: ["TP. Giải Phóng", "TP. Hồ Chí Minh", "TP. Thống Nhất", "TP. Sài Gòn Mới"], correctIndex: 1, explanation: "Quốc hội khóa VI quyết định đổi tên Sài Gòn – Gia Định thành TP. Hồ Chí Minh." },
  { question: "Đại hội IV (12/1976) đổi tên Đảng thành gì?", options: ["Đảng Lao động VN", "Đảng Cộng sản VN", "Đảng Nhân dân CM", "Đảng Xã hội VN"], correctIndex: 1, explanation: "Đại hội IV chính thức đổi tên thành Đảng Cộng sản Việt Nam." },
  { question: "\"Khoán 100\" thuộc bước đột phá nào?", options: ["Đột phá thứ 2", "Đột phá thứ 1", "Đột phá thứ 3", "Không thuộc đột phá nào"], correctIndex: 1, explanation: "Khoán 100 thuộc Bước đột phá thứ 1 (8/1979 – 1/1981), gắn với \"sản xuất bung ra\" của TW 6." },
  { question: "Giải phóng Phnôm Pênh diễn ra ngày nào?", options: ["17/2/1979", "7/1/1979", "30/4/1975", "25/4/1976"], correctIndex: 1, explanation: "Chiến thắng biên giới Tây Nam: giải phóng Phnôm Pênh ngày 7/1/1979." },
  { question: "Đại hội V (3/1982) xác định mặt trận hàng đầu là gì?", options: ["Công nghiệp nặng", "Nông nghiệp", "Quốc phòng", "Thương mại"], correctIndex: 1, explanation: "Đại hội V xác định nông nghiệp là mặt trận hàng đầu." },
  { question: "TW 8 (6/1985) chọn khâu đột phá nào xóa bao cấp?", options: ["Giáo dục – Y tế", "Giá – Lương – Tiền", "Sản xuất – Xuất khẩu", "Công – Nông – Dịch vụ"], correctIndex: 1, explanation: "TW 8 chọn \"Giá – Lương – Tiền\" làm khâu đột phá xóa bao cấp." },
  { question: "Đột phá thứ 3 (8/1986) định hình tư duy cho Đại hội nào?", options: ["Đại hội IV", "Đại hội V", "Đại hội VI", "Đại hội VII"], correctIndex: 2, explanation: "Hội nghị Bộ Chính trị (8/1986) định hình tư duy cho Đại hội VI — Đại hội Đổi Mới." },
  { question: "1975–1986 là giai đoạn «thai nghén» cho đường lối nào?", options: ["Kháng chiến", "Đổi mới toàn diện", "Ngoại giao đa phương", "Công nghiệp hóa"], correctIndex: 1, explanation: "11 năm (1975–1986) là giai đoạn thai nghén cho Đường lối Đổi mới toàn diện." },
  { question: "Lạm phát Việt Nam đạt bao nhiêu % vào năm 1986?", options: ["200%", "450%", "774%", "1.000%"], correctIndex: 2, explanation: "Lạm phát phi mã lên tới 774%, đây là áp lực buộc phải Đổi mới." },
  { question: "Phương châm Đại hội VI (12/1986) là gì?", options: ["\"Đoàn kết, đại đoàn kết\"", "\"Nhìn thẳng vào sự thật, đánh giá đúng sự thật, nói rõ sự thật\"", "\"Tất cả vì dân\"", "\"Dĩ bất biến, ứng vạn biến\""], correctIndex: 1, explanation: "Đại hội VI: \"Nhìn thẳng vào sự thật, đánh giá đúng sự thật, nói rõ sự thật.\"" },
];

/* ═══════════════════════════════════════════════════════════════════ */
/*  COMPONENTS                                                        */
/* ═══════════════════════════════════════════════════════════════════ */

/** Animated number counter */
function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = Math.ceil(value / 40);
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { setCount(value); clearInterval(timer); }
      else setCount(start);
    }, 30);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/** Detail popup modal for milestone */
function MilestoneDetailModal({ m, isOpen, onClose }: { m: Milestone | null; isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && m && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white w-full sm:max-w-lg md:max-w-2xl rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden pointer-events-auto flex flex-col max-h-[92vh] sm:max-h-[85vh]"
            >
              {/* Drag handle (mobile) */}
              <div className="sm:hidden flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-black/15" />
              </div>

              {/* Header */}
              <div className="flex items-start gap-3 px-5 sm:px-6 pt-3 sm:pt-5 pb-4 border-b border-black/5">
                <div
                  className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-white shadow-md"
                  style={{ background: `linear-gradient(135deg, ${m.accent}, ${m.accent}dd)` }}
                >
                  {m.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] uppercase tracking-[.2em] font-bold text-black/40">{m.year}</span>
                    <span className="text-[10px] font-bold" style={{ color: m.accent }}>{m.label}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-[#1C1C1C] leading-tight pr-8">{m.headline}</h3>
                </div>
                <button
                  onClick={onClose}
                  className="flex-shrink-0 p-2 -mr-2 -mt-1 rounded-full hover:bg-black/5 transition-colors"
                >
                  <X size={20} className="text-black/40" />
                </button>
              </div>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto overscroll-contain">
                {/* Image */}
                <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-black/5">
                  <Image
                    src={m.image}
                    alt={m.headline}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 640px, 768px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 pb-3">
                    <p className="text-[11px] sm:text-xs text-white/80 leading-relaxed">{m.imageCaption}</p>
                  </div>
                </div>

                <div className="px-5 sm:px-6 py-5 sm:py-6 space-y-5">
                  {/* Highlight badge */}
                  {m.highlight && (
                    <span
                      className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white"
                      style={{ background: m.accent }}
                    >
                      {m.highlight}
                    </span>
                  )}

                  {/* Detail paragraphs */}
                  <div className="space-y-3">
                    {m.detailContent.map((p, i) => (
                      <p key={i} className="text-[13px] sm:text-sm text-[#333] leading-[1.75]">{p}</p>
                    ))}
                  </div>

                  {/* Key facts */}
                  <div className="bg-gradient-to-br from-black/[.02] to-black/[.04] rounded-2xl p-4 sm:p-5 border border-black/5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-black/50 mb-3 flex items-center gap-2">
                      <Info size={14} />
                      Thông tin quan trọng
                    </h4>
                    <ul className="space-y-2.5">
                      {m.detailBullets.map((b, i) => (
                        <li key={i} className="flex gap-2.5 items-start">
                          <span
                            className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-[7px]"
                            style={{ background: m.accent }}
                          />
                          <span className="text-[13px] sm:text-sm text-[#444] leading-relaxed">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Timeline context */}
                  <div className="flex items-center gap-3 pt-2 pb-1">
                    <Calendar size={14} className="text-black/30 flex-shrink-0" />
                    <p className="text-[11px] sm:text-xs text-black/40 font-medium">
                      Sự kiện thuộc giai đoạn 1975–1986 — Hành trình Kiến thiết & Bảo vệ Tổ quốc
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer close button (mobile friendly) */}
              <div className="px-5 sm:px-6 py-4 border-t border-black/5 bg-white">
                <button
                  onClick={onClose}
                  className="w-full py-3 rounded-xl text-sm font-semibold transition-colors text-white"
                  style={{ background: m.accent }}
                >
                  Đóng
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

/** Single milestone card — alternating layout, clickable */
function MilestoneCard({ m, index, onClick }: { m: Milestone; index: number; onClick: () => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="relative"
    >
      {/* connector line */}
      {index > 0 && (
        <div className="absolute left-1/2 -translate-x-1/2 -top-10 w-[2px] h-10 bg-gradient-to-b from-transparent to-black/10" />
      )}

      <div className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-6 md:gap-10 items-center`}>
        {/* Date block */}
        <div className="flex-shrink-0 w-full md:w-[200px] text-center md:text-right">
          <div className="inline-block">
            <p className="text-[11px] uppercase tracking-[.3em] font-semibold text-black/40 mb-1">{m.year}</p>
            <p className="text-3xl md:text-4xl font-black leading-none" style={{ color: m.accent }}>{m.label}</p>
          </div>
        </div>

        {/* Icon */}
        <div
          className="relative flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg"
          style={{ background: `linear-gradient(135deg, ${m.accent}, ${m.accent}dd)` }}
        >
          {m.icon}
          <div className="absolute inset-0 rounded-2xl ring-4 ring-white/20" />
        </div>

        {/* Content */}
        <div className="flex-1 w-full">
          <button
            onClick={onClick}
            className="w-full text-left bg-white/70 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-black/5 shadow-sm hover:shadow-lg hover:border-black/10 transition-all group cursor-pointer"
          >
            {m.highlight && (
              <span
                className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white mb-3"
                style={{ background: m.accent }}
              >
                {m.highlight}
              </span>
            )}
            <h3 className="text-lg md:text-xl font-bold text-[#1C1C1C] leading-snug mb-2">{m.headline}</h3>
            <p className="text-[#444] text-sm md:text-[15px] leading-relaxed mb-3">{m.body}</p>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors group-hover:gap-2.5" style={{ color: m.accent }}>
              Xem chi tiết <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/** Section divider with gradient */
function Divider({ color }: { color: string }) {
  return (
    <div className="flex items-center gap-4 my-16">
      <div className="flex-1 h-[1px]" style={{ background: `linear-gradient(to right, transparent, ${color}40)` }} />
      <div className="w-2 h-2 rounded-full" style={{ background: color }} />
      <div className="flex-1 h-[1px]" style={{ background: `linear-gradient(to left, transparent, ${color}40)` }} />
    </div>
  );
}

/** Quiz */
function InlineQuiz({ data }: { data: QuizItem[] }) {
  const [idx, setIdx] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = data[idx];
  const right = pick === q.correctIndex;

  function select(i: number) {
    if (pick !== null) return;
    setPick(i);
    if (i === q.correctIndex) setScore((s) => s + 1);
  }
  function next() {
    if (idx + 1 >= data.length) setDone(true);
    else { setIdx((i) => i + 1); setPick(null); }
  }
  function restart() { setIdx(0); setPick(null); setScore(0); setDone(false); }

  if (done) {
    const pct = Math.round((score / data.length) * 100);
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
        <div className="relative inline-block mb-6">
          <svg width="140" height="140" viewBox="0 0 140 140">
            <circle cx="70" cy="70" r="62" fill="none" stroke="#e5e5e5" strokeWidth="8" />
            <motion.circle
              cx="70" cy="70" r="62" fill="none"
              stroke={pct >= 70 ? "#27ae60" : "#A61F2B"} strokeWidth="8"
              strokeLinecap="round" strokeDasharray={390}
              initial={{ strokeDashoffset: 390 }}
              animate={{ strokeDashoffset: 390 - (390 * pct) / 100 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{ transformOrigin: "center", transform: "rotate(-90deg)" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-black" style={{ color: pct >= 70 ? "#27ae60" : "#A61F2B" }}>{pct}%</span>
            <span className="text-xs text-[#585858] font-medium">{score}/{data.length}</span>
          </div>
        </div>
        <p className="text-lg font-bold text-[#1C1C1C] mb-1">
          {pct >= 90 ? "Xuất sắc!" : pct >= 70 ? "Tốt lắm!" : pct >= 50 ? "Khá ổn!" : "Cố gắng thêm!"}
        </p>
        <p className="text-sm text-[#585858] mb-8">
          {pct >= 70 ? "Bạn nắm vững kiến thức rồi." : "Hãy đọc lại nội dung và thử lại nhé."}
        </p>
        <button onClick={restart} className="inline-flex items-center gap-2 px-6 py-3 bg-[#A61F2B] hover:bg-[#8B1923] text-white rounded-full font-semibold transition-colors">
          <RotateCcw size={16} /> Làm lại
        </button>
      </motion.div>
    );
  }

  return (
    <div>
      {/* progress */}
      <div className="flex items-center gap-2 mb-6">
        {data.map((_, i) => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i < idx ? "bg-[#A61F2B]" : i === idx ? "bg-[#A61F2B]/60" : "bg-black/10"}`} />
        ))}
      </div>
      <div className="flex justify-between mb-4">
        <span className="text-xs font-bold text-[#585858]">Câu {idx + 1} / {data.length}</span>
        <span className="text-xs font-bold text-[#A61F2B]">{score} đúng</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={idx} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }}>
          <p className="text-base md:text-lg font-bold text-[#1C1C1C] mb-5 leading-snug">{q.question}</p>
          <div className="grid gap-2.5">
            {q.options.map((opt, i) => {
              const isCorrectOpt = i === q.correctIndex;
              const isPicked = i === pick;
              let cls = "w-full text-left px-4 py-3.5 rounded-xl border text-sm font-medium transition-all flex items-center gap-3";
              if (pick === null) cls += " border-black/8 bg-white hover:bg-[#A61F2B]/5 hover:border-[#A61F2B]/30 cursor-pointer";
              else if (isCorrectOpt) cls += " border-emerald-400 bg-emerald-50 text-emerald-800";
              else if (isPicked) cls += " border-red-300 bg-red-50 text-red-700";
              else cls += " border-black/5 bg-white/40 text-[#bbb]";
              return (
                <button key={i} onClick={() => select(i)} className={cls}>
                  <span className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                    pick === null ? "bg-black/5 text-[#666]" : isCorrectOpt ? "bg-emerald-200 text-emerald-800" : isPicked ? "bg-red-200 text-red-700" : "bg-black/5 text-[#ccc]"
                  }`}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {pick !== null && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
                <div className={`p-4 rounded-xl text-sm leading-relaxed ${right ? "bg-emerald-50 border border-emerald-200 text-emerald-800" : "bg-red-50 border border-red-200 text-red-800"}`}>
                  <p className="font-bold mb-1">{right ? "Chính xác!" : "Chưa đúng!"}</p>
                  <p>{q.explanation}</p>
                </div>
                <button onClick={next} className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-[#A61F2B] hover:bg-[#8B1923] text-white rounded-full text-sm font-semibold transition-colors">
                  {idx + 1 >= data.length ? "Xem kết quả" : "Tiếp theo"} <ChevronRight size={16} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  PAGE                                                              */
/* ═══════════════════════════════════════════════════════════════════ */

export default function Wrapper() {
  return <Suspense fallback={null}><Page /></Suspense>;
}

function Page() {
  const sp = useSearchParams();
  const [tab, setTab] = useState<1 | 2 | 3>(1);
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);

  useEffect(() => {
    const t = sp.get("topic");
    if (t === "2") setTab(2);
    else if (t === "3") setTab(3);
    else setTab(1);
  }, [sp]);

  return (
    <div className="min-h-screen bg-transparent overflow-hidden">

      {/* Detail Modal */}
      <MilestoneDetailModal
        m={selectedMilestone}
        isOpen={selectedMilestone !== null}
        onClose={() => setSelectedMilestone(null)}
      />

      {/* ═══ HERO ═══ */}
      <section className="relative pt-12 pb-20 overflow-hidden">
        {/* decorative bg */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#A61F2B]/[.06] rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#1a5276]/[.05] rounded-full blur-[80px]" />
        </div>

        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-xs uppercase tracking-[.4em] text-[#A61F2B] font-bold mb-4">Chương 3.1</p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#1C1C1C] leading-[1.1] mb-6">
              Hành trình<br />
              <span className="relative inline-block">
                <span className="relative z-10">Kiến thiết</span>
                <span className="absolute bottom-1 left-0 w-full h-3 bg-[#A61F2B]/15 -z-0 rounded" />
              </span>
              {" & "}
              <span className="text-[#A61F2B]">Bảo vệ</span>
              <br />Tổ quốc
            </h1>

            <p className="text-[#585858] text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-10">
              Đất nước bước ra khỏi khói lửa chiến tranh, đón nhận hòa bình và thống nhất.
              Nhưng hành trình quá độ lên CNXH mở đầu với vô vàn thách thức.
            </p>
          </motion.div>

          {/* stat bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 md:gap-8"
          >
            {[
              { n: 11, s: " năm", l: "1975 – 1986" },
              { n: 3, s: " đột phá", l: "Tư duy kinh tế" },
              { n: 23, s: " triệu", l: "Cử tri bầu cử" },
              { n: 774, s: "%", l: "Lạm phát đỉnh" },
            ].map((s, i) => (
              <div key={i} className="bg-white/60 backdrop-blur-sm rounded-2xl px-5 py-4 border border-black/5 min-w-[130px]">
                <p className="text-2xl font-black text-[#A61F2B]"><Counter value={s.n} suffix={s.s} /></p>
                <p className="text-[11px] text-[#888] font-medium uppercase tracking-wider mt-0.5">{s.l}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ NAV TABS ═══ */}
      <div className="sticky top-[72px] z-30 bg-white/70 backdrop-blur-xl border-y border-black/5">
        <div className="max-w-3xl mx-auto px-4 flex">
          {([
            { id: 1 as const, label: "1975 – 1981", sub: "Bước chuyển mình" },
            { id: 2 as const, label: "1982 – 1986", sub: "Vượt khủng hoảng" },
            { id: 3 as const, label: "Tổng kết", sub: "11 năm nhìn lại" },
          ]).map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 py-3 text-center relative transition-colors ${tab === t.id ? "text-[#A61F2B]" : "text-[#999] hover:text-[#666]"}`}
            >
              <span className="text-[10px] uppercase tracking-widest font-bold block">{t.label}</span>
              <span className="text-[11px] font-medium">{t.sub}</span>
              {tab === t.id && (
                <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-[15%] right-[15%] h-[2px] bg-[#A61F2B] rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ═══ CONTENT ═══ */}
      <AnimatePresence mode="wait">
        {tab === 1 && (
          <motion.section key="p1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-3xl mx-auto px-4 py-16">
            {/* section intro */}
            <div className="text-center mb-14">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white bg-[#A61F2B] mb-4">Giai đoạn 1</span>
              <h2 className="text-2xl md:text-3xl font-black text-[#1C1C1C] mb-3">Bước Chuyển Mình Đầu Tiên</h2>
              <p className="text-[#585858] max-w-lg mx-auto text-sm leading-relaxed">
                Thống nhất non sông, bảo vệ biên giới, và những "đốm lửa" đổi mới đầu tiên.
              </p>
            </div>
            <div className="space-y-12">
              {PHASE_1.map((m, i) => <MilestoneCard key={i} m={m} index={i} onClick={() => setSelectedMilestone(m)} />)}
            </div>
          </motion.section>
        )}

        {tab === 2 && (
          <motion.section key="p2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-3xl mx-auto px-4 py-16">
            <div className="text-center mb-14">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white bg-[#1a5276] mb-4">Giai đoạn 2</span>
              <h2 className="text-2xl md:text-3xl font-black text-[#1C1C1C] mb-3">Tìm Đường Vượt Khủng Hoảng</h2>
              <p className="text-[#585858] max-w-lg mx-auto text-sm leading-relaxed">
                Từ khủng hoảng kinh tế – xã hội đến ba bước đột phá thai nghén Đổi Mới.
              </p>
            </div>
            <div className="space-y-12">
              {PHASE_2.map((m, i) => <MilestoneCard key={i} m={m} index={i} onClick={() => setSelectedMilestone(m)} />)}
            </div>
          </motion.section>
        )}

        {tab === 3 && (
          <motion.section key="p3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-3xl mx-auto px-4 py-16">
            <div className="text-center mb-14">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white bg-[#7d3c98] mb-4">Tổng kết</span>
              <h2 className="text-2xl md:text-3xl font-black text-[#1C1C1C] mb-3">11 Năm Nhìn Lại</h2>
              <p className="text-[#585858] max-w-lg mx-auto text-sm leading-relaxed">
                Máu, mồ hôi và trí tuệ — giai đoạn "thai nghén" vĩ đại cho Đường lối Đổi mới toàn diện.
              </p>
            </div>

            {/* Key achievements */}
            <div className="grid md:grid-cols-2 gap-5 mb-12">
              {[
                { icon: <Flag size={24} />, color: "#A61F2B", title: "Thống nhất non sông", desc: "Biến hai miền thành một quốc gia dưới tên Cộng hòa XHCN Việt Nam. Quốc hội chung, quốc kỳ chung, quốc ca chung." },
                { icon: <Shield size={24} />, color: "#1a5276", title: "Bảo vệ lãnh thổ", desc: "Đánh đổ chế độ diệt chủng Khmer Đỏ ở Tây Nam, bảo vệ chủ quyền phía Bắc trước ngoại xâm." },
                { icon: <Sparkles size={24} />, color: "#e67e22", title: "3 bước đột phá", desc: "Khoán 100 → Giá–Lương–Tiền → Quan điểm kinh tế mới. Nền móng tư duy cho Đổi Mới." },
                { icon: <Star size={24} />, color: "#7d3c98", title: "Thai nghén Đại hội VI", desc: "Những phép thử đau đớn giúp thai nghén Đường lối Đổi mới toàn diện (12/1986)." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-black/5 hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4" style={{ background: item.color }}>
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-[#1C1C1C] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#555] leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Lessons */}
            <div className="bg-gradient-to-br from-[#7d3c98]/10 via-white/60 to-[#A61F2B]/5 rounded-3xl p-8 border border-black/5 mb-8">
              <h3 className="text-lg font-bold text-[#1C1C1C] mb-6 flex items-center gap-2">
                <BookOpen size={20} className="text-[#7d3c98]" /> Bài học lịch sử
              </h3>
              <div className="space-y-4">
                {[
                  "Xuất phát từ thực tiễn, tôn trọng quy luật khách quan — không nóng vội, chủ quan duy ý chí.",
                  "Đổi mới là đòi hỏi tất yếu — bao cấp, quan liêu tất yếu dẫn đến khủng hoảng.",
                  "Kết hợp chặt chẽ hai nhiệm vụ: xây dựng kinh tế và bảo vệ Tổ quốc.",
                  "Đổi mới là quá trình tuần tự — không thể \"nhảy cóc\", phải thận trọng nhưng kiên quyết.",
                ].map((lesson, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-3 items-start"
                  >
                    <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-[#7d3c98] text-white flex items-center justify-center text-xs font-bold mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-sm text-[#333] leading-relaxed">{lesson}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Pull quote */}
            <motion.blockquote
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="relative bg-[#A61F2B] text-white rounded-3xl p-8 md:p-10 text-center"
            >
              <div className="absolute top-4 left-6 text-6xl leading-none text-white/20 font-serif">&ldquo;</div>
              <p className="text-lg md:text-xl font-semibold leading-relaxed max-w-lg mx-auto relative z-10">
                Nhìn thẳng vào sự thật, đánh giá đúng sự thật, nói rõ sự thật.
              </p>
              <p className="text-sm text-white/60 mt-4 font-medium">— Phương châm Đại hội VI, tháng 12/1986</p>
            </motion.blockquote>
          </motion.section>
        )}
      </AnimatePresence>

      <Divider color="#A61F2B" />

      {/* ═══ QUIZ ═══ */}
      <section id="quiz-on-tap" className="scroll-mt-28 max-w-2xl mx-auto px-4 pb-24">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#A61F2B] to-[#e74c3c] text-white shadow-lg mb-4">
            <Trophy size={28} />
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-[#1C1C1C] mb-2">Quiz Ôn Tập</h2>
          <p className="text-sm text-[#585858]">12 câu trắc nghiệm — Chương 3.1 (1975 – 1986)</p>
        </div>
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-black/5 shadow-lg">
          <InlineQuiz data={quizData} />
        </div>
      </section>
    </div>
  );
}
