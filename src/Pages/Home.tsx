import { FC } from "react";
import Header from "../component/Header";
import HomeMain from "../component/HomeMain";

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
          <HomeMain />
        </div>
      </div>
    </div>
  );
};

export default Home;
