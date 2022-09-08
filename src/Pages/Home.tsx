import { FC } from 'react';
import Header from '../component/Header';
import HomeMain from '../component/HomeMain';

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
        <div className='basis-full'>
          <HomeMain />
        </div>
      </div>

    </div>

  )
};

export default Home;


