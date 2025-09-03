import { getGeminiResponse } from '@/lib/geminiService';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { message, conversationHistory = [] } = await request.json();
    
    if (!message || !message.trim()) {
      return NextResponse.json(
        { error: 'กรุณาใส่ข้อความ' },
        { status: 400 }
      );
    }
    
    // ตรวจสอบ API Key
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey || apiKey === 'demo-key' || apiKey === 'your_actual_gemini_api_key_here') {
      return NextResponse.json({
        success: false,
        error: 'API Key ไม่ถูกต้อง',
        fallback: 'ขออภัยครับ API Key ไม่ถูกต้อง กรุณาตรวจสอบการตั้งค่าใน .env.local ครับ 🔑'
      }, { status: 400 });
    }
    
    // เรียกใช้ Gemini API
    const response = await getGeminiResponse(message, conversationHistory);
    
    return NextResponse.json({
      success: true,
      response: response,
      model: "gemini-2.0-flash-exp",
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('AI Chat API Error:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'เกิดข้อผิดพลาดในการเชื่อมต่อ AI',
        fallback: 'ขออภัยครับ ระบบ AI มีปัญหา แต่ผมยังคงเป็นโค้ชการวิ่งที่ดีของคุณได้ครับ! 🏃‍♂️'
      },
      { status: 500 }
    );
  }
}
