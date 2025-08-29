"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import NavBar2 from "../components/NavBar2";
import Footer from "../components/Footer";

const LoginPage = () => {
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [formData, setFormData] = useState({
    loginName: "",
    password: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

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
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Store user data in localStorage for client-side access
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Redirect to home page
        router.push('/');
        router.refresh(); // Refresh to update navigation
      } else {
        setError(data.error || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
      }
    } catch (error) {
      console.error('Login error:', error);
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
              เข้าสู่<span className="text-orange-400">ระบบ</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              เข้าสู่ระบบด้วยชื่อผู้ใช้และรหัสผ่านของคุณ
            </p>
          </div>
        </div>
      </section>

      {/* Login Form */}
      <section className="py-12 sm:py-16">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg p-8 shadow-xl border border-gray-200">
            
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Login Name */}
              <div>
                <label htmlFor="loginName" className="block text-sm font-medium text-gray-700 mb-2">
                  ชื่อผู้ใช้ *
                </label>
                <input
                  type="text"
                  id="loginName"
                  name="loginName"
                  value={formData.loginName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent text-gray-800 placeholder-gray-500"
                  placeholder="ชื่อผู้ใช้ของคุณ"
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  รหัสผ่าน *
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent text-gray-800 placeholder-gray-500"
                  placeholder="รหัสผ่านของคุณ"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition duration-300 transform hover:scale-105 disabled:transform-none"
              >
                {isSubmitting ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
              </button>
            </form>

            {/* Register Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                ยังไม่มีบัญชีผู้ใช้?{" "}
                <Link href="/register" className="text-yellow-400 hover:text-yellow-300 font-medium">
                  สมัครสมาชิก
                </Link>
              </p>
            </div>

            {/* Additional Links */}
            <div className="mt-4 text-center">
              <Link href="/" className="text-sm text-gray-500 hover:text-orange-500">
                กลับสู่หน้าแรก
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default LoginPage;
