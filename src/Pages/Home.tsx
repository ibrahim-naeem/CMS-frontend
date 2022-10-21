import { FC } from "react";
import Header from "../component/Header";
import HomeMain from "../component/HomeMain";

import SideBar from "../component/SideBar";
import { useNavigate } from "react-router-dom";
import { isTokenPresent } from "../utils/utitlityMethods/utilityMethods";

interface IHomeProps {}

const Home: FC<IHomeProps> = ({}) => {
  let navigate = useNavigate();
  let token = isTokenPresent("Token");
  console.log(token);
  if (!token) {
    console.log(false);
    navigate("/login");
  }
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
