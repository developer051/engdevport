import { NextResponse } from 'next/server';
import { getAllUsers } from '@/lib/dbFallback';
import { existsSync } from 'fs';
import path from 'path';

export async function GET() {
  try {
    // ดึงข้อมูลผู้ใช้ทั้งหมด
    const users = await getAllUsers('score', 'desc');
    
    // นับจำนวนสมาชิกที่ active (ถ้าไม่มี isActive ให้ถือว่า active ทั้งหมด)
    const activeMembers = users.filter(user => user.isActive !== false).length;
    
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
    const totalRuns = runningResults.length; // นับจำนวนการวิ่งจริง
    const totalDistance = runningResults.reduce((sum, result) => {
      // ใช้ distanceInKm หรือคำนวณจาก distance และ distanceUnit
      if (result.distanceInKm) {
        return sum + result.distanceInKm;
      } else if (result.distance && result.distanceUnit) {
        // แปลงหน่วยเป็นกิโลเมตร
        const distance = parseFloat(result.distance);
        if (result.distanceUnit.toLowerCase() === 'km') {
          return sum + distance;
        } else if (result.distanceUnit.toLowerCase() === 'm') {
          return sum + (distance / 1000);
        } else if (result.distanceUnit.toLowerCase() === 'mile') {
          return sum + (distance * 1.60934);
        }
      }
      return sum;
    }, 0);

    // หาจำนวนงานวิ่งที่ไม่ซ้ำกัน (ตามชื่องานวิ่ง)
    const uniqueEvents = new Set(runningResults.map(result => result.eventName || 'งานวิ่งทั่วไป')).size;

    const stats = {
      activeMembers,
      totalRuns,
      totalDistance: Math.round(totalDistance * 100) / 100,
      uniqueEvents,
      totalUsers: users.length
    };

    // Debug logging
    console.log('Stats calculated:', {
      totalUsers: users.length,
      activeMembers,
      totalRuns,
      totalDistance: stats.totalDistance,
      uniqueEvents
    });

    return NextResponse.json(stats);

  } catch (error) {
    console.error('Stats API error:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการดึงข้อมูลสถิติ' },
      { status: 500 }
    );
  }
}
