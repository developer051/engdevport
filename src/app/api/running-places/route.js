import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

// GET - ดึงข้อมูลสถานที่วิ่งทั้งหมด
export async function GET() {
  try {
    const placesPath = path.join(process.cwd(), "data", "running-places.json");
    let runningPlaces = [];

    if (existsSync(placesPath)) {
      try {
        const fs = await import("fs/promises");
        const data = await fs.readFile(placesPath, "utf8");
        runningPlaces = JSON.parse(data);
      } catch (error) {
        console.log("ไม่พบข้อมูลสถานที่วิ่ง");
      }
    }

    // ถ้าไม่มีข้อมูล ให้สร้างข้อมูลเริ่มต้น
    if (runningPlaces.length === 0) {
      runningPlaces = [
        {
          id: "1",
          name: "สวนรถไฟ",
          description:
            "สวนสาธารณะขนาดใหญ่ใจกลางกรุงเทพฯ เหมาะสำหรับการวิ่งและออกกำลังกาย มีลู่วิ่งที่สวยงามและบรรยากาศร่มรื่น",
          location: "เขตจตุจักร กรุงเทพฯ",
          bestTime: "06:00-08:00, 17:00-19:00",
          features: [
            "มีลู่วิ่ง",
            "มีที่จอดรถ",
            "มีน้ำดื่ม",
            "มีห้องน้ำ",
            "ปลอดภัย",
          ],
          imagePath: "/supachai.jpg",
          submittedBy: "ระบบ",
          createdAt: new Date().toISOString(),
        },
        {
          id: "2",
          name: "สวนจตุจักร",
          description:
            "สวนสาธารณะที่ได้รับความนิยมจากนักวิ่ง มีเส้นทางวิ่งที่หลากหลายและบรรยากาศธรรมชาติที่สวยงาม",
          location: "เขตจตุจักร กรุงเทพฯ",
          bestTime: "06:00-08:00, 17:00-19:00",
          features: [
            "มีลู่วิ่ง",
            "มีที่จอดรถ",
            "มีน้ำดื่ม",
            "มีห้องน้ำ",
            "ปลอดภัย",
            "มีร้านอาหาร",
          ],
          imagePath: "/supachai.jpg",
          submittedBy: "ระบบ",
          createdAt: new Date().toISOString(),
        },
      ];

      // บันทึกข้อมูลเริ่มต้น
      await writeFile(placesPath, JSON.stringify(runningPlaces, null, 2));
    }

    return NextResponse.json(runningPlaces);
  } catch (error) {
    console.error("Running places GET error:", error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการดึงข้อมูลสถานที่วิ่ง" },
      { status: 500 }
    );
  }
}

// POST - เพิ่มสถานที่วิ่งใหม่
export async function POST(request) {
  try {
    const formData = await request.formData();

    const name = formData.get("name");
    const description = formData.get("description");
    const location = formData.get("location");
    const bestTime = formData.get("bestTime");
    const features = JSON.parse(formData.get("features") || "[]");
    const submittedBy = formData.get("submittedBy");
    const image = formData.get("image");

    // ตรวจสอบข้อมูลที่จำเป็น
    if (!name || !description) {
      return NextResponse.json(
        { error: "กรุณากรอกชื่อสถานที่และคำอธิบาย" },
        { status: 400 }
      );
    }

    // จัดการไฟล์รูปภาพ
    let imagePath = "/supachai.jpg"; // รูปเริ่มต้น
    if (image && image.size > 0) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // สร้างชื่อไฟล์ที่ไม่ซ้ำ
      const timestamp = Date.now();
      const fileName = `${name.replace(/\s+/g, "_")}_${timestamp}.${image.name
        .split(".")
        .pop()}`;

      // สร้างโฟลเดอร์ถ้ายังไม่มี
      const uploadDir = path.join(
        process.cwd(),
        "public",
        "uploads",
        "running-places"
      );
      if (!existsSync(uploadDir)) {
        await mkdir(uploadDir, { recursive: true });
      }

      // บันทึกไฟล์
      const filePath = path.join(uploadDir, fileName);
      await writeFile(filePath, buffer);
      imagePath = `/uploads/running-places/${fileName}`;
    }

    // สร้างข้อมูลสถานที่วิ่งใหม่
    const newPlace = {
      id: Date.now().toString(),
      name,
      description,
      location: location || "",
      bestTime: bestTime || "",
      features,
      imagePath,
      submittedBy: submittedBy || "ไม่ระบุ",
      createdAt: new Date().toISOString(),
    };

    // อ่านข้อมูลเดิม
    const placesPath = path.join(process.cwd(), "data", "running-places.json");
    let runningPlaces = [];

    if (existsSync(placesPath)) {
      try {
        const fs = await import("fs/promises");
        const data = await fs.readFile(placesPath, "utf8");
        runningPlaces = JSON.parse(data);
      } catch (error) {
        console.log("สร้างไฟล์ running-places.json ใหม่");
      }
    }

    // เพิ่มข้อมูลใหม่
    runningPlaces.push(newPlace);

    // บันทึกข้อมูล
    await writeFile(placesPath, JSON.stringify(runningPlaces, null, 2));

    return NextResponse.json({
      message: "เพิ่มสถานที่วิ่งสำเร็จ",
      place: newPlace,
    });
  } catch (error) {
    console.error("Running places POST error:", error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการบันทึกข้อมูล" },
      { status: 500 }
    );
  }
}
