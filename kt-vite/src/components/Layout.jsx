import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-gray-100">
        <div className="p-6 space-y-4">
          <Header />
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
