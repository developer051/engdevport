import { GoogleGenerativeAI } from "@google/generative-ai";

// สร้าง Gemini instance
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'demo-key');

export const getGeminiResponse = async (prompt, conversationHistory = []) => {
  try {
    // ตรวจสอบ API Key
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey || apiKey === 'demo-key' || apiKey === 'your_actual_gemini_api_key_here') {
      throw new Error('API Key ไม่ถูกต้องหรือยังไม่ได้ตั้งค่า');
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
    
    // สร้าง system prompt สำหรับ AI Running Coach
    const systemPrompt = `คุณเป็น AI Running Coach ที่มีประสบการณ์ด้านการวิ่ง ให้คำแนะนำที่เป็นประโยชน์และปลอดภัยเกี่ยวกับการวิ่ง

กฎการตอบ:
1. ตอบเป็นภาษาไทยเสมอ
2. ให้คำแนะนำที่ชัดเจนและปฏิบัติได้จริง
3. เน้นความปลอดภัยและการป้องกันการบาดเจ็บ
4. ให้กำลังใจและสร้างแรงจูงใจ
5. ตอบสั้นกระชับแต่ครบถ้วน
6. ใช้ emoji เพื่อให้ดูเป็นมิตร
7. สถานที่ฝึกซ้อม คือ สวนรถไฟ สวนจตุจักร
8. วันฟฤหัสหลังเลิกงาน
9. เวลาเริ่มวิ่ง คือ 17:30 - 20:00


บทบาท: คุณเป็นโค้ชส่วนตัวที่คอยให้คำแนะนำการวิ่ง`;

    // รวม conversation history และ prompt ปัจจุบัน
    const fullPrompt = `${systemPrompt}

${conversationHistory.map(msg => `${msg.role === 'user' ? 'ผู้ใช้' : 'AI Coach'}: ${msg.content}`).join('\n')}

ผู้ใช้: ${prompt}

AI Coach:`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    return response.text().trim();
    
  } catch (error) {
    console.error('Gemini API Error:', error);
    
    // ตรวจสอบประเภทของ error
    if (error.message.includes('API Key ไม่ถูกต้อง')) {
      return "ขออภัยครับ API Key ไม่ถูกต้อง กรุณาตรวจสอบการตั้งค่าใน .env.local ครับ 🔑";
    }
    
    if (error.message.includes('API key not valid')) {
      return "ขออภัยครับ API Key ไม่ถูกต้อง กรุณาตรวจสอบ API Key ใน Google AI Studio ครับ 🔑";
    }
    
    // Fallback responses สำหรับ error อื่นๆ
    const fallbackResponses = [
      "ขออภัยครับ เกิดข้อผิดพลาดในการเชื่อมต่อ AI แต่ผมยังคงพร้อมให้คำแนะนำการวิ่งพื้นฐานได้ครับ! 💪",
      "ตอนนี้ระบบ AI มีปัญหา แต่ผมยังคงเป็นโค้ชการวิ่งที่ดีของคุณได้ครับ 🏃‍♂️",
      "ขออภัยครับ ระบบ AI ไม่พร้อมใช้งาน แต่ผมพร้อมให้คำแนะนำการวิ่งเสมอครับ! ✨"
    ];
    
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  }
};

// ฟังก์ชันสำหรับสร้าง quick responses
export const getQuickResponse = async (questionType) => {
  const quickPrompts = {
    'beginner': 'ให้คำแนะนำสำหรับผู้เริ่มต้นการวิ่ง ควรเริ่มอย่างไร?',
    'injury': 'วิธีป้องกันการบาดเจ็บขณะวิ่ง?',
    'breathing': 'เทคนิคการหายใจขณะวิ่งที่ถูกต้อง?',
    'shoes': 'การเลือกรองเท้าวิ่งที่เหมาะสม?',
    'training': 'โปรแกรมการฝึกซ้อมสำหรับวิ่ง 5K?',
    'motivation': 'วิธีสร้างแรงจูงใจในการวิ่ง?'
  };
  
  const prompt = quickPrompts[questionType] || questionType;
  return await getGeminiResponse(prompt);
};
