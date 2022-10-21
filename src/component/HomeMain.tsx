import { FC, useState } from "react";

interface IHomeMainProps {}

const HomeMain: FC<IHomeMainProps> = ({}) => {
  return (
    <div className="bg-white ">
      <div className="container mx-auto border py-10">
        <h1 className="text-3xl text-bold border-red-500 text-[#51535D]">
          Home
        </h1>
      </div>
    </div>
  );
};

export default HomeMain;
