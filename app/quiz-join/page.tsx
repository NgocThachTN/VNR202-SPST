'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuizItem {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUIZ_SESSION_COUNT = 12;

const quizData: QuizItem[] = [
  { question: "Nhà nước pháp quyền xã hội chủ nghĩa Việt Nam mang bản chất nào sau đây?", options: ["Nhà nước của một giai cấp cầm quyền tách rời Nhân dân", "Nhà nước của Nhân dân, do Nhân dân, vì Nhân dân", "Nhà nước chỉ phục vụ bộ máy hành chính", "Nhà nước đứng ngoài đời sống xã hội"], correctIndex: 1, explanation: "Đáp án đúng: B" },
  { question: "Trong Nhà nước pháp quyền xã hội chủ nghĩa Việt Nam, chủ thể của quyền lực nhà nước là", options: ["Chính phủ", "Quốc hội", "Nhân dân", "Tòa án"], correctIndex: 2, explanation: "Đáp án đúng: C" },
  { question: "Đặc điểm nổi bật của Nhà nước pháp quyền là", options: ["Quản lý xã hội chủ yếu bằng ý chí cá nhân", "Quản lý xã hội bằng Hiến pháp và pháp luật", "Quản lý xã hội bằng tập quán là chính", "Quản lý xã hội không cần kiểm soát quyền lực"], correctIndex: 1, explanation: "Đáp án đúng: B" },
  { question: "Yếu tố nào phản ánh đúng bản chất dân chủ của Nhà nước pháp quyền XHCN Việt Nam?", options: ["Mọi quyền lực tập trung vào một cá nhân", "Nhân dân tham gia quản lý nhà nước và xã hội", "Chỉ cán bộ mới có quyền quyết định mọi vấn đề", "Nhân dân chỉ có nghĩa vụ, không có quyền"], correctIndex: 1, explanation: "Đáp án đúng: B" },
  { question: "Mục tiêu hoạt động của Nhà nước pháp quyền XHCN Việt Nam là", options: ["Phục vụ lợi ích của một nhóm nhỏ", "Bảo đảm lợi ích của cơ quan công quyền", "Phục vụ Nhân dân, bảo vệ Tổ quốc và phát triển đất nước", "Chỉ duy trì trật tự hành chính"], correctIndex: 2, explanation: "Đáp án đúng: C" },
  { question: "Trong Nhà nước pháp quyền XHCN Việt Nam, pháp luật giữ vai trò", options: ["Chỉ để xử phạt", "Công cụ quản lý xã hội cơ bản và bảo vệ quyền, lợi ích hợp pháp", "Chỉ áp dụng cho cán bộ", "Không có vai trò lớn"], correctIndex: 1, explanation: "Đáp án đúng: B" },
  { question: "Nội dung nào sau đây thể hiện rõ tính pháp quyền của Nhà nước?", options: ["Nhà nước hoạt động theo cảm tính", "Nhà nước và công dân đều phải tuân thủ pháp luật", "Chỉ người dân phải tuân thủ pháp luật", "Cơ quan nhà nước có thể đứng trên pháp luật"], correctIndex: 1, explanation: "Đáp án đúng: B" },
  { question: "Một trong những giá trị cốt lõi của Nhà nước pháp quyền XHCN Việt Nam là", options: ["Hạn chế quyền công dân", "Tôn trọng và bảo vệ quyền con người, quyền công dân", "Tăng đặc quyền cho bộ máy nhà nước", "Giảm vai trò giám sát của xã hội"], correctIndex: 1, explanation: "Đáp án đúng: B" },
  { question: "Nhà nước pháp quyền XHCN Việt Nam được xây dựng dưới sự lãnh đạo của", options: ["Chính phủ", "Quốc hội", "Đảng Cộng sản Việt Nam", "Mặt trận Tổ quốc Việt Nam"], correctIndex: 2, explanation: "Đáp án đúng: C" },
  { question: "Một biểu hiện của Nhà nước pháp quyền là", options: ["Mọi hoạt động của bộ máy nhà nước đều phải có cơ sở pháp lý", "Cơ quan nhà nước được làm mọi điều mình muốn", "Không cần công khai, minh bạch", "Pháp luật chỉ mang tính hình thức"], correctIndex: 0, explanation: "Đáp án đúng: A" },
  { question: "Quyền lực nhà nước ở Việt Nam được tổ chức theo nguyên tắc nào?", options: ["Phân lập tuyệt đối", "Thống nhất, có sự phân công, phối hợp và kiểm soát", "Tập trung hoàn toàn vào tư pháp", "Tập trung hoàn toàn vào hành pháp"], correctIndex: 1, explanation: "Đáp án đúng: B" },
  { question: "Cách hiểu nào đúng về quyền lực nhà nước trong Nhà nước pháp quyền XHCN Việt Nam?", options: ["Chỉ cần thống nhất, không cần kiểm soát", "Chỉ cần phân công, không cần phối hợp", "Vừa thống nhất, vừa phải có cơ chế kiểm soát quyền lực", "Không cần kiểm soát vì đã có pháp luật"], correctIndex: 2, explanation: "Đáp án đúng: C" },
  { question: "Quốc hội trong bộ máy nhà nước Việt Nam có vai trò chủ yếu là", options: ["Cơ quan xét xử cao nhất", "Cơ quan quyền lực nhà nước cao nhất", "Cơ quan điều tra trung ương", "Cơ quan hành chính cao nhất"], correctIndex: 1, explanation: "Đáp án đúng: B" },
  { question: "Chính phủ là cơ quan chủ yếu thực hiện", options: ["Quyền lập hiến", "Quyền lập pháp", "Quyền hành pháp", "Quyền giám sát tối cao"], correctIndex: 2, explanation: "Đáp án đúng: C" },
  { question: "Tòa án nhân dân là cơ quan thực hiện", options: ["Quyền lập pháp", "Quyền tư pháp", "Quyền hành pháp", "Quyền giám sát xã hội"], correctIndex: 1, explanation: "Đáp án đúng: B" },
  { question: "Viện kiểm sát nhân dân có chức năng chủ yếu là", options: ["Ban hành luật", "Thực hành quyền công tố và kiểm sát hoạt động tư pháp", "Tổ chức bầu cử", "Quản lý hành chính địa phương"], correctIndex: 1, explanation: "Đáp án đúng: B" },
  { question: "Nội dung nào phản ánh đúng yêu cầu đối với hoạt động của bộ máy nhà nước?", options: ["Chỉ cần đúng quy trình nội bộ", "Phải công khai, minh bạch, hiệu lực, hiệu quả", "Chỉ cần nhanh, không cần đúng pháp luật", "Không cần giải trình trước Nhân dân"], correctIndex: 1, explanation: "Đáp án đúng: B" },
  { question: "Trách nhiệm giải trình của cơ quan nhà nước có ý nghĩa chủ yếu là", options: ["Tạo thêm thủ tục hình thức", "Buộc cơ quan nhà nước giải thích, chịu trách nhiệm về quyết định và hành vi của mình", "Làm giảm hiệu quả quản lý", "Chỉ áp dụng cho cơ quan tư pháp"], correctIndex: 1, explanation: "Đáp án đúng: B" },
  { question: "Dân chủ trong Nhà nước pháp quyền XHCN Việt Nam được thực hiện bằng", options: ["Chỉ dân chủ trực tiếp", "Chỉ dân chủ đại diện", "Kết hợp dân chủ trực tiếp và dân chủ đại diện", "Không cần dân chủ vì đã có pháp luật"], correctIndex: 2, explanation: "Đáp án đúng: C" },
  { question: "Quyền khiếu nại, tố cáo của công dân thể hiện", options: ["Công dân có thể đứng trên pháp luật", "Cơ chế để Nhân dân giám sát hoạt động nhà nước", "Sự thay thế hoạt động của cơ quan tư pháp", "Công dân có quyền tự xử lý vi phạm"], correctIndex: 1, explanation: "Đáp án đúng: B" },
  { question: "Yêu cầu thượng tôn Hiến pháp và pháp luật được hiểu là", options: ["Chỉ cơ quan nhà nước phải tuân thủ", "Chỉ cán bộ, công chức phải tuân thủ", "Mọi chủ thể trong xã hội đều phải tôn trọng và chấp hành", "Chỉ áp dụng trong lĩnh vực tư pháp"], correctIndex: 2, explanation: "Đáp án đúng: C" },
  { question: "Một nhà nước được xem là pháp quyền khi", options: ["Pháp luật đứng dưới cơ quan công quyền", "Hiến pháp và pháp luật có vị trí tối cao trong tổ chức và hoạt động nhà nước", "Cơ quan nhà nước tự quyết ngoài khuôn khổ pháp luật", "Mọi quyết định chỉ dựa vào chỉ đạo hành chính"], correctIndex: 1, explanation: "Đáp án đúng: B" },
  { question: "Trong Nhà nước pháp quyền XHCN Việt Nam, cán bộ, công chức phải", options: ["Chỉ phục tùng cấp trên", "Tôn trọng Nhân dân, phục vụ Nhân dân", "Ưu tiên quyền lợi cá nhân", "Không cần chịu giám sát của xã hội"], correctIndex: 1, explanation: "Đáp án đúng: B" },
  { question: "Nội dung nào sau đây phản ánh đúng mối quan hệ giữa Nhà nước và Nhân dân?", options: ["Nhà nước là chủ thể ban phát quyền cho Nhân dân", "Nhà nước chịu sự giám sát của Nhân dân", "Nhà nước không cần tiếp thu ý kiến Nhân dân", "Nhân dân chỉ có nghĩa vụ chấp hành"], correctIndex: 1, explanation: "Đáp án đúng: B" },
  { question: "Mục đích của việc kiểm soát quyền lực nhà nước là", options: ["Làm suy yếu bộ máy nhà nước", "Phòng ngừa lạm quyền, tha hóa quyền lực", "Làm chậm hoạt động của cơ quan công quyền", "Thay thế vai trò lãnh đạo của Đảng"], correctIndex: 1, explanation: "Đáp án đúng: B" },
  { question: "Một trong những yêu cầu quan trọng hiện nay đối với Nhà nước pháp quyền XHCN Việt Nam là", options: ["Giảm vai trò của pháp luật", "Hoàn thiện hệ thống pháp luật đồng bộ, thống nhất, khả thi", "Tăng quản lý bằng mệnh lệnh hành chính", "Thu hẹp quyền giám sát của Nhân dân"], correctIndex: 1, explanation: "Đáp án đúng: B" },
  { question: "Giải pháp nào góp phần trực tiếp nâng cao hiệu lực, hiệu quả quản lý nhà nước?", options: ["Bộ máy cồng kềnh hơn", "Tổ chức bộ máy tinh gọn, hoạt động hiệu lực, hiệu quả", "Tăng tầng nấc trung gian", "Hạn chế phân công nhiệm vụ rõ ràng"], correctIndex: 1, explanation: "Đáp án đúng: B" },
  { question: "Một trong những yêu cầu của cải cách hành chính hiện nay là", options: ["Giảm ứng dụng công nghệ", "Xây dựng nền hành chính chuyên nghiệp, hiện đại, phục vụ Nhân dân", "Ưu tiên thủ tục phức tạp", "Tăng cơ chế xin - cho"], correctIndex: 1, explanation: "Đáp án đúng: B" },
  { question: "Vì sao phải tiếp tục hoàn thiện cơ chế kiểm soát quyền lực nhà nước?", options: ["Vì bộ máy nhà nước không cần tự đổi mới", "Vì nguy cơ lạm quyền, tham nhũng, tiêu cực vẫn còn", "Vì pháp luật không còn cần thiết", "Vì kiểm soát quyền lực chỉ mang tính hình thức"], correctIndex: 1, explanation: "Đáp án đúng: B" },
  { question: "Một trong những giải pháp quan trọng để hoàn thiện Nhà nước pháp quyền hiện nay là", options: ["Làm mờ ranh giới chức năng giữa các cơ quan", "Phân công rõ chức năng, nhiệm vụ, quyền hạn giữa các cơ quan", "Trao toàn bộ quyền lực cho một cơ quan", "Hạn chế cơ chế phối hợp"], correctIndex: 1, explanation: "Đáp án đúng: B" },
  { question: "Trong xây dựng Nhà nước pháp quyền, cải cách tư pháp nhằm mục tiêu chủ yếu nào?", options: ["Tăng sự phụ thuộc của tòa án vào hành pháp", "Xây dựng nền tư pháp chuyên nghiệp, công bằng, nghiêm minh", "Hạn chế quyền tiếp cận công lý", "Giảm vai trò bảo vệ công lý"], correctIndex: 1, explanation: "Đáp án đúng: B" },
  { question: "Yếu tố nào có ý nghĩa quyết định trong việc đưa pháp luật vào cuộc sống?", options: ["Chỉ ban hành thật nhiều luật", "Tổ chức thực hiện pháp luật nghiêm minh, hiệu quả", "Chỉ tuyên truyền khẩu hiệu", "Chỉ tăng chế tài xử phạt"], correctIndex: 1, explanation: "Đáp án đúng: B" },
  { question: "Việc xây dựng đội ngũ cán bộ, công chức trong Nhà nước pháp quyền hiện nay phải theo hướng", options: ["Đông về số lượng là đủ", "Có phẩm chất, năng lực, liêm chính, chuyên nghiệp", "Chỉ cần kinh nghiệm, không cần đạo đức", "Chỉ cần trung thành, không cần chuyên môn"], correctIndex: 1, explanation: "Đáp án đúng: B" },
  { question: "Một trong những biểu hiện của sự hoàn thiện Nhà nước pháp quyền là", options: ["Cơ quan công quyền né tránh trách nhiệm", "Công khai, minh bạch và trách nhiệm giải trình được tăng cường", "Thông tin nhà nước ngày càng khép kín", "Giảm giám sát xã hội"], correctIndex: 1, explanation: "Đáp án đúng: B" },
  { question: "Phòng, chống tham nhũng, tiêu cực có ý nghĩa như thế nào đối với xây dựng Nhà nước pháp quyền?", options: ["Không liên quan", "Là điều kiện quan trọng để xây dựng bộ máy trong sạch, vững mạnh", "Chỉ là nhiệm vụ riêng của thanh tra", "Chỉ cần thực hiện trong lĩnh vực kinh tế"], correctIndex: 1, explanation: "Đáp án đúng: B" },
  { question: "Vai trò của Nhân dân trong hoàn thiện Nhà nước pháp quyền hiện nay thể hiện rõ nhất ở chỗ", options: ["Chỉ chấp hành quyết định của cơ quan nhà nước", "Tham gia góp ý, giám sát, phản biện và thực hiện quyền làm chủ", "Không cần tham gia quản lý xã hội", "Chỉ tham gia bầu cử là đủ"], correctIndex: 1, explanation: "Đáp án đúng: B" },
  { question: "Mặt trận Tổ quốc và các tổ chức chính trị - xã hội có vai trò quan trọng trong", options: ["Thay thế cơ quan nhà nước", "Giám sát và phản biện xã hội", "Ban hành Hiến pháp", "Điều hành hoạt động tư pháp"], correctIndex: 1, explanation: "Đáp án đúng: B" },
  { question: "Để pháp luật thực sự đi vào đời sống, cần chú trọng điều gì?", options: ["Chỉ tăng số lượng văn bản", "Nâng cao ý thức pháp luật của cán bộ và Nhân dân", "Chỉ xử phạt nặng", "Giảm phổ biến, giáo dục pháp luật"], correctIndex: 1, explanation: "Đáp án đúng: B" },
  { question: "Một trong những xu hướng phù hợp để hoàn thiện Nhà nước pháp quyền hiện nay là", options: ["Hạn chế chuyển đổi số", "Đẩy mạnh xây dựng nền quản trị quốc gia hiện đại", "Tăng quản lý thủ công, phân tán", "Giảm cung cấp dịch vụ công"], correctIndex: 1, explanation: "Đáp án đúng: B" },
  { question: "Hoàn thiện Nhà nước pháp quyền XHCN Việt Nam hiện nay phải gắn với yêu cầu nào?", options: ["Chỉ phát triển kinh tế, không cần đổi mới chính trị", "Đổi mới đồng bộ giữa tổ chức bộ máy, pháp luật và cơ chế thực thi", "Chỉ sửa luật là đủ", "Chỉ chú trọng tuyên truyền"], correctIndex: 1, explanation: "Đáp án đúng: B" },
  { question: "Điểm khác biệt cơ bản giữa Nhà nước pháp quyền XHCN Việt Nam với mô hình nhà nước pháp quyền tư sản là", options: ["Không sử dụng pháp luật", "Gắn với mục tiêu bảo đảm quyền làm chủ của Nhân dân và định hướng xã hội chủ nghĩa", "Không có sự lãnh đạo chính trị", "Không quan tâm quyền con người"], correctIndex: 1, explanation: "Đáp án đúng: B" },
  { question: "Xây dựng Nhà nước pháp quyền XHCN Việt Nam vừa phải bảo đảm dân chủ, vừa phải", options: ["Xóa bỏ kỷ cương", "Tăng cường pháp chế và kỷ luật, kỷ cương xã hội", "Giảm hiệu lực quản lý nhà nước", "Hạn chế vai trò pháp luật"], correctIndex: 1, explanation: "Đáp án đúng: B" },
  { question: "Vì sao nói kiểm soát quyền lực là yêu cầu tất yếu của Nhà nước pháp quyền?", options: ["Vì quyền lực nhà nước luôn tuyệt đối đúng", "Vì quyền lực nếu không được kiểm soát dễ dẫn tới lạm quyền, tha hóa", "Vì quyền lực nhà nước không cần chịu trách nhiệm", "Vì pháp luật không có giá trị ràng buộc"], correctIndex: 1, explanation: "Đáp án đúng: B" },
  { question: "Cách hiểu đúng nhất về mối quan hệ giữa pháp luật và quyền con người trong Nhà nước pháp quyền XHCN Việt Nam là", options: ["Pháp luật chỉ để hạn chế quyền con người", "Pháp luật là công cụ ghi nhận, bảo vệ và bảo đảm thực hiện quyền con người, quyền công dân", "Quyền con người đứng ngoài pháp luật", "Quyền con người không liên quan đến nhà nước"], correctIndex: 1, explanation: "Đáp án đúng: B" },
  { question: "Khi nói xây dựng Nhà nước pháp quyền phải lấy người dân làm trung tâm, điều đó nhấn mạnh", options: ["Nhà nước chỉ cần lắng nghe người dân trong bầu cử", "Mọi chính sách, pháp luật và hoạt động công quyền phải hướng tới phục vụ người dân", "Người dân có thể thay pháp luật", "Cơ quan nhà nước không cần mục tiêu phát triển"], correctIndex: 1, explanation: "Đáp án đúng: B" },
  { question: "Hoàn thiện Nhà nước pháp quyền hiện nay không chỉ là sửa đổi pháp luật mà còn phải", options: ["Thu hẹp trách nhiệm công vụ", "Đổi mới tổ chức thực hiện pháp luật và nâng cao chất lượng đội ngũ thực thi", "Giảm vai trò giám sát xã hội", "Tăng quyền tùy tiện cho cơ quan nhà nước"], correctIndex: 1, explanation: "Đáp án đúng: B" },
  { question: "Xây dựng nền tư pháp chuyên nghiệp, hiện đại, công bằng, nghiêm minh có ý nghĩa trực tiếp nhất là", options: ["Làm tăng thủ tục pháp lý", "Bảo vệ công lý, quyền con người, quyền công dân", "Tăng vai trò chỉ đạo của hành pháp đối với xét xử", "Giảm tính độc lập của thẩm phán"], correctIndex: 1, explanation: "Đáp án đúng: B" },
  { question: "Giải pháp nào sau đây thể hiện rõ yêu cầu xây dựng Nhà nước pháp quyền trong giai đoạn mới?", options: ["Tăng cơ chế đặc quyền cho cán bộ", "Đẩy mạnh công khai, minh bạch, trách nhiệm giải trình và chuyển đổi số trong quản trị nhà nước", "Giảm quyền tiếp cận thông tin của người dân", "Hạn chế giám sát của báo chí và xã hội"], correctIndex: 1, explanation: "Đáp án đúng: B" },
  { question: "Muốn Nhà nước pháp quyền XHCN Việt Nam vận hành hiệu quả, yếu tố nào cần được kết hợp chặt chẽ?", options: ["Chỉ xây dựng pháp luật", "Xây dựng pháp luật, tổ chức thực hiện pháp luật và kiểm soát quyền lực", "Chỉ tinh giản bộ máy", "Chỉ xử lý vi phạm"], correctIndex: 1, explanation: "Đáp án đúng: B" },
  { question: "Nhận định nào sau đây khái quát đúng nhất về phương hướng hoàn thiện Nhà nước pháp quyền XHCN Việt Nam hiện nay?", options: ["Tập trung quyền lực tuyệt đối để quản lý nhanh hơn", "Xây dựng nhà nước trong sạch, vững mạnh, tinh gọn, hiệu lực, hiệu quả; thượng tôn Hiến pháp và pháp luật; bảo đảm quyền con người, quyền công dân; tăng cường kiểm soát quyền lực", "Chỉ ưu tiên phát triển kinh tế, tạm gác hoàn thiện nhà nước", "Giảm vai trò tham gia của Nhân dân để tránh phức tạp"], correctIndex: 1, explanation: "Đáp án đúng: B" },
];

function pickRandomQuizItems(items: QuizItem[], count: number): QuizItem[] {
  const shuffled = [...items].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, items.length));
}

export default function QuizJoinPage() {
  const [playerName, setPlayerName] = useState('');
  const [joined, setJoined] = useState(false);
  const [sessionQuiz, setSessionQuiz] = useState<QuizItem[]>([]);
  
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim()) {
      setSessionQuiz(pickRandomQuizItems(quizData, QUIZ_SESSION_COUNT));
      setJoined(true);
    }
  };

  const handleAnswer = (idx: number) => {
    if (selectedAnswer !== null) return; // Prevent multiple clicks
    setSelectedAnswer(idx);
    if (idx === sessionQuiz[currentIdx].correctIndex) {
      setScore(s => s + 1);
    }
    
    setTimeout(() => {
      if (currentIdx + 1 < sessionQuiz.length) {
        setCurrentIdx(c => c + 1);
        setSelectedAnswer(null);
      } else {
        setIsFinished(true);
      }
    }, 2000);
  };
  
  const handleRestart = () => {
    setJoined(false);
    setIsFinished(false);
    setCurrentIdx(0);
    setScore(0);
    setSelectedAnswer(null);
    setPlayerName('');
    setSessionQuiz([]);
  };

  if (!joined) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[100dvh] p-4 bg-[#F5E6D3] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        <div className="w-full max-w-sm p-8 bg-[#FAF3EB] border-2 border-[#D1C2A5] rounded-sm shadow-[8px_8px_0px_0px_rgba(44,42,41,1)] relative z-10">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-serif-heading font-black text-[#2C2A29] uppercase tracking-wider">Ôn Tập Quiz</h2>
            <div className="w-12 h-1 bg-[#DA251D] mx-auto mt-2"></div>
            <p className="mt-3 text-sm font-serif-body text-[#5C554E] italic">Chế độ đào tạo cá nhân</p>
          </div>
          <form onSubmit={handleJoin} className="space-y-6">
            <div>
              <label className="block text-xs font-sans font-bold text-[#5C554E] uppercase tracking-widest mb-1 ml-1">Tên Điểm Danh</label>
              <input
                type="text"
                placeholder="Ví dụ: Lê Văn Lợi"
                className="w-full p-4 text-lg font-serif-heading font-bold text-center text-[#2C2A29] bg-white border-2 border-[#D1C2A5] rounded-sm focus:outline-none focus:border-[#DA251D] shadow-[inset_2px_2px_4px_rgba(0,0,0,0.05)] placeholder-[#D1C2A5]"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                maxLength={20}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 font-serif-heading font-black text-[#FAF3EB] bg-[#DA251D] border-2 border-[#2C2A29] rounded-sm hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(44,42,41,1)] transition-all uppercase tracking-widest text-lg"
            >
              Bắt Đầu Thi
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (isFinished) {
    const totalQuestions = sessionQuiz.length || QUIZ_SESSION_COUNT;
    const pct = Math.round((score / totalQuestions) * 100);
    return (
      <div className="flex flex-col items-center justify-center min-h-[100dvh] p-4 bg-[#F5E6D3] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        <div className="w-full max-w-md p-8 bg-[#FAF3EB] border-2 border-[#D1C2A5] rounded-sm shadow-[8px_8px_0px_0px_rgba(44,42,41,1)] relative z-10 text-center">
          <div className="text-3xl font-serif-heading font-black text-[#DA251D] uppercase tracking-wider mb-2">Bế Mạc Khóa Thi</div>
          <div className="w-12 h-1 bg-[#D1C2A5] mx-auto mb-6"></div>
          
          <div className="text-lg font-serif-body text-[#5C554E] italic mb-6">
            Kết quả của đồng chí <span className="font-bold text-[#2C2A29] not-italic">{playerName}</span>
          </div>

          <div className="inline-block relative mb-8">
            <svg width="140" height="140" viewBox="0 0 140 140">
              <circle cx="70" cy="70" r="62" fill="none" stroke="#e5e5e5" strokeWidth="8" />
              <motion.circle
                cx="70" cy="70" r="62" fill="none"
                stroke={pct >= 70 ? "#4A5D23" : "#DA251D"} strokeWidth="8"
                strokeLinecap="round" strokeDasharray={390}
                initial={{ strokeDashoffset: 390 }}
                animate={{ strokeDashoffset: 390 - (390 * pct) / 100 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                style={{ transformOrigin: "center", transform: "rotate(-90deg)" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black" style={{ color: pct >= 70 ? "#4A5D23" : "#DA251D" }}>{pct}%</span>
              <span className="text-xs text-[#5C554E] font-medium font-sans">{score}/{totalQuestions}</span>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold font-serif-heading text-[#2C2A29] mb-1">
              {pct >= 90 ? "Xuất sắc!" : pct >= 70 ? "Tốt lắm!" : pct >= 50 ? "Khá ổn!" : "Cần cố gắng thêm!"}
            </h3>
            <p className="text-sm text-[#5C554E] font-serif-body italic">
              {pct >= 70 ? "Đồng chí đã nắm vững lịch sử hào hùng." : "Hãy ôn tập lại tài liệu nhé."}
            </p>
          </div>

          <button
            onClick={handleRestart}
            className="w-full py-4 font-serif-heading font-black text-[#2C2A29] bg-[#E3D6C1] border-2 border-[#2C2A29] rounded-sm hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(44,42,41,1)] transition-all uppercase tracking-widest text-lg"
          >
            Làm lại từ đầu
          </button>
        </div>
      </div>
    );
  }

  const q = sessionQuiz[currentIdx];
  const hasAnswered = selectedAnswer !== null;
  const isCorrectAnswer = hasAnswered && selectedAnswer === q?.correctIndex;
  const correctLabel = q ? String.fromCharCode(65 + q.correctIndex) : '';
  const selectedLabel = selectedAnswer !== null ? String.fromCharCode(65 + selectedAnswer) : '';

  if (!q) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#F5E6D3] relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] z-0"></div>
      
      {/* Header */}
      <div className="p-4 bg-[#FAF3EB] border-b-2 border-[#D1C2A5] relative z-10 flex justify-between items-center shadow-sm shrink-0">
         <span className="px-3 py-1 bg-[#2C2A29] text-[#FAF3EB] font-sans font-bold text-xs uppercase tracking-widest rounded-sm">
           Câu {currentIdx + 1} / {sessionQuiz.length}
         </span>
         <span className="font-sans font-bold text-[#5C554E] text-sm uppercase tracking-widest px-2">
           {playerName}
         </span>
      </div>
      
      {/* Question */}
      <div className="flex-none p-6 md:p-8 flex flex-col items-center justify-center relative z-10">
         <h2 className="text-2xl md:text-3xl lg:text-4xl text-center font-serif-heading font-black text-[#2C2A29] leading-snug lg:leading-normal max-w-4xl drop-shadow-sm">
           {q.question}
         </h2>
      </div>

      <AnimatePresence>
        {hasAnswered && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mx-6 p-4 mb-4 border-2 rounded-sm shadow-[4px_4px_0px_0px_rgba(44,42,41,1)] relative z-10 ${
              isCorrectAnswer ? 'bg-[#eef5e6] border-[#4A5D23]' : 'bg-[#fdf0f0] border-[#DA251D]'
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-9 h-9 shrink-0 rounded-sm border-2 flex items-center justify-center text-lg font-black font-sans ${
                  isCorrectAnswer
                    ? 'bg-[#4A5D23] text-white border-[#4A5D23]'
                    : 'bg-[#DA251D] text-white border-[#DA251D]'
                }`}
              >
                {isCorrectAnswer ? '✓' : '!'}
              </div>

              <div className="flex-1 min-w-0">
                <div className={`text-xl font-serif-heading font-black ${isCorrectAnswer ? 'text-[#4A5D23]' : 'text-[#DA251D]'}`}>
                  {isCorrectAnswer ? 'Chính xác!' : 'Chưa chính xác'}
                </div>
                <div className="text-sm font-serif-body text-[#2C2A29] mt-1 leading-relaxed">
                  Đáp án đúng: <span className="font-bold">{correctLabel}. {q.options[q.correctIndex]}</span>
                </div>
                {!isCorrectAnswer && (
                  <div className="text-sm font-serif-body text-[#5C554E] mt-1">
                    Bạn chọn: <span className="font-bold">{selectedLabel}. {selectedAnswer !== null ? q.options[selectedAnswer] : ''}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-[#2C2A29]/15">
              <div className="text-[11px] uppercase tracking-[.2em] font-sans font-bold text-[#5C554E] mb-1">Giải thích</div>
              <div className="text-sm font-serif-body text-[#5C554E] leading-relaxed">{q.explanation}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 md:p-8 bg-[#F5E6D3] relative z-10 flex-1 overflow-y-auto">
        {q.options.map((opt, idx) => {
          const isSelected = idx === selectedAnswer;
          const isCorrectOpt = idx === q.correctIndex;
          
          let bgColorClass = "bg-white hover:bg-[#FAF3EB]";
          let textColorClass = "text-[#5C554E]";
          let borderColorClass = "border-[#D1C2A5]";
          let opacityClass = hasAnswered ? "opacity-60" : "";
          let iconColorClass = "bg-[#FAF3EB] text-[#2C2A29] border-[#D1C2A5]";

          if (hasAnswered) {
             if (isCorrectOpt) {
               bgColorClass = "bg-[#eef5e6] scale-[1.02] z-10";
               textColorClass = "text-[#4A5D23]";
               borderColorClass = "border-[#4A5D23]";
               opacityClass = "opacity-100";
               iconColorClass = "bg-[#4A5D23] text-white border-[#4A5D23]";
             } else if (isSelected && !isCorrectOpt) {
               bgColorClass = "bg-[#fdf0f0]";
               textColorClass = "text-[#DA251D]";
               borderColorClass = "border-[#DA251D]";
               opacityClass = "opacity-100";
               iconColorClass = "bg-[#DA251D] text-white border-[#DA251D]";
             }
          }

          return (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              disabled={hasAnswered}
              className={`relative rounded-sm border-2 ${borderColorClass} ${bgColorClass} ${opacityClass} shadow-[4px_4px_0px_0px_rgba(44,42,41,1)] ${!hasAnswered ? 'hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(44,42,41,1)] hover:border-[#DA251D] active:translate-y-1 active:shadow-[0px_0px_0px_0px_rgba(44,42,41,1)]' : ''} transition-all flex items-center p-4 min-h-[100px] text-left gap-4 group cursor-pointer`}
            >
              <span className={`w-12 h-12 flex-shrink-0 flex justify-center items-center rounded-sm font-black text-xl border-2 transition-colors ${iconColorClass}`}>
                {String.fromCharCode(65 + idx)}
              </span>
              <span className={`font-serif-heading font-bold leading-tight w-full text-lg md:text-xl ${textColorClass}`}>
                {opt}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
