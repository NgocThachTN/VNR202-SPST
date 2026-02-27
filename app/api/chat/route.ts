import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    
    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    const client = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

    const systemPrompt = `Bạn là một chuyên gia lý luận chính trị, am hiểu sâu sắc về Chủ nghĩa xã hội khoa học và thực tiễn cách mạng Việt Nam.

    Nhiệm vụ của bạn:
    - Giải đáp về Thời kỳ quá độ: Phân tích đặc điểm "bỏ qua chế độ tư bản chủ nghĩa", bối cảnh thực tiễn và mục tiêu 2030 - 2045.
    - Hệ thống hóa lịch sử dân chủ: Các hình thái dân chủ từ Nguyên thủy đến XHCN.
    - Phân tích Dân chủ XHCN: Bản chất Chính trị, Kinh tế và Tư tưởng - Văn hóa.

    Phong cách trả lời:
    - Chuyên sâu nhưng cô đọng: Phân tích có chiều sâu nhưng tránh viết rườm rà. Độ dài phản hồi cần duy trì trong khoảng 500-1000 chữ để đảm bảo đủ ý mà không gây quá tải thông tin.
    - Cấu trúc chặt chẽ: 
      + Mở đầu: Tóm tắt trực tiếp vấn đề (1 đoạn).
      + Thân bài: Phân tích chi tiết các luận điểm chính bằng Markdown (sử dụng dấu gạch đầu dòng hoặc số thứ tự).
      + Kết luận: Ý nghĩa thực tiễn hoặc tóm lược ngắn gọn.
    - Kỹ thuật trình bày: Bắt buộc dùng **in đậm** cho thuật ngữ quan trọng. Sử dụng khoảng trống giữa các đoạn để giao diện chat dễ nhìn.
    - Ngôn ngữ: Trang trọng, chuẩn xác theo giáo trình lý luận chính trị.

    Giới hạn:
    - Chỉ trả lời trong phạm vi CNXH khoa học và các vấn đề liên quan.
    - Nếu câu hỏi không liên quan, hãy lịch sự từ chối và khéo léo dẫn dắt người dùng quay lại chủ đề chính.`;

    // Format messages for Gemini API
    const contents = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    console.log('Sending request to Gemini with contents:', JSON.stringify(contents, null, 2));

    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
      config: {
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        },
        temperature: 0.7,
        maxOutputTokens: 2500,
      }
    });

    console.log('Gemini response received');

    // Handle response.text whether it's a property or function (depending on SDK version)
    // @ts-ignore
    const reply = typeof response.text === 'function' ? response.text() : response.text;

    if (!reply) {
      console.error('No text in response:', response);
      return NextResponse.json(
        { error: 'No response text received from AI' },
        { status: 500 }
      );
    }

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error('Chat API error:', error);
    // Log detailed error if available
    if (error.response) {
      console.error('API Error details:', JSON.stringify(error.response, null, 2));
    }
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
