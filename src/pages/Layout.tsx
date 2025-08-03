import Header from "../components/Header";
import Navigation from "../components/Navigation";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div className="min-h-[100svh] w-full max-w-md mx-auto bg-white sm:border-x-[1.5px] sm:border-neutral-300 flex flex-col">
      <Header />
      <div className="h-12" />
      <div className="flex-grow">
        <Outlet />
      </div>
      <div className="h-24" />
      <Navigation />
    </div>
  );
};

export default Layout;
