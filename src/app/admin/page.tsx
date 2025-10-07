import DashboardContent from '@/features/dashboard/components/dashboard-content'
import React from 'react'

const AdminPage = () => {
  return (
    <div className="p-4 sm:p-6 flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
        <p  className="text-muted-foreground text-sm">Your store analytics and sales summary</p>
      </div>
      <DashboardContent/>
    </div>
  )
}

export default AdminPage