import { FC, useState } from 'react';

interface IDashboardMainProps {

}

const DashboardMain: FC<IDashboardMainProps> = ({ }) => {


  return (
    <div className='bg-white pb-6'>
      <div className='container mx-auto border py-10'>
        <h1 className='text-3xl text-bold border-red-500 text-[#51535D]'>Dashboard</h1>

      </div>

    </div>
  )
};

export default DashboardMain;
