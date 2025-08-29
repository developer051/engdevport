import { NextResponse } from 'next/server';
import { createUser } from '@/lib/dbFallback';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const loginName = formData.get('loginName');
    const department = formData.get('department');
    const password = formData.get('password');
    const messageToRunners = formData.get('messageToRunners') || '';
    const runningExperience = formData.get('runningExperience') || '[]';
    const profileImage = formData.get('profileImage');
    
    // Parse running experience
    let parsedRunningExperience = [];
    try {
      parsedRunningExperience = JSON.parse(runningExperience);
    } catch (error) {
      console.error('Error parsing running experience:', error);
      parsedRunningExperience = [];
    }
    
    // Validate required fields
    if (!firstName || !lastName || !loginName || !department || !password) {
      return NextResponse.json(
        { error: 'กรุณากรอกข้อมูลให้ครบถ้วน' },
        { status: 400 }
      );
    }
    
    let profileImagePath = null;
    
    // Handle profile image upload
    if (profileImage && profileImage.size > 0) {
      try {
        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(profileImage.type)) {
          return NextResponse.json(
            { error: 'รองรับเฉพาะไฟล์รูปภาพ (JPG, PNG, GIF) เท่านั้น' },
            { status: 400 }
          );
        }
        
        // Validate file size (5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (profileImage.size > maxSize) {
          return NextResponse.json(
            { error: 'ขนาดไฟล์ต้องไม่เกิน 5MB' },
            { status: 400 }
          );
        }
        
        // Create uploads directory if it doesn't exist
        const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'profiles');
        await mkdir(uploadsDir, { recursive: true });
        
        // Generate unique filename
        const fileExtension = path.extname(profileImage.name);
        const fileName = `${loginName}_${Date.now()}${fileExtension}`;
        const filePath = path.join(uploadsDir, fileName);
        
        // Convert file to buffer and save
        const bytes = await profileImage.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await writeFile(filePath, buffer);
        
        profileImagePath = `/uploads/profiles/${fileName}`;
        
      } catch (uploadError) {
        console.error('Profile image upload error:', uploadError);
        return NextResponse.json(
          { error: 'เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ' },
          { status: 500 }
        );
      }
    }
    
    // Create new user
    const user = await createUser({
      firstName,
      lastName,
      loginName,
      department,
      password,
      profileImage: profileImagePath,
      messageToRunners,
      runningExperience: parsedRunningExperience
    });
    
    return NextResponse.json(
      { 
        message: 'สมัครสมาชิกสำเร็จ!',
        user: user
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Registration error:', error);
    
    return NextResponse.json(
      { error: error.message || 'เกิดข้อผิดพลาดในการสมัครสมาชิก' },
      { status: 400 }
    );
  }
}
