import { NextResponse } from 'next/server';
import { writeFile, mkdir, unlink } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { findUserById, updateUserScore } from '@/lib/dbFallback';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// PUT method - แก้ไข running result
export async function PUT(request, { params }) {
  try {
    const { id } = params;

    // ตรวจสอบ authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'กรุณาเข้าสู่ระบบก่อนแก้ไขผลการวิ่ง' },
        { status: 401 }
      );
    }

    // ตรวจสอบ JWT token
    let decoded;
    try {
      decoded = jwt.verify(token.value, JWT_SECRET);
    } catch (error) {
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
      return NextResponse.json(
        { error: 'ไม่พบข้อมูลผลการวิ่ง' },
        { status: 404 }
      );
    }

    // หาผลการวิ่งที่ต้องการแก้ไข
    const resultIndex = results.findIndex(result => 
      result.id === id && result.userId === decoded.userId
    );

    if (resultIndex === -1) {
      return NextResponse.json(
        { error: 'ไม่พบผลการวิ่งที่ต้องการแก้ไข' },
        { status: 404 }
      );
    }

    const oldResult = results[resultIndex];

    // รับข้อมูลจาก request body
    const body = await request.json();
    const { hours, minutes, seconds, distance, distanceUnit, submittedAt } = body;

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

    // คำนวณคะแนนใหม่
    let distanceInKm = distance;
    if (distanceUnit === 'm') {
      distanceInKm = distance / 1000;
    } else if (distanceUnit === 'mi') {
      distanceInKm = distance * 1.60934;
    }

    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    const baseScore = Math.round(distanceInKm * 10);
    const timeBonus = Math.max(0, Math.round((totalSeconds / distanceInKm) * -0.1));
    const newScore = baseScore + timeBonus;

    // คำนวณคะแนนที่เปลี่ยนแปลง
    const scoreDifference = newScore - oldResult.score;

    // อัปเดตคะแนนผู้ใช้
    const updatedUser = await updateUserScore(user.originalId || user.id, scoreDifference);

    // อัปเดตข้อมูลผลการวิ่ง
    const updatedResult = {
      ...oldResult,
      hours,
      minutes,
      seconds,
      totalSeconds,
      distance,
      distanceUnit,
      distanceInKm,
      score: newScore,
      submittedAt: submittedAt || oldResult.submittedAt,
      updatedAt: new Date().toISOString()
    };

    results[resultIndex] = updatedResult;

    // บันทึกข้อมูลกลับไป
    try {
      const fs = await import('fs/promises');
      await fs.writeFile(resultsPath, JSON.stringify(results, null, 2));
    } catch (error) {
      console.error('Error saving updated running result:', error);
    }

    return NextResponse.json({
      message: 'แก้ไขผลการวิ่งสำเร็จ!',
      result: updatedResult,
      newScore: updatedUser.score
    });

  } catch (error) {
    console.error('Update running result error:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการแก้ไขผลการวิ่ง' },
      { status: 500 }
    );
  }
}

// DELETE method - ลบ running result
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    // ตรวจสอบ authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'กรุณาเข้าสู่ระบบก่อนลบผลการวิ่ง' },
        { status: 401 }
      );
    }

    // ตรวจสอบ JWT token
    let decoded;
    try {
      decoded = jwt.verify(token.value, JWT_SECRET);
    } catch (error) {
      return NextResponse.json(
        { error: 'Token ไม่ถูกต้อง กรุณาเข้าสู่ระบบใหม่' },
        { status: 401 }
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
      return NextResponse.json(
        { error: 'ไม่พบข้อมูลผลการวิ่ง' },
        { status: 404 }
      );
    }

    // หาผลการวิ่งที่ต้องการลบ
    const resultIndex = results.findIndex(result => 
      result.id === id && result.userId === decoded.userId
    );

    if (resultIndex === -1) {
      return NextResponse.json(
        { error: 'ไม่พบผลการวิ่งที่ต้องการลบ' },
        { status: 404 }
      );
    }

    const resultToDelete = results[resultIndex];

    // ลบไฟล์ภาพ
    const imagePath = path.join(process.cwd(), 'public', resultToDelete.imagePath);
    if (existsSync(imagePath)) {
      try {
        await unlink(imagePath);
      } catch (error) {
        console.log('ไม่สามารถลบไฟล์ได้:', error);
      }
    }

    // ลบข้อมูลจาก array
    results.splice(resultIndex, 1);

    // อัปเดตคะแนนผู้ใช้ (ลบคะแนนที่ได้จากผลการวิ่งนี้)
    const user = await findUserById(decoded.userId);
    if (user) {
      await updateUserScore(user.originalId || user.id, -resultToDelete.score);
    }

    // บันทึกข้อมูลกลับไป
    try {
      const fs = await import('fs/promises');
      await fs.writeFile(resultsPath, JSON.stringify(results, null, 2));
    } catch (error) {
      console.error('Error saving updated running results:', error);
    }

    return NextResponse.json({
      message: 'ลบผลการวิ่งสำเร็จ!'
    });

  } catch (error) {
    console.error('Delete running result error:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการลบผลการวิ่ง' },
      { status: 500 }
    );
  }
}
