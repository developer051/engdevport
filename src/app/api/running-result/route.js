import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { findUserById, updateUserScore } from '@/lib/dbFallback';
import { getJWTSecret } from '@/lib/auth';

// GET: ดึงรายการผลการวิ่ง
export async function GET(request) {
  try {
    // ตรวจสอบ authentication (optional - ถ้าต้องการให้ดึงเฉพาะของตัวเอง)
    const cookieStore = await cookies();
    const token = cookieStore.get('token');
    
    let userId = null;
    if (token) {
      try {
        const JWT_SECRET = getJWTSecret();
        const decoded = jwt.verify(token.value, JWT_SECRET);
        userId = decoded.userId;
      } catch (error) {
        // ถ้า token ไม่ valid ก็ให้ดึงทั้งหมด (public)
        console.log('Token invalid, returning all results');
      }
    }

    // ดึงข้อมูลผลการวิ่ง
    const resultsPath = path.join(process.cwd(), 'data', 'running-results.json');
    let runningResults = [];
    
    if (existsSync(resultsPath)) {
      try {
        const fs = await import('fs/promises');
        const data = await fs.readFile(resultsPath, 'utf8');
        runningResults = JSON.parse(data);
      } catch (error) {
        console.error('Error reading running results:', error);
      }
    }

    // ถ้ามี userId ให้กรองเฉพาะของ user นั้น, ถ้าไม่มีให้ดึงทั้งหมด
    if (userId) {
      runningResults = runningResults.filter(result => 
        result.userId === userId || result.userId === userId.toString()
      );
    }

    // เรียงลำดับตามวันที่ส่ง (ใหม่ไปเก่า)
    runningResults.sort((a, b) => {
      return new Date(b.submittedAt) - new Date(a.submittedAt);
    });

    return NextResponse.json({
      results: runningResults,
      count: runningResults.length
    });

  } catch (error) {
    console.error('Error fetching running results:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการดึงข้อมูลผลการวิ่ง' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    // ตรวจสอบ authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'กรุณาเข้าสู่ระบบก่อนส่งผลการวิ่ง' },
        { status: 401 }
      );
    }

    // ตรวจสอบ JWT token
    let decoded;
    try {
      const JWT_SECRET = getJWTSecret();
      decoded = jwt.verify(token.value, JWT_SECRET);
    } catch (error) {
      // ถ้าเป็น JWT_SECRET error ให้ return 500
      if (error.message?.includes('JWT_SECRET')) {
        console.error('JWT_SECRET configuration error:', error);
        return NextResponse.json(
          { error: 'Server configuration error' },
          { status: 500 }
        );
      }
      // ถ้าเป็น JWT verification error ให้ return 401
      return NextResponse.json(
        { error: 'Token ไม่ถูกต้อง กรุณาเข้าสู่ระบบใหม่' },
        { status: 401 }
      );
    }

    // หาข้อมูลผู้ใช้
    const user = await findUserById(decoded.userId);
    if (!user) {
      return NextResponse.json(
        { error: 'ไม่พบข้อมูลผู้ใช้' },
        { status: 404 }
      );
    }

    // รับข้อมูลจาก FormData
    const formData = await request.formData();
    const hours = parseInt(formData.get('hours')) || 0;
    const minutes = parseInt(formData.get('minutes')) || 0;
    const seconds = parseInt(formData.get('seconds')) || 0;
    const distance = parseFloat(formData.get('distance'));
    const distanceUnit = formData.get('distanceUnit');
    const imageFile = formData.get('image');

    // ตรวจสอบข้อมูล
    if (!distance || distance <= 0) {
      return NextResponse.json(
        { error: 'กรุณากรอกระยะทางที่ถูกต้อง' },
        { status: 400 }
      );
    }

    if (hours === 0 && minutes === 0 && seconds === 0) {
      return NextResponse.json(
        { error: 'กรุณากรอกเวลาที่ใช้วิ่ง' },
        { status: 400 }
      );
    }

    if (!imageFile) {
      return NextResponse.json(
        { error: 'กรุณาแนบภาพหลักฐานการวิ่ง' },
        { status: 400 }
      );
    }

    // ตรวจสอบไฟล์ภาพ
    if (!imageFile.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'กรุณาเลือกไฟล์รูปภาพเท่านั้น' },
        { status: 400 }
      );
    }

    if (imageFile.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'ขนาดไฟล์ต้องไม่เกิน 5MB' },
        { status: 400 }
      );
    }

    // สร้างโฟลเดอร์สำหรับเก็บภาพ
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'running-results');
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // สร้างชื่อไฟล์
    const timestamp = Date.now();
    const fileExtension = path.extname(imageFile.name);
    const fileName = `${user.originalId || user.id}_${timestamp}${fileExtension}`;
    const filePath = path.join(uploadDir, fileName);

    // บันทึกไฟล์
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // คำนวณคะแนน (ตัวอย่าง: 1 กิโลเมตร = 10 คะแนน)
    let distanceInKm = distance;
    if (distanceUnit === 'm') {
      distanceInKm = distance / 1000;
    } else if (distanceUnit === 'mi') {
      distanceInKm = distance * 1.60934;
    }

    // คำนวณเวลารวมเป็นวินาที
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    
    // คำนวณคะแนน (ระยะทาง * 10 - โบนัสสำหรับความเร็ว)
    const baseScore = Math.round(distanceInKm * 10);
    const timeBonus = Math.max(0, Math.round((totalSeconds / distanceInKm) * -0.1)); // โบนัสสำหรับความเร็ว
    const newScore = baseScore + timeBonus;

    // อัปเดตคะแนนผู้ใช้
    const updatedUser = await updateUserScore(user.originalId || user.id, newScore);

    // บันทึกข้อมูลผลการวิ่ง
    const runningResult = {
      id: Date.now().toString(),
      userId: user.originalId || user.id,
      userName: `${user.firstName} ${user.lastName}`,
      hours,
      minutes,
      seconds,
      totalSeconds,
      distance,
      distanceUnit,
      distanceInKm,
      imagePath: `/uploads/running-results/${fileName}`,
      score: newScore,
      submittedAt: new Date().toISOString()
    };

    // บันทึกข้อมูลผลการวิ่ง (ในที่นี้จะใช้ JSON file เช่นเดียวกับ users)
    const resultsPath = path.join(process.cwd(), 'data', 'running-results.json');
    let results = [];
    
    try {
      const fs = await import('fs/promises');
      if (existsSync(resultsPath)) {
        const data = await fs.readFile(resultsPath, 'utf8');
        results = JSON.parse(data);
      }
    } catch (error) {
      console.log('สร้างไฟล์ running-results.json ใหม่');
    }

    results.push(runningResult);

    try {
      const fs = await import('fs/promises');
      await fs.writeFile(resultsPath, JSON.stringify(results, null, 2));
    } catch (error) {
      console.error('Error saving running result:', error);
    }

    return NextResponse.json(
      {
        message: 'ส่งผลการวิ่งสำเร็จ!',
        result: {
          ...runningResult,
          imagePath: undefined // ไม่ส่ง path กลับไป
        },
        newScore: updatedUser.score
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Running result submission error:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการส่งผลการวิ่ง' },
      { status: 500 }
    );
  }
}
