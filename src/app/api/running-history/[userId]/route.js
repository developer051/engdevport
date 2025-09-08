import { NextResponse } from 'next/server';
import { existsSync } from 'fs';
import path from 'path';

// GET method - ดึงประวัติการวิ่งทั้งหมดของ user
export async function GET(request, { params }) {
  try {
    const { userId } = params;

    if (!userId) {
      return NextResponse.json(
        { error: 'กรุณาระบุ User ID' },
        { status: 400 }
      );
    }

    // อ่านข้อมูล running results
    const resultsPath = path.join(process.cwd(), 'data', 'running-results.json');
    let results = [];
    
    try {
      const fs = await import('fs/promises');
      if (existsSync(resultsPath)) {
        const data = await fs.readFile(resultsPath, 'utf8');
        results = JSON.parse(data);
      }
    } catch (error) {
      console.log('ไม่พบไฟล์ running-results.json');
    }

    // กรองเฉพาะผลการวิ่งของ user นี้ และเรียงตามวันที่ล่าสุด
    const userResults = results
      .filter(result => result.userId === userId)
      .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));

    // คำนวณสถิติ
    const totalRuns = userResults.length;
    const totalDistance = userResults.reduce((sum, result) => sum + result.distanceInKm, 0);
    const totalTime = userResults.reduce((sum, result) => sum + result.totalSeconds, 0);
    
    // คำนวณเวลารวมเป็น ชั่วโมง:นาที:วินาที
    const hours = Math.floor(totalTime / 3600);
    const minutes = Math.floor((totalTime % 3600) / 60);
    const seconds = totalTime % 60;

    return NextResponse.json({
      success: true,
      results: userResults,
      stats: {
        totalRuns,
        totalDistance: totalDistance.toFixed(2),
        totalTime: `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
        averageDistance: totalRuns > 0 ? (totalDistance / totalRuns).toFixed(2) : 0
      }
    });

  } catch (error) {
    console.error('Get running history error:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการดึงข้อมูลประวัติการวิ่ง' },
      { status: 500 }
    );
  }
}
