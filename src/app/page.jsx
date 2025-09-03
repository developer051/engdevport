"use client";
import React from "react";
import NavBar2 from "./components/NavBar2";
import Banner from "./components/Banner";
import HomeSections from "./components/HomeSections";
import RunnerLeaderboard from "./components/RunnerLeaderboard";
import Footer from "./components/Footer";
import FloatingAICoach from "./components/FloatingAICoach";

export default function Home() {
  return (
    <main>
      <NavBar2 />
      <Banner />
      <HomeSections />
      
      {/* Runner Leaderboard Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <RunnerLeaderboard />
        </div>
      </section>
      
      <Footer />
      
      {/* Floating AI Coach */}
      <FloatingAICoach />
    </main>
  );
}
