import useAuthStore from "../store/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FiLogOut, FiSettings, FiUser } from "react-icons/fi";

const Header = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const [showModal, setShowModal] = useState(false);

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
    <header className="fixed top-0 left-0 right-0 mx-auto w-full max-w-md h-12 px-5 flex items-center justify-between bg-white/80 border-b sm:border-x-[1.5px] border-b-white/20 sm:border-neutral-300 backdrop-blur-md  shadow-sm z-50">
      <p className="text-2xl font-semibold text-gray-900 font-nunito">echooo</p>

      <div className="flex items-center gap-2 relative">
        {/* Profile Picture */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="h-9 w-9 rounded-full border border-white/40 shadow-md overflow-hidden transition cursor-pointer"
        >
          <img
            src={user?.photoURL || ""}
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
            {/* info */}
            <div className="px-4 py-2.5 bg-gray-100 border-b border-gray-100">
              <p className="text-gray-800 font-semibold font-inter truncate">
                {user?.displayName || "User"}
              </p>
              <p className="text-gray-500 text-xs font-roboto truncate">
                {user?.email || ""}
              </p>
            </div>

            {/* buttons */}
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
                className="px-4 py-2.5 text-left text-red-500 hover:bg-red-50/80 active:bg-red-100 transition-colors cursor-pointer"
                onClick={() => {
                  setShowModal(true);
                  setIsMenuOpen(false);
                }}
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

      {/* Logout Modal */}
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          className="fixed left-0 top-0 w-full h-screen flex items-center justify-center bg-black/50 px-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xs bg-white rounded-xl shadow-lg p-5 relative font-poppins animate-slide-up"
          >
            {/* Header */}
            <div className="mb-3">
              <h2 className="text-lg font-semibold text-neutral-800">
                Log out of your account?
              </h2>
            </div>

            {/* Subtext */}
            <p className="text-sm text-neutral-600 mb-6 leading-relaxed">
              You’ll be logged out from this device. You can always log back in
              later.
            </p>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm rounded-md border border-gray-300 text-neutral-700 hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  logout();
                  setShowModal(false);
                }}
                className="px-4 py-2 text-sm rounded-md bg-red-500 text-white hover:bg-red-600 transition"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
