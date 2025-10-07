import DashboardContent from '@/features/dashboard/components/dashboard-content'
import DateRangePicker from '@/features/dashboard/components/date-range-picker';
import { getSalesData } from '@/features/dashboard/db/dashboard';
import dayjs from '@/lib/dayjs'
import React from 'react'

const AdminPage = async () => {

  const startDate = dayjs().subtract(1, "month").format("YYYY-MM-DD");
  const endDate = dayjs().format("YYYY-MM-DD");


const saleData = await getSalesData({
  from: startDate,
  to: endDate
})





  return (
    <div className="p-4 sm:p-6 flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
        <p  className="text-muted-foreground text-sm">Your store analytics and sales summary</p>
      </div>

      <DateRangePicker start={startDate} end={endDate} />

      <DashboardContent data={saleData}/>
    </div>
  )
}

export default AdminPage