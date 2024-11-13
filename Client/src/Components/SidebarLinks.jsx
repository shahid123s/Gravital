import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

function SidebarLinks({logo, name, isAdmin , textColor, textSize}) {
    const navigate = useNavigate();
    // const dispatch = useDispatch();
    const link = name.toLowerCase().replace(/ /g, '-');

    const color = textColor === 'dark' ? 'text-[#333333]' : 'text-[#FFFFFF]' ;
    const size = textSize === 'small' ? 'sm' : 'xl' ;

    const handleClick = async (event) => {
      event.preventDefault();

      if(name === 'Logout'){
        toast.warn('okay')
        console.log('okay')
      }
      
      if(isAdmin){
      
        navigate(`/admin/${link}`);
      
      } else {
      
        navigate(`/${link}`);
      
      }

    }

  return (
    <div className='flex  bg-inherit gap-3 justify-start items-center cursor-pointer' onClick={handleClick }>
    <img src={logo} alt="" className='w-6 bg-inherit'  />
    <p className={`bg-inherit ${color} text-${size} font-medium  font-poppins`}  to={`/admin/${link}`}>{name}</p>
    </div>
  )
}

export default SidebarLinks
