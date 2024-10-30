import React from 'react'
import AdminContent from '../../Components/Admin/AdminContent'
import AdminSideBar from '../../Components/Admin/AdminSideBar'
import AdminTableComponent from '../../Components/Admin/AdminTableComponent'

function AdminHome() {
    return (
        <div>
            <AdminSideBar />
            <AdminContent name={'Dashboard'} >
            </AdminContent>
        </div>
    )
}

export default AdminHome