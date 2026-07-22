// src/layouts/PublicLayout.jsx
import { Outlet } from "react-router-dom";
import TopBar from "../Shared/TopBar/TopBar";
import Navbar from "../Shared/Navbar/Navbar";

const PublicLayout = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
