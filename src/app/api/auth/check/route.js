import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = cookies();
    const sessionToken = cookieStore.get('sessionToken');
    
    if (!sessionToken) {
      return NextResponse.json(
        { error: 'ไม่พบ session token' },
        { status: 401 }
      );
    }

    // ในอนาคตควรตรวจสอบ session token กับฐานข้อมูล
    // สำหรับตอนนี้จะตรวจสอบแค่ว่ามี token หรือไม่
    
    return NextResponse.json({
      success: true,
      message: 'ผู้ใช้เข้าสู่ระบบแล้ว'
    });

  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการตรวจสอบสถานะการเข้าสู่ระบบ' },
      { status: 500 }
    );
  }
}
