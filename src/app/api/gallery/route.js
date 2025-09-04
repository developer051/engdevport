import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function POST(request) {
  try {
    // ตรวจสอบ session/login
    const { cookies } = await import('next/headers');
    const cookieStore = cookies();
    const token = cookieStore.get('token');
    
    if (!token) {
      return NextResponse.json(
        { error: 'กรุณาเข้าสู่ระบบก่อนอัปโหลดภาพ' },
        { status: 401 }
      );
    }

    // ตรวจสอบ JWT token
    try {
      const jwt = await import('jsonwebtoken');
      const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
      
      const decoded = jwt.verify(token.value, JWT_SECRET);
      if (!decoded || !decoded.userId) {
        return NextResponse.json(
          { error: 'เซสชันหมดอายุ กรุณาเข้าสู่ระบบใหม่' },
          { status: 401 }
        );
      }
    } catch (authError) {
      console.error('Token verification error:', authError);
      return NextResponse.json(
        { error: 'เซสชันหมดอายุ กรุณาเข้าสู่ระบบใหม่' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const image = formData.get('image');
    const title = formData.get('title');
    const description = formData.get('description');

    if (!image) {
      return NextResponse.json(
        { error: 'กรุณาแนบภาพ' },
        { status: 400 }
      );
    }

    if (!title || !description) {
      return NextResponse.json(
        { error: 'กรุณากรอกชื่อภาพและคำบรรยาย' },
        { status: 400 }
      );
    }

    // ตรวจสอบประเภทไฟล์
    if (!image.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'กรุณาเลือกไฟล์รูปภาพเท่านั้น' },
        { status: 400 }
      );
    }

    // ตรวจสอบขนาดไฟล์ (ไม่เกิน 10MB)
    if (image.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'ขนาดไฟล์ต้องไม่เกิน 10MB' },
        { status: 400 }
      );
    }

    // สร้างโฟลเดอร์สำหรับเก็บภาพ
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'gallery');
    await mkdir(uploadDir, { recursive: true });

    // สร้างชื่อไฟล์ที่ไม่ซ้ำกัน
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const fileExtension = path.extname(image.name);
    const fileName = `${timestamp}_${randomString}${fileExtension}`;
    const filePath = path.join(uploadDir, fileName);

    // แปลงไฟล์เป็น buffer และบันทึก
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // สร้างข้อมูลภาพใหม่
    const newImage = {
      id: timestamp,
      src: `/uploads/gallery/${fileName}`,
      alt: title,
      title: title,
      description: description,
      uploadedAt: new Date().toISOString()
    };

    // บันทึกข้อมูลลงไฟล์ JSON
    const fs = await import('fs/promises');
    const galleryDataPath = path.join(process.cwd(), 'data', 'gallery.json');
    
    let galleryData = { images: [] };
    
    try {
      const existingData = await fs.readFile(galleryDataPath, 'utf8');
      galleryData = JSON.parse(existingData);
    } catch (fileError) {
      // ถ้าไฟล์ไม่มี ให้สร้างใหม่
    }
    
    // เพิ่มภาพใหม่
    galleryData.images.push(newImage);
    
    // บันทึกไฟล์
    await fs.writeFile(galleryDataPath, JSON.stringify(galleryData, null, 2));

    return NextResponse.json({
      success: true,
      message: 'อัปโหลดภาพสำเร็จ',
      image: newImage
    });

  } catch (error) {
    console.error('Gallery upload error:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการอัปโหลดภาพ' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // ดึงข้อมูลจากไฟล์ JSON ที่เก็บข้อมูลภาพที่ upload
    const fs = await import('fs/promises');
    const galleryDataPath = path.join(process.cwd(), 'data', 'gallery.json');
    
    let images = [];
    
    try {
      const data = await fs.readFile(galleryDataPath, 'utf8');
      const galleryData = JSON.parse(data);
      images = galleryData.images || [];
    } catch (fileError) {
      // ถ้าไฟล์ไม่มี ให้ใช้ข้อมูลตัวอย่าง
      images = [
        {
          id: 1,
          src: "/ds.jpg",
          alt: "Coastal Village",
          title: "Beautiful Coastal Village",
          description: "A stunning view of a Mediterranean coastal village with colorful houses and crystal clear waters.",
        },
        {
          id: 4,
          src: "/supachai.jpg",
          alt: "Professional Portrait",
          title: "Professional Portrait",
          description: "Professional headshot for business and portfolio use.",
        },
      ];
    }

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Gallery fetch error:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการดึงข้อมูลภาพ' },
      { status: 500 }
    );
  }
}
