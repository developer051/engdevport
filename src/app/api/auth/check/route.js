import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { findUserById } from '@/lib/jsondb';

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token');
    
    if (!token) {
      return NextResponse.json(
        { 
          isLoggedIn: false,
          error: 'ไม่พบ token' 
        },
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
          { 
            isLoggedIn: false,
            error: 'Token ไม่ถูกต้อง' 
          },
          { status: 401 }
        );
      }
      
      // ดึงข้อมูล user จากฐานข้อมูล
      const user = findUserById(decoded.userId);
      if (!user) {
        return NextResponse.json(
          { 
            isLoggedIn: false,
            error: 'ไม่พบข้อมูลผู้ใช้' 
          },
          { status: 404 }
        );
      }
      
      return NextResponse.json({
        isLoggedIn: true,
        success: true,
        message: 'ผู้ใช้เข้าสู่ระบบแล้ว',
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          loginName: user.loginName,
          department: user.department,
          profileImage: user.profileImage,
          messageToRunners: user.messageToRunners,
          runningExperience: user.runningExperience || [],
          score: user.score
        }
      });
      
    } catch (jwtError) {
      console.error('JWT verification error:', jwtError);
      return NextResponse.json(
        { 
          isLoggedIn: false,
          error: 'Token หมดอายุหรือไม่ถูกต้อง' 
        },
        { status: 401 }
      );
    }

  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { 
        isLoggedIn: false,
        error: 'เกิดข้อผิดพลาดในการตรวจสอบสถานะการเข้าสู่ระบบ' 
      },
      { status: 500 }
    );
  }
}
