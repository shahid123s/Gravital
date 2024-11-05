import React from 'react'
import AdminContent from '../../Components/Admin/AdminContent'
import AdminSideBar from '../../Components/Admin/AdminSideBar'
import Pagination from '../../Components/Pagination'

function AdminPosts() {
  return (
    <div>
        <AdminSideBar/>
      <AdminContent>
        <Pagination currentPage={1}  totalPages={10}/>
      </AdminContent>
    </div>
  )
}

export default AdminPosts
