import { NextResponse } from 'next/server';
import { getAllUsers } from '@/lib/dbFallback';
import { existsSync } from 'fs';
import path from 'path';

export async function GET() {
  try {
    // ดึงข้อมูลผู้ใช้ทั้งหมด
    const users = await getAllUsers('score', 'desc');
    
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

    // คำนวณระยะทางสะสมและการวิ่งล่าสุดสำหรับแต่ละผู้ใช้
    const usersWithStats = users.map(user => {
      // หาผลการวิ่งของผู้ใช้นี้
      const userResults = runningResults.filter(result => result.userId === user.id);
      
      // คำนวณระยะทางสะสม (แปลงเป็นกิโลเมตร)
      const totalDistance = userResults.reduce((sum, result) => {
        let distanceInKm = result.distanceInKm || 0;
        return sum + distanceInKm;
      }, 0);
      
      // หาการวิ่งล่าสุด
      const latestRun = userResults.length > 0 
        ? userResults.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))[0]
        : null;
      
      return {
        ...user,
        totalDistance: Math.round(totalDistance * 100) / 100, // ปัดเศษ 2 ตำแหน่ง
        totalRuns: userResults.length,
        latestRun: latestRun ? {
          distance: latestRun.distance,
          distanceUnit: latestRun.distanceUnit,
          time: `${latestRun.hours}:${latestRun.minutes.toString().padStart(2, '0')}:${latestRun.seconds.toString().padStart(2, '0')}`,
          date: latestRun.submittedAt,
          imagePath: latestRun.imagePath || null
        } : null
      };
    });

    // เรียงลำดับตามระยะทางสะสม (มากไปน้อย)
    usersWithStats.sort((a, b) => b.totalDistance - a.totalDistance);

    return NextResponse.json(usersWithStats);

  } catch (error) {
    console.error('Leaderboard error:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการดึงข้อมูล' },
      { status: 500 }
    );
  }
}
