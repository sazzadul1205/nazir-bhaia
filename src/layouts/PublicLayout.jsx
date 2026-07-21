import { FaPhoneAlt } from "react-icons/fa";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-green-500 p-2 flex">
        <div className="bg-white rounded-full" >
          <FaPhoneAlt className="text-black" />
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default PublicLayout;
