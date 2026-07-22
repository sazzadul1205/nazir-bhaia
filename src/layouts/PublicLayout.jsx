// src/layouts/PublicLayout.jsx

// React
import { Outlet } from "react-router-dom";

// Shared Components
import TopBar from "../Shared/TopBar/TopBar";
import Navbar from "../Shared/Navbar/Navbar";

const PublicLayout = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Top Bar */}
      <TopBar />

      {/* Navbar */}
      <Navbar />

      <Outlet />
    </div>
  );
};

export default PublicLayout;
