"use client";
import NavBar2 from "../components/NavBar2";
import Footer from "../components/Footer";
import ParkCards from "./park";

export default function ParkPage() {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      <NavBar2 />
      
      {/* Header Section */}
      <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-white"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              🗺️ แนะนำ<span className="text-orange-400">สถานที่วิ่ง</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              สวนไหนสวย สวนไหนดี วิ่งแล้วได้ NewPB แนะนำกันเล้ย
            </p>
          </div>
        </div>
      </section>

      {/* Park Cards Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <ParkCards />
        </div>
      </section>

      <Footer />
    </main>
  );
}
