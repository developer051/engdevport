import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { findUserByLoginName, validatePassword } from '@/lib/jsondb';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request) {
  try {
    const { loginName, password } = await request.json();
    
    // Validate required fields
    if (!loginName || !password) {
      return NextResponse.json(
        { error: 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน' },
        { status: 400 }
      );
    }
    
    // Find user by loginName
    const user = findUserByLoginName(loginName);
    if (!user || !user.isActive) {
      return NextResponse.json(
        { error: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' },
        { status: 401 }
      );
    }
    
    // Check password
    const isValidPassword = await validatePassword(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' },
        { status: 401 }
      );
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id,
        loginName: user.loginName
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    // User response without password
    const userResponse = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      loginName: user.loginName,
      department: user.department,
      profileImage: user.profileImage,
      messageToRunners: user.messageToRunners,
      score: user.score
    };
    
    // Create response with httpOnly cookie
    const response = NextResponse.json(
      {
        message: 'เข้าสู่ระบบสำเร็จ!',
        user: userResponse
      },
      { status: 200 }
    );
    
    // Set secure httpOnly cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    
    return response;
    
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ' },
      { status: 500 }
    );
  }
}
