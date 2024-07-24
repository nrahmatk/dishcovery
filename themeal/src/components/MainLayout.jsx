import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <div className="main">
        <div className="container">
          <Outlet />
        </div>
      </div>
    </>
  );
}
