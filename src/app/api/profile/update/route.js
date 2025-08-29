import { NextResponse } from 'next/server';
import { findUserById, updateUser, validatePassword } from '@/lib/dbFallback';
import { writeFile, mkdir } from 'fs/promises';
import { cookies } from 'next/headers';
import path from 'path';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const formData = await request.formData();
    
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const department = formData.get('department');
    const messageToRunners = formData.get('messageToRunners') || '';
    const runningExperience = formData.get('runningExperience') || '[]';
    const currentPassword = formData.get('currentPassword');
    const newPassword = formData.get('newPassword');
    const profileImage = formData.get('profileImage');
    
    // Parse running experience
    let parsedRunningExperience = [];
    try {
      parsedRunningExperience = JSON.parse(runningExperience);
    } catch (error) {
      console.error('Error parsing running experience:', error);
      parsedRunningExperience = [];
    }
    
    // Get user ID from JWT token
    const cookieStore = cookies();
    const token = cookieStore.get('token');
    
    if (!token) {
      return NextResponse.json(
        { error: 'ไม่พบ token การเข้าสู่ระบบ' },
        { status: 401 }
      );
    }
    
    let userId;
    try {
      const jwt = await import('jsonwebtoken');
      const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
      const decoded = jwt.verify(token.value, JWT_SECRET);
      
      if (!decoded || !decoded.userId) {
        return NextResponse.json(
          { error: 'Token ไม่ถูกต้อง' },
          { status: 401 }
        );
      }
      
      userId = decoded.userId;
    } catch (jwtError) {
      console.error('JWT verification error:', jwtError);
      return NextResponse.json(
        { error: 'Token หมดอายุหรือไม่ถูกต้อง' },
        { status: 401 }
      );
    }
    const user = findUserById(userId);
    
    if (!user) {
      return NextResponse.json(
        { error: 'ไม่พบข้อมูลผู้ใช้' },
        { status: 404 }
      );
    }
    
    // Validate required fields
    if (!firstName || !lastName || !department) {
      return NextResponse.json(
        { error: 'กรุณากรอกข้อมูลให้ครบถ้วน' },
        { status: 400 }
      );
    }
    
    // Verify current password if provided
    if (currentPassword) {
      const isCurrentPasswordValid = await validatePassword(currentPassword, user.password);
      if (!isCurrentPasswordValid) {
        return NextResponse.json(
          { error: 'รหัสผ่านปัจจุบันไม่ถูกต้อง' },
          { status: 400 }
        );
      }
    }
    
    let profileImagePath = user.profileImage; // Keep existing image by default
    
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
        const fileName = `${user.loginName}_${Date.now()}${fileExtension}`;
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
    
    // Prepare update data
    const updateData = {
      firstName,
      lastName,
      loginName: user.loginName, // Keep existing loginName
      department,
      messageToRunners,
      runningExperience: parsedRunningExperience,
      profileImage: profileImagePath
    };
    
    // Hash new password if provided
    if (newPassword) {
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      updateData.password = hashedPassword;
    }
    
    // Update user
    const updatedUser = updateUser(userId, updateData);
    
    if (!updatedUser) {
      return NextResponse.json(
        { error: 'เกิดข้อผิดพลาดในการอัปเดตข้อมูล' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { 
        message: 'อัปเดตข้อมูลสำเร็จ!',
        user: updatedUser
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Profile update error:', error);
    
    return NextResponse.json(
      { error: error.message || 'เกิดข้อผิดพลาดในการอัปเดตข้อมูล' },
      { status: 500 }
    );
  }
}
