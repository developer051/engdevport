import { NextResponse } from 'next/server';
import { existsSync } from 'fs';
import path from 'path';

export async function GET() {
  try {
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

    if (runningResults.length === 0) {
      return NextResponse.json({
        latestRunner: null,
        message: 'ยังไม่มีข้อมูลการวิ่ง'
      });
    }

    // หาผู้ส่งผลวิ่งล่าสุด (เรียงตามเวลาส่งผล submittedAt)
    const latestResult = runningResults.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))[0];
    
    // Debug logging
    console.log('Latest runner by submission time:', {
      userName: latestResult.userName,
      submittedAt: latestResult.submittedAt,
      runningDate: latestResult.runningDate,
      distance: latestResult.distance,
      distanceUnit: latestResult.distanceUnit
    });

    return NextResponse.json({
      latestRunner: {
        userName: latestResult.userName,
        distance: latestResult.distance,
        distanceUnit: latestResult.distanceUnit,
        distanceInKm: latestResult.distanceInKm,
        time: `${latestResult.hours}:${latestResult.minutes.toString().padStart(2, '0')}:${latestResult.seconds.toString().padStart(2, '0')}`,
        submittedAt: latestResult.submittedAt,
        runningDate: latestResult.runningDate
      }
    });

  } catch (error) {
    console.error('Latest runner API error:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการดึงข้อมูลผู้วิ่งล่าสุด' },
      { status: 500 }
    );
  }
}
