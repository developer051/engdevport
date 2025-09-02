const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/engdev-port';

// User Schema
const userSchema = new mongoose.Schema({
  originalId: {
    type: String,
    unique: true,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  loginName: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  department: {
    type: String,
    required: true,
    enum: [
      "Computer Science",
      "Data Science",
      "Artificial Intelligence",
      "Software Engineering",
      "Information Technology",
      "Cybersecurity",
      "Agency",
      "Telemarketing",
      "Marketing",
      "Sales",
      "Customer Service",
      "HR",
      "Finance",
      "Legal",
      "Risk Management",
      "Business Development",
      "Project Management",
      "Administration",
      "Other",
    ],
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    default: null,
  },
  messageToRunners: {
    type: String,
    default: "",
  },
  runningExperience: {
    type: [String],
    default: [],
  },
  score: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

const MIGRATION_LOG_FILE = path.join(process.cwd(), 'migration-log.json');

async function migrateUsersToMongo() {
  try {
    console.log('🔄 เริ่มการโอนย้ายข้อมูลจาก JSON ไป MongoDB...');
    
    // เชื่อมต่อ MongoDB
    try {
      await mongoose.connect(MONGODB_URI);
      console.log('✅ เชื่อมต่อ MongoDB สำเร็จ');
    } catch (dbError) {
      console.error('❌ ไม่สามารถเชื่อมต่อ MongoDB ได้:', dbError.message);
      console.log('📝 กรุณาตรวจสอบ:');
      console.log('   - MongoDB service ทำงานอยู่หรือไม่');
      console.log('   - MONGODB_URI ใน .env.local ถูกต้องหรือไม่');
      console.log('   - รัน: docker run -d -p 27017:27017 --name engdev-mongodb mongo:latest');
      process.exit(1);
    }
    
    // อ่านข้อมูลจาก JSON file
    const usersFilePath = path.join(process.cwd(), 'data', 'users.json');
    
    if (!fs.existsSync(usersFilePath)) {
      throw new Error('ไม่พบไฟล์ users.json ที่ data/users.json');
    }
    
    const usersData = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
    
    console.log(`📊 พบข้อมูลผู้ใช้ ${usersData.length} คน`);
    
    const migrationResults = {
      total: usersData.length,
      successful: 0,
      failed: 0,
      skipped: 0,
      errors: []
    };
    
    // โอนย้ายข้อมูลทีละคน
    for (const userData of usersData) {
      try {
        // ตรวจสอบว่ามีข้อมูลนี้ใน MongoDB แล้วหรือไม่
        const existingUser = await User.findOne({ originalId: userData.id });
        
        if (existingUser) {
          console.log(`⚠️  ผู้ใช้ ${userData.loginName} มีอยู่ใน MongoDB แล้ว ข้ามไป`);
          migrationResults.skipped++;
          continue;
        }
        
        // สร้าง user ใหม่ใน MongoDB
        const newUser = new User({
          originalId: userData.id,
          firstName: userData.firstName,
          lastName: userData.lastName,
          loginName: userData.loginName,
          department: userData.department,
          password: userData.password, // ใช้ password ที่ hash แล้ว
          profileImage: userData.profileImage || null,
          messageToRunners: userData.messageToRunners || '',
          runningExperience: userData.runningExperience || [],
          score: userData.score || 0,
          isActive: userData.isActive !== false, // default เป็น true
          createdAt: userData.createdAt ? new Date(userData.createdAt) : new Date(),
          updatedAt: userData.updatedAt ? new Date(userData.updatedAt) : new Date(),
        });
        
        await newUser.save();
        migrationResults.successful++;
        console.log(`✅ โอนย้าย ${userData.loginName} สำเร็จ`);
        
      } catch (error) {
        migrationResults.failed++;
        migrationResults.errors.push({
          user: userData.loginName || userData.id,
          error: error.message
        });
        console.error(`❌ โอนย้าย ${userData.loginName} ล้มเหลว:`, error.message);
      }
    }
    
    // บันทึกผลการ migration
    fs.writeFileSync(MIGRATION_LOG_FILE, JSON.stringify(migrationResults, null, 2));
    
    console.log('\n📋 สรุปผลการโอนย้ายข้อมูล:');
    console.log(`   รวม: ${migrationResults.total} คน`);
    console.log(`   สำเร็จ: ${migrationResults.successful} คน`);
    console.log(`   ข้าม: ${migrationResults.skipped} คน`);
    console.log(`   ล้มเหลว: ${migrationResults.failed} คน`);
    
    if (migrationResults.errors.length > 0) {
      console.log('\n❌ รายการข้อผิดพลาด:');
      migrationResults.errors.forEach(error => {
        console.log(`   - ${error.user}: ${error.error}`);
      });
    }
    
    console.log('\n✅ การโอนย้ายข้อมูลเสร็จสิ้น!');
    console.log(`📄 ดูรายละเอียดเพิ่มเติมได้ที่: ${MIGRATION_LOG_FILE}`);
    
    // ปิดการเชื่อมต่อ MongoDB
    await mongoose.disconnect();
    process.exit(0);
    
  } catch (error) {
    console.error('❌ เกิดข้อผิดพลาดในการโอนย้ายข้อมูล:', error);
    process.exit(1);
  }
}

// รัน migration
migrateUsersToMongo();
