import { NavLink } from "react-router-dom";
import { PiChats, PiWall, PiUsers, PiUserCircle } from "react-icons/pi";
import NavigationRibbon from "./NavigationRibbon";

const Navigation = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full h-16 bg-white backdrop-blur-lg border-t border-gray-200 z-50">
      <NavigationRibbon />
      <div className="flex items-center justify-around h-full px-4">
        {/* Feed */}
        <NavLink
          to="/app/home"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full transition-colors ${
              isActive ? "text-blue-500" : "text-gray-500"
            }`
          }
        >
          <PiWall size={24} />
          <span className="text-xs mt-1">Feed</span>
        </NavLink>

        {/* Chats*/}
        <NavLink
          to="/app/chats"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full transition-colors ${
              isActive ? "text-blue-500" : "text-gray-500"
            }`
          }
        >
          <PiChats size={24} />
          <span className="text-xs mt-1">Chats</span>
        </NavLink>

        {/* Network */}
        <NavLink
          to="/app/network"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full transition-colors ${
              isActive ? "text-blue-500" : "text-gray-500"
            }`
          }
        >
          <PiUsers size={24} />
          <span className="text-xs mt-1">Network</span>
        </NavLink>

        {/* Me */}
        <NavLink
          to="/app/me"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full transition-colors ${
              isActive ? "text-blue-500" : "text-gray-500"
            }`
          }
        >
          <PiUserCircle size={24} />
          <span className="text-xs mt-1">Me</span>
        </NavLink>
      </div>
    </footer>
  );
};

export default Navigation;
