import { NavLink } from "react-router-dom";
import { PiChats, PiWall, PiUsers, PiUserCircle } from "react-icons/pi";
import { useEffect, useState } from "react";
import { getLoginedUserDetails } from "../lib/firestoreHelpers";
import { DocumentData } from "firebase/firestore";

const Navigation = () => {
  const [loginedUser, setLoginedUser] = useState<DocumentData | null>(null);

  useEffect(() => {
    getLoginedUserDetails().then((user) => {
      setLoginedUser(user);
    });
  }, [loginedUser]);

  return (
    <footer className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-md h-16 bg-white/80 backdrop-blur-lg border-t sm:border-x-[1.5px] sm:border-neutral-300 border-gray-200 z-50">
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
            `relative flex flex-col items-center justify-center w-full h-full transition-colors ${
              isActive ? "text-blue-500" : "text-gray-500"
            }`
          }
        >
          <PiUsers size={24} />
          <span className="text-xs mt-1">Network</span>
          {loginedUser?.receivedRequests &&
            loginedUser.receivedRequests.length > 0 && (
              <div className="absolute top-2 right-6 w-2 h-2 bg-blue-500 rounded-full" />
            )}
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
