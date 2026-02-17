import { Prompt } from "next/font/google";
import "./globals.css";

// โหลดเฉพาะ weight ที่ใช้จริง - ลดจาก 5 เหลือ 2 เพื่อ performance
const prompt = Prompt({
  variable: "--font-prompt",
  subsets: ["latin", "thai"],
  weight: ["400", "600"],
  display: "swap",
});

export const metadata = {
  title: "RabbitLife Running Club",
  description: "RabbitLife Running Club",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body
        className={`${prompt.variable} antialiased font-prompt`}
      >
        {children}
      </body>
    </html>
  );
}
