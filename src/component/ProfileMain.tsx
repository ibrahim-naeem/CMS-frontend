
import { FC, useEffect, useState } from 'react';
import { BsClipboardPlus } from "react-icons/bs";
import ProfileModal from './ProfileSubComponents/Modals/ProfileModal';
import ProfileTabs from './ProfileSubComponents/ProfileTabs';

interface IProfileMainProps {

}
const ProfileMain: FC<IProfileMainProps> = (): JSX.Element => {
  const [display, setDisplay] = useState<boolean>(false)
  const [details, setDetails] = useState<any>({
    userID: '',
    userName: '',
    userEmail: '',
    userStatus: '',
    dateOfBirth: '',
    joiningData: '',
    confirmationDate: '',
    gender: '',
    martial: '',
    shiftType: '',
    education: '',
    family: '',
    emplymeents: '',
    awards: ''
  })

  const getProfileData = async () => {
    const token: any = localStorage.getItem('Token');
    try {
      const response = await fetch("http://localhost:5000/user/personalDetails", {
        method: "GET",
        headers: { token }
      })

      const res = await response.json();

      const { awards,
        confirmation_date,
        date_of_birth,
        education,
        emplymeents,
        family,
        gender,
        joining_data,
        martial,
        shift_type,
        user_email,
        user_id,
        user_name,
        user_status } = res

      setDetails(() => ({
        userId: user_id,
        userName: user_name,
        userEmail: user_email,
        userStatus: user_status,
        dateOfBirth: date_of_birth,
        joiningData: joining_data,
        confirmationDate: confirmation_date,
        gender: gender,
        martial: martial,
        shiftType: shift_type,
        education: education,
        family: family,
        emplymeents: emplymeents,
        awards: awards
      }))
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    getProfileData()
  }, [])

  return (
    <div className={` container mr-8 bg-slate-50 p-4`}>

      {display && <ProfileModal display={display} setDisplay={setDisplay} details={details} />}
      <div className='flex justify-between items-center px-4 pb-4 '>
        <h1 className='text-2xl font-semibold text-[#51535D] '>Profile</h1>
        <button onClick={() => setDisplay(true)} className='flex items-center border-2 rounded-full px-4 py-2 my-4 text-[#51535D] hover:text-white hover:border-white hover:bg-[#51535D]'><BsClipboardPlus className='mr-2' />Add Details</button>
      </div>
      <div className="flex max-w-5xl justify-around  mx-auto p-4 bg-slate-200 text-[#51535D]">
        <ul className=''>
          <li className='font-semibold'>Username : <span className='font-normal'>{details.userName ? details.userName : 'N/A'}</span></li>
          <li className='font-semibold'>Email : <span className='font-normal'>{details.userEmail ? details.userEmail : 'N/A'}</span></li>
          <li className='font-semibold'>Marital Status : <span className='font-normal'>{details.martial ? details.martial : 'N/A'}</span></li>
          <li className='font-semibold'>Gender: <span className='font-normal'>{details.gender ? details.gender : 'N/A'}</span></li>
          <li className='font-semibold'>Education : <span className='font-normal'>{details.education ? details.education : 'N/A'}</span></li>
          <li className='font-semibold'>Family : <span className='font-normal'>{details.family ? details.family : 'N/A'}</span></li>
          <li className='font-semibold'>Employments : <span className='font-normal'>{details.emplymeents ? details.emplymeents : 'N/A'}</span></li>
        </ul>
        <ul className=''>
          <li className='font-semibold'>Date of Birth : <span className='font-normal'>{details.dateOfBirth ? details.dateOfBirth : 'N/A'}</span></li>
          <li className='font-semibold'>Joining Date : <span className='font-normal'>{details.joiningData ? details.joiningData : 'N/A'}</span></li>
          <li className='font-semibold'>ConfirmationDate : <span className='font-normal'>{details.confirmationDate ? details.confirmationDate : 'N/A'}</span></li>
          <li className='font-semibold'>Status : <span className='font-normal'>{details.userStatus ? details.userStatus : 'N/A'}</span></li>
          <li className='font-semibold'>Shift Type : <span className='font-normal'>{details.shiftType ? details.shiftType : 'N/A'}</span></li>
          <li className='font-semibold'>Awards : <span className='font-normal'>{details.awards ? details.awards : 'N/A'}</span></li>
        </ul>
      </div>

      {/*New Tabs Components */}
      <ProfileTabs />
    </div>
  )
};

export default ProfileMain;


// userName  : '' ,
// userEmail  :'',
// userStatus : '';
// dateOfBirth : '',
// joiningData : '';
// confirmationDate :'',
//  gender  :'',
//  martial   :'',
// shiftType  :'',
// education :'',
// family :'',
// emplymeents:'' ,
// awards:''

// awards,
// confirmation_date,
// date_of_birth,
// education,
// emplymeents,
// family,
// gender,
// joining_data,
// martial,
// shift_type,
// user_email,
// user_id,
// user_name,
// user_status

