import { FC, useEffect } from "react";
import Header from "../component/Header";
import ProfileMain from "../component/ProfileMain";
import SideBar from "../component/SideBar";
import { isTokenPresent } from "../utils/utitlityMethods/utilityMethods";

interface IdashboardProps {}

const dashboard: FC<IdashboardProps> = ({}) => {
  // useEffect(() => {
  //   let istokenAvailble = isTokenPresent("Token");
  //   console.log("istoken availble ", istokenAvailble)
  //   // setIsAuthenticated(istokenAvailble);
  // }, [])

  return (
    <div className="flex">
      <div className="w-[18vw] ">
        <SideBar />
      </div>
      {/* Second Side */}
      <div className="flex flex-col w-[82vw]">
        <Header />
        <div className="">
          <ProfileMain />
        </div>
      </div>
    </div>
  );
};

export default dashboard;
