import React from 'react'
import AdminSideBar from '../../Components/Admin/AdminSideBar'
import AdminContent from '../../Components/Admin/AdminContent'
import AdminTableComponent from '../../Components/Admin/AdminTableComponent'
import { AdminAuth } from '../../Components/Private/AdminAuth'

function AdminUsersList() {
  return (
    <div>
      <AdminAuth>
        <AdminSideBar/>
        <AdminContent name={'User List'}>
        <AdminTableComponent/>
        </AdminContent>
      </AdminAuth>
      
    </div>
  )
}

export default AdminUsersList
