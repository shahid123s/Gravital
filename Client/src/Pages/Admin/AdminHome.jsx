import React from 'react'
import AdminContent from '../../Components/Admin/AdminContent'
import AdminSideBar from '../../Components/Admin/AdminSideBar'
import AdminTableComponent from '../../Components/Admin/AdminTableComponent'
import Modal from '../../Components/Modal'

function AdminHome() {
    return (
        <div>
            <AdminSideBar />
            <AdminContent name={'Dashboard'} >
                <Modal/>
            </AdminContent>
        </div>
    )
}

export default AdminHome