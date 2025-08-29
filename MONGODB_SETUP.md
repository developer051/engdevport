# การติดตั้งและตั้งค่า MongoDB

## วิธีที่ 1: ใช้ Docker (แนะนำ)

### 1. เปิด Docker Desktop
- ตรวจสอบว่า Docker Desktop เปิดอยู่
- ถ้ายังไม่มี ดาวน์โหลดและติดตั้งจาก: https://www.docker.com/products/docker-desktop

### 2. รัน MongoDB Container
```bash
docker run -d -p 27017:27017 --name engdev-mongodb mongo:latest
```

### 3. ตรวจสอบว่า container ทำงาน
```bash
docker ps
```

### 4. หยุดและลบ container (เมื่อต้องการ)
```bash
docker stop engdev-mongodb
docker rm engdev-mongodb
```

## วิธีที่ 2: ติดตั้ง MongoDB Community Server

### 1. ดาวน์โหลดและติดตั้ง
- ไปที่: https://www.mongodb.com/try/download/community
- เลือก version สำหรับ Windows
- ติดตั้งตามขั้นตอน

### 2. เริ่ม MongoDB Service
- เปิด Services (services.msc)
- หา "MongoDB" และ start service

## การ Migration ข้อมูล

### 1. ตรวจสอบไฟล์ .env.local
```env
MONGODB_URI=mongodb://localhost:27017/engdev-port
JWT_SECRET=engdev-super-secure-secret-key-2025-production-ready
NODE_ENV=development
```

### 2. รัน Migration
```bash
npm run migrate
```

### 3. ตรวจสอบผลลัพธ์
- ดูไฟล์ `migration-log.json` สำหรับรายละเอียด
- ตรวจสอบ console output

## การทดสอบระบบ

### 1. รัน Development Server
```bash
npm run dev
```

### 2. ทดสอบการ Login
- ไปที่ http://localhost:3001/login
- ลองเข้าสู่ระบบด้วย user ที่มีอยู่

### 3. ตรวจสอบข้อมูลใน MongoDB
```bash
# ใช้ Docker
docker exec -it engdev-mongodb mongosh

# หรือใช้ mongosh command (ถ้าติดตั้งแยก)
mongosh

# คำสั่งใน mongosh
use engdev-port
db.users.find().pretty()
```

## Troubleshooting

### ปัญหาการเชื่อมต่อ MongoDB
1. ตรวจสอบว่า MongoDB service ทำงาน
2. ตรวจสอบ port 27017 ไม่ถูกใช้งานโดยโปรแกรมอื่น
3. ตรวจสอบ MONGODB_URI ใน .env.local

### ปัญหา Migration
1. ตรวจสอบไฟล์ data/users.json มีอยู่
2. ตรวจสอบ permission ในการเขียนไฟล์
3. ดู error details ใน migration-log.json

### ปัญหา Authentication
1. ตรวจสอบ JWT_SECRET ใน .env.local
2. ลบ cookies ในเบราว์เซอร์
3. ตรวจสอบ console errors
