import { ToastContainer } from "react-toastify";
import "./globals.css";
import Header from "@/components/ui/Header";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
          <Header />
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
