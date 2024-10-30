import React, { useState } from 'react';
import userLogo from '../../assets/image.png'

function AdminTableComponent() {

    const [dropdownOpen, setDropdownOpen] = useState(null)
    const [action, setAction] = useState ('View')

    const users = Array.from({ length: 10 }, (_, index) => ({
        id: index + 1,
        name: "Shahid Noushad",
        email: "shahidnoushad13s@gmail.com",
        phone: "8913454378",
        status: "Good",
      }));

      const toggleDropdown = (id) => {
        setDropdownOpen(dropdownOpen === id ? null : id);
      };


      const bgColor = (userId) => {
        if(userId % 2 === 0){
            return 'bg-[#333333]  '
        }
        return ''
       }

       const handleAction = (action) => {
        console.log(action)
       }
    
      return (
        <div className="p-4 bg-inherit" >
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 text-gray-300">
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
                {users.map((user, index) => (
                  <tr key={user.id} className={`"border-b border-gray-700 ${bgColor(user.id)}`}>
                    <td className="px-4 py-2">{index +1 }</td>
                    <td className="px-4 py-2">{user.profilePicture || <img src={userLogo} className='w-14 rounded-xl'/>}</td>
                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{user.status}</td>
                    <td className="px-4 py-2">
                    <button
                     onClick={() => handleAction('View')}
                    className=" hover:bg-[#4A90E2] text-white px-2 py-1 rounded"
                  >
                   View
                  <span
                    // onMouseOver={() => toggleDropdown(user.id)}
                    onClick={() => toggleDropdown(user.id)}
                    className="ml-2 text-white px-2 py-1"
                  >
                    ▼
                  </span>
                  </button>
                  
                  {dropdownOpen === user.id && (
                    <div className="absolute right-0 mt-2 w-32 bg-gray-700 rounded shadow-lg">
                      <button className="block w-full px-4 py-2 text-sm text-left text-gray-300  hover:bg-orange-400"
                      onClick={() => handleAction('Ban')}
                      >
                        Ban
                      </button>
                      <button className="block w-full px-4 py-2 text-sm text-left text-gray-300 hover:bg-red-500"
                      onClick={() => handleAction('Block')}
                      >
                        Block
                      </button>
                      <button className="block w-full px-4 py-2 text-sm text-left text-gray-300  hover:bg-lime-600 hover:text-[#ffff]"
                      onClick={() => handleAction('Premuim')}
                      >
                        Premium
                      </button>
                    </div>
                  )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end mt-2 text-gray-400 bg-inherit">
            <span>1 2 3 4 5</span>
          </div>
        </div>
      );
    
}

export default AdminTableComponent






 

