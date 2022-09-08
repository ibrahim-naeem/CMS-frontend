import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import profile from '../assets/profile.png';

import { BiLogOutCircle } from 'react-icons/bi'
import { verifyExpiredToken } from '../utils/utitlityMethods/utilityMethods';

interface IHeaderProps {


}

const Header: FC<IHeaderProps> = ({ }): JSX.Element => {
  const navigate = useNavigate()
  const [name, setName] = useState<string>('')
  const token: any = localStorage.getItem('Token');
  const getProfile = async () => {
    try {
      const response = await fetch('http://localhost:5000/user/', {
        method: "GET",
        headers: { token: token }
      })

      const res = await response.json()
      let tokenExpired = verifyExpiredToken(res)

      if (tokenExpired) {
        navigate('/login')
      }

      setName(res.user_name)

    } catch (error) {

      console.error(error)
    }
  }
  const handleClick = () => {
    localStorage.removeItem('Token')

    navigate('/login')

  }
  useEffect(() => {
    getProfile()
  }, [])
  return (

    <div className=' py-6 flex  items-center '>
      <div className=''>
        <img className='w-20 ' src={profile} alt='profile' />
      </div>
      <p className='font-semibold text-lg  mr-6 ml-auto text-[#51535D]'>{name && name.toUpperCase()}</p>
      <button onClick={handleClick} className='flex items-center border-2 rounded-full px-4 py-2 my-4 mr-8 text-[#51535D] hover:text-white hover:border-white hover:bg-[#51535D]'><BiLogOutCircle className='mr-2 mt-1' /> Logut</button>
    </div>


  )
};

export default Header;
