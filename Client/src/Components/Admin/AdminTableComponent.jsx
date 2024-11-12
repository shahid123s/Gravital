import React, { useEffect, useState } from 'react';
import userLogo from '../../assets/image.png';
import { toast } from 'react-toastify';
import { adminAxiosInstance } from '../../utilities/axios';
import Modal from '../Modal';
import UserModal from '../UserModal';
import Spinner from '../Spinner';
import Pagination from '../Pagination';

function AdminTableComponent({ search }) {
  const [userDetails, setUserDetails] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const limit = 2; 

  useEffect(() => {
    fetchUsersList();
  }, [search, currentPage]);

  const calculateStatus = (user) => {
    if (user.isBlock) return { status: 'Blocked' };
    if (user.isBan) return { status: 'Banned' };
    return { status: 'Good' };
  };

  const fetchUsersList = async () => {
    try {
      setIsLoading(true);
      const response = await adminAxiosInstance.get('/users-list', {
        params: { page: currentPage, limit, search }
      });
      
      setUserDetails(response.data.userList);
      setTotalPages(response.data.totalPage);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  const handleAction = async (action, userId) => {
    try {
      if (action == 'Ban') {
        const response = await adminAxiosInstance.patch('/ban-user', { userId })
        toast.success(response.data.message);
      }
      else if (action == 'UnBan') {
        const response = await adminAxiosInstance.patch('/unban-user', { userId })
        toast.success(response.data.message);
      }
      else if (action == 'Block') {
        const response = await adminAxiosInstance.patch('/block-user', { userId });
        toast.success(response.data.message);
      }
      else if (action == 'Unblock') {
        const response = await adminAxiosInstance.patch('/unblock-user', { userId });
        toast.success(response.data.message);
      }
      console.log(action, userId);
      fetchUsersList()
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleUser = async (userId) => {
    try {
      const response = await adminAxiosInstance.get('/user-data/', { params: { userId } });
      setUserData(response.data);
      setIsOpen(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="p-4 bg-inherit">
      <div className="overflow-x-auto">
        {isLoading ? <Spinner /> : (
          <table className="min-w-full bg-gray-800 text-gray-300">
            <thead>
              <tr className="bg-gray-700">
                <th className="px-4 py-2 text-left">Sl.No</th>
                <th className="px-4 py-2 text-left">Profile Picture</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {userDetails.length > 0 ? userDetails.map((user, index) => (
                <tr key={user._id} className="border-b border-gray-700">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">
                    {user.profilePicture || <img src={userLogo} className="w-14 rounded-xl" alt="User profile" />}
                  </td>
                  <td className="px-4 py-2" onClick={() => handleUser(user._id)}>{user.fullName}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{calculateStatus(user).status}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => toggleDropdown(user._id)}
                      className="hover:bg-[#4A90E2] text-white px-2 py-1 rounded"
                    >
                      View ▼
                    </button>
                    {dropdownOpen === user._id && (
                      <div className="absolute right-0 mt-2 w-32 bg-gray-700 rounded shadow-lg">
                        <button onClick={() => handleAction(user.isBan ? 'UnBan' : 'Ban', user._id)} disabled={user.isBlock} className="block w-full px-4 py-2 text-sm text-left hover:bg-orange-400">{user.isBan ? 'UnBan' : 'Ban'}</button>
                        <button onClick={() => handleAction(user.isBlock ? 'Unblock' : 'Block', user._id)} className="block w-full px-4 py-2 text-sm text-left hover:bg-red-500">{user.isBlock ? 'Unblock' : 'Block'}</button>
                        <button onClick={() => handleAction('Premium')} className="block w-full px-4 py-2 text-sm text-left hover:bg-lime-600">Premium</button>
                      </div>
                    )}
                  </td>
                  {isOpen && <UserModal isOpen={isOpen} onClose={handleClose} userData={userData} />}
                </tr>
              )) : (
                <tr><td colSpan="6" className="text-center text-4xl">No User Found</td></tr>
              )}
            </tbody>
          </table>
        )}
        <Modal title="Ban" />
      </div>
      <div className="flex justify-end mt-2 text-gray-400 bg-inherit">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default AdminTableComponent;