import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div className="bg-white min-h-screen">
      <Outlet />
    </div>
  );
};

export default PublicLayout;
