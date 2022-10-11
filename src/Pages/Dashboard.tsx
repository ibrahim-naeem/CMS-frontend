import { FC } from "react";
import { useNavigate } from "react-router-dom";
import DashboardMain from "../component/DashboardMain";
import Header from "../component/Header";

import SideBar from "../component/SideBar";

import { isTokenPresent } from "../utils/utitlityMethods/utilityMethods";

interface IDashboardProps {}

const Dashboard: FC<IDashboardProps> = ({}) => {
  // let navigate = useNavigate();
  // let token = isTokenPresent("Token");
  // if (!token) {
  //   navigate("/login");
  // }
  return (
    <div className="flex">
      <div className="w-[18vw]  ">
        <SideBar />
      </div>
      {/* Second Side */}
      <div className="flex flex-col w-[82vw]">
        <Header />
        <div className="">
          <DashboardMain />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
