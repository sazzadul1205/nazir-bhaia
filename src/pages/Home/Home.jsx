import {
  FaBolt,
  FaLeaf,
  FaGem,
  FaCog,
  FaHeart,
  FaOilCan,
  FaCoffee,
  FaSeedling,
  FaSpa,
  FaBaby,
  FaTint,
  FaSnowflake,
} from "react-icons/fa";

import CartSidebar from "../../components/Cart/CartSidebar";
import TopSection from "./TopSection/TopSection";

import Slide1 from "../../assets/Slides/Slide-1.jpg";
import Slide2 from "../../assets/Slides/Slide-2.jpg";

const Home = () => {
  const slides = [
    { id: 1, image: Slide1, alt: "Slider 1" },
    { id: 2, image: Slide2, alt: "Slider 2" },
  ];

  const categories = [
    { name: "Balm/Ointment", icon: <FaBolt className="text-amber-600" /> },
    { name: "Foods", icon: <FaLeaf className="text-emerald-600" /> },
    { name: "Dates", icon: <FaGem className="text-amber-700" /> },
    { name: "Gear & Gadgets", icon: <FaCog className="text-slate-600" /> },
    { name: "Chocolates", icon: <FaHeart className="text-rose-600" /> },
    { name: "Hair Care", icon: <FaSpa className="text-purple-600" /> },
    { name: "Oil", icon: <FaOilCan className="text-yellow-700" /> },
    { name: "Milk", icon: <FaTint className="text-blue-400" /> },
    { name: "Tea & Coffee", icon: <FaCoffee className="text-amber-800" /> },
    { name: "Perfume/Attar", icon: <FaSeedling className="text-pink-600" /> },
    { name: "Nuts", icon: <FaLeaf className="text-amber-700" /> },
    { name: "Beauty Care", icon: <FaSpa className="text-rose-500" /> },
    { name: "Baby Care", icon: <FaBaby className="text-sky-500" /> },
    { name: "Honey", icon: <FaGem className="text-amber-600" /> },
    { name: "Winter Care", icon: <FaSnowflake className="text-blue-500" /> },
  ];

  return (
    <>
      <TopSection slides={slides} categories={categories} />
      <CartSidebar />
    </>
  );
};

export default Home;
