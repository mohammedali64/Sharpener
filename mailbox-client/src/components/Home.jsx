import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const Home = ({ user }) => {
  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
      <SideBar user={user} />
      <div className="ml-5 flex-1 h-full overflow-y-auto bg-white">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;