import React from 'react'
import AdminContent from '../../Components/Admin/AdminContent'
import AdminSideBar from '../../Components/Admin/AdminSideBar'

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