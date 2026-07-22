import { BsCashStack } from "react-icons/bs";
import { FaClock, FaPhone, FaTruck, FaWhatsapp } from "react-icons/fa";
import { MdCall } from "react-icons/md";

const TopBar = () => {
  return (
    <div className="bg-linear-to-r from-emerald-700 to-emerald-600 text-white text-[11px] sm:text-xs shadow-md">
      <div className="max-w-screen-2xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-1.5">
        {/* Mobile Version */}
        <a
          href="tel:09647186097"
          className="flex md:hidden items-center justify-center gap-2 hover:opacity-90 transition-opacity"
        >
          <span className="relative flex h-5 w-5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-lime-300/70 opacity-75 animate-ping"></span>
            <span className="relative inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-emerald-600 text-[11px] shadow-sm">
              <FaPhone className="text-[10px]" />
            </span>
          </span>

          <span className="font-semibold leading-none">
            Hotline
            <span className="underline underline-offset-2 decoration-lime-200 mx-1">
              09647-186097
            </span>
            <span className="text-emerald-100/90 mx-1">|</span>
            <span className="underline underline-offset-2 decoration-lime-200">
              Whatsapp 01818-186097
            </span>
          </span>
        </a>

        {/* Desktop Version */}
        <div className="hidden md:flex items-center justify-between">
          <a
            href="tel:09647186097"
            className="flex items-center gap-3 group hover:opacity-90 transition-opacity"
          >
            <span className="relative flex h-6 w-6">
              <span className="absolute inline-flex h-full w-full rounded-full bg-lime-300/70 opacity-75 animate-ping"></span>
              <span className="relative inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-emerald-600 shadow-sm group-hover:scale-110 transition-transform">
                <MdCall className="text-sm" />
              </span>
            </span>

            <span className="font-semibold text-sm">Hotline</span>

            <span className="font-semibold tracking-wide bg-emerald-500/40 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
              <FaPhone className="text-[10px]" />
              09647-186097
            </span>

            <span className="font-semibold tracking-wide bg-emerald-500/40 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
              <FaWhatsapp className="text-[12px]" />
              Whatsapp 01818-186097
            </span>

            <span className="text-emerald-100/80 text-[11px] flex items-center gap-1">
              <FaClock className="text-[10px]" />
              24 hours open
            </span>
          </a>

          <div className="flex items-center gap-3 text-[11px] text-emerald-100/90">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-lime-300 animate-pulse"></span>
              <span className="flex items-center gap-1">
                <BsCashStack className="text-[10px]" />
                Cash on delivery
              </span>
            </span>
            <span className="h-4 w-px bg-emerald-500/40"></span>
            <span className="flex items-center gap-1">
              <FaTruck className="text-[10px]" />
              Free shipping
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
