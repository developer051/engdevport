export default function ParkCards() {
  // RBL Office coordinates
  const rblOffice = {
    lat: 13.807198328902146,
    lng: 100.55714773166198
  };

  // Function to calculate distance between two points using Haversine formula
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return distance;
  };

  const parks = [
    {
      name: "สวนจตุจักร",
      distance: "3 กม.",
      environment: "ร่มรื่น มีห้องน้ำหลายจุด",
      toilet: true,
      bestTime: "เช้า / เย็น",
      openHours: "04:30–21:00",
      coordinates: { lat: 13.8003022, lng: 100.5526265 }
    },
    {
      name: "สวนวชิรเบญจทัศ (สวนรถไฟ)",
      distance: "3.6 กม.",
      environment: "ทางวิ่งกว้าง มีจักรยานให้เช่า",
      toilet: true,
      bestTime: "เช้า / เย็น",
      openHours: "05:00–21:00",
      coordinates: { lat: 13.8003022, lng: 100.5526265 }
    },
    {
      name: "สวนสันติภาพ",
      distance: "720 เมตร",
      environment: "ใกล้ BTS อนุสาวรีย์ชัยฯ",
      toilet: true,
      bestTime: "เช้า / เย็น",
      openHours: "05:00–21:00",
      coordinates: { lat: 13.7649, lng: 100.5383 }
    },
    {
      name: "สวนลุมพินี",
      distance: "2.6 กม.",
      environment: "มีบึงน้ำใหญ่ วิ่งรอบบึงได้",
      toilet: true,
      bestTime: "เช้า / เย็น",
      openHours: "04:00–21:00",
      coordinates: { lat: 13.7253574, lng: 100.5469742 }
    },
    {
      name: "สวนเบญจสิริ",
      distance: "1.8 กม.",
      environment: "ใกล้ BTS พร้อมพงษ์",
      toilet: true,
      bestTime: "เช้า / เย็น",
      openHours: "05:00–21:00",
      coordinates: { lat: 13.7259376, lng: 100.5587785 }
    },
    {
      name: "สวนเบญจกิตติ",
      distance: "2 กม.",
      environment: "วิ่งริมทะเลสาบ สะอาดและปลอดภัย",
      toilet: true,
      bestTime: "เย็นชมพระอาทิตย์ตก",
      openHours: "05:00–21:00",
      coordinates: { lat: 13.7259376, lng: 100.5587785 }
    },
    {
      name: "สวนหลวง ร.9",
      distance: "5 กม.",
      environment: "ใหญ่มาก มีหลายโซนให้เลือก",
      toilet: true,
      bestTime: "เช้า / เย็น",
      openHours: "05:00–19:00",
      coordinates: { lat: 13.7259376, lng: 100.5587785 }
    },
    {
      name: "อุทยาน 100 ปี จุฬาฯ",
      distance: "900 เมตร",
      environment: "สวนแนวตั้ง มีทางวิ่งรอบอาคาร",
      toilet: true,
      bestTime: "เช้า / เย็น",
      openHours: "05:00–22:00",
      coordinates: { lat: 13.7259376, lng: 100.5587785 }
    },
    {
      name: "สวนรมณีนาถ",
      distance: "740 เมตร",
      environment: "ใกล้เมืองเก่า เงียบสงบ",
      toilet: true,
      bestTime: "เช้า / เย็น",
      openHours: "05:00–21:00",
      coordinates: { lat: 13.7488819, lng: 100.5026035 }
    },
    {
      name: "สวนสราญรมย์",
      distance: "500 เมตร",
      environment: "ใกล้พระบรมมหาราชวัง",
      toilet: true,
      bestTime: "เช้า / เย็น",
      openHours: "05:00–21:00",
      coordinates: { lat: 13.7482954, lng: 100.4952583 }
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      {parks.map((park, index) => (
        <div
          key={index}
          className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 transform"
        >
          <h2 className="text-xl font-bold text-orange-600 mb-2">{park.name}</h2>
          <p>
            <strong>ระยะทาง:</strong> {park.distance}
          </p>
          <p>
            <strong>สภาพแวดล้อม:</strong> {park.environment}
          </p>
          <p>
            <strong>ห้องน้ำ:</strong> {park.toilet ? "มี" : "ไม่มี"}
          </p>
          <p>
            <strong>ช่วงเวลาที่เหมาะ:</strong> {park.bestTime}
          </p>
          <p>
            <strong>เวลาเปิด:</strong> {park.openHours}
          </p>
          <p>
            <strong>ระยะห่างจาก Office เรา:</strong> {park.coordinates ? 
              `${calculateDistance(rblOffice.lat, rblOffice.lng, park.coordinates.lat, park.coordinates.lng).toFixed(2)} กม.` 
              : 'ไม่ระบุ'
            }
          </p>
        </div>
      ))}
    </div>
  );
}
