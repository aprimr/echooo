import Header from "../components/Header";
import Navigation from "../components/Navigation";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div className="h-[100svh] w-full bg-white">
      <Header />
      <div className="h-12" />
      <Outlet />
      <div className="h-24" />
      <Navigation />
    </div>
  );
};

export default Layout;
