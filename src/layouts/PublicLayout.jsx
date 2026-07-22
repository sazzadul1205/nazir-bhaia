// src/layouts/PublicLayout.jsx
import { Outlet } from "react-router-dom";
import TopBar from "../Shared/TopBar/TopBar";
import Navbar from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Footer/Footer";
import CartSidebar from "../components/Cart/CartSidebar";

const PublicLayout = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartSidebar />
    </div>
  );
};

export default PublicLayout;
