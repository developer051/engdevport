import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

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
    let decoded;
    try {
      const jwt = await import('jsonwebtoken');
      const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
      
      decoded = jwt.verify(token.value, JWT_SECRET);
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

    // ดึงข้อมูลผู้ใช้
    const { findUserById } = await import('@/lib/dbFallback');
    const currentUser = await findUserById(decoded.userId);
    if (!currentUser) {
      return NextResponse.json(
        { error: 'ไม่พบข้อมูลผู้ใช้' },
        { status: 401 }
      );
    }

    // สร้างข้อมูลภาพใหม่
    const newImage = {
      id: timestamp,
      src: `/uploads/gallery/${fileName}`,
      alt: title,
      title: title,
      description: description,
      uploadedAt: new Date().toISOString(),
      uploadedBy: {
        userId: currentUser.originalId || currentUser.id,
        userName: `${currentUser.firstName} ${currentUser.lastName}`,
        loginName: currentUser.loginName
      }
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

// แก้ไขข้อมูลภาพ
export async function PUT(request) {
  try {
    // ตรวจสอบ authentication
    const { cookies } = await import('next/headers');
    const cookieStore = cookies();
    const token = cookieStore.get('token');
    
    if (!token) {
      return NextResponse.json(
        { error: 'กรุณาเข้าสู่ระบบก่อน' },
        { status: 401 }
      );
    }

    let currentUser;
    try {
      const jwt = await import('jsonwebtoken');
      const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
      
      const decoded = jwt.verify(token.value, JWT_SECRET);
      if (!decoded || !decoded.userId) {
        return NextResponse.json(
          { error: 'เซสชันหมดอายุ' },
          { status: 401 }
        );
      }
      
      const { findUserById } = await import('@/lib/dbFallback');
      currentUser = await findUserById(decoded.userId);
      if (!currentUser) {
        return NextResponse.json(
          { error: 'ไม่พบข้อมูลผู้ใช้' },
          { status: 401 }
        );
      }
    } catch (authError) {
      return NextResponse.json(
        { error: 'เซสชันหมดอายุ' },
        { status: 401 }
      );
    }

    const { imageId, title, description } = await request.json();

    if (!imageId || !title || !description) {
      return NextResponse.json(
        { error: 'กรุณากรอกข้อมูลให้ครบถ้วน' },
        { status: 400 }
      );
    }

    // อ่านข้อมูลภาพปัจจุบัน
    const fs = await import('fs/promises');
    const galleryDataPath = path.join(process.cwd(), 'data', 'gallery.json');
    
    let galleryData = { images: [] };
    try {
      const data = await fs.readFile(galleryDataPath, 'utf8');
      galleryData = JSON.parse(data);
    } catch (fileError) {
      return NextResponse.json(
        { error: 'ไม่พบข้อมูลภาพ' },
        { status: 404 }
      );
    }

    // หาภาพที่ต้องการแก้ไข
    const imageIndex = galleryData.images.findIndex(img => img.id === imageId);
    if (imageIndex === -1) {
      return NextResponse.json(
        { error: 'ไม่พบภาพที่ต้องการแก้ไข' },
        { status: 404 }
      );
    }

    const image = galleryData.images[imageIndex];
    
    // ตรวจสอบว่าเป็นเจ้าของภาพหรือไม่
    const currentUserId = currentUser.originalId || currentUser.id;
    if (image.uploadedBy && image.uploadedBy.userId !== currentUserId) {
      return NextResponse.json(
        { error: 'คุณไม่มีสิทธิ์แก้ไขภาพนี้' },
        { status: 403 }
      );
    }

    // อัปเดตข้อมูล
    galleryData.images[imageIndex] = {
      ...image,
      title: title,
      alt: title,
      description: description,
      updatedAt: new Date().toISOString()
    };

    // บันทึกไฟล์
    await fs.writeFile(galleryDataPath, JSON.stringify(galleryData, null, 2));

    return NextResponse.json({
      success: true,
      message: 'แก้ไขภาพสำเร็จ',
      image: galleryData.images[imageIndex]
    });

  } catch (error) {
    console.error('Gallery update error:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการแก้ไขภาพ' },
      { status: 500 }
    );
  }
}

// ลบภาพ
export async function DELETE(request) {
  try {
    // ตรวจสอบ authentication
    const { cookies } = await import('next/headers');
    const cookieStore = cookies();
    const token = cookieStore.get('token');
    
    if (!token) {
      return NextResponse.json(
        { error: 'กรุณาเข้าสู่ระบบก่อน' },
        { status: 401 }
      );
    }

    let currentUser;
    try {
      const jwt = await import('jsonwebtoken');
      const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
      
      const decoded = jwt.verify(token.value, JWT_SECRET);
      if (!decoded || !decoded.userId) {
        return NextResponse.json(
          { error: 'เซสชันหมดอายุ' },
          { status: 401 }
        );
      }
      
      const { findUserById } = await import('@/lib/dbFallback');
      currentUser = await findUserById(decoded.userId);
      if (!currentUser) {
        return NextResponse.json(
          { error: 'ไม่พบข้อมูลผู้ใช้' },
          { status: 401 }
        );
      }
    } catch (authError) {
      return NextResponse.json(
        { error: 'เซสชันหมดอายุ' },
        { status: 401 }
      );
    }

    const { imageId } = await request.json();

    if (!imageId) {
      return NextResponse.json(
        { error: 'ไม่พบรหัสภาพ' },
        { status: 400 }
      );
    }

    // อ่านข้อมูลภาพปัจจุบัน
    const fs = await import('fs/promises');
    const galleryDataPath = path.join(process.cwd(), 'data', 'gallery.json');
    
    let galleryData = { images: [] };
    try {
      const data = await fs.readFile(galleryDataPath, 'utf8');
      galleryData = JSON.parse(data);
    } catch (fileError) {
      return NextResponse.json(
        { error: 'ไม่พบข้อมูลภาพ' },
        { status: 404 }
      );
    }

    // หาภาพที่ต้องการลบ
    const imageIndex = galleryData.images.findIndex(img => img.id === imageId);
    if (imageIndex === -1) {
      return NextResponse.json(
        { error: 'ไม่พบภาพที่ต้องการลบ' },
        { status: 404 }
      );
    }

    const image = galleryData.images[imageIndex];
    
    // ตรวจสอบว่าเป็นเจ้าของภาพหรือไม่
    const currentUserId = currentUser.originalId || currentUser.id;
    if (image.uploadedBy && image.uploadedBy.userId !== currentUserId) {
      return NextResponse.json(
        { error: 'คุณไม่มีสิทธิ์ลบภาพนี้' },
        { status: 403 }
      );
    }

    // ลบไฟล์ภาพจากระบบ
    if (image.src && image.src.startsWith('/uploads/gallery/')) {
      try {
        const { unlink } = await import('fs/promises');
        const imagePath = path.join(process.cwd(), 'public', image.src);
        await unlink(imagePath);
      } catch (fileError) {
        console.error('Error deleting image file:', fileError);
        // ไม่ return error เพราะอาจเป็นไฟล์ที่ไม่มีอยู่แล้ว
      }
    }

    // ลบข้อมูลจาก array
    galleryData.images.splice(imageIndex, 1);

    // บันทึกไฟล์
    await fs.writeFile(galleryDataPath, JSON.stringify(galleryData, null, 2));

    return NextResponse.json({
      success: true,
      message: 'ลบภาพสำเร็จ'
    });

  } catch (error) {
    console.error('Gallery delete error:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการลบภาพ' },
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
