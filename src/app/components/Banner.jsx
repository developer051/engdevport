import React from "react";

const Banner = () => {
  return (
    <div className="relative h-screen">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: "url('/engdevopb.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Content Container */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-full">
          {/* Text Content - Left Side */}
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Welcome to <span className="text-red-900">EngDev</span> Portfolio
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8">
              I am a full-stack developer passionate about creating innovative
              web solutions
              <span className="text-green-700">Data Analytic</span> ,{" "}
              <span className="text-green-700">CyberSecurity</span> and
              delivering exceptional user experiences.
            </p>
            <div className="space-x-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition duration-300">
                View Projects
              </button>
              <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-black transition duration-300">
                Contact Me
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
