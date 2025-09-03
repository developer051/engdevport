"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import NavBar2 from "../components/NavBar2";
import Footer from "../components/Footer";

const RegisterPage = () => {
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    loginName: "",
    department: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
    messageToRunners: "",
    runningExperience: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const departments = [
    "Computer Science",
    "Data Science", 
    "Artificial Intelligence",
    "Software Engineering",
    "Information Technology",
    "Cybersecurity",
    "Underwriting and Claims  ",
    "Administration",
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
    "Data Analytics",
    "Data Engineering",
    "Other"
  ];

  const runningExperiences = [
    { id: "100M", label: "100M" },
    { id: "100K", label: "100K" },
    { id: "42K", label: "42K" },
    { id: "21K", label: "21K" },
    { id: "10K", label: "10K" },
    { id: "5K", label: "5K" },
    { id: "beginner", label: "นักวิ่งหน้าใหม่" }
  ];

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/auth/check');
      const data = await response.json();
      
      if (response.ok && data.isLoggedIn) {
        // ถ้า login อยู่แล้ว redirect ไปหน้า profile
        router.push('/profile');
        return;
      }
    } catch (error) {
      console.error('Auth check error:', error);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (files && files[0]) {
      const file = files[0];
      
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        setError('รองรับเฉพาะไฟล์รูปภาพ (JPG, PNG, GIF) เท่านั้น');
        return;
      }
      
      // Validate file size (5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        setError('ขนาดไฟล์ต้องไม่เกิน 5MB');
        return;
      }
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleCheckboxChange = (experienceId) => {
    setFormData(prev => ({
      ...prev,
      runningExperience: prev.runningExperience.includes(experienceId)
        ? prev.runningExperience.filter(id => id !== experienceId)
        : [...prev.runningExperience, experienceId]
    }));
    // Clear error when user makes selection
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("รหัสผ่านไม่ตรงกัน");
      setIsSubmitting(false);
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError("รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร");
      setIsSubmitting(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('firstName', formData.firstName);
      formDataToSend.append('lastName', formData.lastName);
      formDataToSend.append('loginName', formData.loginName);
      formDataToSend.append('department', formData.department);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('messageToRunners', formData.messageToRunners);
      formDataToSend.append('runningExperience', JSON.stringify(formData.runningExperience));

      
      if (formData.profileImage) {
        formDataToSend.append('profileImage', formData.profileImage);
      }

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          loginName: "",
          department: "",
          password: "",
          confirmPassword: "",
          profileImage: null,
          messageToRunners: "",
          runningExperience: []
        });
        
        // Redirect to login after 2 seconds
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        setError(data.error || 'เกิดข้อผิดพลาดในการสมัครสมาชิก');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์');
    } finally {
      setIsSubmitting(false);
    }
  };



  if (isCheckingAuth) {
    return (
      <main className="min-h-screen bg-white text-gray-800">
        <NavBar2 />
        <div className="flex justify-center items-center min-h-screen">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-400"></div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-gray-800">
      <NavBar2 />
      
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-white"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              สมัคร<span className="text-orange-400">สมาชิก</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              เรามาวิ่งไปด้วยกันนะ
            </p>
          </div>
        </div>
      </section>

      {/* Register Form */}
      <section className="py-12 sm:py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg p-10 shadow-xl border border-gray-200">
            
            {/* Error/Success Messages */}
            {error && (
              <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg text-red-700">
                {error}
              </div>
            )}
            
            {success && (
              <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg text-green-700">
                {success}
                <div className="text-sm mt-2">กำลังเปลี่ยนเส้นทางไปหน้าเข้าสู่ระบบ...</div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-base font-medium text-gray-700 mb-3">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent text-gray-800 placeholder-gray-500 text-base"
                    placeholder="Name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-base font-medium text-gray-700 mb-3">
                    Surname *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent text-gray-800 placeholder-gray-500 text-base"
                    placeholder="Surname"
                  />
                </div>
              </div>

              {/* Login Name */}
              <div>
                <label htmlFor="loginName" className="block text-base font-medium text-gray-700 mb-3">
                  Username เพื่อใช้เข้าสู่ระบบ *
                </label>
                <input
                  type="text"
                  id="loginName"
                  name="loginName"
                  value={formData.loginName}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent text-gray-800 placeholder-gray-500 text-base"
                  placeholder="ชื่อผู้ใช้สำหรับเข้าสู่ระบบ (เฉพาะตัวอักษรและตัวเลข)"
                  pattern="[a-zA-Z0-9]+"
                  title="ใช้ได้เฉพาะตัวอักษรและตัวเลขเท่านั้น"
                />
              </div>

              {/* Department */}
              <div>
                <label htmlFor="department" className="block text-base font-medium text-gray-700 mb-3">
                  แผนก *
                </label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent text-gray-800 text-base"
                >
                  <option value="">เลือกแผนก</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-base font-medium text-gray-700 mb-3">
                  รหัสผ่าน *
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength="6"
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent text-gray-800 placeholder-gray-500 text-base"
                  placeholder="รหัสผ่านอย่างน้อย 6 ตัวอักษร"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-base font-medium text-gray-700 mb-3">
                  ยืนยันรหัสผ่าน *
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent text-gray-800 placeholder-gray-500 text-base"
                  placeholder="ยืนยันรหัสผ่าน"
                />
              </div>

              {/* Running Experience */}
              <div>
                <label className="block text-base font-medium text-gray-700 mb-4">
                  ประสบการณ์งานวิ่ง (เลือกได้มากกว่า 1)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {runningExperiences.map((experience) => (
                    <label key={experience.id} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.runningExperience.includes(experience.id)}
                        onChange={() => handleCheckboxChange(experience.id)}
                        className="w-4 h-4 text-orange-400 bg-gray-100 border-gray-300 rounded focus:ring-orange-400 focus:ring-2"
                      />
                      <span className="text-sm text-gray-700">{experience.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Profile Image Upload */}
              <div>
                <label htmlFor="profileImage" className="block text-base font-medium text-gray-700 mb-3">
                  รูปโปรไฟล์
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-orange-400 transition-colors">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="profileImage"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500"
                      >
                        <span>อัปโหลดรูปภาพ</span>
                        <input
                          id="profileImage"
                          name="profileImage"
                          type="file"
                          accept="image/*"
                          onChange={handleChange}
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">หรือลากและวาง</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF ขนาดไม่เกิน 5MB</p>
                    {formData.profileImage && (
                      <div className="mt-2">
                        <p className="text-sm text-green-600">✓ เลือกไฟล์แล้ว: {formData.profileImage.name}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Message to Runners */}
              <div>
                <label htmlFor="messageToRunners" className="block text-base font-medium text-gray-700 mb-3">
                  อยากจะบอกอะไรกับเพื่อนนักวิ่ง
                </label>
                <textarea
                  id="messageToRunners"
                  name="messageToRunners"
                  value={formData.messageToRunners}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent text-gray-800 placeholder-gray-500 resize-none text-base"
                  placeholder="บอกอะไรกับเพื่อนนักวิ่งของคุณ..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 text-white px-8 py-4 rounded-lg font-medium text-lg transition duration-300 transform hover:scale-105 disabled:transform-none"
              >
                {isSubmitting ? "กำลังสมัครสมาชิก..." : "สมัครสมาชิก"}
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                มีบัญชีผู้ใช้แล้ว?{" "}
                <Link href="/login" className="text-yellow-400 hover:text-yellow-300 font-medium">
                  เข้าสู่ระบบ
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default RegisterPage;
