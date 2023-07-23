import { Outlet } from "react-router-dom";

import { Navbar } from "../components/Navbar";

export const Root = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className="outlet">
        <Outlet />
      </div>
    </div>
  );
};
