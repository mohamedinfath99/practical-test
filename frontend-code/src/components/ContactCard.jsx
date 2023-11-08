
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import userImage from '../assets/user.jpg';
import { FaUserAlt } from 'react-icons/fa';
import { BiLogoGmail } from 'react-icons/bi';
import { BsFillTelephoneFill } from 'react-icons/bs';


export default function ContactCard({ user }) {
    return (
        <div className='w-full flex items-center pb-3 pt-2 border-b border-[#66666645]'>

            <Link to="/" className='flex gap-2 items-center'>

                <img src={userImage} alt='User' className='w-14 h-14 object-cover rounded-full' />

                <div className='flex flex-col justify-center ml-3'>

                    <div className='flex flex-row items-center gap-2'>
                        <FaUserAlt className='text-sm text-[#022A60]' />
                        <h3 className='text-base font-medium text-[#022A60]'>{user.name}</h3>
                    </div>

                    <div className='flex flex-row items-center gap-2'>
                        <BiLogoGmail className='text-sm text-[#022A60]' />
                        <span className='text-sm text-[#022A60] font-medium '>{user.email}</span>
                    </div>

                    <div className='flex flex-row items-center gap-2'>
                        <BsFillTelephoneFill className='text-sm text-[#022A60]' />
                        <span className='text-sm text-[#022A60] font-medium '>{user.phone}</span>
                    </div>

                </div>
            </Link>
        </div>
    );
}


ContactCard.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
    }).isRequired,
};
