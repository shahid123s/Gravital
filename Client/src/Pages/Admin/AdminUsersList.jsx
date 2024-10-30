import React from 'react'
import AdminSideBar from '../../Components/Admin/AdminSideBar'
import AdminContent from '../../Components/Admin/AdminContent'
import AdminTableComponent from '../../Components/Admin/AdminTableComponent'

function AdminUsersList() {
  return (
    <div>
        <AdminSideBar/>
        <AdminContent name={'User List'}>
        <AdminTableComponent/>
        </AdminContent>
      
    </div>
  )
}

export default AdminUsersList
