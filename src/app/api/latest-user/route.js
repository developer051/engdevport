import { NextResponse } from 'next/server';
import { getAllUsers } from '@/lib/dbFallback';

export async function GET() {
  try {
    // ดึงข้อมูลผู้ใช้ทั้งหมด
    const users = await getAllUsers('createdAt', 'desc');
    
    if (users.length === 0) {
      return NextResponse.json({
        latestUser: null,
        message: 'ยังไม่มีผู้ใช้ที่สมัคร'
      });
    }

    // หาผู้ใช้ที่สมัครล่าสุด
    const latestUser = users[0];

    return NextResponse.json({
      latestUser: {
        firstName: latestUser.firstName,
        lastName: latestUser.lastName,
        userName: `${latestUser.firstName} ${latestUser.lastName}`,
        createdAt: latestUser.createdAt,
        email: latestUser.email
      }
    });

  } catch (error) {
    console.error('Latest user API error:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้ล่าสุด' },
      { status: 500 }
    );
  }
}
