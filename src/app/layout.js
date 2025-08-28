import { Prompt } from "next/font/google";
import "./globals.css";


const prompt = Prompt({
  variable: "--font-prompt",
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
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
