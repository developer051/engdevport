"use client";
import React from "react";
import NavBar2 from "./components/NavBar2";
import Banner from "./components/Banner";
import HomeSections from "./components/HomeSections";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <NavBar2 />
      <Banner />
      <HomeSections />
      <Footer />
    </main>
  );
}
