import Image from "next/image";
import NavBar from "./components/NavBar";
import NavBar2 from "./components/NavBar2";
import Banner from "./components/Banner";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-gray-50">
      <NavBar2 />
      <Banner />
      <Footer />
    </main>
  );
}
