import useAuthStore from "../store/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FiLogOut, FiSearch, FiSettings, FiUser } from "react-icons/fi";

const Header = () => {
  const user = useAuthStore((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full h-12 px-5 flex items-center justify-between bg-white backdrop-blur-md border-b border-white/20 shadow-sm z-50 rounded-b-xl">
      <p className="text-2xl font-semibold text-gray-900 font-inter tracking-tight">
        echooo
      </p>

      <div className="flex items-center gap-2 relative">
        {/* Search Icon */}
        <button className="p-2 rounded-xl bg-white/20 backdrop-blur-md hover:bg-white/30 transition duration-200">
          <FiSearch size={20} className="text-gray-800" />
        </button>

        {/* Profile Picture */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="h-9 w-9 rounded-full border border-white/40 shadow-md overflow-hidden transition"
        >
          <img
            src={user?.photoURL || "/default-avatar.png"}
            alt={user?.displayName || "Profile"}
            className="h-full w-full object-cover"
          />
        </button>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div
            ref={menuRef}
            className="absolute top-14 right-0 max-w-48 bg-white backdrop-blur-xl border border-gray-200 shadow-lg rounded-xl overflow-hidden py-0 text-sm z-50 animate-in fade-in slide-in-from-top-1"
          >
            <div className="px-4 py-2.5 bg-gray-100 border-b border-gray-100">
              <p className="text-gray-800 font-semibold font-inter truncate">
                {user?.displayName || "User"}
              </p>
              <p className="text-gray-500 text-xs font-roboto truncate">
                {user?.email || ""}
              </p>
            </div>

            <div className="flex flex-col">
              <button
                className="px-4 py-2.5 text-left text-gray-700 hover:bg-gray-100 active:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => {
                  navigate("/profile");
                  setIsMenuOpen(false);
                }}
              >
                <div className="flex items-center gap-3">
                  <FiUser size={16} className="text-gray-500" />
                  <span>Profile</span>
                </div>
              </button>

              <button
                className="px-4 py-2.5 text-left text-gray-700 hover:bg-gray-100 active:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => {
                  navigate("/settings");
                  setIsMenuOpen(false);
                }}
              >
                <div className="flex items-center gap-3">
                  <FiSettings size={16} className="text-gray-500" />
                  <span>Settings</span>
                </div>
              </button>

              <button
                className="px-4 py-2.5 text-left text-red-500 hover:bg-red-50/80 active:bg-red-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <FiLogOut size={16} className="text-red-400" />
                  <span>Logout</span>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
