import { FC } from 'react';
import DashboardMain from '../component/DashboardMain';
import Header from '../component/Header';


import SideBar from '../component/SideBar';

interface IHomeProps {

}

const Home: FC<IHomeProps> = ({ }) => {
  return (


    <div className='flex' >
      <div className='basis-3/12' >
        <SideBar />
      </div>
      {/* Second Side */}
      <div className='flex flex-col basis-full'>
        <Header />
        <div className=''>
          <DashboardMain />
        </div>
      </div>

    </div>

  )
};

export default Home;


