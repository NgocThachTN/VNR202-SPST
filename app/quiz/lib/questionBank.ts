import { Question } from '../types';
import { QuizQuestion } from '../../../lib/quizTypes';

type BankItem = QuizQuestion & { timeLimit?: number; image?: string };

const bankItems: BankItem[] = [
  {
    question: 'Đặc điểm nổi bật nhất của con đường quá độ lên chủ nghĩa xã hội ở Việt Nam là gì?',
    options: [
      'Quá độ trực tiếp từ xã hội tư bản chủ nghĩa phát triển',
      'Quá độ bỏ qua chế độ tư bản chủ nghĩa',
      'Quá độ từ xã hội phong kiến lâu đời đã phát triển công nghiệp',
      'Tiến thẳng lên chủ nghĩa cộng sản không cần thời kỳ quá độ'
    ],
    correctIndex: 1,
    timeLimit: 20,
    explanation: 'Việt Nam tiến lên chủ nghĩa xã hội bỏ qua chế độ tư bản chủ nghĩa, tức là bỏ qua việc xác lập vị trí thống trị của quan hệ sản xuất và kiến trúc thượng tầng tư bản chủ nghĩa [1], [2].',
  },
  {
    question: 'Việc "bỏ qua" chế độ tư bản chủ nghĩa ở Việt Nam cần được hiểu như thế nào cho đúng?',
    options: [
      'Bỏ qua toàn bộ những thành tựu mà nhân loại đạt được dưới chủ nghĩa tư bản',
      'Bỏ qua việc phát triển lực lượng sản xuất và khoa học công nghệ',
      'Bỏ qua vị trí thống trị của quan hệ sản xuất và kiến trúc thượng tầng tư bản chủ nghĩa',
      'Bỏ qua việc giao lưu kinh tế với các nước tư bản chủ nghĩa'
    ],
    correctIndex: 2,
    timeLimit: 20,
    explanation: 'Bỏ qua chế độ tư bản chủ nghĩa là bỏ qua việc xác lập vị trí thống trị của quan hệ sản xuất và kiến trúc thượng tầng tư bản chủ nghĩa, nhưng phải tiếp thu, kế thừa những thành tựu mà nhân loại đã đạt được dưới chế độ này [2].',
  },
  {
    question: 'Theo Cương lĩnh năm 2011, mô hình xã hội xã hội chủ nghĩa ở Việt Nam có bao nhiêu đặc trưng cơ bản?',
    options: ['6 đặc trưng', '7 đặc trưng', '8 đặc trưng', '9 đặc trưng'],
    correctIndex: 2,
    timeLimit: 15,
    explanation: 'Cương lĩnh xây dựng đất nước trong thời kỳ quá độ lên chủ nghĩa xã hội (bổ sung, phát triển năm 2011) đã xác định mô hình gồm 8 đặc trưng cơ bản [3], [4].',
  },
  {
    question: 'Thuật ngữ "Dân chủ" (demoskratos) có nguồn gốc từ quốc gia cổ đại nào?',
    options: ['La Mã cổ đại', 'Ai Cập cổ đại', 'Hy Lạp cổ đại', 'Ấn Độ cổ đại'],
    correctIndex: 2,
    timeLimit: 15,
    explanation: 'Thuật ngữ dân chủ ra đời vào khoảng thế kỷ VII - VI trước Công nguyên tại Hy Lạp cổ đại [5].',
  },
  {
    question: 'Dưới góc độ chính trị, dân chủ được hiểu là gì?',
    options: [
      'Một giá trị đạo đức cá nhân',
      'Một hình thức nhà nước hay một chế độ chính trị',
      'Sự tự do tuyệt đối của mỗi công dân',
      'Sự thoả hiệp giữa các giai cấp đối kháng'
    ],
    correctIndex: 1,
    timeLimit: 20,
    explanation: 'Dân chủ là một hình thức nhà nước, là một trong những hình thái của nhà nước gắn với các giai cấp cầm quyền [6].',
  },
  {
    question: 'Nền dân chủ đầu tiên trong lịch sử nhân loại là nền dân chủ nào?',
    options: [
      'Dân chủ nguyên thuỷ',
      'Dân chủ chủ nô',
      'Dân chủ tư sản',
      'Dân chủ xã hội chủ nghĩa'
    ],
    correctIndex: 1,
    timeLimit: 15,
    explanation: 'Nền dân chủ chủ nô được coi là nền dân chủ đầu tiên trong lịch sử, mặc dù nó chỉ dành cho giai cấp chủ nô và một số công dân tự do [7].',
  },
  {
    question: 'Tại sao thời kỳ phong kiến bị coi là "thời kỳ đen tối" đối với dân chủ?',
    options: [
      'Vì kinh tế không phát triển',
      'Vì chế độ độc tài chuyên chế phong kiến đã xoá bỏ các giá trị dân chủ của thời cổ đại',
      'Vì không có các cuộc khởi nghĩa của nhân dân',
      'Vì con người không có nhu cầu làm chủ xã hội'
    ],
    correctIndex: 1,
    timeLimit: 20,
    explanation: 'Chế độ độc tài chuyên chế phong kiến đã xoá bỏ nền dân chủ chủ nô và thay thế bằng sự thống trị tuyệt đối của vua chúa [7].',
  },
  {
    question: 'Nền dân chủ xã hội chủ nghĩa chính thức được xác lập sau sự kiện lịch sử nào?',
    options: [
      'Công xã Pari năm 1871',
      'Cách mạng Tháng Mười Nga năm 1917',
      'Chiến tranh thế giới thứ hai kết thúc',
      'Sự sụp đổ của Liên Xô và Đông Âu'
    ],
    correctIndex: 1,
    timeLimit: 15,
    explanation: 'Dân chủ xã hội chủ nghĩa được xác lập chính thức sau thắng lợi của Cách mạng Tháng Mười Nga năm 1917 với sự ra đời của nhà nước xã hội chủ nghĩa đầu tiên [8], [9].',
  },
  {
    question: 'Bản chất chính trị của nền dân chủ xã hội chủ nghĩa thể hiện ở điểm nào?',
    options: [
      'Sự đa đảng đối lập quyền lực',
      'Sự lãnh đạo của giai cấp công nhân thông qua Đảng Cộng sản',
      'Sự cai trị của thiểu số đối với đa số',
      'Việc duy trì quyền lực tuyệt đối của cá nhân lãnh đạo'
    ],
    correctIndex: 1,
    timeLimit: 20,
    explanation: 'Bản chất chính trị của nền dân chủ xã hội chủ nghĩa là sự lãnh đạo của giai cấp công nhân thông qua Đảng của nó đối với toàn xã hội [10].',
  },
  {
    question: 'Về bản chất kinh tế, nền dân chủ xã hội chủ nghĩa dựa trên chế độ sở hữu nào?',
    options: [
      'Chế độ tư hữu về tư liệu sản xuất',
      'Chế độ sở hữu hỗn hợp của các tập đoàn tư nhân',
      'Chế độ công hữu về tư liệu sản xuất chủ yếu',
      'Chế độ sở hữu của nước ngoài'
    ],
    correctIndex: 2,
    timeLimit: 15,
    explanation: 'Nền dân chủ xã hội chủ nghĩa dựa trên chế độ sở hữu xã hội về những tư liệu sản xuất chủ yếu của toàn xã hội [11], [12].',
  },
  {
    question: 'Chủ tịch Hồ Chí Minh khẳng định địa vị cao nhất trong nước ta thuộc về ai?',
    options: ['Giai cấp tư sản', 'Nhân dân', 'Các quan chức nhà nước', 'Đội ngũ trí thức'],
    correctIndex: 1,
    timeLimit: 15,
    explanation: 'Hồ Chí Minh khẳng định: "Nước ta là nước dân chủ, địa vị cao nhất là dân, vì dân là chủ" [13].',
  },
  {
    question: 'Đặc điểm của Nhà nước pháp quyền xã hội chủ nghĩa Việt Nam là gì?',
    options: [
      'Sự phân chia quyền lực giữa các giai cấp đối lập',
      'Do Đảng Cộng sản Việt Nam lãnh đạo',
      'Tổ chức theo mô hình tam quyền phân lập tuyệt đối',
      'Duy trì quyền lợi của giai cấp tư sản'
    ],
    correctIndex: 1,
    timeLimit: 20,
    explanation: 'Nhà nước pháp quyền xã hội chủ nghĩa Việt Nam do Đảng Cộng sản Việt Nam lãnh đạo theo quy định tại Điều 4 Hiến pháp năm 2013 [14], [15].',
  },
  {
    question: 'Một trong những phương hướng cơ bản để xây dựng CNXH ở Việt Nam là gì?',
    options: [
      'Tập trung phát triển kinh tế tư nhân làm chủ đạo',
      'Đẩy mạnh công nghiệp hoá, hiện đại hoá đất nước',
      'Hạn chế giao lưu kinh tế với các nước phát triển',
      'Xây dựng nền văn hoá tách rời bản sắc dân tộc'
    ],
    correctIndex: 1,
    timeLimit: 20,
    explanation: 'Phương hướng quan trọng là đẩy mạnh công nghiệp hoá, hiện đại hoá đất nước gắn với phát triển kinh tế tri thức và bảo vệ tài nguyên, môi trường [2], [16].',
  },
  {
    question: 'Dân chủ xã hội chủ nghĩa ở Việt Nam được thực hiện qua những hình thức nào?',
    options: [
      'Chỉ thông qua dân chủ trực tiếp',
      'Chỉ thông qua dân chủ gián tiếp (đại diện)',
      'Thông qua cả dân chủ trực tiếp và dân chủ gián tiếp',
      'Thông qua sự chỉ định của cấp trên'
    ],
    correctIndex: 2,
    timeLimit: 15,
    explanation: 'Bản chất dân chủ xã hội chủ nghĩa ở Việt Nam được thực hiện thông qua các hình thức dân chủ gián tiếp và dân chủ trực tiếp [17].',
  },
  {
    question: 'Theo lý luận Mác - Lênin, dân chủ xã hội chủ nghĩa sẽ như thế nào khi xã hội cộng sản phát triển cao?',
    options: [
      'Trở nên độc tài hơn',
      'Tiếp tục tồn tại như một hình thức nhà nước vĩnh viễn',
      'Tự tiêu vong và trở thành thói quen sinh hoạt xã hội',
      'Bị thay thế bởi nền dân chủ tư sản'
    ],
    correctIndex: 2,
    timeLimit: 20,
    explanation: 'Càng hoàn thiện bao nhiêu, nền dân chủ xã hội chủ nghĩa lại càng tự tiêu vong bấy nhiêu để trở thành một thói quen, một tập quán trong sinh hoạt xã hội [18], [19].',
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