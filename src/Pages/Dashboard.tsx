import { FC } from "react";
import DashboardMain from "../component/DashboardMain";
import Header from "../component/Header";

import SideBar from "../component/SideBar";

interface IHomeProps {}

const Home: FC<IHomeProps> = ({}) => {
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

export default Home;
