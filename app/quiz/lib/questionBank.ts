import { Question } from '../types';
import { QuizQuestion } from '../../../lib/quizTypes';

type BankItem = QuizQuestion & { timeLimit?: number; image?: string };

const bankItems: BankItem[] = [
  {
    question: 'Hội nghị nào đã chốt chủ trương thống nhất đất nước về mặt Nhà nước sau 1975?',
    options: [
      'Hội nghị TW 21 (7/1973)',
      'Hội nghị TW 24 (8/1975)',
      'Hội nghị TW 6 (8/1979)',
      'Đại hội IV (12/1976)',
    ],
    correctIndex: 1,
    timeLimit: 15,
    explanation: 'Tháng 8/1975, Hội nghị Trung ương 24 chốt chủ trương cấp bách: Phải thống nhất đất nước về mặt Nhà nước.',
  },
  {
    question: 'Hội nghị Hiệp thương chính trị Bắc – Nam (11/1975) diễn ra tại đâu?',
    options: [
      'Hà Nội',
      'Huế',
      'Sài Gòn',
      'Đà Nẵng',
    ],
    correctIndex: 2,
    timeLimit: 15,
    explanation: 'Tháng 11/1975, Hội nghị Hiệp thương chính trị Bắc – Nam diễn ra tại Sài Gòn, đạt kết quả thành công rực rỡ.',
  },
  {
    question: 'Tổng tuyển cử bầu Quốc hội chung (25/4/1976) có tỷ lệ cử tri tham gia là bao nhiêu?',
    options: [
      '95,50%',
      '97,23%',
      '98,77%',
      '99,15%',
    ],
    correctIndex: 2,
    timeLimit: 15,
    explanation: 'Ngày 25/4/1976, hơn 23 triệu cử tri (98,77%) nô nức tham gia Tổng tuyển cử bầu Quốc hội chung.',
  },
  {
    question: 'Kỳ họp thứ nhất Quốc hội khóa VI đã quyết định Quốc hiệu là gì?',
    options: [
      'Việt Nam Dân chủ Cộng hòa',
      'Cộng hòa Xã hội Chủ nghĩa Việt Nam',
      'Cộng hòa Nhân dân Việt Nam',
      'Việt Nam Cộng hòa Thống Nhất',
    ],
    correctIndex: 1,
    timeLimit: 15,
    explanation: 'Kỳ họp thứ nhất Quốc hội khóa VI (24/6 – 3/7/1976) quyết định Quốc hiệu: Cộng hòa Xã hội Chủ nghĩa Việt Nam.',
  },
  {
    question: 'Đại hội IV (12/1976) xác định tiến hành đồng thời mấy cuộc cách mạng?',
    options: [
      '2 cuộc cách mạng',
      '3 cuộc cách mạng',
      '4 cuộc cách mạng',
      '5 cuộc cách mạng',
    ],
    correctIndex: 1,
    timeLimit: 15,
    explanation: 'Đại hội IV xác định tiến hành đồng thời 3 cuộc cách mạng: Quan hệ sản xuất, Khoa học – kỹ thuật, Tư tưởng và văn hóa.',
  },
  {
    question: 'Chỉ thị 100-CT/TW (Khoán 100) có ý nghĩa gì đối với nông nghiệp?',
    options: [
      'Tập thể hóa toàn bộ nông nghiệp',
      'Thổi bùng sức sống mới cho nông nghiệp Việt Nam',
      'Hạn chế sản xuất nông nghiệp tư nhân',
      'Chuyển nông nghiệp sang công nghiệp nặng',
    ],
    correctIndex: 1,
    timeLimit: 20,
    explanation: 'Chỉ thị 100-CT/TW (Khoán 100) thuộc Bước đột phá thứ 1 (8/1979 – 1/1981), thổi bùng sức sống mới cho nông nghiệp Việt Nam.',
  },
  {
    question: 'Sự kiện Giải phóng Phnôm Pênh trong chiến tranh biên giới Tây Nam diễn ra khi nào?',
    options: [
      '30/4/1975',
      '7/1/1979',
      '17/2/1979',
      '25/4/1976',
    ],
    correctIndex: 1,
    timeLimit: 15,
    explanation: 'Chiến thắng chiến tranh biên giới Tây Nam: Giải phóng Phnôm Pênh ngày 7/1/1979.',
  },
  {
    question: 'Cuộc chiến tranh biên giới phía Bắc bắt đầu từ ngày nào?',
    options: [
      '7/1/1979',
      '17/2/1979',
      '30/4/1975',
      '25/4/1976',
    ],
    correctIndex: 1,
    timeLimit: 15,
    explanation: 'Cuộc chiến tranh biên giới phía Bắc bắt đầu từ ngày 17/2/1979, quân và dân ta đã đánh trả anh dũng bảo vệ Tổ quốc.',
  },
  {
    question: 'Đại hội V (3/1982) xác định mặt trận hàng đầu là gì?',
    options: [
      'Công nghiệp nặng',
      'Nông nghiệp',
      'Thương mại xuất khẩu',
      'Quốc phòng an ninh',
    ],
    correctIndex: 1,
    timeLimit: 15,
    explanation: 'Đại hội V nhận định đất nước đang ở "chặng đường đầu tiên" và xác định nông nghiệp là mặt trận hàng đầu.',
  },
  {
    question: 'Hai nhiệm vụ cốt lõi được Đại hội V đề ra là gì?',
    options: [
      'Công nghiệp hóa và Hiện đại hóa',
      'Xây dựng CNXH và Bảo vệ vững chắc Tổ quốc',
      'Phát triển kinh tế và Mở cửa hội nhập',
      'Chống tham nhũng và Cải cách hành chính',
    ],
    correctIndex: 1,
    timeLimit: 20,
    explanation: 'Đại hội V (3/1982) đề ra hai nhiệm vụ cốt lõi: Xây dựng CNXH và Bảo vệ vững chắc Tổ quốc.',
  },
  {
    question: 'Hội nghị TW 8 (6/1985) chọn khâu đột phá nào để xóa bỏ cơ chế bao cấp?',
    options: [
      'Giáo dục – Y tế – Quốc phòng',
      'Giá – Lương – Tiền',
      'Sản xuất – Xuất khẩu – Đầu tư',
      'Công nghiệp – Nông nghiệp – Dịch vụ',
    ],
    correctIndex: 1,
    timeLimit: 15,
    explanation: 'Hội nghị TW 8 (6/1985) – Bước đột phá thứ 2 – chọn "Giá – Lương – Tiền" làm khâu đột phá, chuyển sang hạch toán kinh doanh XHCN.',
  },
  {
    question: 'Bước đột phá thứ 3 (Hội nghị Bộ Chính trị, 8/1986) định hình tư duy cho Đại hội nào?',
    options: [
      'Đại hội IV',
      'Đại hội V',
      'Đại hội VI',
      'Đại hội VII',
    ],
    correctIndex: 2,
    timeLimit: 15,
    explanation: 'Hội nghị Bộ Chính trị (8/1986) đưa ra kết luận về quan điểm kinh tế, định hình tư duy cho Đại hội VI — Đại hội Đổi Mới.',
  },
  {
    question: 'Đại hội IV (12/1976) đã chính thức đổi tên Đảng thành gì?',
    options: [
      'Đảng Lao động Việt Nam',
      'Đảng Cộng sản Việt Nam',
      'Đảng Nhân dân Cách mạng Việt Nam',
      'Đảng Xã hội Việt Nam',
    ],
    correctIndex: 1,
    timeLimit: 15,
    explanation: 'Đại hội IV (12/1976) chính thức đổi tên thành Đảng Cộng sản Việt Nam.',
  },
  {
    question: 'Hội nghị TW 6 (8/1979) đưa ra chủ trương gì?',
    options: [
      '"Tập trung quan liêu bao cấp"',
      '"Sản xuất bung ra"',
      '"Giá – Lương – Tiền"',
      '"Đổi mới toàn diện"',
    ],
    correctIndex: 1,
    timeLimit: 15,
    explanation: 'Hội nghị TW 6 (8/1979) lịch sử đưa ra chủ trương "sản xuất bung ra", mở đầu cho bước đột phá thứ nhất.',
  },
  {
    question: 'Giai đoạn 1975–1986 được coi là giai đoạn "thai nghén" cho đường lối nào?',
    options: [
      'Đường lối kháng chiến chống Mỹ',
      'Đường lối Đổi mới toàn diện',
      'Đường lối ngoại giao đa phương',
      'Đường lối công nghiệp hóa XHCN',
    ],
    correctIndex: 1,
    timeLimit: 20,
    explanation: '11 năm (1975–1986) là giai đoạn "thai nghén" vĩ đại, trải qua những phép thử đau đớn để hình thành Đường lối Đổi mới toàn diện.',
  },
];

export const questionBank: QuizQuestion[] = bankItems.map(({ question, options, correctIndex, explanation }) => ({
  question,
  options,
  correctIndex,
  explanation,
}));

export const QUESTIONS: Question[] = bankItems.map((item, idx) => ({
  id: `q${idx + 1}`,
  text: item.question,
  image: item.image,
  options: item.options,
  correctAnswerIndex: item.correctIndex,
  timeLimit: item.timeLimit ?? 15,
}));

export const SHAPES = ['triangle', 'diamond', 'circle', 'square'];
export const COLORS = ['bg-brand-red', 'bg-brand-blue', 'bg-brand-yellow', 'bg-brand-green'];
