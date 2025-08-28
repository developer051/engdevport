import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token');
    
    if (!token) {
      return NextResponse.json(
        { error: 'ไม่พบ token' },
        { status: 401 }
      );
    }

    // ตรวจสอบ JWT token
    try {
      const jwt = await import('jsonwebtoken');
      const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
      
      const decoded = jwt.verify(token.value, JWT_SECRET);
      if (!decoded || !decoded.userId) {
        return NextResponse.json(
          { error: 'Token ไม่ถูกต้อง' },
          { status: 401 }
        );
      }
      
      return NextResponse.json({
        success: true,
        message: 'ผู้ใช้เข้าสู่ระบบแล้ว',
        user: {
          userId: decoded.userId,
          loginName: decoded.loginName
        }
      });
      
    } catch (jwtError) {
      console.error('JWT verification error:', jwtError);
      return NextResponse.json(
        { error: 'Token หมดอายุหรือไม่ถูกต้อง' },
        { status: 401 }
      );
    }

  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการตรวจสอบสถานะการเข้าสู่ระบบ' },
      { status: 500 }
    );
  }
}
