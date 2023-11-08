
import { AiFillSetting, AiFillMessage } from 'react-icons/ai';
import { BiSolidNotification } from 'react-icons/bi';
import logo from '../assets/logo.png';
import userImage from '../assets/profileImg.avif';


export default function NavBar() {
    return (
        <div className='w-full flex items-center justify-between py-3 md:py-3 px-7 rounded-lg bg-primary'>

            <div className='flex gap-5 pl-4 items-center cursor-pointer'>
                <AiFillSetting className="text-2xl text-[#022A60]" />
                <BiSolidNotification className="text-2xl text-[#022A60]" />
                <AiFillMessage className="text-2xl text-[#022A60]" />
            </div>

            <div>
                <img src={logo} alt='Logo' className='w-36 h-auto cursor-pointer' />
            </div>

            <div className='flex gap-4 items-center text-ascent-1 text-md md:text-xl cursor-pointer'>
                <p className="font-bold text-base text-dblue font-bold-400" >Mohamed Infath</p>
                <img src={userImage} alt='User' className='w-10 h-10 rounded-full object-cover' />
            </div>

        </div>
    );
}
