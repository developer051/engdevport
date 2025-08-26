import React from "react";

const Banner = () => {
  return (
    <div className="relative min-h-screen">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/bgb.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "scroll",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gray-900 bg-opacity-10"></div>
      </div>

      {/* Content Container */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center min-h-screen">
          {/* Text Content - Centered */}
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Welcome to <span className="text-green-400">EngDev</span> Portfolio
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 mb-6 sm:mb-8 leading-relaxed px-4">
              I am a full-stack developer passionate about creating innovative
              web solutions,{" "}
              <span className="text-green-400 font-semibold">Data Analytics</span>,{" "}
              <span className="text-green-400 font-semibold">Cybersecurity</span> and
              <span className="text-green-400 font-semibold"> AI </span>
              delivering exceptional user experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition duration-300 transform hover:scale-105">
                View Projects
              </button>
              <button className="w-full sm:w-auto bg-transparent border-2 border-green-400 text-green-400 px-6 py-3 rounded-lg font-medium hover:bg-green-400 hover:text-black transition duration-300 transform hover:scale-105">
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
