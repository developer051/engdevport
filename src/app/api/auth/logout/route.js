import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // สร้าง response
    const response = NextResponse.json(
      {
        message: 'ออกจากระบบสำเร็จ'
      },
      { status: 200 }
    );
    
    // ล้าง token cookie
    response.cookies.set('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0 // ล้าง cookie ทันที
    });
    
    return response;
    
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการออกจากระบบ' },
      { status: 500 }
    );
  }
}
