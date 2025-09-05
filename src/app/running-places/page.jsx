"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import NavBar2 from "../components/NavBar2";
import Footer from "../components/Footer";
import StickyScrollReveal from "../components/StickyScrollReveal";

const RunningPlacesPage = () => {
  const [runningPlaces, setRunningPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchRunningPlaces();
    checkCurrentUser();
  }, []);

  const checkCurrentUser = () => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setCurrentUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
      }
    }
  };

  const fetchRunningPlaces = async () => {
    try {
      const response = await fetch("/api/running-places");
      const data = await response.json();

      if (response.ok) {
        setRunningPlaces(data);
      } else {
        setError(data.error || "เกิดข้อผิดพลาดในการโหลดข้อมูล");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError("เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
    } finally {
      setLoading(false);
    }
  };

  const content = runningPlaces.map((place, index) => ({
    title: place.name,
    description: place.description,
    content: (
      <div className="h-full w-full bg-gradient-to-br from-orange-50 to-white rounded-lg p-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2">
            <img
              src={place.imagePath || "/supachai.jpg"}
              alt={place.name}
              className="w-full h-64 lg:h-80 object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="lg:w-1/2 space-y-4">
            <h3 className="text-2xl font-bold text-gray-800">{place.name}</h3>
            <p className="text-gray-600 leading-relaxed">{place.description}</p>
            
            {place.features && place.features.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">จุดเด่น:</h4>
                <ul className="space-y-1">
                  {place.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <span className="text-orange-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {place.location && (
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">ที่ตั้ง:</h4>
                <p className="text-gray-600">{place.location}</p>
              </div>
            )}

            {place.bestTime && (
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">เวลาที่แนะนำ:</h4>
                <p className="text-gray-600">{place.bestTime}</p>
              </div>
            )}

            {place.submittedBy && (
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  แนะนำโดย: {place.submittedBy}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    ),
  }));

  return (
    <main className="min-h-screen bg-white text-gray-800">
      <NavBar2 />

      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-white"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              สถานที่<span className="text-orange-400">วิ่ง</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              ค้นพบสถานที่วิ่งที่ดีที่สุดในกรุงเทพฯ และพื้นที่ใกล้เคียง 
              พร้อมคำแนะนำจากเพื่อนนักวิ่ง
            </p>
            
            {currentUser && (
              <div className="mt-8">
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  🏃‍♂️ แนะนำสถานที่วิ่ง
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Running Places Content */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading && (
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-400"></div>
              <p className="mt-2 text-gray-600">กำลังโหลดข้อมูล...</p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg text-red-700 text-center">
              {error}
            </div>
          )}

          {!loading && !error && (
            <>
              {runningPlaces.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg mb-4">
                    ยังไม่มีข้อมูลสถานที่วิ่ง
                  </p>
                  {currentUser && (
                    <button
                      onClick={() => setShowAddForm(true)}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                      เป็นคนแรกที่แนะนำสถานที่วิ่ง
                    </button>
                  )}
                </div>
              ) : (
                <StickyScrollReveal content={content} />
              )}
            </>
          )}
        </div>
      </section>

      {/* Add Place Modal */}
      {showAddForm && (
        <AddRunningPlaceModal
          onClose={() => setShowAddForm(false)}
          onSuccess={() => {
            setShowAddForm(false);
            fetchRunningPlaces();
          }}
          currentUser={currentUser}
        />
      )}

      <Footer />
    </main>
  );
};

// Add Running Place Modal Component
const AddRunningPlaceModal = ({ onClose, onSuccess, currentUser }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    bestTime: "",
    features: [],
    image: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [newFeature, setNewFeature] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
    }
  };

  const addFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature("");
    }
  };

  const removeFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("bestTime", formData.bestTime);
      formDataToSend.append("features", JSON.stringify(formData.features));
      formDataToSend.append("submittedBy", `${currentUser.firstName} ${currentUser.lastName}`);
      
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      const response = await fetch("/api/running-places", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        onSuccess();
      } else {
        setError(data.error || "เกิดข้อผิดพลาดในการบันทึกข้อมูล");
      }
    } catch (error) {
      console.error("Submit error:", error);
      setError("เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">แนะนำสถานที่วิ่ง</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ชื่อสถานที่ *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="เช่น สวนรถไฟ, สวนจตุจักร"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                คำอธิบาย *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="อธิบายเกี่ยวกับสถานที่วิ่งนี้..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ที่ตั้ง
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="เช่น เขตจตุจักร กรุงเทพฯ"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                เวลาที่แนะนำ
              </label>
              <input
                type="text"
                name="bestTime"
                value={formData.bestTime}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="เช่น 06:00-08:00, 17:00-19:00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                จุดเด่น
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="เช่น มีลู่วิ่ง, มีที่จอดรถ"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                />
                <button
                  type="button"
                  onClick={addFeature}
                  className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                >
                  เพิ่ม
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.features.map((feature, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm"
                  >
                    {feature}
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="ml-2 text-orange-600 hover:text-orange-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                รูปภาพ
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 disabled:opacity-50"
              >
                {isSubmitting ? "กำลังบันทึก..." : "บันทึก"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RunningPlacesPage;
