import { FC } from "react";
import logo from "../assets/logo.png";
import { AiOutlineProfile } from "react-icons/ai";
import { AiOutlineDashboard } from "react-icons/ai";
import { AiOutlineSetting } from "react-icons/ai";
import { HiDocumentAdd } from "react-icons/hi";
import { RiArticleLine } from "react-icons/ri";
import { IoTicketSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

interface ISideBarProps {}

//Sub Component
const Input = (item: any) => {
  return (
    <div className="flex justify-start items-center  mx-6">
      <AiOutlineProfile className="text-2xl" />
      <li className="ml-6 py-2 px-4active:bg-[#3F4049] hover:bg-[#3F4049]">
        {item}{" "}
      </li>
    </div>
  );
};

const SideBar: FC<ISideBarProps> = (props) => {
  return (
    <div className="fixed  bg-background h-[100vh] ">
      <div className="flex justify-around items-center my-4 py-4 px-8 ">
        <img className="w-10 h-10" src={logo} alt="" />
        <h1 className="text-xl font-bold text-white">
          <Link to="/">Dashboard </Link>
        </h1>
      </div>
      {/* <div className='text-[#51535D]  py-4'> */}
      <div className="text-white py-4 ">
        <ul className="text-md border-b mb-4 py-2  w-[252px]">
          <div className="flex justify-start items-center  active:bg-[#3F4049] hover:bg-[#3F4049]">
            <AiOutlineProfile className="text-2xl ml-8" />
            <li className="ml-6 py-4 px-4 ">
              {" "}
              <Link to="/profile">Profile</Link>
            </li>
          </div>

          <div className="flex justify-start items-center  active:bg-[#3F4049] hover:bg-[#3F4049]">
            <AiOutlineDashboard className="text-2xl ml-8" />
            <li className="ml-6 py-4 px-4 ">
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </div>

          <div className="flex justify-start items-center  active:bg-[#3F4049] hover:bg-[#3F4049]">
            <IoTicketSharp className="text-2xl ml-8" />
            <li className="ml-6 py-4 px-4 ">Tickets </li>
          </div>

          <div className="flex justify-start items-center  active:bg-[#3F4049] hover:bg-[#3F4049]">
            <RiArticleLine className="text-2xl ml-8" />
            <li className="ml-6 py-4 px-4 ">Articles </li>
          </div>
        </ul>
        <ul className="text-md">
          <div className="flex justify-start items-center active:bg-[#3F4049] hover:bg-[#3F4049]">
            <AiOutlineSetting className="text-2xl ml-8" />
            <li className="ml-6 py-4 px-4 ">Setting </li>
          </div>

          <div className="flex justify-start items-center  active:bg-[#3F4049] hover:bg-[#3F4049]">
            <HiDocumentAdd className="text-2xl ml-8" />
            <li className="ml-6 py-4 px-4 active:bg-[#3F4049] hover:bg-[#3F4049]">
              Subscription{" "}
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
