import React, { useEffect, useState } from 'react';
import userLogo from '../../assets/image.png'
import { toast } from 'react-toastify';
import axiosInstance from '../../utilities/axios';
import Modal from '../Modal';
import UserModal from '../UserModal';
import Spinner from '../Spinner';

function AdminTableComponent({search}) {
  const [userDetails, setUserDetails] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [currentPage, setCurrentPage] = useState(5);
  const [totalPages, setTotalPages] = useState(10);
  const [isOpen, setIsOpen] = useState(false);
  const  [userData,  setUserData] = useState('')
  const [isLoading, setIsLoading] = useState(false)


  const limit = 10;



  useEffect(() => {
  console.log(search)  
  fetchUsersList()
  }, [search])


  const calculateStatus  = (userDetails)  => {
    if(userDetails.isBlock){

      return ({status : 'Blocked'})
    }
    else if(userDetails.isBan) {
      return ({status : 'Banned'})
    }

      return ({status : 'Good'})

  }

  const fetchUsersList = async () => {
    try {
      setIsLoading(true)
      const response = await axiosInstance.get('/admin/api/users-list', {
        params: { page: currentPage, limit, search }
      });

    


      setUserDetails(response.data);
      setIsLoading(false)
      setTotalPages(response.data.totalPages)
    } catch (error) {
      toast.error(error)
    }
  }





  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };


  const bgColor = (userId) => {
    if (userId % 2 === 0) {
      return 'bg-[#333333]  '
    }
    return ''
  }

  const handleAction = async (action, userId) => {
    if( action == 'Ban'){
      const response = await axiosInstance.patch('/admin/api/ban-user', {userId})
      toast.success(response.data.message);
    }
    else if( action == 'UnBan'){
      console.log('oho')
      const response = await axiosInstance.patch('/admin/api/unban-user', {userId})
      toast.success(response.data.message);
    }
    else if (action == 'Block'){
      const response = await axiosInstance.patch('/admin/api/block-user', {userId});
      toast.success(response.data.message);
    }
    else if (action == 'Unblock'){
      const response = await axiosInstance.patch('/admin/api/unblock-user', {userId});
      toast.success(response.data.message);
    }
    console.log(action, userId);
    fetchUsersList()
  }



  const handleUser = async (userId) => {
    const fetchUserData =async () => {
      try {
        const response = await axiosInstance.get('/admin/api/user-data/',{
          params : {userId}
        });
        setUserData(response.data)
        console.log(response)

      } catch (error) {
        toast.error(error.message)
        console.log(error);
        
      }
    }

    fetchUserData(userId)
    setIsOpen(true);

  }



  const handleClose = async() => {
    setIsOpen(false);
  }



  return (
    <div className="p-4 bg-inherit" >
      <div className="overflow-x-auto">
          {isLoading && <Spinner/>}
        {!isLoading && <table className="min-w-full bg-gray-800 text-gray-300">
          <thead>
            <tr className={`bg-gray-700`}>
              <th className="px-4 py-2 text-left">Sl.No</th>
              <th className="px-4 py-2 text-left">Profile picture</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>

            {userDetails.length > 0 ? userDetails?.map((user, index) => (
              <tr key={user?._id} className={`"border-b border-gray-700 ${bgColor(index)}`}>
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{user.profilePicture || <img src={userLogo} className='w-14 rounded-xl' />}</td>
                <td className="px-4 py-2" onClick={() => handleUser(user._id)}>{user.fullName}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{ calculateStatus(user).status|| 'Alla'}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => toggleDropdown(user._id)}
                    className=" hover:bg-[#4A90E2] text-white px-2 py-1 rounded"
                    >
                    View
                    <span
                      className="ml-2 text-white px-2 py-1"
                      >
                      ▼
                    </span>
                  </button>

                  {dropdownOpen === user._id && (
                    <div className="absolute right-0 mt-2 w-32 bg-gray-700 rounded shadow-lg">
                      <button className={`block w-full px-4 py-2 text-sm text-left text-gray-300  hover:bg-orange-400 cursor-pointer ${user.isBlock? 'opacity-45 cursor-not-allowed': 'cursor-pointer'}`}
                        onClick={() => handleAction(!user.isBan?'Ban' : 'UnBan', user._id)}
                        disabled = {user.isBlock? true : false}
                        >
                        {!user.isBan  ?'Ban' : 'UnBan'}
                      </button>
                      <button className="block w-full px-4 py-2 text-sm text-left text-gray-300 hover:bg-red-500"
                        onClick={() => handleAction(!user.isBlock? 'Block': 'Unblock', user._id)}
                        >
                          {!user.isBlock? 'Block': 'Unblock'}
                      </button>
                      <button className="block w-full px-4 py-2 text-sm text-left text-gray-300  hover:bg-lime-600 hover:text-[#ffff]"
                        onClick={() => handleAction('Premuim')}
                        >
                        Premium
                      </button>
                    </div>
                  )}
                </td>
                {isOpen && <UserModal isOpen={isOpen} onClose={handleClose} userData={userData}  />}
              </tr>
            )): <td className='text-4xl'>No User Found</td>}
            
          </tbody>
        </table>}
        <Modal title={'Ban'} />
        
      </div>
      <div className="flex justify-end mt-2 text-gray-400 bg-inherit">
      {/* {generatePageNumber().map((page, index) => (
                    <button
                        key={index}
                        onClick={() => typeof page === 'number' && handlePageClick(page)}
                        disabled={page === currentPage || page === '...'}
                        className={page === currentPage ? 'active' : ''}
                    >
                        {page}
                    </button>
                ))} */}
      </div>
    </div>
  );

}

export default AdminTableComponent








