import { NextResponse } from 'next/server';
import { getAllUsers } from '@/lib/dbFallback';
import { existsSync } from 'fs';
import path from 'path';

export async function GET() {
  try {
    // ดึงข้อมูลผู้ใช้ทั้งหมด
    const users = await getAllUsers('score', 'desc');
    
    // นับจำนวนสมาชิกที่ active
    const activeMembers = users.filter(user => user.isActive).length;
    
    // ดึงข้อมูลผลการวิ่ง
    const resultsPath = path.join(process.cwd(), 'data', 'running-results.json');
    let runningResults = [];
    
    if (existsSync(resultsPath)) {
      try {
        const fs = await import('fs/promises');
        const data = await fs.readFile(resultsPath, 'utf8');
        runningResults = JSON.parse(data);
      } catch (error) {
        console.log('ไม่พบข้อมูลผลการวิ่ง');
      }
    }

    // คำนวณสถิติต่างๆ
    const totalRuns = runningResults.length;
    const totalDistance = runningResults.reduce((sum, result) => {
      return sum + (result.distanceInKm || 0);
    }, 0);

    // หาจำนวนงานวิ่งที่ไม่ซ้ำกัน (ตามชื่องานวิ่ง)
    const uniqueEvents = new Set(runningResults.map(result => result.eventName || 'งานวิ่งทั่วไป')).size;

    return NextResponse.json({
      activeMembers,
      totalRuns,
      totalDistance: Math.round(totalDistance * 100) / 100,
      uniqueEvents,
      totalUsers: users.length
    });

  } catch (error) {
    console.error('Stats API error:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการดึงข้อมูลสถิติ' },
      { status: 500 }
    );
  }
}
