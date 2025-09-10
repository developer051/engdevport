"use client";
import React from "react";
import { motion } from "framer-motion";
import NavBar2 from "../../components/NavBar2";
import Footer from "../../components/Footer";
import Link from "next/link";
import { useParams } from "next/navigation";

const KnowledgeDetailPage = () => {
  const params = useParams();
  const { slug } = params;

  // ข้อมูลเนื้อหาสำหรับแต่ละ slug
  const knowledgeContent = {
    "running-techniques": {
      title: "เทคนิคการวิ่งที่ถูกต้อง",
      category: "เทคนิคการวิ่ง",
      readTime: "5 นาที",
      image: "/uploads/running-results/1756893434493cfr8w4mz4_1756893896006.jpg",
      content: `
        <h2>การวิ่งที่ถูกต้องคืออะไร?</h2>
        <p>การวิ่งที่ถูกต้องไม่เพียงแต่ช่วยให้คุณวิ่งได้เร็วขึ้น แต่ยังช่วยป้องกันการบาดเจ็บและทำให้การวิ่งเป็นเรื่องสนุกมากขึ้น</p>
        
        <h3>1. ท่าทางการวิ่ง</h3>
        <ul>
          <li>ยืนตัวตรง แต่อย่าเกร็ง</li>
          <li>มองไปข้างหน้า ไม่มองลงพื้น</li>
          <li>ไหล่ผ่อนคลาย ไม่ยกสูง</li>
          <li>แขนงอประมาณ 90 องศา</li>
        </ul>
        
        <h3>2. การลงเท้า</h3>
        <p>การลงเท้าที่ถูกต้องควรลงด้วยกลางเท้า (midfoot) ไม่ใช่ส้นเท้าหรือปลายเท้า ซึ่งจะช่วยลดแรงกระแทกและป้องกันการบาดเจ็บ</p>
        
        <h3>3. การหายใจ</h3>
        <p>หายใจเข้าทางจมูกและออกทางปากอย่างสม่ำเสมอ อย่าหายใจเร็วเกินไป และควรหายใจให้ลึก</p>
        
        <h3>4. ความถี่ในการก้าว</h3>
        <p>ควรก้าวประมาณ 180 ก้าวต่อนาที ซึ่งจะช่วยให้การวิ่งมีประสิทธิภาพมากขึ้น</p>
        
        <h3>5. การวอร์มอัพและคูลดาวน์</h3>
        <p>ควรวอร์มอัพก่อนวิ่ง 5-10 นาที และคูลดาวน์หลังวิ่งเสร็จ เพื่อเตรียมร่างกายและฟื้นฟูสภาพ</p>
      `
    },
    "pre-run-preparation": {
      title: "การเตรียมตัวก่อนวิ่ง",
      category: "การเตรียมตัว",
      readTime: "3 นาที",
      image: "/uploads/running-results/17568935940816dwwifz55_1756894296958.png",
      content: `
        <h2>การเตรียมตัวก่อนวิ่ง</h2>
        <p>การเตรียมตัวที่ดีจะช่วยให้การวิ่งของคุณปลอดภัยและมีประสิทธิภาพมากขึ้น</p>
        
        <h3>1. การตรวจสอบสภาพอากาศ</h3>
        <p>ตรวจสอบสภาพอากาศก่อนออกไปวิ่ง เพื่อเตรียมเสื้อผ้าและอุปกรณ์ที่เหมาะสม</p>
        
        <h3>2. การเลือกเส้นทาง</h3>
        <ul>
          <li>เลือกเส้นทางที่ปลอดภัย</li>
          <li>หลีกเลี่ยงถนนที่มีการจราจรหนาแน่น</li>
          <li>มีทางหนีในกรณีฉุกเฉิน</li>
        </ul>
        
        <h3>3. การเตรียมอุปกรณ์</h3>
        <ul>
          <li>รองเท้าวิ่งที่เหมาะสม</li>
          <li>เสื้อผ้าที่ระบายอากาศได้ดี</li>
          <li>น้ำดื่ม</li>
          <li>โทรศัพท์มือถือ</li>
        </ul>
        
        <h3>4. การวอร์มอัพ</h3>
        <p>วอร์มอัพด้วยการเดินเร็วหรือวิ่งช้าๆ ประมาณ 5-10 นาที เพื่อเตรียมร่างกายให้พร้อม</p>
        
        <h3>5. การดื่มน้ำ</h3>
        <p>ดื่มน้ำก่อนวิ่ง 30 นาที เพื่อให้ร่างกายมีน้ำเพียงพอ แต่ไม่ควรดื่มมากเกินไป</p>
      `
    },
    "runner-nutrition": {
      title: "โภชนาการสำหรับนักวิ่ง",
      category: "โภชนาการ",
      readTime: "7 นาที",
      image: "/uploads/running-results/17568937927388uond8zyh_1757044350884.jpg",
      content: `
        <h2>โภชนาการที่สำคัญสำหรับนักวิ่ง</h2>
        <p>การรับประทานอาหารที่เหมาะสมจะช่วยเพิ่มพลังงานและฟื้นฟูร่างกายหลังการวิ่ง</p>
        
        <h3>1. คาร์โบไฮเดรต</h3>
        <p>เป็นแหล่งพลังงานหลักสำหรับการวิ่ง ควรรับประทานข้าว แป้ง ผลไม้ และผัก</p>
        
        <h3>2. โปรตีน</h3>
        <p>ช่วยในการซ่อมแซมและสร้างกล้ามเนื้อ ควรรับประทานเนื้อสัตว์ ไข่ ถั่ว และนม</p>
        
        <h3>3. ไขมันดี</h3>
        <p>ให้พลังงานและช่วยในการดูดซึมวิตามิน ควรรับประทานอะโวคาโด ถั่ว และน้ำมันมะกอก</p>
        
        <h3>4. การดื่มน้ำ</h3>
        <ul>
          <li>ดื่มน้ำก่อนวิ่ง 30 นาที</li>
          <li>ดื่มน้ำระหว่างวิ่งทุก 15-20 นาที</li>
          <li>ดื่มน้ำหลังวิ่งเพื่อชดเชยการสูญเสียน้ำ</li>
        </ul>
        
        <h3>5. อาหารหลังวิ่ง</h3>
        <p>ควรรับประทานอาหารที่มีคาร์โบไฮเดรตและโปรตีนภายใน 30 นาทีหลังวิ่ง เพื่อฟื้นฟูร่างกาย</p>
        
        <h3>6. อาหารเสริม</h3>
        <p>อาจพิจารณาใช้วิตามินและแร่ธาตุเสริม แต่ควรปรึกษาแพทย์ก่อน</p>
      `
    },
    "injury-prevention": {
      title: "การป้องกันการบาดเจ็บ",
      category: "การป้องกัน",
      readTime: "6 นาที",
      image: "/uploads/running-results/17568941842885v0fkasir_1756894390632.jpeg",
      content: `
        <h2>การป้องกันการบาดเจ็บจากการวิ่ง</h2>
        <p>การบาดเจ็บจากการวิ่งสามารถป้องกันได้ด้วยการเตรียมตัวและการฝึกซ้อมที่ถูกต้อง</p>
        
        <h3>1. การวอร์มอัพและคูลดาวน์</h3>
        <p>วอร์มอัพก่อนวิ่งและคูลดาวน์หลังวิ่งเสร็จ เพื่อเตรียมและฟื้นฟูร่างกาย</p>
        
        <h3>2. การเพิ่มระยะทางอย่างค่อยเป็นค่อยไป</h3>
        <p>ไม่ควรเพิ่มระยะทางวิ่งมากเกิน 10% ต่อสัปดาห์ เพื่อให้ร่างกายปรับตัวได้</p>
        
        <h3>3. การเลือกรองเท้าที่เหมาะสม</h3>
        <p>รองเท้าวิ่งควรเหมาะสมกับเท้าและสไตล์การวิ่ง ควรเปลี่ยนรองเท้าทุก 500-800 กิโลเมตร</p>
        
        <h3>4. การฝึกความแข็งแรง</h3>
        <p>ฝึกความแข็งแรงของกล้ามเนื้อขาและแกนกลางลำตัว เพื่อรองรับการวิ่ง</p>
        
        <h3>5. การฟังร่างกาย</h3>
        <p>หยุดพักเมื่อรู้สึกเจ็บหรือเมื่อยล้า อย่าฝืนวิ่งต่อเมื่อมีอาการบาดเจ็บ</p>
        
        <h3>6. การยืดกล้ามเนื้อ</h3>
        <p>ยืดกล้ามเนื้อหลังวิ่งเสร็จ เพื่อลดความตึงเครียดและป้องกันการบาดเจ็บ</p>
        
        <h3>7. การพักผ่อน</h3>
        <p>ให้ร่างกายพักผ่อนเพียงพอ อย่างน้อย 7-8 ชั่วโมงต่อคืน</p>
      `
    },
    "interval-training": {
      title: "การฝึกซ้อมแบบ Interval",
      category: "การฝึกซ้อม",
      readTime: "8 นาที",
      image: "/uploads/running-results/1756957251535v5brzpwew_1756973335184.jpg",
      content: `
        <h2>Interval Training สำหรับนักวิ่ง</h2>
        <p>การฝึกซ้อมแบบ Interval จะช่วยเพิ่มความเร็วและความอดทนได้อย่างมีประสิทธิภาพ</p>
        
        <h3>1. Interval Training คืออะไร?</h3>
        <p>เป็นการฝึกซ้อมที่สลับระหว่างการวิ่งเร็วและช้า เพื่อให้ร่างกายปรับตัวและพัฒนาความสามารถ</p>
        
        <h3>2. ประเภทของ Interval Training</h3>
        <ul>
          <li><strong>Short Intervals:</strong> วิ่งเร็ว 30 วินาที - 2 นาที</li>
          <li><strong>Medium Intervals:</strong> วิ่งเร็ว 3-5 นาที</li>
          <li><strong>Long Intervals:</strong> วิ่งเร็ว 6-10 นาที</li>
        </ul>
        
        <h3>3. วิธีการฝึก Interval</h3>
        <ol>
          <li>วอร์มอัพ 10-15 นาที</li>
          <li>วิ่งเร็วตามระยะเวลาที่กำหนด</li>
          <li>พักด้วยการวิ่งช้าหรือเดิน</li>
          <li>ทำซ้ำตามจำนวนรอบที่กำหนด</li>
          <li>คูลดาวน์ 10-15 นาที</li>
        </ol>
        
        <h3>4. ความถี่ในการฝึก</h3>
        <p>ควรฝึก Interval 1-2 ครั้งต่อสัปดาห์ ไม่ควรฝึกติดต่อกันหลายวัน</p>
        
        <h3>5. ข้อควรระวัง</h3>
        <ul>
          <li>ไม่ควรฝึก Interval เมื่อรู้สึกเมื่อยล้า</li>
          <li>ควรเริ่มจากระยะเวลาสั้นๆ ก่อน</li>
          <li>ฟังร่างกายและปรับความเข้มข้นตามความเหมาะสม</li>
        </ul>
        
        <h3>6. ประโยชน์ของ Interval Training</h3>
        <ul>
          <li>เพิ่มความเร็วในการวิ่ง</li>
          <li>พัฒนาระบบหัวใจและหลอดเลือด</li>
          <li>เผาผลาญแคลอรี่ได้มากขึ้น</li>
          <li>เพิ่มความอดทน</li>
        </ul>
      `
    },
    "running-shoes-guide": {
      title: "การเลือกรองเท้าวิ่ง",
      category: "อุปกรณ์",
      readTime: "4 นาที",
      image: "/uploads/running-results/17569709255800qh574k9t_1756988061983.jpg",
      content: `
        <h2>คู่มือการเลือกรองเท้าวิ่ง</h2>
        <p>รองเท้าวิ่งที่เหมาะสมจะช่วยให้การวิ่งของคุณสะดวกสบายและปลอดภัยมากขึ้น</p>
        
        <h3>1. ประเภทของเท้า</h3>
        <ul>
          <li><strong>เท้าแบน (Flat Feet):</strong> ต้องการรองเท้าที่มี arch support</li>
          <li><strong>เท้าปกติ (Normal Arch):</strong> สามารถใช้รองเท้าทั่วไปได้</li>
          <li><strong>เท้าโค้งสูง (High Arch):</strong> ต้องการรองเท้าที่มี cushioning ดี</li>
        </ul>
        
        <h3>2. ประเภทของการวิ่ง</h3>
        <ul>
          <li><strong>Road Running:</strong> รองเท้าสำหรับวิ่งบนถนน</li>
          <li><strong>Trail Running:</strong> รองเท้าสำหรับวิ่งบนเส้นทางธรรมชาติ</li>
          <li><strong>Track Running:</strong> รองเท้าสำหรับวิ่งบนลู่</li>
        </ul>
        
        <h3>3. การวัดขนาดเท้า</h3>
        <p>ควรวัดเท้าในตอนเย็นเมื่อเท้าขยายตัวเต็มที่ และควรมีพื้นที่ว่างประมาณ 1 ซม. ที่ปลายเท้า</p>
        
        <h3>4. วัสดุและเทคโนโลยี</h3>
        <ul>
          <li><strong>Upper:</strong> ควรระบายอากาศได้ดี</li>
          <li><strong>Midsole:</strong> ควรมี cushioning ที่เหมาะสม</li>
          <li><strong>Outsole:</strong> ควรมี traction ที่ดี</li>
        </ul>
        
        <h3>5. การทดลองรองเท้า</h3>
        <ul>
          <li>ลองใส่รองเท้าทั้งสองข้าง</li>
          <li>เดินและวิ่งในร้าน</li>
          <li>ตรวจสอบความสบายและความพอดี</li>
        </ul>
        
        <h3>6. การดูแลรักษา</h3>
        <p>ควรเปลี่ยนรองเท้าวิ่งทุก 500-800 กิโลเมตร หรือเมื่อรู้สึกว่าไม่สบายเท้า</p>
        
        <h3>7. ราคาและคุณภาพ</h3>
        <p>ไม่จำเป็นต้องซื้อรองเท้าราคาแพงเสมอไป แต่ควรเลือกที่มีคุณภาพและเหมาะสมกับความต้องการ</p>
      `
    }
  };

  const currentContent = knowledgeContent[slug];

  if (!currentContent) {
    return (
      <main className="min-h-screen bg-white text-gray-800">
        <NavBar2 />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">ไม่พบเนื้อหา</h1>
          <p className="text-gray-600 mb-8">บทความที่คุณกำลังมองหาไม่มีอยู่</p>
          <Link
            href="/knowledge"
            className="inline-flex items-center px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            กลับไปยังหน้า Knowledge
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-gray-800">
      <NavBar2 />

      {/* Article Header */}
      <section className="relative py-12 sm:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-white"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-4">
              <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                {currentContent.category}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              {currentContent.title}
            </h1>
            <div className="flex items-center justify-center text-gray-600">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{currentContent.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Image */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl overflow-hidden shadow-lg"
          >
            <img
              src={currentContent.image}
              alt={currentContent.title}
              className="w-full h-64 sm:h-80 object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: currentContent.content }}
          />
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            บทความที่เกี่ยวข้อง
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(knowledgeContent)
              .filter(([key]) => key !== slug)
              .slice(0, 2)
              .map(([key, content]) => (
                <Link
                  key={key}
                  href={`/knowledge/${key}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <img
                    src={content.image}
                    alt={content.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">
                      {content.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {content.readTime}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Back to Knowledge */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/knowledge"
            className="inline-flex items-center px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            กลับไปยังหน้า Knowledge
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default KnowledgeDetailPage;
